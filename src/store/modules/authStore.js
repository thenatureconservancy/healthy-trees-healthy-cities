import AWS from 'aws-sdk';
// import AWS from 'aws-sdk/client-s3'; // this is the newest version but wont install

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
  region: 'us-west-2',
});

// ES AWS Modules
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';

// cognito setup SDK setup
const clientId = '101i663u1v1bhfgo3le89daot9';
const userPoolId = 'us-west-2_y6e0iz7MX';
const poolData = {
  UserPoolId: userPoolId, // Your user pool id here
  ClientId: clientId, // Your client id here
};

const userPool = new CognitoUserPool(poolData);

const state = () => ({
  authMode: 'login',
  userInfo: '',
});

const getters = {};

const mutations = {};

const actions = {
  async createAccount(context, data) {
    console.log(data);
    var params = {
      ClientId: clientId /* required */,
      Password: data.password /* required */,
      Username: data.email /* required */,
    };
    console.log(context);
    cognitoidentityserviceprovider.signUp(params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data); // successful response}
        // redirect user to verify account with code page
        // set user email verified to false
        // make POST request to users table and add new user here.
        // add users name, picture, nickname,
        // add field, last logon, to find out stats on daily active users

        context.state.authMode = 'verify';
      }
    });
  },
  confirmSignup(context, data) {
    var params = {
      ClientId: clientId /* required */,
      ConfirmationCode: data.verifyCode /* required */,
      Username: data.email /* required */,
    };
    cognitoidentityserviceprovider.confirmSignUp(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
        // set user email verified to true

        context.state.authMode = 'login';
      } // successful response
    });
  },
  resendConfirmationCode() {
    var params = {
      ClientId: clientId /* required */,
      Username: testUserName /* required */,
    };
    cognitoidentityserviceprovider.resendConfirmationCode(
      params,
      function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
      }
    );
  },
  async login(context, data) {
    var authenticationData = {
      Username: data.email,
      Password: data.password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser({
      Username: data.email,
      Pool: userPool,
    });
    // let context = this;
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async function (result) {
        context.dispatch('loginAtAppLoad');
      },
      onFailure: function (err) {
        console.log(err);
        console.log(err.message);
        // alert(err.message || JSON.stringify(err));
      },
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        // redirect to change-password page
        console.log('new password required');
      },
    });
  },
  // logs user out of the application
  logoutUser(context) {
    const cognitoUser = userPool.getCurrentUser();
    // sign user out of application
    // this invalidates the AWS tokens.
    cognitoUser.signOut();
    context.state.userInfo = '';
    context.state.authMode = 'login';
  },

  async loginAtAppLoad(context) {
    const userSession = await context.dispatch('getCurrentUserSession');
    if (!userSession) {
      context.state.authMode = 'login';
      return;
    }
    // show the user page and some basic info
    // this will chnage depending o how we want to load the main site
    context.state.authMode = 'userPage';
    context.state.userInfo = userSession.idToken.payload;
  },

  async getCurrentUserSession(context) {
    let userSession;
    const cognitoUser = await userPool.getCurrentUser();
    if (!cognitoUser) {
      console.log('redirect to login page');
      return;
    }

    await cognitoUser.getSession(async function (err, session) {
      if (err) {
        console.log('ERROR', err);
        console.log('redirect to login page');
        context.state.authMode = 'login';
        //maybe try to clear local stoarge and then redirect to login page
        return;
      }
      if (!session) {
        try {
          return await context.dispatch('refreshTokenSilent');
        } catch (error) {
          console.log('redirect to login page');
          context.state.authMode = 'login';
          return;
        }
      }

      if (!session.isValid()) {
        try {
          return await context.dispatch('refreshTokenSilent');
        } catch (error) {
          console.log('redirect to login page');
          context.state.authMode = 'login';
          return;
        }
      }
      userSession = session;
    });
    return userSession;
  },
  async refreshTokenSilent(context) {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      //
      if (!cognitoUser) {
        reject('There was a problem refeshing the token');
      }
      cognitoUser.getSession(function (err, session) {
        if (!session) {
          reject('There was a problem refeshing the token');
        }
        const refresh_token = session.getRefreshToken();
        cognitoUser.refreshSession(refresh_token, (err, session) => {
          try {
            resolve(session);
          } catch (error) {
            reject('There was a problem refeshing the token');
          }
        });
      });
    });
  },
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
