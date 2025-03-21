order of routes are important
play with 
app.use("/",(req, res) =>{
    res.send("hello") ;
})

app.use("/hello",(req, res) =>{
    res.send("lucky") ;
})

app.use("/hello",(req, res) =>{
    res.send("lucky ---lucky") ;
})

next();
app.use("/route" ,rh ,[rh1,rh2,rh3,rh4,rh5,rh6,rh7]);

what is middleware
How express Js basically handlers requests behind the scenes

write a middleware auth for getalldata
write a middleware auth for deletealldata


