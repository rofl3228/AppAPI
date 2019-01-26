module.exports = function (request, response, db) {
    db.collection('auth').findOne({token: request.body.token}, (err, res) => {
        if (err) {
            response.send({'error': 'bad request to db'})
        } else {
            if (res) {
                if (request.file.mimetype.indexOf('image')+1){
                    db.collection('accounts').updateOne({user: res.user}, {$push :{img : request.file.path }});
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
/*
module.exports = function (request, response, db) {
    db.collection('auth').findOne({token: request.query.token}, (err, res) => {
        if (err) {
            response.send({'error' : 'Bad request to check token'})
        } else {
            if (res) {
                //some code
            } else {
                response.send({'error': 'Bad token'})
            }
        }
    })
};
*/