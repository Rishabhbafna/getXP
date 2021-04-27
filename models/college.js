const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ]
},
{
    timestamps: true
})

const College = mongoose.model('College', collegeSchema);
module.exports = College;