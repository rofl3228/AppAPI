module.exports = function (request, response, db) {
    const user = request.params.user;
    db.collection('accounts').findOne({'user' : user}, (err, result) => {
        if (err) {
            response.send({'error': 'Request failed'});
        } else {
            if (result == null) {
                response.send({'exist' : 'NO'});
            } else {
                response.send(({'exist' : 'YES'}));
            }
        }
    })
}