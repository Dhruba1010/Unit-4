const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {type:mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    rollId : {type: String, required: true},
    currentBatch: {type: mongoose.Schema.Types.ObjectId, ref: 'batch', required:true},
    evaluationId: {type:mongoose.Schema.Types.ObjectId, ref:'evaluation', required:false},
    submissionId : {type: mongoose.Schema.Types.ObjectId, ref: "submission", required: false},
},
{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model("student", studentSchema);