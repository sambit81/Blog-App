# Blog App

This is a Node.js-based blog application that allows users to create, view, and interact with blog posts. The application leverages EJS for templating, Bootstrap for styling, and follows a clean and modular project structure.

---

## Features

- Create new blog posts with a title and content.
- View all available blog posts on the home page.
- Edit and update existing blog posts.
- Fully responsive design using Bootstrap.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or later)
- npm (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (Database server)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd Blog-App
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up the Database:**
   - Install PostgreSQL and ensure it is running.
   - Create a database named `blogs` for the application.
   - Update the `.env` file with your database connection details:
     ```env
     DB_HOST=localhost
     DB_USER=<your_username>
     DB_PASSWORD=<your_password>
     DB_NAME=blogs
     DB_PORT=5432
     ```
     
4. **Start the Server:**
   ```bash
   node index.js
   ```
   
5. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

```
Blog App/
├── gifs/                     # GIFs demonstrating app functionality
│   ├── Add Post.gif
│   ├── Delete Post.gif
│   ├── Edit Post.gif
├── public/                   # Static assets like CSS files
│   └── styles/
│       ├── main.css          # Styling for the main pages
│       └── post.css          # Styling for the post creation/editing pages
├── views/                    # EJS templates for rendering UI
│   ├── displaypost.ejs       # Post viewing template
│   ├── index.ejs             # Home page template
│   ├── post.ejs              # Post creation/editing template
│   └── partials/
│       └── nav.ejs           # Navigation bar partial
├── index.js                  # Main entry point of the application
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Lock file for dependencies
├── .env                      # Environment variables for database configuration
```

---

## Detailed Description of Key Files

- **index.js**
  - Main entry point of the application.
  - Sets up the server, routes, middleware, and database connection using the `pg` package.

- **views/index.ejs**
  - Renders the home page, displaying all blog posts.

- **views/post.ejs**
  - Form for creating or editing blog posts.

- **views/partials/nav.ejs**
  - Navigation bar included across all pages for consistent UI.

- **public/styles/**
  - Contains CSS files for styling the pages.

- **.env**
  - Contains sensitive database configuration details like host, user, password, and database name.

---

## Dependencies

The project uses the following npm packages:

- **express**: Handles server routing.
- **ejs**: Template engine for rendering dynamic HTML.
- **body-parser**: Parses incoming request bodies.
- **bootstrap**: CSS framework for responsive design.
- **pg**: PostgreSQL client for Node.js to interact with the database.
- **dotenv**: Loads environment variables from a `.env` file.

Install all dependencies using:
```bash
npm install
```

---

## Database Details

This application uses PostgreSQL for database operations. The following operations are performed using the `pg` package:

- **Insert Operations**:
  - Inserting new blog posts into the database.

- **Retrieve Operations**:
  - Fetching all blog posts to display on the home page.

- **Update Operations**:
  - Modifying existing blog posts.

- **Delete Operations**:
  - Removing blog posts from the database (if applicable).

Ensure your PostgreSQL instance is configured and running before starting the application.

---

## GIFs

Below are some demonstrations of the application's functionality:

1. **Add Post**:
   ![Add Post](gifs/Add%20Post.gif)

2. **Delete Post**:
   ![Delete Post](gifs/Delete%20Post.gif)

3. **Edit Post**:
   ![Edit Post](gifs/Edit%20Post.gif)

---

## How to Use the Application

1. Navigate to the home page (`http://localhost:3000`).
2. To create a new post, click the "New Post" button and fill in the form.
3. To edit an existing post, click on the post card to open the editor.
4. Save or cancel your changes as required.

---

## Future Enhancements

- Add authentication to secure the post editing and creation process.
- Include categories and tags for better post organization.
- Implement search functionality to find posts quickly.
- Add support for rich text editing.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

