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
  async getUserInfo(context) {
    // console.log(context);
    const response = await context.dispatch('protectedApiRequest', {
      route: `cities`,
      // route: `users/${context.rootState.authUserStore.userInfo.ouid}`,
      type: 'GET',
    });
    console.log(response.data.data);
  },
  // async getCurrentUserIdToken() {
  //   const cognitoUser = userPool.getCurrentUser();
  //   let idToken;
  //   await cognitoUser.getSession(async function (err, session) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(session);
  //     idToken = session.idToken.jwtToken;
  //   });
  //   console.log(idToken);
  //   return idToken;
  // },
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
