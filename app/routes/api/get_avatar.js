module.exports = function (request, response, db) {
    db.collection('auth').findOne({token : request.query.token}, (err, result) => {
       if (err) {
           response.send({'error': 'request to database failed'});
       } else {
           if (result) {
               db.collection('accounts').findOne({user: result.user}, (err, res) => {
                   if (err) {
                       response.send({error: err});
                   } else {
                       var file_path = res.avatar.split('/');
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
           } else {
               response.send({'error': 'Bad token'});
           }
       }
    });
};