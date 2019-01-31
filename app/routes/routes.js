const API = require('./api/api');
const config = require('../../config/config');

const multer = require('multer');


module.exports = function (app, db) {
    app.get('/check_user/:user', (request, response) => {
        API.CheckUser(request, response, db);
    });
    app.get('/token/', (request, response) => {
        API.Token(request, response, db);
    });
    app.get('/logout', (request, response) => {
        API.Logout(request, response, db);
    });

    app.get('/get_avatar/',(request, response) => {
        API.GetAvatar(request, response, db);
    });

    app.post('/add_user', (request, response) => {
        API.AddUser(request, response, db);
    });

    app.post('/upload_avatar', multer({ storage: config.AvatarStorage}).single('avatar'), (request, response) => {
        API.UploadAvatar(request, response, db);
    });

    app.post('/upload_img', multer({ storage: config.ImagesStorage}).single('img'), (request, response) => {
        API.UploadImage(request, response, db);
    });

    app.post('/add_note', (request, response) => {
        API.AddNote(request, response, db);
    });

    app.delete('/delete_user', (request, response) => {
        API.DeleteUser(request, response, db);
    });
};