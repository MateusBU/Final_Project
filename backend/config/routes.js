module.exports = app =>{
    //when some request from url /users, post is used
    app.route('/users')
        .post(app.api.user.save) //it is possible, because of consign. api is the folder
        .get(app.api.user.get)

    app.route('/users/:id')    //two different urls calls tha same function (save)
        .put(app.api.user.save)
        .get(app.api.user.getByID)

    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save)

    app.route('/categories/:id')
        .get(app.api.category.getByID)
        .put(app.api.category.save)
        .delete(app.api.category.remove)
}