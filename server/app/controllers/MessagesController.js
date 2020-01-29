const MessageModel = require('../models/Message')
const UserModel = require('../models/User')

class Messages {

    async getUserChattingWith(req, res)
    {
        const { id: chatting_with_userid} = req.params;
        
        let user_chatting_with = await UserModel.findOne({ _id: chatting_with_userid}, 'name');

        if(user_chatting_with)
            return res.status(200).json(user_chatting_with);
        else
            return res.status(400).json({fail: true, msg: 'no user found'});
    }

    async storeMessage(req, res)
    {
        const io = this;
        const {to, msg} = req.body;
        // io.sockets.emit('msg', 'hello from messages controller !');
        let createdMsg =  await MessageModel.create({
            from: req.session.userid,
            to,
            msg
        });

        // get the message the created message with populated users
        let newMessage = await MessageModel.find({ _id: createdMsg._id})
            .populate('from', ['image', '_id'])
            .populate('to', ['image', '_id']);

          // send message to each of the users
        io.sockets.to(`${to}+${req.session.userid}`).to(`${req.session.userid}+${to}`).emit('new_message', newMessage);

        return res.status(200).json({fail: false, msg: 'message saved'});
    }

    async getTwoUsersMessages(req, res)
    {
        // to whom 
        const { to } = req.params;
    
        let usersMessages = await MessageModel.find({
            $or: [
                { from: req.session.userid, to },
                { to, to: req.session.userid } 
            ]
        })
            .populate('from', ['image', '_id'])
            .populate('to', ['image', '_id']);
        
        // console.log(usersMessages)

        return res.status(200).json(usersMessages);
    }

}

module.exports = new Messages();