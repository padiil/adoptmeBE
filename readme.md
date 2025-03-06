# AdoptMe API

This AdoptMe API documentation is a comprehensive guide designed to bridge the gap between frontend and backend teams. With clear and structured documentation, team members can easily understand how to interact with the API and build exciting features for our pet adoption platform.

## Introduction

AdoptMe API is a backend service for a pet adoption platform. It provides endpoints for managing pets, users, and other related data. The API is built using Node.js, Express, and Prisma ORM, and it uses PostgreSQL as the database.

## Technologies Used

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Swagger for API documentation
- Vercel for deployment

## Project Structure

```
adoptmeBE/
├── .42c/
│   ├── conf.yaml
│   └── scan/
│       └── adoptme-api/
│           └── scanconf.json
├── docs/
│   └── openapi.yml
├── prisma/
│   ├── migrations/
│   │   ├── 20250206174613_/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   └── index.controllers.js
│   ├── middlewares/
│   │   ├── APIAuth.middleware.js
│   │   └── APIDocsAuth.middleware.js
│   └── routes/
│       └── index.routes.js
├── .env
├── .gitignore
├── app.js
├── package.json
└── vercel.json
```

## Endpoints

For more details, please see the API documentation at `docs/openapi.yml`

## Setup and Installation

Follow these steps to set up and run the project locally:

1.  Clone the repository:

    ```bash
    git clone https://github.com/padiil/adoptmeBE.git
    cd adoptmeBE
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Set up the environment variables:
    Create a `.env` file in the root directory and add the following variables:

    ```
    PORT=3000
    API_KEY=your_api_key
    APIDOCS_USERNAME=your_username
    APIDOCS_PASSWORD=your_password
    DATABASE_URL=your_database_url
    etc...
    ```

4.  Run the Prisma migrations to set up the database schema:

    ```bash
    npx prisma migrate dev
    ```

5.  Generate the Prisma client:
    ```bash
    npx prisma generate
    ```

## Running the Project

To run the project locally, use the following command:

```bash
npm run dev
```
