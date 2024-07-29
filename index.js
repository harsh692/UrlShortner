const express = require("express");
const path = require("path");
const app = express();
const PORT = 8001;
const URL = require("./models/url")
const {connectToMongodb} = require("./connect")
connectToMongodb('mongodb://localhost:27017/short-url')
.then(() => console.log("mongodb connected"))
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUsersOnly,checkAuth} = require("./middleware/user");

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

// Routes
const router = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");

// Middlewares
app.use(express.json()); //supports json data
app.use(express.urlencoded({extended:false})); //supports form data
app.use(cookieParser());
app.use("/url",restrictToLoggedInUsersOnly, router);
app.use('/user',userRouter);
app.use('/',checkAuth,staticRouter);


// Extra routes
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  });

app.listen(PORT,()=> console.log(`server started at PORT 8001`));
