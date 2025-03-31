order of routes are important
play with 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Create a Vite + React application
Remove unecessary code and create a Hello World app
Install Tailwind CSS
Install Daisy UI
Add NavBar component to App.jsx
Create a NavBar.jsx separate Component file
Install react router dom
Create BrowserRouter > Routes > Route=/ Body > RouteChildren
Create an Outlet in your Body Component
Create a footer
Create a Login Page
Install axios
CORS - install cors in backend => add middleware to with configurations: orgin, credentials: true
Whenever you're making API call so pass axios => { withCredentials: true }
install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
configureStore => Provider => createSlice => add reducer to store
Add redux devtools in chrome
Login and see if your data is coming properly in the store
NavBar should update as soon as user logs in
Refactor our code to add constants file + create a components folder
You should not be access other routes without login
If token is not present, redirect user to login page
Logout Feature
Get the feed and add the feed in th store
build the user card on feed
Edit Profile Feature
Show Toast Message on save of profile
New Page - See all my connections
New Page - See all my Conenction REquests
Feature - Accept/Reject connection request
Send/Ignore the user card from the feed
Signup New User
E2E testing
Body NavBar Route=/ => Feed Route=/login => Login Route=/connetions => Connections Router=/profile => Profile

# Deployment

- Signup on AWS 
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
- Install Node version 16.17.0
- Git clone
- Frontend    
    - npm install  -> dependencies install
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - Copy code from dist(build files) to /var/www/html/
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 of your instance
- Backend
    - updated DB password
    - allowed ec2 instance public IP on mongodb server
    - npm intsall pm2 -g
    - pm2 start npm --name "devTinder-backend" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"
app.use("/",(req, res) =>{
    res.send("hello") ;
})

 - Create a repository
 - Initialize the repository
 - node_modules, package.json, package-lock.json
 - Install express 
 - Create a server
 - Listen to port 7777
 - Write request handlers for /test , /hello
 - Install nodemon and update scripts inside package.json
 - What are dependencies
 - What is the use of "-g" while npm install 
 - Difference between caret and tilde  ( ^ vs ~ )

 - initialize git
 - .gitignore
 - Create a remote repo on github
 - Push all code to remote origin
 - Play with routes and route extensions ex. /hello, / , hello/2, /xyz
 - Order of the routes matter a lot
 - Install Postman app and make a workspace/collectio > test API call
 - Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
 - Explore routing and use of ?, + , (), * in the routes
 - Use of regex in routes /a/ ,  /.*fly$/
 - Reading the query params in the routes
 - Reading the dynamic routes

 - Multiple Route Handlers - Play with the code
 - next()
 - next function and errors along with res.send()
 - app.use("/route", rH, [rH2, rH3], rH4, rh5);
 - What is a Middleware? Why do we need it?
 - How express JS basically handles requests behind the scenes
 - Difference app.use and app.all
 - Write a dummy auth middleware for admin
 - Write a dummy auth middleware for all user routes, except /user/login
 - Error Handling using app.use("/", (err, req, res, next) = {});

 - Create a free cluster on MongoDB official website (Mongo Atlas)
 - Install mongoose library
 - Connect your application to the Database "Connection-url"/devTinder
 - Call the connectDB function and connect to database before starting application on 7777
 - Create a userSchema & user Model
 - Create POST /sigup API to add data to database
 - Push some documents using API calls from postman
 - Error Handling using try , catch

 - JS object vs JSON (difference)
 - Add the express.json middleware to your app
 - Make your signup API dynamic to recive data from the end user
 - User.findOne with duplucate email ids, which object returned
 - API- Get user by email
 - API - Feed API - GET /feed - get all the users from the database
 - API - Get user by ID
 - Create a delete user API
 - Difference between PATCH and PUT
 - API - Update a user
 - Explore the Mongoose Documention for Model methods
 - What are options in a Model.findOneAndUpdate method, explore more about it
 - API - Update the user with email ID

 - Explore schematype options from the documention
 - add required, unique, lowercase, min, minLength, trim
 - Add default
 - Create a custom validate function for gender
 - Improve the DB schema - PUT all appropiate validations on each field in Schema
 - Add timestamps to the userSchema
 - Add API level validation on Patch request & Signup post api
 - DATA Sanitizing - Add API validation for each field
 - Install validator
 - Explore validator library funcation and Use vlidator funcs for password, email, photoURL
 - NEVER TRUST req.body

 - Validate data in Signup API
 - Install bcrypt package
 - Create PasswordHash using bcrypt.hash & save the user is excrupted password
 - Create login API
 - Compare passwords and throw errors if email or password is invalid

 - install cookie-parser
 - just send a dummy cookie to user
 - create GET /profile APi and check if you get the cookie back
 - install jsonwebtoken 
 - IN login API, after email and password validation, create e JWT token and send it to user in cookies
 - read the cookies inside your profile API and find the logged in user
 - userAuth Middleware
 - Add the userAuth middle ware in profile API and a new sendConnectionRequest API
 - Set the expiry of JWT token and cookies to 7 days
 - Create userSchema method to getJWT() 
 - Create UserSchema method to comparepassword(passwordInputByUser)

 - Explore tinder APIs
 - Create a list all API you can think of in Dev Tinder
 - Group multiple routes under repective routers
 - Read documentation for express.Router
 - Create routes folder for managing auth,profile, request routers
 - create authRouter, profileRouter, requestRouter
 - Import these routers in app.js
 - Create POST /logout API
 - Create PATCH /profile/edit
 - Create PATCH /profile/password API => forgot password API
 - Make you validate all data in every POST, PATCH apis

 - Create Connnection Request Schema
 - Send Connection Request API
 - Proper validation of Data
 - Think about ALL corner cases
 - $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
 - schema.pre("save") function
 - Read more about indexes in MongoDB
 - Why do we need index in DB?
 - What is the advantages and disadvantage of creating?
 - Read this arcticle about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
 - ALWAYS THINK ABOUT CORNER CASES 


 - Write code with proper validations for POST /request/review/:status/:requestId
 - Thought process - POST vs GET 
 - Read about ref and populate https://mongoosejs.com/docs/populate.html
 - Create GET /user/requests/received with all the checks
 - Create GET GET /user/connections

 - Logic for GET /feed API
 - Explore the $nin , $and, $ne and other query operatorators
 - Pagination



NOTES: 

 /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

 /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

 /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

 /feed?page=4&limit=10 => 21-30 => .skip(20) & .limit(10)

skip = (page-1)*limit;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 








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
////////////////////////////////////////////////////////////////

//get the single user by find email
app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    // if (user.length === 0) {
    //   res.status(404).send("user not found");
    //   return;
    // } else {
    //   console.log("User Data:", req.body);
    //   res.send(user);
    // }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//get all users
app.get("/feed", async (req, res) => {
  // TODO: Implement logic to fetch all users
  try {
    const users = await User.find({});
    console.log(req.body);
    res.send(users);
  } catch (error) {
    console.error("Feed Error:", error);
    res.status(500).send({ error: error.message || "Error fetching users" });
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send("users deleted successfully");
    console.log(req.body);
  } catch (err) {
    console.log("somethig went wrong");
    res.status(500).send({ error: error.message || "Error deleting user" });
  }
});

//update data of  a user

app.patch("/update/:userID", async (req, res) => {
  const userId = req.params?.userID;
  const updatedData = req.body;

  try {
    // Check if user exists
    const ALLOWED_UPADATES = ["photoUrl", "about", "gender", "age", "skills"];
    //api level  checking
    const isValidUpdate = Object.keys(updatedData).every((key) =>
      ALLOWED_UPADATES.includes(key)
    );

    if (!isValidUpdate) {
      res.status(400).send({
        error:
          "Invalid update. Only allowed updates are photoUrl, about, gender, age, skills",
      });
      return; // return to avoid further processing
    }

    if (updatedData.skills.length > 10) {
      throw new Error("skills can not be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, updatedData, {
      new: true,
    });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send(user);
    console.log(req.body);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).send({ error: error.message || "Error updating user" });
  }
});

//update by email id
app.put("/updated", async (req, res) => {
  const email = req.body.email;
  const updatedData = req.body;
  try {
    const user = await User.findOneAndUpdate({ email: email }, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send(user);
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
    console.log("something is worng");
    res.status(500).send({ error: error.message || "Error updating user" });
  }
});


