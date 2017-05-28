# Homophone Game Server

## Development

```
npm install
npm run sequelize -- db:migrate
npm run get-homophones
```

## Heroku

```
git push heroku master
heroku run npm run sequelize -- db:migrate --env production
```
