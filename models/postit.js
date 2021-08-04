const mongoose = require('mongoose');
const path = require('path'); 

const {Schema} = mongoose;
const { Types: {ObjectId}} = Schema;



const postItSchema = new Schema({
    postIt_name : {type: String, required:true},
    postIt_content: {type: String, required:true},
    postIt_type : {type: String, required:true},
    postIt_star : {type: Boolean, required:true},
    postIt_color: {type:String, required: true},
    folder_id: {type:ObjectId, ref:'Folder'}
});

module.exports=mongoose.model('PostIt',postItSchema);

