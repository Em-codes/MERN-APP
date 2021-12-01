const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Emmanuel:todo12345@mernapp.2kina.mongodb.net/todoapp?retryWrites=true&w=majority')

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        err ? res.json(err) : res.json(result)
    })
})

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user)
})

app.post("/:id", async (req, res) => {
    const del_User = await UserModel.findByIdAndDelete(req.params.id);
    res.send(del_User)
})

app.listen(3001, () => {
    console.log("SERVER RUNS")
})