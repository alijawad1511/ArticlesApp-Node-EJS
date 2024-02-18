const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

module.exports = Article = mongoose.model('Article', articleSchema);