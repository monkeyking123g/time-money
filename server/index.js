
const express = require('express');
const db = require('./config/db')
const cors = require('cors')
const path = require("path");
const multer = require("multer");


const app = express();
const  PORT = 3002;


app.use(cors());
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));



// multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      console.log(file)
      cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });
app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
  res.render("upload")
})

app.post("/upload", upload.single('image'),(req, res) =>{
  //console.log(req.file)
    let image_url = req.file.path.replace("\\", "/");
    // console.log(req)

    const email = req.body.email;
    const password = req.body.password;
    const earning_hour = req.body.earning_hour; 
    db.query("INSERT INTO user (email, password, image_url, earning_hour) VALUES (?,?,?,?)",[email,password,image_url,earning_hour], (err,result)=>{
       if(err) {
       console.log(err)
       } 
       console.log(result)
     });
    res.send(`User created [OK]$`)
})

 app.get("/api/get/user", (req,res)=>{
 db.query('SELECT * FROM user;', (err,result)=>{
     if(err) {
     console.log(err)
    } 
 res.send(result)
 });
});
app.post('/api/create/user', (req,res)=> {

     const email = req.body.email;
     const password = req.body.password;
     const imageUrl = req.body.imageUrl;
     const earning_hour = req.body.earning_hour;
    
      db.query("INSERT INTO user (email, password, image_url, earning_hour) VALUES (?,?,?,?)",[email,password,imageUrl,earning_hour], (err,result)=>{
         if(err) {
         console.log(err)
         } 
         console.log(result)
  });   })

// Route to get one post
// app.get("/api/getFromId/:id", (req,res)=>{

// const id = req.params.id;
//  db.query("SELECT * FROM posts WHERE id = ?", id, 
//  (err,result)=>{
//     if(err) {
//     console.log(err)
//     } 
//     res.send(result)
//     });   });

// // Route for creating the post
// app.post('/api/create', (req,res)=> {

// const username = req.body.userName;
// const title = req.body.title;
// const text = req.body.text;

// db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",[title,text,username], (err,result)=>{
//    if(err) {
//    console.log(err)
//    } 
//    console.log(result)
// });   })

// // Route to like a post
// app.post('/api/like/:id',(req,res)=>{

// const id = req.params.id;
// db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
//     if(err) {
//    console.log(err)   } 
//    console.log(result)
//     });    
// });

// // Route to delete a post

// app.delete('/api/delete/:id',(req,res)=>{
// const id = req.params.id;

// db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
// if(err) {
// console.log(err)
//         } }) })

 app.listen(PORT, ()=>{
     console.log(`Server is running on ${PORT}`)
})
// const express = require('express');
// const mysql = require('mysql');
// const { body, validationResult } = require('express-validator');
// const  PORT = 3002;
// const app = express();


// const database = mysql.createConnection({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// app.get('/init', (req, res) => {
//     const sqlQuery =  'CREATE TABLE IF NOT EXISTS emails(id int AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), PRIMARY KEY(id))';

//     database.query(sqlQuery, (err) => {
//         if (err) throw err;

//         res.send('Table created!')
//     });
// });
// app.post('/subscribe', 
//     body('email').isEmail().normalizeEmail(),
//     body('firstname').not().isEmpty().escape(),
//     body('lastname').not().isEmpty().escape(),
//     (req, res) => {
//         const errors = validationResult(req);

//         if (errors.array().length > 0) {
//             res.send(errors.array());
//         } else {
//             const subscriber = {
//                 firstname: req.body.firstname,
//                 lastname: req.body.lastname,
//                 email: req.body.email
//             };
    
//             const sqlQuery = 'INSERT INTO emails SET ?';
    
//             database.query(sqlQuery, subscriber, (err, row) => {
//                 if (err) throw err;
    
//                 res.send('Subscribed successfully!');
//             });
//         }
// });

// app.listen(PORT, ()=>{
//          console.log(`Server is running`)
//  })