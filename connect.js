const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
async function connectToMongodb(url){
    return mongoose.connect(url);

}

module.exports = {
    connectToMongodb,
};