# B2B Data Catalog

- **Introduction**: This repository contains the code for a B2B data catalog application, including a backend server and a frontend client.

- **Getting Started**:
  - **Backend Setup**:
    - Navigate to the `backend` directory: `cd backend`
    - Install dependencies: `npm install`
    - Create a `.env` file in `backend` with:
      ```
      MONGODB_URL="mongodb+srv://solankio:bvzxqa8FufeskAmt@cluster0.pls8tzd.mongodb.net/b2b"
      PORT=4500
      FRONTEND="http://localhost:3000"
      ```
    - Start the backend server: `node server.js`
    
  - **Frontend Setup**:
    - Open a terminal and navigate to the `frontend` directory: `cd frontend`
    - Install frontend dependencies: `npm install`
    - Start the frontend development server: `npm start`
    - Open `http://localhost:3000` in your web browser to view the frontend.

- **Technologies Used**:
  - **Backend**: Node.js, Express.js, MongoDB, Mongoose
  - **Frontend**: React, JavaScript/ES6, HTML, CSS
