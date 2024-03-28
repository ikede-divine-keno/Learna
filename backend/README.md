# LEARNA API Project README

This README provides an overview of a Learna API project that includes functionalities for user authentication, user data retrieval, and statistics retrieval from a MongoDB database. Below is a description of each file in the project:

---

## Files and Modules Overview

### 1. `database.js`

This file contains code to establish a connection with the MongoDB database using the Mongoose library.

### 2. `express.js`

This file sets up an Express application with middleware for parsing JSON data, enabling CORS, and parsing URL-encoded data.

### 3. `authController.js`

The `authController.js` file contains controller functions for user signup (`signUp`) and user sign-in (`signIn`), including password hashing, JWT token generation, and user creation in the database.

### 4. `index.js`

This file includes a controller function (`statsController`) to retrieve statistics from the database, such as the count of different types of users.

### 5. `userController.js`

The `userController.js` file contains a controller function (`user`) to retrieve user information based on their role and email.

### 6. `authMiddleware.js`

This file includes middleware (`authenticateToken`) for authenticating JWT tokens in incoming requests.

### 7. `Admin.js`, `Teacher.js`, `Student.js`

These files define Mongoose schemas for the Admin, Teacher, and Student collections in the MongoDB database.

### 8. `authRoutes.js`, `userRoutes.js`, `index.js`

These files define routes for handling authentication, user-related operations, and statistics retrieval.

---

## How to Run the Project

1. Ensure you have Node.js and MongoDB installed on your machine.

2. Clone this repository to your local machine.

3. Navigate to the project directory in your terminal.

4. Install dependencies using the command:
  `npm install`

5. Create a `.env` file in the root directory and add environment variables like `PORT` and `ACCESS_TOKEN_SECRET`.

6. Start the server using the command:
  `npm run dev`

7. Access the API endpoints using a tool like Postman or curl.

---

## API Endpoints

- `POST /api/auth/signup`: Endpoint for user signup.
- `POST /api/auth/signin`: Endpoint for user sign-in.
- `GET /api/user`: Endpoint for retrieving user information.
- `GET /api/stats`: Endpoint for retrieving statistics.

---

## Environment Variables

- `PORT`: Port number for the Express server.
- `ACCESS_TOKEN_SECRET`: Secret key for JWT token generation.

---

## Notes

- Make sure to update the MongoDB connection URI in `database.js` with your database credentials.
- Customize the routes and functionalities as per your project requirements.

---

Feel free to reach out if you have any questions or need further assistance with the project!
