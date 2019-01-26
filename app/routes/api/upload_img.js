const multer = require('multer');

module.exports = function (request, response, db) {
    if (request.file.mimetype.indexOf('image')+1){
        db.collection('accounts').updateOne({user: request.body.user}, {$push :{img : request.file.path }});
        response.send({'result': 'success'});
    } else {
        response.send({'error': 'File is not image'});
    }
};