module.exports = app =>{
    //when some request from url /users, post is used
    app.route('/users')
        .post(app.api.user.save) //it is possible, because of consign. api is the folder
        .get(app.api.user.get)

    app.route('/users/:id')    //two different urls calls tha same function (save)
        .put(app.api.user.save)
}