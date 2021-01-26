const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}
);

module.exports = mongoose.model('Article', articleSchema);