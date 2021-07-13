const mongoose = require('mongoose');
const path = require('path'); 

const {Schema} = mongoose;


const postItSchema = new Schema({
    postIt_name : {type: String, required:true},
    postIt_content: {type: String, required:true, unique:true},
    postIt_type : {type: String, required:true, unique:false},
    postIt_star : {type: Boolean, required:true},
    postIt_color: {type:String, required: true}
});

module.exports=mongoose.model('PostIt',postItSchema);

