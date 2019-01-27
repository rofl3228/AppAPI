//incert here your Mongo cfg
const multer = require('multer');

module.exports.db = {
    url : 'mongodb://deteck:walden1998@ds163164.mlab.com:63164/appdb'
};

//Write port to server app
module.exports.port = 8000;

//To store directory for avatars
module.exports.AvatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, 'ava-'+req.body.user+'-'+file.originalname);
    }
});

//To store some images
module.exports.ImagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/img');
    },
    filename: function (req, file, cb) {
        cb(null, 'img-'+req.body.user+'-'+file.originalname);
    }
});
