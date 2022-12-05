import AWS from 'aws-sdk';
// var AWS = require('aws-sdk');
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
  region: 'us-east-1',
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
const testConfirmCode = '513754';

// cognito setup SDK setup
const clientId = '2k29aaohc7petefk0elgobd5m5';
const userPoolId = 'us-east-1_xin9uKNC7';
const poolData = {
  UserPoolId: userPoolId, // Your user pool id here
  ClientId: clientId, // Your client id here
};

const userPool = new CognitoUserPool(poolData);

const state = () => ({});

const getters = {};

const mutations = {};

const actions = {
  //   async createActivity(context, params) {
  //     const response = await context.dispatch('protectedApiRequest', {
  //       route: `task`,
  //       type: 'POST',
  //       body: params,
  //     });
  //     if (response.status === 200) {
  //       // request the updated activities object from the database
  //       await context.dispatch('getOuActivities');
  //       return true;
  //     }
  //   },
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
