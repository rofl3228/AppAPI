module.exports = function (request, response, db) {
    db.collection('auth').findOne({token: request.body.token}, (err, res) => {
        if (err) {
            response.send({'error' : 'Bad request to check token'})
        } else {
            if (res) {
                db.collection('notes').insertOne({'owner': res.user, 'header': request.body.header, 'text': request.body.text}, (err, result) => {
                   if (err) {
                       response.send(err);
                   } else {
                       response.send({'result' : result.ops[0]._id});
                   }
                });
            } else {
                response.send({'error': 'Bad token'})
            }
        }
    })
};