const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// MongoDB Connection
const uri = `mongodb://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PASS)}@ac-eujmygz-shard-00-00.tzqwszd.mongodb.net:27017,ac-eujmygz-shard-00-01.tzqwszd.mongodb.net:27017,ac-eujmygz-shard-00-02.tzqwszd.mongodb.net:27017/?ssl=true&replicaSet=atlas-q0lsm7-shard-0&authSource=admin&appName=Cluster0`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

// verifyJWT middleware
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: 'unauthorized access' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    await client.connect();
    const db = client.db('buddy_script');
    const usersCollection = db.collection('users');
    const postsCollection = db.collection('posts');

    console.log("MongoDB Database Connected Successfully");

    // ---------------- AUTH API ----------------

    // User Registration
    app.post('/api/auth/register', async (req, res) => {
      const { firstName, lastName, email, password } = req.body;

      try {
        if (!firstName || !lastName || !email || !password) {
          return res.status(400).send({ message: 'All fields are required' });
        }

        const query = { email };
        const exists = await usersCollection.findOne(query);
        if (exists) {
          return res.status(400).send({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          createdAt: new Date()
        };

        await usersCollection.insertOne(newUser);
        res.status(201).send({ success: true, message: 'User registered successfully' });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // User Login
    app.post('/api/auth/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        if (!email || !password) {
          return res.status(400).send({ message: 'Email and password are required' });
        }

        const query = { email };
        const user = await usersCollection.findOne(query);
        if (!user) {
          return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Sign JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
          process.env.ACCESS_TOKEN,
          { expiresIn: '30d' }
        );

        res.send({
          token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // Google Sign-In / Register Sync
    app.post('/api/auth/google', async (req, res) => {
      const { firstName, lastName, email } = req.body;

      try {
        if (!email) {
          return res.status(400).send({ message: 'Email is required' });
        }

        const query = { email };
        let user = await usersCollection.findOne(query);

        if (!user) {
          // Register new user 
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), salt);

          user = {
            firstName: firstName || 'Google',
            lastName: lastName || 'User',
            email,
            password: hashedPassword,
            createdAt: new Date()
          };

          const result = await usersCollection.insertOne(user);
          user._id = result.insertedId;
        }

        // Sign JWT token
        const token = jwt.sign(
          { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
          process.env.ACCESS_TOKEN,
          { expiresIn: '30d' }
        );

        res.send({
          token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });


    // ---------------- FEED POSTS API ----------------

    // Create a Post
    app.post('/api/posts', verifyJWT, upload.single('image'), async (req, res) => {
      const { text, visibility, image: bodyImage } = req.body;
      const image = req.file ? req.file.filename : (bodyImage || null);

      try {
        const newPost = {
          text,
          image,
          author: {
            id: new ObjectId(req.decoded.id),
            email: req.decoded.email,
            firstName: req.decoded.firstName,
            lastName: req.decoded.lastName
          },
          visibility: visibility || 'public',
          likes: [],
          comments: [],
          createdAt: new Date()
        };

        const result = await postsCollection.insertOne(newPost);
        newPost._id = result.insertedId;
        res.status(201).send(newPost);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // Get Posts
    app.get('/api/posts', verifyJWT, async (req, res) => {
      try {
        const query = {
          $or: [
            { visibility: 'public' },
            { 'author.email': req.decoded.email }
          ]
        };

        const posts = await postsCollection.find(query).sort({ _id: -1 }).toArray();
        res.send(posts);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // Like/Unlike a Post
    app.put('/api/posts/:id/like', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const userEmail = req.decoded.email;

      try {
        const query = { _id: new ObjectId(id) };
        const post = await postsCollection.findOne(query);
        if (!post) {
          return res.status(404).send({ message: 'Post not found' });
        }

        let updatedLikes = [...post.likes];
        const index = updatedLikes.indexOf(userEmail);

        if (index === -1) {
          updatedLikes.push(userEmail);
        } else {
          updatedLikes.splice(index, 1);
        }

        const updateDoc = {
          $set: { likes: updatedLikes }
        };

        await postsCollection.updateOne(query, updateDoc);
        res.send(updatedLikes);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // Add Comment to Post
    app.post('/api/posts/:id/comment', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const { text } = req.body;

      try {
        if (!text) {
          return res.status(400).send({ message: 'Comment text is required' });
        }

        const query = { _id: new ObjectId(id) };
        const post = await postsCollection.findOne(query);
        if (!post) {
          return res.status(404).send({ message: 'Post not found' });
        }

        const newComment = {
          _id: new ObjectId(),
          text,
          author: {
            email: req.decoded.email,
            firstName: req.decoded.firstName,
            lastName: req.decoded.lastName
          },
          likes: [],
          replies: [],
          createdAt: new Date()
        };

        const updateDoc = {
          $push: { comments: newComment }
        };

        await postsCollection.updateOne(query, updateDoc);
        res.status(201).send(newComment);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // Add Reply to Comment
    app.post('/api/posts/:id/comment/:commentId/reply', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const commentId = req.params.commentId;
      const { text } = req.body;

      try {
        if (!text) {
          return res.status(400).send({ message: 'Reply text is required' });
        }

        const query = {
          _id: new ObjectId(id),
          "comments._id": new ObjectId(commentId)
        };

        const newReply = {
          _id: new ObjectId(),
          text,
          author: {
            email: req.decoded.email,
            firstName: req.decoded.firstName,
            lastName: req.decoded.lastName
          },
          likes: [],
          createdAt: new Date()
        };

        const updateDoc = {
          $push: { "comments.$.replies": newReply }
        };

        await postsCollection.updateOne(query, updateDoc);
        res.status(201).send(newReply);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // Like/Unlike a Comment
    app.put('/api/posts/:id/comment/:commentId/like', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const commentId = req.params.commentId;
      const userEmail = req.decoded.email;

      try {
        const query = { _id: new ObjectId(id) };
        const post = await postsCollection.findOne(query);
        if (!post) {
          return res.status(404).send({ message: 'Post not found' });
        }

        const comments = post.comments.map(comment => {
          if (comment._id.toString() === commentId) {
            const likes = comment.likes || [];
            const idx = likes.indexOf(userEmail);
            if (idx === -1) {
              likes.push(userEmail);
            } else {
              likes.splice(idx, 1);
            }
            comment.likes = likes;
          }
          return comment;
        });

        await postsCollection.updateOne(query, { $set: { comments } });
        res.send({ message: 'Comment like toggled' });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // Like/Unlike a Reply
    app.put('/api/posts/:id/comment/:commentId/reply/:replyId/like', verifyJWT, async (req, res) => {
      const id = req.params.id;
      const commentId = req.params.commentId;
      const replyId = req.params.replyId;
      const userEmail = req.decoded.email;

      try {
        const query = { _id: new ObjectId(id) };
        const post = await postsCollection.findOne(query);
        if (!post) {
          return res.status(404).send({ message: 'Post not found' });
        }

        const comments = post.comments.map(comment => {
          if (comment._id.toString() === commentId) {
            const replies = (comment.replies || []).map(reply => {
              if (reply._id.toString() === replyId) {
                const likes = reply.likes || [];
                const idx = likes.indexOf(userEmail);
                if (idx === -1) {
                  likes.push(userEmail);
                } else {
                  likes.splice(idx, 1);
                }
                reply.likes = likes;
              }
              return reply;
            });
            comment.replies = replies;
          }
          return comment;
        });

        await postsCollection.updateOne(query, { $set: { comments } });
        res.send({ message: 'Reply like toggled' });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // Share a Post (Increment Share Count)
    app.put('/api/posts/:id/share', verifyJWT, async (req, res) => {
      const id = req.params.id;

      try {
        const query = { _id: new ObjectId(id) };
        const post = await postsCollection.findOne(query);
        if (!post) {
          return res.status(404).send({ message: 'Post not found' });
        }

        const currentShares = post.shares || 0;
        await postsCollection.updateOne(query, { $set: { shares: currentShares + 1 } });
        res.send({ message: 'Post shared successfully' });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

  } finally {
    // client remains connected
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Buddy Script API Server is running...');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
