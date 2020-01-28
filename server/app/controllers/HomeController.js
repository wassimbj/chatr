const UserModel = require('../models/User');
const redisClient = require('redis').createClient();
// just to use redisClient.keys synchronously
const { promisify } = require('util');
const redisKeys = promisify(redisClient.keys).bind(redisClient);

class Home{

    async index(req, res)
    {
        // Get all the users
        let users = await UserModel.find({_id: {$ne: req.session.userid}}, {password: false});
        // get online users, wich are stored in redis
        // online here means user is logged in and his socket is connected
        let onlineUsers = await redisKeys('*user*');

        return res.status(200).json({users, onlineUsers});
    }


}

module.exports = new Home();