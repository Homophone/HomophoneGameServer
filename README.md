# Homophone Game Server

## Development

```
npm install
npm run sequelize -- db:migrate
npm run seed
```

## Heroku

```
git push heroku master
heroku run npm run sequelize -- db:migrate --env production
```
