module.exports = function (request, response, db) {
    var user = request.query.user;
    db.collection('accounts').findOne({user: user}, (err, result) => {
        if (err) {
            response.send({error: err});
        } else {
            var file_path = result.avatar.split('/');
            console.log(file_path[file_path.length-1]);
            var options = {
                root: 'uploads/avatars',
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true
                }
            };
            var FileName = file_path[file_path.length-1];
            response.sendFile(FileName, options, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('File sent');
                }
            });
        }
    });
};