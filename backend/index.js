const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const userRoutes = require('./routes/user-routes')
const eventRoutes = require('./routes/event-routes')
const session = require("express-session")
const passport = require('passport')
const path = require("path")
const requireLogin = require('./middleware/requireLogin')
var timeout = require('connect-timeout');
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};
const app = express();
const PORT = process.env.PORT;

const isloggedin = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.use(allowCrossDomain);
app.use(express.json());
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
// logging in user for 5 days
app.use(
  session({
    secret: "fdfd",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 5, sameSite: "lax" },
    rolling: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(timeout('5s'));


require("./auth");

app.get("/auth", (req, res) => {
  res.send("<a href='/auth/google'>Auth </a>");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "http://localhost:3000/",
  }),
  (req, res) => {
    try{
    console.log("callback ", req.user);
    res.send(req.user);}
    catch(error)
    {
      res.send("Error!");
    }
  }
);
//connect to mongodb.

mongoose.connect(
  "mongodb+srv://Shivangis:KingSide@cluster0.y1ibt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,

    useCreateIndex: true
  }).
  then(  () => { console.log("Connected!") },
  err => { console.log("Error!"+err.message) }
);

const connection = mongoose.connection;

connection.once("open", function () {
  try
  {console.log("MongoDB database connection established successfully");}
  catch(err){
    res.send("Error!");
  }
});

//  home route
app.get("/", (req, res) => {
  // res.send(req.user)

  res.send("<h1>welcome to camp yellow backend server</h1>");
});
app.get("/loggedin", (req, res) => {
  res.send(req.user);
  // res.send('<h1>welcome to camp yellow backend server</h1>')
});

// express routing
app.use('/user', userRoutes); 
app.use('/event', eventRoutes);


app.get('/auth/google/callback', 
  passport.authenticate('google', 
  {
    failureRedirect: '/login',
    successRedirect:"http://localhost:5000/protected"
  })
  
)

//*************************** */
// DON'T FORGET TO CHANGE REQUIRELOGIN TO ISLOGEDIN
//************************************* */

app.get("/protected", isloggedin, (req, res) => {
  res.send(req.user);
  console.log("test", req.user.loginuser);
});

app.listen(PORT, () => {
  console.log(`app now listening for requests on port ${PORT}`);
});