const admin = require('./admin')

module.exports = app =>{
    //public urls
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)


    //when some request from url /users, post is used
    app.route('/users')
        .all(app.config.passport.authenticate()) //every methods (post, get, ...) will pass through this function
        .post(admin(app.api.user.save)) //it is possible, because of consign. api is the folder
        .get(admin(app.api.user.get))

    app.route('/users/:id')    //two different urls calls tha same function (save)
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getByID))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

// Route order matters:
// Routes are matched top-down, so the first match is used.
// Make sure to define more specific routes before general ones.

    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getByID)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stats.get)
}