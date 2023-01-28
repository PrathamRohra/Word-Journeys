const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const secret = 'jjdhjh';

const app = express();
/*MIDDLEWARE AND STUFF: */
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
const upload = multer({dest: 'uploads/'})
app.use('/uploads',express.static(__dirname+'/uploads'));

/*MONGOOSE CONNECTION*/
mongoose.connect('YOUR MONGO URI HERE:')


//Registration
app.post('/register', async (req, res)=>{
    const { userName, password } = req.body;
    try{
        const user = await User.create({
            userName,
            password, 
         });
         user.save();
         return res.json({data: user});
    }
    catch(err){
        console.log("Error is: "+err);
        return res.json({msg: err.message});
    }
})


/*LOGIN*/
app.post('/login', async (req,res) => {
    const {userName,password} = req.body;
    const userDoc = await User.findOne({userName});
    // console.log(userDoc);
    const passOk = password === userDoc.password;
    // console.log(passOk);
    if (passOk) {
      // logged in
      jwt.sign({userName,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          userName,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });


/*USER_PROFILE: userName*/
app.get('/profile', (req, res)=>{
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, data)=>{
    if(err) throw err;
    res.json(data);
  })
});

/*LOGOUT*/
app.post('/logout', (req, res)=>{
  res.cookie('token', '').json('ok');
});

/*CREATE POST*/
app.post('/post', upload.single('file'), async (req,res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  if(token){
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {title,summary,content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
        author:info.id,
      });
      res.json(postDoc);
    });
  } else{
    res.json({msg: "token is missing"});
  }
});
/**UPDATE POST */
app.put('/post',upload.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});

//GET POSTS on Home
app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['userName'])
      .sort({createdAt: -1})
      .limit(20)
  );
});
//Get individual post
app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['userName']);
  res.json(postDoc);
})

//Delete the post
app.delete('/post/:id', async(req, res)=>{
  const {id} = req.params;
  console.log(id);
  await Post.findByIdAndDelete(id);
  res.json({message: "Blog succesfully deleted!"});
})

/* SERVER PORT */
app.listen(5000, ()=>{
    console.log(`Backend is running on: ${5000}`)
})