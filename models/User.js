const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    createAt: {
        type: 'date',
        default: Date.now()
    }

})
module.exports = mongoose.model('Users',User,'Users');