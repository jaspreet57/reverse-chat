# reverse-chat

Chat Application for Practise. It reverse all the messages sent by users.

## Steps to push backend to heroku:

1. `heroku login`

2. `heroku git:remote -a <your-app-name>`

3. `git subtree push --prefix server heroku master`

## Steps to push frontend to netlify:

1. `npx netlify login`

2. `yarn build:client && npx netlify deploy --dir=client/build --prod`
