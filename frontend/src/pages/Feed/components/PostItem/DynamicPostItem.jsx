import React, { useState } from 'react';

const DynamicPostItem = ({ post, onPostUpdated }) => {
  const [commentText, setCommentText] = useState('');
  const [activeReplyCommentId, setActiveReplyCommentId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  const isLiked = Array.isArray(post.likes) && post.likes.includes(currentUser.email);

  const formatTime = (dateStr) => {
    const diff = new Date() - new Date(dateStr);
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "1m";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  const handleLikeToggle = () => {
    const token = localStorage.getItem('authToken');
    console.log(`Toggling like for post ${post._id}`);

    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/like`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Like toggled successfully.");
        if (onPostUpdated) onPostUpdated();
      })
      .catch(err => console.error("Error toggling like:", err));
  };

  const handleCommentSubmit = (e) => {
    if (e) e.preventDefault();
    if (!commentText.trim()) return;

    const token = localStorage.getItem('authToken');
    console.log(`Submitting comment for post ${post._id}`);

    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text: commentText })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Comment added successfully.");
        setCommentText('');
        if (onPostUpdated) onPostUpdated();
      })
      .catch(err => console.error("Error adding comment:", err));
  };

  const handleReplySubmit = (e, commentId) => {
    if (e) e.preventDefault();
    if (!replyText.trim()) return;

    const token = localStorage.getItem('authToken');
    console.log(`Submitting reply for comment ${commentId} on post ${post._id}`);

    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/comment/${commentId}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text: replyText })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Reply added successfully.");
        setReplyText('');
        setActiveReplyCommentId(null);
        if (onPostUpdated) onPostUpdated();
      })
      .catch(err => console.error("Error adding reply:", err));
  };

  const handleCommentLikeToggle = (commentId) => {
    const token = localStorage.getItem('authToken');
    console.log(`Toggling like for comment ${commentId} on post ${post._id}`);

    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/comment/${commentId}/like`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Comment like toggled.");
        if (onPostUpdated) onPostUpdated();
      })
      .catch(err => console.error("Error toggling comment like:", err));
  };

  const handleReplyLikeToggle = (commentId, replyId) => {
    const token = localStorage.getItem('authToken');
    console.log(`Toggling like for reply ${replyId} on comment ${commentId} on post ${post._id}`);

    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/comment/${commentId}/reply/${replyId}/like`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Reply like toggled.");
        if (onPostUpdated) onPostUpdated();
      })
      .catch(err => console.error("Error toggling reply like:", err));
  };

  const handleCommentKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleReplyKeyDown = (e, commentId) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleReplySubmit(null, commentId);
    }
  };

  const handleShareClick = () => {
    const token = localStorage.getItem('authToken');
    console.log(`Sharing post ${post._id}`);

    fetch(`${import.meta.env.VITE_API_URL}/api/posts/${post._id}/share`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Post shared successfully.");
        if (onPostUpdated) onPostUpdated();
      })
      .catch(err => console.error("Error sharing post:", err));
  };

  const getPostImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/assets/')) {
      return imagePath;
    }
    return `${import.meta.env.VITE_API_URL}/uploads/${imagePath}`;
  };

  const postLikesTooltip = Array.isArray(post.likes) && post.likes.length > 0
    ? `Liked by:\n${post.likes.join('\n')}`
    : 'No likes yet';

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img src="/assets/images/post_img.png" alt="" className="_post_img" />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Anonymous'}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {formatTime(post.createdAt)} . <span style={{ textTransform: 'capitalize' }}>{post.visibility || 'public'}</span>
              </p>
            </div>
          </div>
          <div className="_feed_inner_timeline_post_box_dropdown">
            <div className="_feed_timeline_post_dropdown">
              <button href="#0" id="_timeline_drop_show_btn" className="_feed_timeline_post_dropdown_link">
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <h4 className="_feed_inner_timeline_post_title" style={{ fontWeight: 'normal', margin: '14px 0' }}>
          {post.text}
        </h4>

        {post.image && (
          <div className="_feed_inner_timeline_image">
            <img src={getPostImageUrl(post.image)} alt="Post Content" className="_time_img" />
          </div>
        )}
      </div>

      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image" title={postLikesTooltip} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {Array.isArray(post.likes) && post.likes.length > 0 ? (
            post.likes.slice(0, 5).map((email, idx) => {
              const initial = email.charAt(0).toUpperCase();
              let hash = 0;
              for (let i = 0; i < email.length; i++) {
                hash = email.charCodeAt(i) + ((hash << 5) - hash);
              }
              const colors = ['#377DFF', '#28A745', '#DC3545', '#FFC107', '#17A2B8', '#6F42C1', '#FD7E14'];
              const color = colors[Math.abs(hash) % colors.length];

              return (
                <div
                  key={email}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    border: '2px solid #fff',
                    marginLeft: idx === 0 ? '0' : '-10px',
                    zIndex: 10 - idx,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                  }}
                >
                  {initial}
                </div>
              );
            })
          ) : (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#e4e6eb',
                color: '#8a8d91',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                border: '2px solid #fff',
                fontWeight: 'bold'
              }}
            >
              👤
            </div>
          )}
          <p className="_feed_inner_timeline_total_reacts_para">
            {post.likes ? post.likes.length : 0}
          </p>
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <a href="#0"><span>{post.comments ? post.comments.length : 0}</span> Comment</a>
          </p>
          <p className="_feed_inner_timeline_total_reacts_para2">
            <span>{post.shares || 0}</span> Share
          </p>
        </div>
      </div>

      <div className="_feed_inner_timeline_reaction">
        <button 
          onClick={handleLikeToggle}
          className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? '_feed_reaction_active' : ''}`}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"/>
                <path fill="#664500" d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"/>
                <path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"/>
                <path fill="#664500" d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"/>
              </svg>
              Haha
            </span>
          </span>
        </button>
        <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                <path stroke="#000" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"/>
                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" d="M6.938 9.313h7.125M10.5 14.063h3.563"/>
              </svg>
              Comment
            </span>
          </span>
        </button>
        <button onClick={handleShareClick} className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg className="_reaction_svg" xmlns="http://www.w3.org/2000/svg" width="24" height="21" fill="none" viewBox="0 0 24 21">
                <path stroke="#000" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"/>
              </svg>
              Share
            </span>
          </span>
        </button>
      </div>

      {/* Comment Input Area */}
      <div className="_feed_inner_timeline_cooment_area">
        <div className="_feed_inner_comment_box">
          <form className="_feed_inner_comment_box_form" onSubmit={handleCommentSubmit}>
            <div className="_feed_inner_comment_box_content">
              <div className="_feed_inner_comment_box_content_image">
                <img src="/assets/images/comment_img.png" alt="" className="_comment_img" />
              </div>
              <div className="_feed_inner_comment_box_content_txt">
                <textarea 
                  className="form-control _comment_textarea" 
                  placeholder="Write a comment" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={handleCommentKeyDown}
                  required
                ></textarea>
              </div>
            </div>
            <div className="_feed_inner_comment_box_icon">
              <button type="button" className="_feed_inner_comment_box_icon_btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path fill="#000" fillOpacity=".46" fillRule="evenodd" d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z" clipRule="evenodd" />
                </svg>
              </button>
              <button type="button" className="_feed_inner_comment_box_icon_btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path fill="#000" fillOpacity=".46" fillRule="evenodd" d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Render Dynamic Comments List */}
      {post.comments && post.comments.length > 0 && (
        <div className="_timline_comment_main">
          {post.comments.map((comment) => {
            const isCommentLiked = Array.isArray(comment.likes) && comment.likes.includes(currentUser.email);
            const commentLikesTooltip = Array.isArray(comment.likes) && comment.likes.length > 0
              ? `Liked by:\n${comment.likes.join('\n')}`
              : 'No likes yet';

            return (
              <div className="_comment_main" key={comment._id} style={{ marginBottom: '16px' }}>
                <div className="_comment_image">
                  <img src="/assets/images/txt_img.png" alt="" className="_comment_img1" />
                </div>
                <div className="_comment_area">
                  <div className="_comment_details">
                    <div className="_comment_details_top">
                      <div className="_comment_name">
                        <h4 className="_comment_name_title">
                          {comment.author ? `${comment.author.firstName} ${comment.author.lastName}` : 'Anonymous'}
                        </h4>
                      </div>
                    </div>
                    <div className="_comment_status">
                      <p className="_comment_status_text">
                        <span>{comment.text}</span>
                      </p>
                    </div>
                    {/* Render comments reactions count dynamically */}
                    {Array.isArray(comment.likes) && comment.likes.length > 0 && (
                      <div className="_total_reactions" title={commentLikesTooltip} style={{ cursor: 'pointer' }}>
                        <div className="_total_react">
                          <span className="_reaction_like">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                          </span>
                          <span className="_reaction_heart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                          </span>
                        </div>
                        <span className="_total">
                          {comment.likes.length}
                        </span>
                      </div>
                    )}
                    <div className="_comment_reply">
                      <div className="_comment_reply_num">
                        <ul className="_comment_reply_list">
                          <li onClick={() => handleCommentLikeToggle(comment._id)}>
                            <span style={{ cursor: 'pointer', color: isCommentLiked ? '#377DFF' : 'inherit' }}>Like.</span>
                          </li>
                          <li onClick={() => setActiveReplyCommentId(activeReplyCommentId === comment._id ? null : comment._id)}>
                            <span style={{ cursor: 'pointer' }}>Reply.</span>
                          </li>
                          <li><span>Share</span></li>
                          <li><span className="_time_link">.{formatTime(comment.createdAt)}</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Nested Comment Replies List */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div style={{ marginLeft: '32px', marginTop: '12px' }}>
                      {comment.replies.map((reply) => {
                        const isReplyLiked = Array.isArray(reply.likes) && reply.likes.includes(currentUser.email);
                        const replyLikesTooltip = Array.isArray(reply.likes) && reply.likes.length > 0
                          ? `Liked by:\n${reply.likes.join('\n')}`
                          : 'No likes yet';

                        return (
                          <div key={reply._id} style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                            <img src="/assets/images/txt_img.png" alt="" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                            <div style={{ background: '#f0f2f5', padding: '8px 12px', borderRadius: '8px', flex: 1 }}>
                              <h5 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold' }}>
                                {reply.author ? `${reply.author.firstName} ${reply.author.lastName}` : 'Anonymous'}
                              </h5>
                              <p style={{ margin: 0, fontSize: '13px', color: '#333' }}>{reply.text}</p>
                              
                              <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#888', marginTop: '4px', alignItems: 'center' }}>
                                <span 
                                  onClick={() => handleReplyLikeToggle(comment._id, reply._id)} 
                                  style={{ cursor: 'pointer', color: isReplyLiked ? '#377DFF' : 'inherit', fontWeight: 'bold' }}
                                >
                                  Like
                                </span>
                                <span>. {formatTime(reply.createdAt)}</span>
                                {Array.isArray(reply.likes) && reply.likes.length > 0 && (
                                  <span title={replyLikesTooltip} style={{ color: '#377DFF', cursor: 'pointer', marginLeft: '4px' }}>
                                    👍 {reply.likes.length}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Reply Input Box */}
                  {activeReplyCommentId === comment._id && (
                    <div className="_feed_inner_comment_box" style={{ marginLeft: '32px', marginTop: '12px' }}>
                      <form className="_feed_inner_comment_box_form" onSubmit={(e) => handleReplySubmit(e, comment._id)}>
                        <div className="_feed_inner_comment_box_content">
                          <div className="_feed_inner_comment_box_content_image">
                            <img src="/assets/images/comment_img.png" alt="" className="_comment_img" style={{ width: '28px', height: '28px' }} />
                          </div>
                          <div className="_feed_inner_comment_box_content_txt">
                            <textarea 
                              className="form-control _comment_textarea" 
                              placeholder="Write a reply" 
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              onKeyDown={(e) => handleReplyKeyDown(e, comment._id)}
                              required
                              style={{ height: '36px', minHeight: '36px' }}
                            ></textarea>
                          </div>
                        </div>
                        <div className="_feed_inner_comment_box_icon">
                          <button type="button" className="_feed_inner_comment_box_icon_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                              <path fill="#000" fillOpacity=".46" fillRule="evenodd" d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button type="button" className="_feed_inner_comment_box_icon_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                              <path fill="#000" fillOpacity=".46" fillRule="evenodd" d="M10.867 1.333c2.257 0 3.774 1.581 3.774 3.933v5.435c0 2.352-1.517 3.932-3.774 3.932H5.101c-2.254 0-3.767-1.58-3.767-3.932V5.266c0-2.352 1.513-3.933 3.767-3.933h5.766zm0 1H5.101c-1.681 0-2.767 1.152-2.767 2.933v5.435c0 1.782 1.086 2.932 2.767 2.932h5.766c1.685 0 2.774-1.15 2.774-2.932V5.266c0-1.781-1.089-2.933-2.774-2.933zm.426 5.733l.017.015.013.013.009.008.037.037c.12.12.453.46 1.443 1.477a.5.5 0 11-.716.697S10.73 8.91 10.633 8.816a.614.614 0 00-.433-.118.622.622 0 00-.421.225c-1.55 1.88-1.568 1.897-1.594 1.922a1.456 1.456 0 01-2.057-.021s-.62-.63-.63-.642c-.155-.143-.43-.134-.594.04l-1.02 1.076a.498.498 0 01-.707.018.499.499 0 01-.018-.706l1.018-1.075c.54-.573 1.45-.6 2.025-.06l.639.647c.178.18.467.184.646.008l1.519-1.843a1.618 1.618 0 011.098-.584c.433-.038.854.088 1.19.363zM5.706 4.42c.921 0 1.67.75 1.67 1.67 0 .92-.75 1.67-1.67 1.67-.92 0-1.67-.75-1.67-1.67 0-.921.75-1.67 1.67-1.67zm0 1a.67.67 0 10.001 1.34.67.67 0 00-.002-1.34z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DynamicPostItem;
