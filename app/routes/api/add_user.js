module.exports = function (request, response, db) {
    const account = { user : request.body.user, password : request.body.password, name : request.body.name };
    if ( request.body.user != '' && request.body.password != '' && request.body.name != '') {
        db.collection('accounts').findOne({ 'user' : request.body.user}, (err, result) => {
            if (err) {
                response.send({ 'error': 'Request problems'});
            } else {

                if (result == null) {
                    db.collection('accounts').insertOne(account, (err, result) => {
                        if (err) {
                            response.send({ 'error' : 'Error '+err});
                        } else {
                            response.send(result.ops[0]);
                        }
                    });
                } else {
                    response.send({ 'error': 'User already exist'});
                }
            }
        })
    } else {
        response.send({ 'error' : 'Bad registry data'});
    }
};