[](https://chatr-demo.netlify.com/logo.png)
***Chatr - Private Real-time chat web application***

# What is this ?
this is a real-time private chat application (means between two users)
its built with Nodejs, Expressjs, Redis, MongoDB and Reactjs for the client, the API is deployed on heroku and the client is on netlify

## Demo
Check [Demo](https://chatr-demo.netlify.com)

# Features
- Express.js Server + React.js Client
- Session authentication with the help of **express-session** package
- React Context-API for sharing user authentication status (logged in or not)
- Data are saved in MongoDB
- Private Real-time communication between two users with the help of **socket.io**
- Social authentication via facebook
- Uses **redis** for storing the online users, the sessions, and as an adapter for Socket.io