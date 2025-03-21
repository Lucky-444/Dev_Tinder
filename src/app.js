const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies


app.use(express.json());

app.get("/user", (req, res) => {
    res.send({firstName: "John", lastName: "carry"});
});





app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
