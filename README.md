## reverse-chat

**Description** `v1.0.0` The mono repo Chat Application for practice. It reverse all the messages sent by users.

**Node Version:** `8.9.*`

**React Version:** `16.*`


## Development Setup

### Installation:

1. `git clone` repository

2. `cd project-directory`

3. `yarn install`

4. `yarn setup`

### Configuration

1. Check .env.templates in both `client` and `server` folder.

2. Create .env files and provide values required.

### Build Apps (only required for Production deployement)

1. Build Client by `yarn build:client`

2. Build Server by `yarn build:server`

### Running the apps

1. Run Client by `yarn run:client`

2. Run Server by `yarn run:server`

## Production Deployement

### Steps to push backend to heroku:

1. `heroku login`

2. `heroku git:remote -a <your-app-name>`

3. `git subtree push --prefix server heroku master`

### Steps to push frontend to netlify:

1. `npx netlify login`

2. `yarn build:client && npx netlify deploy --dir=client/build --prod`
