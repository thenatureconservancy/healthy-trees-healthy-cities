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

// var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

// test vars
const testUserName = 'matthew.d.silveira@gmail.com';
const testPassword = 'Pass1234!';
const testConfirmCode = '269784';

// cognito setup SDK setup
const clientId = '101i663u1v1bhfgo3le89daot9';
const userPoolId = 'us-west-2_y6e0iz7MX';
const poolData = {
  UserPoolId: userPoolId, // Your user pool id here
  ClientId: clientId, // Your client id here
};

const userPool = new CognitoUserPool(poolData);

const state = () => ({
  // authMode: 'verify',
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
  async login() {
    var authenticationData = {
      Username: testUserName,
      Password: testPassword,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser({
      Username: testUserName,
      Pool: userPool,
    });
    // let context = this;
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log(result);
        // context.userId = result.idToken.payload.sub;
        // context.username = result.idToken.payload.email;
        // console.log(context);
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
  async tryAutoLogin(context) {
    // the line below is how we can keep getting user info to make requests to API
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      await cognitoUser.getSession(function (err, session) {
        if (err) {
          console.log(err);
        }
        // console.log(session.idToken.payload);
        // console.log(session.isValid());
        // check to see if valid session
        if (session.isValid()) {
          context.state.authMode = 'userPage';
          context.state.userInfo = session.idToken.payload;
        } else {
          context.state.authMode = 'login';
        }
        // context.userId = session.idToken.payload.sub;
        // context.username = session.idToken.payload['custom:userNameString'];
      });
    }
  },
  async getCurrentUserIdToken() {
    const cognitoUser = userPool.getCurrentUser();
    let idToken;
    await cognitoUser.getSession(async function (err, session) {
      if (err) {
        console.log(err);
      }
      console.log(session);
      idToken = session.idToken.jwtToken;
    });
    console.log(idToken);
    return idToken;
  },
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
