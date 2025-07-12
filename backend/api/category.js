module.exports = app =>{
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation;

    const save = (req, res) =>{
        const category = { ...req.body}
        if(req.params.id) category.id = req.params.id;

        try{
            existsOrError(category.name, 'Name required');
        }
        catch(msg){
            return res.status(400).send(msg);
        }

        if(category.id){
            app.db('categories')
                .update(category)
                .where({id: category.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
        else{
            app.db('categories')
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    const remove = async(req, res) => {
        try{
            existsOrError(req.params.id, 'Cateogry Code is required');

            //check if this category is parent of other category
            const subcategory = await app.db('categories')
                .where({parentId: req.params.id})
            notExistsOrError(subcategory, 'Category has sub-categories');

            //check if thehre is article with this category
            const articles = await app.db('articles')
                .where({categoryId: req.params.id})
            notExistsOrError(articles, 'Category has articles');

            const rowsDeleted = await app.db('categories')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Category not found');

            res.status(204).send()
        }
        catch(msg){
            res.status(500).send(msg);
        }
    }

    const withPath = categories =>{
        const getParent = (categories, parentId) =>{
            let parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null;
        }

        const categoriesWithPath = categories.map(category =>{
            let path = category.name; //starts with the latest child (Linux): => React > Installation > Linux
            let parent = getParent(categories, category.parentId)

            // React > Installation > Linux until React that return null (getParent)
            while(parent){
                path = `${parent.name} > ${path}`;
                parent = getParent(categories, parent.parentId)
            }
            return {...category, path}
        });

        // Sort categories Path alphabetically by name
        categoriesWithPath.sort((a, b) => {
            if(a.path < b.path) return -1;
            if(a.path > b.path) return 1;
            return 0;
        });

        return categoriesWithPath;
    }

    const get = (req, res) => {
        app.db('categories')
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err));
    }

    const getByID = (req, res) => {
        app.db('categories')
            .where({id: req.params.id})
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err));
    }
    
    return {save, get, remove, getByID};
}