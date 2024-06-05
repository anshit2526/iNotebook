const mongoose = require("mongoose");


const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&directConnection=true&tls=false"


// Following function connects us with mongodb database.
const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully.");
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectToMongo;