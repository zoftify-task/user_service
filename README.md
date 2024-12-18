# README

## Description

This project is a REST API for user management using NestJS, TypeORM, and PostgreSQL. It implements JWT authentication.

---

## Requirements

- **Node.js** (v16 and above)
- **npm** (v8 and above)
- **PostgreSQL** (v13 and above)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <folder_name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create an environment file:**
   In the root of the project, create a `.env` file and add the following variables:
   ```env
   NODE_ENV=development
   PORT=3000

   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=your_database

   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION_TIME=3600
   ```

4. **Set up the database:**
   Ensure PostgreSQL is running and create the database specified in `DATABASE_NAME`.

---

## Running the Application

1. **Start in development mode:**
   ```bash
   npm run start:dev
   ```

2. **Start in production mode:**
   ```bash
   npm run build
   npm run start:prod
   ```

3. **Run tests:**
   ```bash
   npm run test
   ```

---

## API Usage

Once running, the API is available at `http://localhost:3000`.

### Available Routes

#### Authentication
- `POST /auth/register` - Register a user
  - Request body:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
- `POST /auth/login` - Authenticate a user
  - Request body:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

#### Users
- `GET /users` - Get a list of users (requires JWT)
- `GET /users/:id` - Get a user by ID (requires JWT)
- `POST /users` - Create a user (requires JWT)
  - Request body:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
- `PATCH /users/:id` - Update a user (requires JWT)
  - Request body (example):
    ```json
    {
      "name": "Updated Name"
    }
    ```
- `DELETE /users/:id` - Delete a user (requires JWT)

---

## Testing

1. **Run all tests:**
   ```bash
   npm run test
   ```

2. **Run tests with coverage:**
   ```bash
   npm run test:cov
   ```

3. **Run tests in watch mode:**
   ```bash
   npm run test:watch
   ```

---

## Additional Information

- **Logging:** All requests are logged to the file.
- **Error Handling:** A global filter is used to handle exceptions and return appropriate HTTP responses.
- **Validation:** Implemented using `class-validator` and `class-transformer`.

