const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
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
        lastname: {
            type: String,
            required: true
        }
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

// userSchema.pre('save', function (next) {
//     if(this.password)
//     {
//         bcrypt.hash(this.password, 10, (err, hashed) => {
//             if (!err) {
//                 this.password = hashed;
//             } else {
//                 console.log(err);
//             }
//         })
//     }

//     next();
// });

module.exports = mongoose.model('User', UserSchema);