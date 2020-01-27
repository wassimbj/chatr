const UserModel = require('../models/User');
const redisClient = require('redis').createClient();
// just to use redisClient.keys synchronously
const { promisify } = require('util');
const redisKeys = promisify(redisClient.keys).bind(redisClient);

class Home{

    async index(req, res)
    {
        let users = await UserModel.find({_id: {$ne: req.session.userid}}, {password: false});
        let onlineUsers = await redisKeys('*user*');
        return res.status(200).json({users, onlineUsers});
    }


}

module.exports = new Home();