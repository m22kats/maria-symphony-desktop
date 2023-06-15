# Maria Symphony Desktop

This project demonstrates some of my skills, with a stronger focus on frontend development in the fullstack domain. The goal is to showcase my capability to work on a fullstack project.

The backend service is a simple Java application for demo purpose. After creating the Docker container, I created a `docker-compose.yml` file to facilitate easy connection between the frontend, database, and backend API. This allows you to experience the project rather than just examining the frontend code.

Although my top skill is Angular, I chose to use React in this project to demonstrate my versatility. While it takes time to become familiar with a new framework, I believe that once you understand the core concepts, transitioning between frameworks becomes easier. However, I acknowledge that there is still much for me to learn about React.

Regarding the terms used in this project, they don't have much meaning (just vague and generic). I focused on showcasing my ability to build a system from scratch and handle the entire setup process.

[![Video Demo](https://img.youtube.com/vi/cSe33tnbJdU/0.jpg)](https://youtu.be/cSe33tnbJdU)

## How to Run the Project with Docker

1. Start the Docker containers using the following command:
```
docker-compose up -d
```

2. Run the project by executing the following command:
```
npm run dev
```

3. Open a browser for localhost:4200.

4. Sign up for an account.

5. Log in to the application.

6. Click on "Generate 10 Examples" or create an entity manually.

7. Test the application's features, which include:

   - Melody Entity List page (a list with filters and paging)
   - Melody Entity Create page (click "Add New Entity")
   - Random generation of 10 entities by clicking "Generate 10 Examples" button
   - Delete selected entities after confirmation popup
   - Simple Redux Saga implementation (console log can be checked)
   - Interceptor that logs out the user for 401 or 403 responses and injects a token for making requests
   - Protected router to restrict access to certain routes
   - Modest responsive views (UI wasn't a priority in this project)
   - Prettier auto-fix setup for code formatting (use `npm run format` to format the code).