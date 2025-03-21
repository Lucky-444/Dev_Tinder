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