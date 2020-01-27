const redisClient = require('redis').createClient();
// just to use redisClient.keys synchronously
const { promisify } = require('util');
const redisKeys = promisify(redisClient.keys).bind(redisClient);

const redisAdapter = require('socket.io-redis');
const session = require('../../config/session');
const socketSess = require('socket.io-express-session');

function socketEvents(io)
{
    io.on('connection', async (socket) => {
        
        // Only authenticated users can send and listen to events
        if (socket.handshake.session.userid) {
            // console.log('User is connected')
            // sets the connected users
            redisClient.hset(`user:${socket.handshake.session.userid}`, 'socketid', `${socket.id}`);


            let onlineUsers = await redisKeys('*user*');
            // console.log(onlineUsers)
            socket.emit('newOnlineUsersList', onlineUsers)

            // get from redis the user socket.id by his authentication id
            // and join both of the users two rooms,
            // the idea of two rooms is like seting a static socket.id to each of the users
            socket.on('join_room', function(chatwith){
                redisClient.hget(`user:${chatwith}`, 'socketid',
                function(err, socketid){

                    // join user who started the conversation (the sender)
                    io.sockets.sockets[socket.id].join([
                            `${chatwith}+${socket.handshake.session.userid}`,
                            `${socket.handshake.session.userid}+${chatwith}`
                    ])

                    // For the reciever
                    // if user is connected (is online) join him
                    if(socketid && !err)
                    {
                        io.sockets.sockets[socketid].join([
                            `${chatwith}+${socket.handshake.session.userid}`,
                            `${socket.handshake.session.userid}+${chatwith}`
                        ])
                    }
                });
            });

            socket.on('disconnect', function () {
                redisClient.hdel(`user:${socket.handshake.session.userid}`, 'socketid')
            })

        } else {
            io.emit('auth_error', 'please login first');
        }

    });
}


function init(app)
{
    
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    io.set('transports', ['websocket']);

    io.adapter(redisAdapter({ host: '127.0.0.1', port: 6379}));

    // call events
    socketEvents(io);

    // use the socket session
    io.use(socketSess(session))

    return { ioServer: server, io: io}
}

module.exports = init;