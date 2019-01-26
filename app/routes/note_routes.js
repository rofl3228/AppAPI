var ObjectID = require('mongodb').ObjectID;

//API functions including
const UserCheck = require('./api/check_user');
const Token = require('./api/token');
const UploadAvatar = require('./api/upload_avatar');
const GetAvatar = require('./api/get_avatar');
const AddUser = require('./api/add_user');
const UploadImg = require('./api/upload_img');
//end

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
//const upload = multer({ storage: storage});

module.exports = function (app, db) {
    app.get('/notes/:id', (request, response) => {
        console.log(request.body);
        const id = request.params.id;
        console.log(new ObjectID(id));
        const toFind = { '_id': new ObjectID(id)};
        db.collection('notes').findOne(toFind, (err, result) => {
            if (err) {
                response.send({ 'error' : 'Error '+err});
            } else {
                response.send(result);
            }
        });
    });
    app.get('/check_user/:user', (request, response) => {
        console.log(request.url);
        UserCheck(request, response, db);
    });
    app.get('/token/', (request, response) => {
        console.log(request.url);
        Token(request, response, db);
    });
    app.get('/logout', (request, response) => {
        const token = request.query.token;
        if (token) {
            db.collection('accounts').update({'token' : token}, {$unset:{token:1}});
            response.send({'logout':'OK'});
        } else {
            response.send({'error' : 'Wrong token'});
        }
    });

    app.get('/get_avatar/',(request, response) => {
        GetAvatar(request, response, db);
    });

    app.post('/add_user', (request, response) => {
        console.log(request.body);
        AddUser(request, response, db);
    });

    app.post('/upload_avatar', multer({ storage: avatar_storage}).single('avatar'), (request, response) => {
        console.log(request.file);
        UploadAvatar(request, response, db);
    });

    app.post('/upload_img', multer({ storage: img_storage}).single('img'), (request, response) => {
        console.log(request.file);
        UploadImg(request, response, db);
    });
};