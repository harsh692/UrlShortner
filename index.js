const express = require("express");
const path = require("path");
const app = express();
const PORT = 8001;
const URL = require("./models/url")
const {connectToMongodb} = require("./connect")
connectToMongodb('mongodb://localhost:27017/short-url')
.then(() => console.log("mongodb connected"))

const router = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



app.use(express.json()); //supports json data
app.use(express.urlencoded({extended:false})); //supports form data
app.use("/url", router);
app.use('/',staticRouter);

app.get("/test",async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render('index',{
        urls:allUrls,
    });
})

app.listen(PORT,()=> console.log(`server started at PORT 8001`));
