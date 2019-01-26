const API = require('./api/api');

const multer = require('multer');
var avatar_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, 'ava-'+req.body.user+'-'+file.originalname);
    }
});

var img_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/img');
    },
    filename: function (req, file, cb) {
        cb(null, 'img-'+req.body.user+'-'+file.originalname);
    }
});

module.exports = function (app, db) {
    app.get('/check_user/:user', (request, response) => {
        API.CheckUser(request, response, db);
    });
    app.get('/token/', (request, response) => {
        API.Token(request, response, db);
    });
    app.get('/logout', (request, response) => {
        API.Logout(request, response, db);
    });

    app.get('/get_avatar/',(request, response) => {
        API.GetAvatar(request, response, db);
    });

    app.post('/add_user', (request, response) => {
        API.AddUser(request, response, db);
    });

    app.post('/upload_avatar', multer({ storage: avatar_storage}).single('avatar'), (request, response) => {
        API.UploadAvatar(request, response, db);
    });

    app.post('/upload_img', multer({ storage: img_storage}).single('img'), (request, response) => {
        API.UploadImage(request, response, db);
    });
};