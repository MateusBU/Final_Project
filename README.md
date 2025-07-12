# Final_Project

# Backend Project Setup and Commands

This project is a study platform using **Vue**, **Knex**, and **PostgreSQL**. Below is a brief explanation of the technologies and backend commands used to configure and manage the application.

---

## 🛠️ Technologies Overview

### Vue.js
Vue.js is a progressive JavaScript framework used for building interactive user interfaces and single-page applications (SPAs).

### Knex.js
Knex is a SQL query builder for Node.js. It supports migrations, seeding, and flexible database interactions.

### PostgreSQL
PostgreSQL is a powerful, open-source object-relational database system known for reliability and feature robustness.

---

## 📦 Backend Commands

### Backend Commands Project
#### `npm start`

Runs the backend by executing `index.js` (or whatever entry point is defined in your `package.json` under the `scripts` section).  
Typically used to start an Express server or similar Node.js backend and make your API accessible (e.g., http://localhost:3000).

### Backend Commands KNEX

#### `knex init`
Initializes Knex in your project by creating a knexfile.js, where database configurations for different environments (development, production, etc.) are defined.

#### `knex migrate:make create_table_users`
Creates a new migration file named create_table_users in the migrations folder.
Inside this file, you define the structure of the users table (columns, types, constraints, etc.).


#### `knex migrate:make create_table_users`
Edit the generated file to define the schema for the users table.

#### `knex migrate:make create_table_categories`
Generates a new migration file named create_table_categories, which will define the categories table.


#### `knex migrate:make create_table_categories`
Use this to store article categories or topics in the database.

#### `knex migrate:make create_table_articles`
Creates a migration file for the articles table.

#### `knex migrate:latest`

#### `knex migrate:rollback`

### Nackend Commands postgreSQL

#### `\dt`

                             List
    Schema  |         Name         |  Type  |   Owner
    --------+----------------------+--------+----------
    public  | articles             | tabela | postgres
    public  | categories           | tabela | postgres
    public  | knex_migrations      | tabela | postgres
    public  | knex_migrations_lock | tabela | postgres
    public  | users                | tabela | postgres


#### `select * from knex_migrations;`

    id |                   name                    | batch |       migration_time
    ----+-------------------------------------------+-------+----------------------------
    1 | 20250711165758_create_table_users.js      |     1 | 2025-07-11 14:31:02.771-03
    2 | 20250711165845_create_table_categories.js |     1 | 2025-07-11 14:31:02.788-03
    3 | 20250711165901_create_table_articles.js   |     1 | 2025-07-11 14:31:02.799-03