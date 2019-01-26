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
                db.collection('auth').insertOne({'user' : user.toString(), 'token' : token}, (err, result) => {
                    if (err) {
                        response.send({'err' : 'Token add error'});
                    } else {
                        response.send({'token': token.toString(), 'name': result.name});
                    }
                });
            } else {
                response.send({ 'error': 'Wrong account data'});
            }
        }
    })
};