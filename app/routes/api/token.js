const TokenGenerator = require('uuid-token-generator');

module.exports = function (request, response, db) {
    const user = request.query.user;
    const inPass = request.query.password;
    db.collection('accounts').findOne({ 'user': user.toString(), 'password': inPass.toString()}, (err, result) => {
        if (err) {
            response.send({'error': 'Bad request!!!'});
        } else {
            if (result) {
                console.log(result);
                const tokenGen = new TokenGenerator();
                let token = tokenGen.generate();
                response.send({'token': token.toString(), 'name': result.name});
                db.collection('accounts').updateOne({'user' : user.toString()}, {$set: { 'token' : token}}, {upsert : false});
            } else {
                response.send({ 'error': 'Wrong account data'});
            }
        }
    })
}