var mongoose=require('mongoose');
var app=require('./app');
var port = 3000;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/Portafolio').then(()=>{
    console.log('Database Connected!');
    app.listen(port,()=>{
        console.log('Server running on port '+port);
    })
    
}).catch(err=>{
    console.log(err);
})