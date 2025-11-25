## 🚀 How to Run the Project (Important)

To ensure the application runs correctly without 404 errors, please follow these steps:

1.  **Navigate to the frontend folder and build the UI:**
    ```bash
    cd frontend
    npm install
    npm run build
    ```

2.  **Navigate to the backend folder and start the server:**
    ```bash
    cd ../backend
    npm install
    # Ensure your .env file is set up with DB credentials
    npm start
    ```

3.  **Open your browser:**
    Go to `http://localhost:5000`
    *(Note: The backend is configured to serve the built React frontend on port 5000).*
