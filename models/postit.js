const mongoose = require('mongoose');
const path = require('path'); 

const {Schema} = mongoose;


const postItSchema = new Schema({
    folder_name : {type: String, ref:'Folder', required:true},
    postIt_name : {type: String, required:true, unique: true },
    postIt_type : {type: String, required:true},
    postIt_star : {type: Boolean, required:true},
    postIt_color: {type:String, required: true}
});

module.exports=mongoose.model('PostIt',postItSchema);

