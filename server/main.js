const express = require('express')
const app = express()
const port = 3000
const connectDB = require('./data/dbConnect')

const dotenv = require('dotenv')
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.get('/testing', (req, res) => {
    res.send('Hello World!')
})
app.use("/auth", require("./router/authrouter"));


app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`)
})