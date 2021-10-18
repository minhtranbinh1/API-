const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: {
        type: 'string',
        required: true,
    },
    description:{
        type: 'string',
    },
    url: {
        type: 'string',
    },
    status: {
        type: 'string',
        enum: ['TO LEARN','LEARNING','LEARNED']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }

})
module.exports = mongoose.model('Posts',Post,'Posts');