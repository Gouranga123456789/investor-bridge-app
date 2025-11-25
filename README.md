# Investor-Bridge Application

**Connect. Fund. Grow.**

A full-stack web application designed to bridge the communication gap between entrepreneurs, investors, bankers, and business advisors. This platform functions as a private marketing network where business people can find funding, investors can discover high-potential ventures, and bankers can offer financial products.

---

## 🚀 Key Features

* **Role-Based Access:** Secure registration and login for 5 distinct roles:
    * **Business People:** Post business ideas and proposals.
    * **Investors:** Browse business proposals and post investment offers.
    * **Bankers:** Post details about available loans and financial schemes.
    * **Advisors:** Post informational articles and answer user queries.
    * **General Users:** Browse business categories.
* **Secure Authentication:** Implementation of **JWT (JSON Web Tokens)** and **bcrypt** for secure password hashing.
* **Interactive Dashboards:** Dynamic user interfaces that change based on the logged-in user's role.
* **Relational Database:** Robust **PostgreSQL** database to manage complex relationships between users, proposals, and loans.

---

## 💻 Tech Stack

* **Frontend:** React.js (Vite), CSS3
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Authentication:** JWT, Bcryptjs
* **State Management:** React Context API

---

## ⚙️ Prerequisites

Before running the project, ensure you have the following installed:
1.  **Node.js** (v14 or higher)
2.  **PostgreSQL** (running locally)

---

## 🛠️ Database Setup (Crucial Step)

1.  Open your PostgreSQL shell (`psql`).
2.  Create the database:
    ```sql
    CREATE DATABASE investor_bridge;
    ```
3.  Connect to the database:
    ```sql
    \c investor_bridge
    ```
4.  **Run the following SQL commands** to create the required tables:

    ```sql
    -- 1. Users Table
    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('Investor', 'Business', 'Banker', 'Advisor', 'User')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- 2. Business Proposals
    CREATE TABLE proposals (
        proposal_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        industry VARCHAR(100),
        funding_goal NUMERIC(15, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    -- 3. Investor Offers
    CREATE TABLE investor_proposals (
        investor_proposal_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        industry_focus VARCHAR(255),
        min_investment NUMERIC(15, 2),
        max_investment NUMERIC(15, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    -- 4. Loan Details
    CREATE TABLE loan_details (
        loan_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        bank_name VARCHAR(255),
        loan_type VARCHAR(255) NOT NULL,
        description TEXT,
        interest_rate NUMERIC(5, 2),
        max_amount NUMERIC(15, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    -- 5. Advisor Articles
    CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    -- 6. User Queries
    CREATE TABLE queries (
        query_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        question TEXT NOT NULL,
        is_answered BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    -- 7. Advisor Solutions
    CREATE TABLE solutions (
        solution_id SERIAL PRIMARY KEY,
        query_id INT NOT NULL,
        user_id INT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (query_id) REFERENCES queries(query_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
    ```

---

## 🔧 Installation & Configuration

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Gouranga123456789/investor-bridge-app
    cd investor-bridge-app
    ```

2.  **Setup Backend Variables:**
    * Navigate to the `backend` folder.
    * Create a file named `.env`.
    * Add the following details (update with your local DB password):
        ```env
        PORT=5000
        DB_USER=postgres
        DB_PASSWORD=your_password_here
        DB_HOST=localhost
        DB_PORT=5432
        DB_NAME=investor_bridge
        JWT_SECRET=my_super_secure_secret_key_123
        ```

3.  **Install Dependencies:**
    * **Backend:**
        ```bash
        cd backend
        npm install
        ```
    * **Frontend:**
        ```bash
        cd ../frontend
        npm install
        ```

---

## ▶️ How to Run the Project

1.  **Build the Frontend:**
    Navigate to the `frontend` folder and run the build command. This compiles React into static files.
    ```bash
    cd frontend
    npm run build
    ```
2.  **Start the Server:**
    Navigate to the `backend` folder and start the server. The backend is configured to serve the built frontend files.
    ```bash
    cd ../backend
    npm start
    ```
3.  **Access the App:**
    Open your browser and go to: **`http://localhost:5000`**
