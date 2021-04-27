if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();

const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const User = require('./models/user')
const College = require('./models/college')
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// Database connections
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/getxp';


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("Database Connected");
}).catch(err=>{
    console.log('Connection failed.....')
});

// Assets
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');



app.get('/', (req, res)=>{
    res.render('home');
})


app.get('/register', (req, res)=>{
    res.render('register');
})

    
app.post('/register', async (req, res)=>{
    const {firstname, lastname, email, contact, collegeName, yearGrad, city } = req.body;

    //create a user
    const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        contact: contact,
        collegeName:collegeName.toUpperCase(),
        yearGrad: yearGrad,
        city:city
     })

    let college = await College.findOne({name: collegeName.toUpperCase()});
    if(college != null){
        college.users.push(user);
    } else{
        college = new College({
            name: collegeName.toUpperCase()
        })
        college.users.push(user);
    }
    
    await college.save();
    
    user.save().then(async()=>{
        //login
        const colleges = await College.find({}).populate('users');
        // console.log(colleges);
        return res.render('colleges', {colleges})
    }).catch(err=>{
        console.log(err)
        return res.redirect('/register')
    })
})


app.get('/colleges',async (req, res)=>{
    const colleges = await College.find({}).populate('users');
    res.render('colleges' , {colleges});
})

app.get('*', (req, res)=>{
    res.render('home');
})

app.listen(PORT, ()=>{
    console.log(`Listening at ${PORT}`);
});
