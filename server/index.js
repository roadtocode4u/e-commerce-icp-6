import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import md5 from "js-md5";

import User from  "./model/User.js";

const app = express();
app.use(express.json());

async function connectDB(){
  const conn = await mongoose.connect(process.env.MONGO_URI)
  if(conn){
    console.log('DB connected');
  }
}
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/health', async(req, res)=>{
  res.send('Server is running');
})

app.post('/signup', async(req, res)=>{
  const {
    name,
    email,
    mobile,
    password,
    city,
    address
  } = req.body;

  const user = new User({
    name: name,
    email: email,
    mobile: mobile,
    password: md5(password),
    city: city,
    address: address
  })

  try
  {
    const savedUser = await user.save();

    res.json({
      success: true,
      data: savedUser,
      message: 'Signup successful'
    })
  }
  catch(e)
  {
    res.json({
      success: false,
      data: null,
      message: e.message
    })
  }
})

app.post('/login', async(req, res)=>{

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
