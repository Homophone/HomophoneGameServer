# Homophone Game Server

## Development

Start by installing node packages and set up git hooks.

```
npm install
npm run setup-git-hooks
```

Make sure you have ruby installed.

### Database

Make sure you have postgres installed, and `psql` in your path.

```
which psql
```

If it's not in your path and you're using Postgres.app you can try this:

```
export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/latest/bin
```

Create and migrate the database

```
npm run db-create
npm run db-migrate
```

Create and migrate the test database

```
npm run test-db-create
npm run test-db-migrate
```

Run tests:

```
npm run test
```

## Heroku

```
git push heroku master
heroku run npm run sequelize -- db:migrate --env production
```

## Other Tasks

Query REST api to insert wordSets into the databse.

```
npm run get-homophones
```
