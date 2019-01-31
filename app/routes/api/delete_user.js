module.exports = function (request, response, db) {
    db.collection('auth').findOne({token: request.query.token}, (err, res) => {
        if (err) {
            response.send({'error' : 'Bad request to check token'})
        } else {
            if (res) {
                let consist = true;
                db.collection('accounts').deleteOne({user : res.user}, (err) => {
                    if (err) {
                        response.send({'error' : 'Can not remove user'});
                    } else {
                        consist = false;
                    }
                });
                db.collection('auth').deleteOne({user : res.user}, (err) => {
                    if (err) {
                        response.send({ 'error' : 'Can not remove token'});
                    } else {
                        consist = false;
                    }
                });
                if (consist) {
                    response.send({'result': 'Removed'});
                }
            } else {
                response.send({'error': 'Bad token'})
            }
        }
    })
};