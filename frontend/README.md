# Buddy Script - Frontend Application

This is the frontend implementation for the **Buddy Script** social media application, created as part of the selection task for the Full Stack Engineer role at Appifylab.

## 🚀 Features Implemented
- **React Router Integration**: Clean and smooth routing set up for Login, Register, and Feed pages.
- **Login Page**: Responsive layout with Google authentication option and state-driven inputs.
- **Registration Page**: Full sign-up form with input validations.
- **Feed Page Layout**: Beautiful, structured dashboard containing:
  - Navigation bar & search bar
  - Left & Right Sidebars
  - Story Slider
  - Post Creation Card
  - Post Timeline Feed
- **Modular Architecture**: Page-specific layouts split into dedicated subfolders under `src/pages/Feed/components/` for maximum maintainability.

## 🛠️ Technology Stack
- **Library**: React (v19)
- **Build Tool**: Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Bootstrap & Custom CSS

## 📁 Folder Structure
```text
src/
├── components/          # Global reusable UI components
├── pages/
│   ├── Login/           # Login Page and CSS
│   ├── Register/        # Registration Page and CSS
│   └── Feed/            # Main Feed Page
│       ├── components/  # Feed-specific modular components (Header, Sidebars, StorySlider, etc.)
│       ├── Feed.jsx     # Main Layout Coordinator
│       └── Feed.css     # Feed page styling
```

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Navigate into the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the App Locally
Start the development server:
   ```bash
   npm run dev
   ```
The app will run locally at `http://localhost:5173` (or the next available port).

### Building for Production
To build a production-ready bundle:
   ```bash
   npm run build
   ```
