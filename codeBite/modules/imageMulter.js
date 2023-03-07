// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, './../public/uploads'), function () {
//       if (err) {
//         throw err;
//       }
//     });
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now(), () => {
//       if (err) {
//         throw err;
//       }
//     });
//   },
// });

// var upload = multer({ storage: storage });

// module.exports = upload;
