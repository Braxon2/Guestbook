Guestbook Application
This is a full-stack Guestbook application that allows visitors to view existing messages and leave their own message along with their name.
The application is designed with maintainability and scalability in mind, using a clear separation of concerns between the frontend and backend.


🛠️ Technologies Used
Frontend

React: A JavaScript library for building user interfaces.

React Router DOM: For declarative routing in React applications.


Backend

Node.js: A JavaScript runtime environment.

Express.js: A fast, unopinionated, minimalist web framework for Node.js.

MySQL2 (Promise-based): MySQL client for Node.js.

Joi: For robust schema validation of API requests.

Dotenv: For loading environment variables from a .env file.

CORS: Middleware to enable Cross-Origin Resource Sharing.

Database
MySQL: A widely used open-source relational database management system.

⚙️ Prerequisites
Before you begin, ensure you have the following installed on your machine:

Git: For cloning the repository.

Download Git

Node.js & npm (or Yarn): Node.js runtime and its package manager.

Download Node.js (LTS version recommended)

MySQL Server: The database server.

Download MySQL Community Server

Alternatively, you can use Docker to run a MySQL container (e.g., docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest).

🚀 Setup Instructions
Follow these steps to get the Guestbook application up and running on your local machine.

1. Clone the Repository
First, clone this Git repository to your local machine. If the frontend and backend are in separate repositories, clone both into a parent directory. For this guide, we'll assume a structure like:

guestbook-app/
├── frontend/
└── backend/
```bash

git clone [https://github.com/Braxon2/Guestbook.git](https://github.com/Braxon2/Guestbook.git)


2. Database Setup (MySQL)
This step involves creating the MySQL database and the messages table.

Connect to MySQL:
Open your terminal or command prompt and connect to your MySQL server using a client (e.g., MySQL Shell, MySQL Workbench, or the mysql command-line client).

mysql -u your_mysql_username -p
# Enter your MySQL password when prompted

Create the Database:
Execute the following SQL command to create the database (I'll use guestbook_db as the database name for consistency, but ensure it matches your .env file later).

CREATE DATABASE IF NOT EXISTS guestbook_db;

Use the Database:
Switch to the newly created database:

USE guestbook_db;

Create the messages Table:
Execute the following SQL command to create the table. This table will store the guestbook messages.

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

id: Unique identifier for each entry (auto-incrementing).

name: The name of the person who posted the message (up to 255 characters, not null).

message: The actual guestbook message (text, not null).

created_at: Automatically records the timestamp when the entry was created.

3. Backend Setup
Navigate to the Backend Directory:

cd backend

Install Dependencies:
Install all required Node.js packages:

npm install
# or yarn install

Configure Environment Variables:
Create a .env file in the root of the backend directory. This file will store your database credentials and server port.

# backend/.env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=guestbook_db # Must match the database name you created
DB_PORT=3306         # Default MySQL port, adjust if different

PORT=4000            # Port for the Node.js server

Important: Replace your_mysql_username and your_mysql_password with your actual MySQL credentials.

Run the Backend (Development Mode):
Start the Node.js server. The dev script uses nodemon for automatic restarts on file changes.

npm run dev
# or npm start (for production-like run)

You should see output indicating the server is running, e.g., Server running on port 4000.

4. Frontend Setup
Navigate to the Frontend Directory:

cd ../frontend # Go back up to the main repo folder and into frontend

Install Dependencies:
Install all required React packages:

npm install
# or yarn install

Run the Frontend (Development Mode):
Start the React development server.

npm start
# or yarn start

This will usually open the application in your web browser at http://localhost:3000 (or another port if 3000 is taken).

🌍 API Endpoints
The backend exposes the following RESTful API endpoints:

POST /api/messages

Description: Creates a new guestbook message.

Method: POST

Request Body (JSON):

{
    "name": "John Doe",
    "message": "This is a great guestbook!"
}

Success Response (201 Created): Includes the new message's details.

Error Response (400 Bad Request, 500 Internal Server Error):

GET /api/messages

Description: Retrieves a paginated list of guestbook messages, ordered from newest to oldest.

Method: GET

Query Parameters:

page: (Optional) The page number to retrieve (default: 1).

limit: (Optional) The number of messages per page (default: 10, max: 50).

Success Response (200 OK): Returns an array of messages and pagination metadata.

Error Response (500 Internal Server Error):

🏃 Running the Application
After following the setup instructions for both frontend and backend:

Start Backend:
Navigate to the backend directory and run:

npm run dev

Start Frontend:
Open a new terminal, navigate to the frontend directory, and run:

npm start

The application should now be accessible in your browser, typically at http://localhost:3000.

