//server.js
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const multer = require('multer');
const port = process.env.PORT || 8080;
const app = express();
const cssFilter = require('./cssFilter');
const evilFolder = 'public/evil_lfi_folder/';


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, evilFolder);
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.originalname );
    }
});

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.post('/development', (req, res) => {
    let upload = multer({ storage: storage, fileFilter: cssFilter.cssFilter  }).single('css');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please upload an css file');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        res.sendFile(path.join(__dirname, req.file.path));
    });
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Server is running at ${port}`));