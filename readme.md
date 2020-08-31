<p align='center'>
    <img src="https://raw.githubusercontent.com/wassimbj/chatr/master/chatr.png" width='200px' align='center' style='display:block'/>
</p>
<p align='center' style='text-align:center'>Chatr - Private Real-time chat web application</p>

# What is this ?
this is a real-time private chat application (between two users).
built with Nodejs, Expressjs, Redis, MongoDB and Reactjs for the client, the API is deployed on heroku and the client is on netlify

## Demo
Check [Demo](https://chatr-demo.netlify.com)

## Note
i didnt have time to make the demo work again, so if you want to test it in your local machine, just clone the repo  
cd into the server and run ```npm start```  
and the same to the client, and you shall see it working, **your should have Redis installed in your machine, or just use redislabs**

# Features
- Express.js Server + React.js Client
- Session authentication with the help of **express-session** package
- React Context-API for sharing user authentication status (logged in or not)
- Data are saved in MongoDB
- Private Real-time communication between two users with the help of **socket.io**
- Social authentication via facebook
- Uses **redis** for storing the online users, the sessions, and as an adapter for Socket.io
