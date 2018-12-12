# The Better Github News Feed
Welcome to The Better Github News Feed!  This is a web app where you can view the latest news relevant to you on Github.  You can see latest updates regarding repos you watch or follow or users that you follow.  Get the latest information on new releases, pull requests, issues, and more!

Check out the app at www.githubfeed.com

## Usage

> Sign up using your Github credentials to gain access to your personalized feed. 

## Requirements

- React
- Express
- Axios
- Node.js
- Mongoose
- React-Router
- React-Bootstrap

## Development

### Installing Dependencies

From within the root directory:

> npm install

### To Run Locally

You must set up an oAuth app with Github in order to retrieve a Client ID and a Client Secret, as well as, establish the callback URL to allow users to sign in with Github authentication.  Add your private configuration information into the config.example.js file and rename it to config.js.  Be sure to not push any sensitive information to Github and .gitignore all appropriate files.

In server/database/index.js, you need to enter in the URL to connect mongoose to mLab.  

From within the root directory:

> npm start

> npm run react-dev

Application runs on port 3000 on your localhost

## Contributing

See [CONTRIBUTING.md](https://github.com/abibring/better-github-news-feed/blob/master/CONTRIBUTING.md) for contribution guidelines.

See [STYLE-GUIDE.md](https://github.com/abibring/better-github-news-feed/blob/master/STYLE-GUIDE.md) for style guidelines.
