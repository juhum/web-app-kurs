# Dialer App

## Getting Started

To get started with this project using Gitpod, follow these steps:

1. Click on the following button to open the project in Gitpod:

   [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/juhum/web-app-kurs)

   This will automatically start a Gitpod workspace with the project.

2. Open the `.env` file in backend directory and update the following configuration variables with your own values:

    ```plaintext
    URL=your-api-url
    LOGIN=your-login
    PASSWORD=your-password
    NUMBER2=your-number
    ```

    Replace `your-api-url`, `your-login`, `your-password`, and `your-number` with the appropriate information for your setup.

    **Note:** If you want to use fake api do not change anything.

3. Save the `.env` file.

4. Open a new terminal in Gitpod.

5. Navigate to the backend directory:

    ```bash
    cd backend
    ```

6. Run:

    ```bash
    npm install
    ```

7. Run the backend server:

    ```bash
    node index.js
    ```

8. Open a second terminal in Gitpod.

9. Navigate to the frontend directory:

    ```bash
    cd front
    ```

10. Enter commands one by one:

    ```bash
    npm install
    gp env -u VUE_APP_SERVER_URL
    gp env VUE_APP_SERVER_URL=$(gp url 3000)
    eval $(gp env -e)
    ```

10. Run the frontend application:

    ```bash
    npm run serve
    ```

11. In the Gitpod Panel, click on Ports and then "Make Public" button.

12. Visit the provided link in second terminal in your browser to see the application in action.
