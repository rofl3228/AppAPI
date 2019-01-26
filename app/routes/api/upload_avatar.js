const multer = require('multer');

module.exports = function (request, response, db) {
    if (request.file.mimetype.indexOf('image')+1){
        let path = '/uploads/avatars/ava-'+request.body.user+'-'+request.file.originalname;
        db.collection('accounts').updateOne({user: request.body.user}, {$set :{'avatar' : path}});
        response.send({'result': 'success'});
    } else {
        response.send({'error': 'File is not image'});
    }
}