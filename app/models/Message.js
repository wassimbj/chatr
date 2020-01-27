const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    msg: {
        type: String,
        required: true
    },
    
    created_at: {
        type: Date,
        default: new Date
    }

});


module.exports = mongoose.model('Message', messageSchema);