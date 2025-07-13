//Returns the set of categories consisting of the root category and all its descendants.

// 1 - Technology
//  ├─ 2 - Computers
//  │   └─ 4 - Laptops
//  └─ 3 - Phones
// And when you run this query with 1 (Technology), it returns the IDs [1, 2, 4, 3].

// - WITH RECURSIVE: defines a query that calls itself (recursively) until no new data is found.
// - subcategories (id): the name of a temporary table with a single column id.
// - First SELECT: selects the id of the initial category (the parameter).
// - UNION ALL: combines the results of the initial selection with the recursive selection.
// - Second SELECT: searches the categories table for categories c where "parentId" matches an id already listed in subcategories.
// This process repeats until there are no more child categories.

module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `
}