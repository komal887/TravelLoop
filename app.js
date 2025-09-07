 if(process.env.NODE_ENV!="production")
{
  require("dotenv").config();
}

console.log(process.env.SECRET);

// Patch console.log globally to show file + line for every log
const origLog = console.log;
console.log = (...args) => {
  const stack = new Error().stack.split("\n")[2].trim();
  origLog(stack, ...args);
};

const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const app=express();
const port=4000;
const Travel=require("./models/looping.js");
const Review=require("./models/review.js");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const travel=require("./router/travel.js");
const user=require("./router/user.js");
const chatbotRoutes = require('./router/chatbot.js');
const session=require("express-session");
const MongoStore = require('connect-mongo');

const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const dbURL=process.env.ATLAS_DB;

const store=MongoStore.create({
  mongoUrl:dbURL,
  crypto: {
    secret:process.env.SECRET
  },
  touchAfter: 24 * 3600,

});

store.on("error",()=>{
  console.log("ERROR IN MONGO SESSION STORE",err);
})

const sessionOptions={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:7 *24 * 60 * 60 * 1000,
    httpOnly: true
  }
}



app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()) );
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("views","ejs");
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSON data from fetch
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejsMate);


main().then(()=>{
    console.log("mongoDb got connected");
}).catch(err => console.log(err));


async function main() {
   await mongoose.connect(dbURL);
 
  }


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})

app.get("/demouser", async (req,res)=>{
  let fakeuser=new User({
    email:"fake123@gmail.com",
    username:"Fakesking"
  });
  let registered=await User.register(fakeuser,"helloworld");
  res.send(registered);
})

app.use("/chatbot", chatbotRoutes);
app.use("/travel",travel);

app.get("/", (req, res) => {
  res.render("home"); 
});

// Add this before user routes
//app.get("/", (req, res) => {
  //res.redirect("/chatbot");
//});

app.use("/",user);

app.listen(port,()=>{
    console.log("Listening");
})


//reviews
app.post("/travel/:id/reviews", async (req, res) => {
 let travel= await Travel.findById(req.params.id);
 let newReview=new Review(req.body.review);
 travel.reviews.push(newReview);
 await newReview.save();
 await travel.save();

 console.log("new review saved");
 res.redirect(`/travel/${travel._id}`);
});