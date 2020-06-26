var mongoose=require('mongoose');
var schema=mongoose.Schema;

var projectSchema= schema({
    name: String,
    description: String,
    category:String,
    langs:String,
    year:Number,
    image:String
})

module.exports=mongoose.model('Project',projectSchema);