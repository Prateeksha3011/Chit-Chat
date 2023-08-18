const { default: mongoose } = require("mongoose")

const connectDB = async ()=>{
    try {
        const url = process.env.MONGO_URL;
        const conn = mongoose.connect(url, {
            useNewUrlParser: true,
          })
        console.log("Db Connected");
    } catch (error) {
        console.log("DB Error:- ",error)
    }
}

module.exports = connectDB;