let express = require('express');

let app = express();

app.use("/", function(req,res,next){
    console.log("This is my secong funcition");
    next();
});

app.get("/", function(req,rep){
    console.log("This is my first funct");
});

app.listen(3000, function(){
    console.log("listening at posrt 3000!");
})