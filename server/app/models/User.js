const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    method: {
        type: String,
        required: true,
        enum: ['google', 'facebook', 'local']
    },

    email: {
        type: String,
        required: true,
    },

    password: String,

    name: {
        firstname: {
            type: String,
            required: true
        },
        lastname: String
    },
    
    image: {
        type: String,
        default: 'https://success.salesforce.com/resource/1578618033000/tdxlib/img/default-user.png'
    },

    created_at: {
        type: Date,
        default: new Date
    }

});


module.exports = mongoose.model('User', userSchema);