const schedule = require('node-schedule')

// Exporting a function that receives the app object
module.exports = app => {
    // Schedule a job to run every minute
    schedule.scheduleJob('* /1 * * * *', async function () {
        // Get total number of users
        const usersCount = await app.db('users').count('id').first()
        // Get total number of categories
        const categoriesCount = await app.db('categories').count('id').first()
        // Get total number of articles
        const articlesCount = await app.db('articles').count('id').first()

        // Get the Stat model from the app's API
        const { Stat } = app.api.stats

        // Get the most recent stats record
        const lastStat = await Stat.findOne({}, {}, {
            sort: { 'createdAt': -1 }
        })

        // Create a new stat record with current counts
        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        // Check if any count has changed compared to the last stat
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        // If there are any changes, save the new stat record
        if (changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log('[Stats] Stats updated!'))
        }
    })
}
