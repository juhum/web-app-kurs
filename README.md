# Dialer App

## Getting Started

To get started with this project using Gitpod, follow these steps:

1. Click on the following link to open the project in Gitpod:

   [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/juhum/web-app-kurs)

   This will automatically start a Gitpod workspace with the project.

2. Open the `.env` file and update the following configuration variables with your own values:

    ```plaintext
    URL=your-api-url
    LOGIN=your-login
    PASSWORD=your-password
    NUMBER2=your-number
    ```

    Replace `your-api-url`, `your-login`, `your-password`, and `your-number` with the appropriate information for your setup.

    **Note:** Keep this file secure and never share it with others. It contains sensitive information necessary for the proper functioning of the application.

3. Save the `.env` file.

4. Open a new terminal in Gitpod.

5. Navigate to the backend directory:

    ```bash
    cd backend
    ```

6. Run the backend server:

    ```bash
    node index.js
    ```

7. Open a second terminal in Gitpod.

8. Navigate to the frontend directory:

    ```bash
    cd front
    ```

9. Run the frontend application:

    ```bash
    npm run serve
    ```

11. In the Gitpod Panel, click on Ports and then "Make Public" button.

12. Add the ports used by both the backend and frontend servers. For example, if your backend runs on port 3000 and frontend on port 8080, add these ports.

13. Visit the provided link in second terminal in your browser to see the application in action.
