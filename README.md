# Final_Project

## 📚 Table of Contents

- [Backend Project Setup and Commands](#-backend-project-setup-and-commands)
  - [Technologies Overview](#️-technologies-overview)
    - [Vue.js](#vuejs)
    - [Knex.js](#knexjs)
    - [PostgreSQL](#postgresql)
  - [Backend Commands](#-backend-commands)
    - [Backend Commands Project](#backend-commands-project)
    - [Backend Commands KNEX](#backend-commands-knex)
    - [Backend Commands PostgreSQL](#nackend-commands-postgresql)
- [Authentication with JWT and Passport.js](#-authentication-with-jwt-and-passportjs)
  - [What is JWT?](#-what-is-jwt)
  - [How Passport.js is Used](#️-how-passportjs-is-used)


# Backend Project Setup and Commands

This project is a study platform using **Vue**, **Knex**, and **PostgreSQL**. Below is a brief explanation of the technologies and backend commands used to configure and manage the application.

---

## Technologies Overview

### Vue.js
Vue.js is a progressive JavaScript framework used for building interactive user interfaces and single-page applications (SPAs).

### Knex.js
Knex is a SQL query builder for Node.js. It supports migrations, seeding, and flexible database interactions.

### PostgreSQL
PostgreSQL is a powerful, open-source object-relational database system known for reliability and feature robustness.

---

## Backend Commands

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

## Authentication with JWT and Passport.js

This API uses **JWT (JSON Web Tokens)** for authentication, implemented via **passport.js**, a flexible and modular authentication middleware for Node.js.

---

### What is JWT?

**JWT (JSON Web Token)** is a compact and secure way to transmit information between parties as a JSON object. It's commonly used for authentication.

- When a user logs in, the server generates a token that includes user data (usually the ID and some metadata).
- This token is **signed** with a secret key and returned to the client.
- For future requests, the client sends this token in the `Authorization` header using the **Bearer scheme**.


The server verifies the token and grants access if it's valid.

---

### How Passport.js is Used

We use **Passport.js** with the **JWT strategy** to protect our routes:

1. **Token Extraction**  
   Passport is configured to extract the JWT from the `Authorization` header.

2. **Token Verification**  
   The token is verified using a secret key. If valid, Passport decodes the payload.

3. **User Validation**  
   The strategy checks if the user from the token exists in the database. If so, the request proceeds.

4. **Route Protection**  
   Protected routes use a middleware like this:
   ```js
   app.route('/example')
     .all(passport.authenticate('jwt', { session: false }))
     .get(controller.getData)


# Frontend Project Setup and Commands

## Vuex Store Configuration

Vuex helps you centralize and organize your app’s shared state, making it easier to manage and debug as your app grows.

## Breakdown

### Import Vuex

```js
import { createStore } from 'vuex'
```

### Registering the Store in Your Vue App
```js
import store from './config/store'
app.use(store)   // register Vuex store
```
### Read State

```js
console.log(this.$store.state.isMenuVisible)
```

### Commit mutations
```js
this.$store.commit('toggleMenu')          // toggles visibility
this.$store.commit('toggleMenu', true)    // explicitly show menu
this.$store.commit('toggleMenu', false)   // explicitly hide menu
```

## `<router-view>`

The `<router-view>` tag is a built-in component provided by Vue Router. It serves as a placeholder that Vue Router uses to display the component corresponding to the current route.

For example, if the route is `/admin`, and the route config points to an `AdminPages.vue` component, then `<router-view>` will render that component dynamically.

## Toast Notifications

This project uses [Vue Toastification](https://github.com/Maronato/vue-toastification) to display toast messages for user feedback.

### Installation

```bash
npm install vue-toastification
```

### Setup

In your main entry file (e.g., `main.js` or `main.ts`):

```js
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

app.use(Toast, {
  timeout: 3000,     // Toasts disappear after 3 seconds
  icon: true         // Enables icons (like ✅ or ❌)
})
```
### 💡 Why Use Toasts?

Toast notifications are lightweight, non-blocking UI elements used to provide:

- ✅ **Success feedback** (e.g., user created)
- ❌ **Error alerts** (e.g., failed request)
- ℹ️ **General messages** without disrupting the user flow
