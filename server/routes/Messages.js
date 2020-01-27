const router = require('express').Router();

const UserController = require('../app/controllers/auth/UserController');
const MessagesController = require('../app/controllers/MessagesController');

module.exports = function(io)
{
    // create messages
    router.post('/messages/store',
        UserController.mustBeAuth,
        MessagesController.storeMessage.bind(io)
    );

    // get two users messages
    router.get('/messages/messages_between_users/:to',
        UserController.mustBeAuth,
        MessagesController.getTwoUsersMessages
    );

    // get two users messages
    router.get('/messages/get_user_chatting_with/:id',
        UserController.mustBeAuth,
        MessagesController.getUserChattingWith
    );

    return router;
}