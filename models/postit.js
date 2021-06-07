const mongoose = require('mongoose');
const path = require('path'); 

const {Schema} = mongoose;


const postItSchema = new Schema({
    folder_name : {type: String, ref:'Folder'},
    postIt_name : {type: String, required:true, unique: true },
    postIt_type : {type: String, required:true, unique: true},
    postIt_start : {type: Boolean, required:true},
    postIt_color: {type:String, required: true}
});

module.exports=mongoose.model('Postit',postItSchema);

