const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/form');
const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String},
    image: { type: String}
});
const userModel = mongoose.model('user', userSchema)

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/read', async (req, res) => {
    const users = await userModel.find(); 
    res.render('read', { users })
});
app.get('/delete/:id', async (req, res) => {
 {
    const users = await userModel.findOneAndDelete({ _id: req.params.id });

       res.redirect('/read')
    }})

app.post('/create',async(req,res)=>{
    let { name ,email ,image } = req.body
    const apple = await userModel.create({
        name : name,
        email:email,
        image:image
    })
    console.log(apple)
  res.redirect('/read')
})

app.listen(8000)