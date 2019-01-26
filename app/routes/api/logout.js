module.exports = function (request, response, db) {
    const token = request.query.token;
    if (token) {
        db.collection('accounts').update({'token' : token}, {$unset:{token:1}});
        response.send({'logout':'OK'});
    } else {
        response.send({'error' : 'Wrong token'});
    }
}