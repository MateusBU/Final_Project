module.exports = app =>{
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation;
    
    const save = (req, res) =>{
        const article = {...req.body}
        if(req.params.id) article.id = req.params.id;

        try{
            existsOrError(article.name, 'Name is required');
            existsOrError(article.description, 'Description is required');
            existsOrError(article.categoryId, 'Category is required');
            existsOrError(article.userId, 'Writer is required');
            existsOrError(article.content, 'Content is required');
        }
        catch(msg){
            res.status(400).send(msg);
        }


        if(article.id){
            app.db('articles')
                .update(article)
                .where({id: article.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
        else{
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    const remove = async(req, res) =>{
        try{
            const rowsDeleted = await app.db('articles')
                .where({id: req.params.id}).del()
            
            try{
                existsOrError(rowsDeleted, 'Article not found')
            }
            catch(msg){
                res.status(400).send(msg);
                return;
            }
            res.status(204).send()
        }
        catch(msg){
            res.status(500).send(msg);
        }
    }

    const limit = 10 //pagination
    const get = async (req, res) =>{
        const page = req.query.page || 1;

        const result = await app.db('articles').count('id').first() //quantity of articles to know how many pages
        const count = parseInt(result.count);

        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset((page * limit) - limit)
            // Instead of the frontend requesting article, count, and limit separately,
            // it's done all at once in a single request.
            .then(articles => res.json({data: articles, count, limit})) 
            .catch(err => res.status(500).send(err));
    }

    const getById = (req, res) =>{
        app.db('articles')
            .where({id: req.params.id})
            .first()
            .then(article =>{
                article.content = article.content.toString()
                return res.json(article)
            })
            .catch(err => res.status(500).send(err));
    }

    return {save, remove, get, getById};
}