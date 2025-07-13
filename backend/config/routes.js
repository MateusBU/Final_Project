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

// Route order matters:
// Routes are matched top-down, so the first match is used.
// Make sure to define more specific routes before general ones.

    app.route('/categories/tree')
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .get(app.api.category.getByID)
        .put(app.api.category.save)
        .delete(app.api.category.remove)

    app.route('/articles')
        .get(app.api.article.get)
        .post(app.api.article.save)

    app.route('/articles/:id')
        .get(app.api.article.getById)
        .put(app.api.article.save)
        .delete(app.api.article.remove)

    app.route('/categories/:id/articles')
        .get(app.api.article.getCategory)
}