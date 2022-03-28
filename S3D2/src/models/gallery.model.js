const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    user_pictures: [{type: String, ref: 'user', required: true}],
},
{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('gallery', gallerySchema);