# Event Reminder

A React application that allows users to create an account, and save birthdays and anniversary of people that they want to remember. 

## Get started

Open up a terminal and clone this repo:

```bash
# Clone this repository
$ git clone https://github.com/rajni2002491/event-reminder.git

# Go into the repository
$ cd event-reminder

```

### Firebase setup

Go to Firebase website, and sign in with your Google account. Then, create a new project. You will be able to get the Firebase SDK which will contain information about your project, such as API key, project ID, and so on. Create a `.env` file and add the following environment variables with your own Firebase SDK values:

```dosini
REACT_APP_FIREBASE_API_KEY='your-api-key'
REACT_APP_FIREBASE_AUTH_DOMAIN='your-auth-domain'
REACT_APP_FIREBASE_PROJECT_ID='your-project-id'
REACT_APP_FIREBASE_STORAGE_BUCKET='your-storage-bucket'
REACT_APP_FIREBASE_MESSAGING_SENDER_ID='your-messaging-sender-id'
REACT_APP_FIREBASE_APP_ID='your-app-id'
```

### Creating a Cloud Firestore database

To set up a Cloud Firestore database, go to your Firebase project dashboard and select `Firestore Database`. You also need to update the `Rules` for the database. Add the following snippet of code:

```c
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // an authenticated user can create a document
    // a user can only read his/her own document
    // match logged-in user doc in users collection
    match /users/{userId} {
      allow create: if request.auth.uid != null;
      allow read: if request.auth.uid == userId;
    }

    // match any doc in persons collection
    // the user needs to be authenticated to be able to read, or write
    match /persons/{personId} {
    	allow read, write: if request.auth.uid != null;
    }
  }
}
```

### Firebase authentication

Go to the Firebase project dashboard and select `Authentication`. Then, go to `Sign-in Method` and enable `Email/Password`.

### Installing project dependencies

Install the project dependencies using npm:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm start
```

This will start a development server and open the app in your default browser.

## Creating a production build

In your command line, run the following command:

```bash
# create a production build
$ npm run build
```

This will generate a `build` folder in the project root directory. It contains optimized bundled CSS and JS files. You can use this folder to deploy the app to a hosting service like [netlify](https://netlify.com/).

Do not forget to add the environment variables to your Netlify project by going to `Site settings` > `Build & deploy` > `Environment`.
