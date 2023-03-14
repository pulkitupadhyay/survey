// import { ObjectId } from 'bson';
var express = require('express');
var router = express.Router();
var multer = require('multer');
const app = require('./../app');
const register = require('../modules/registerScheema');
const jwt = require('jsonwebtoken');
const isLoggedIn = require('./../modules/isloggedIn');
const product = require('./../modules/product');
const path = require('path');
const mongoose = require('mongoose');
// const { ObjectId } = require('mongodb');
const ObjectId = require('mongodb');
// const __dirname = path.resolve();
router.use('./../public', express.static(path.join(__dirname, './../public')));

// const upload = require('./../modules/imageMulter');
/* GET home page. */
router.get('/', async function (req, res, next) {
  // getting all products in the category of carpets
  var carpets = await product.find({ catagory: 'carpets' });
  var bags = await product.find({ catagory: 'bags' });
  console.log(carpets);

  res.render('index', { carpets: carpets, bags: bags });
});

// this is to inform that changes has been done

router.get('/menu', function (req, res, next) {
  res.render('menu');
});

// this is the login route
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/register', (req, res, next) => {
  console.log(req.body);
  let userName = req.body.fullName;
  let useremail = req.body.Email;
  let userMobile = req.body.mobileNumber;
  let userPassword = req.body.password;

  const user = new register({
    Name: userName,
    number: userMobile,
    Email: useremail,
    Password: userPassword,
  });

  user.save().then((doc) => {
    console.log(doc);

    const token = jwt.sign(
      { id: user.__id },
      'mynameispulkitupadhyayfromharda',
      {
        expiresIn: '10d',
      }
    );
    res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
    res.render('index');
  });
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './../public/upload'), function () {
      if (err) {
        throw err;
      }
    });
  },
  filename: (req, file, cb) => {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name, (error, sucess) => {
      if (error) {
        throw error;
      }
    });
  },
});

var upload = multer({ storage: storage });

router.post('/newProduct', upload.array('testimage'), (req, res, next) => {
  console.log(req.files);
  try {
    var arrimages = [];
    for (let i = 0; i < req.files.length; i++) {
      arrimages[i] = req.files[i].filename;
    }
  } catch (error) {
    console.log(error);
  }
  console.log(req.files);
  //  console.log(req.body);
  /* 
  let productTitle = req.body.title;
  let productDescription = req.body.description;
  let productPrice = req.body.price;
  let productCatagory = req.body.catagory;
 */
  const prod = new product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    catagory: req.body.catagory,
    image1: req.files[0].filename,
    image2: req.files[1].filename,
    image3: req.files[2].filename,
    image4: req.files[3].filename,
    // image: arrimages,
  });

  prod.save().then((doc) => {
    console.log(doc);
    console.log(prod);

    res.send('product saved in database');
    // res.render('index');
  });
});

router.post('/login', async (req, res, next) => {
  const { Email, password } = req.body;

  if (!Email || !password) {
    return next('please enter valid email or password sp fdf');
  }

  // cheaking if the email exist in database

  const User = await register.findOne({ Email });
  console.log(User.Password);
  //  const correct = await User.correctPassword(password,User.password )

  if (!User || !(await User.correctPassword(password, User.Password))) {
    return next('enter the correcr cridentals');
  }
  console.log(User);

  const token = await jwt.sign(
    { id: User.__id },
    'mynameispulkitupadhyayfromharda',
    {
      expiresIn: '10d',
    }
  );
  res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
  res.render('index');
});

router.post('/logout', (req, res, next) => {
  jwt.verify(
    req.cookies.Token,
    'mynameispulkitupadhyayfromharda',
    (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.clearCookie('Token');
        res.send('you are now logged out please login again');
      }
    }
  );

  // console.log(req.headers.cookie);
});

// router.get('/signUp', (req, res, next) => {
//   res.render('signUp');
// });
// router.get('/price/1', function (req, res, next) {
//   var id = req.params.id;
//   console.log(req.params);
//   res.render('price', { id });
// });

router.get(`/price/:id`, async (req, res, next) => {
  console.log(req.params.id);

  const nproduct = await product.findById(req.params.id);

  var displayItems = await product.find({ catagory: nproduct.catagory });
  console.log(nproduct);
  res.render('price2', { product: nproduct, displayItems: displayItems });
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/submit', function (req, res, next) {
  res.render('submit');
});
router.get('/addnewpro', function(req, res, next) {
  // res.render('addnewpro');
  jwt.verify(
    req.cookies.Token,
    'mynameispulkitupadhyayfromharda',
    (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.clearCookie('Token');
        res.send('you are now logged out please login again');
      }
    }
  );
});


module.exports = router;
