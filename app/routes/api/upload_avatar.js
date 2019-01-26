const multer = require('multer');

module.exports = function (request, response, db) {
    db.collection('auth').findOne({token: request.body.token}, (err, res) => {
        if (err) {
            response.send({'error': 'bad request to db'})
        } else {
            if (res) {
                if (request.file.mimetype.indexOf('image')+1){
                    let path = '/uploads/avatars/ava-'+request.body.user+'-'+request.file.originalname;
                    db.collection('accounts').updateOne({user: request.body.user}, {$set :{'avatar' : path}});
                    response.send({'result': 'success'});
                } else {
                    response.send({'error': 'File is not image'});
                }
            } else {
                response.send({'error': 'Bad token'});
            }
        }
    });

};