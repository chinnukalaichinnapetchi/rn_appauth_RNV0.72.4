

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert

} from 'react-native';

// import { authorize, prefetchConfiguration, refresh, revoke, register } from 'react-native-app-auth';
import { SocialIcon } from 'react-native-elements';
import * as AppAuth from 'react-native-app-auth';

import {GOOGLE_ISSUER,GOOGLE_CLIENTID,GOOGLE_REDRIECTURL,GOOGLE_SCOPE,GOOGLE_AUTHENDPOINT,GOOGLE_TOKENENDPOINT,GITHUB_ISSUER,GITHUB_CLIENTID,GITHUB_CLIENTSECRET,GITHUB_REDIRECTURL,GITHUB_ACCESSTYPE,GITHUB_HEADERS_ACCEPT,GITHUB_AUTHENDPOINT,GITHUB_TOKENENDPOINT,GITHUB_REVOCATIONENDPOINT,FB_ISSUER,FB_CLIENTID,FB_REDIRECTURL,FB_AUTHENDPOINT,FB_TOKENENDPOINT,TWITTER_ISSUER,TWITTER_CLIENTID,TWITTER_CLIENTSECRET,TWITTER_REDIRECTURL,
    TWITTER_AUTHENDPOINT,TWITTER_AUTHURL,TWITTER_STATE,TWITTER_CODE,TWITTER_CODE_METHOD,GITHUB_SCOPES,FB_SCOPES,TWITTER_SCOPES,TWITTER_TOKENENDPOINT} from "@env"

const githubconfig = {
  clientId: GITHUB_CLIENTID,
  clientSecret: GITHUB_CLIENTSECRET,
  redirectUrl: GITHUB_REDIRECTURL,
  issuer: GITHUB_ISSUER,
  scopes: GITHUB_SCOPES,

  additionalParameters: {
    access_type:GITHUB_ACCESSTYPE,
  },
  additionalHeaders: { 'Accept': GITHUB_HEADERS_ACCEPT },
  serviceConfiguration: {
    authorizationEndpoint: GITHUB_AUTHENDPOINT,
    tokenEndpoint: GITHUB_TOKENENDPOINT,
    revocationEndpoint: GITHUB_REVOCATIONENDPOINT,
  },

}
const googleconfig = {
  issuer:GOOGLE_ISSUER,
  skipTokenExchange: "true",
  clientId: GOOGLE_CLIENTID,
  redirectUrl: GOOGLE_REDRIECTURL,
  scopes:GOOGLE_SCOPE, // Include scopes for user data you want to access
  serviceConfiguration: {
    authorizationEndpoint: GOOGLE_AUTHENDPOINT,
    tokenEndpoint: GOOGLE_TOKENENDPOINT,
  },
  additionalParameters: { prompt: 'login' }
}

const facebookconfig = {
  issuer: FB_ISSUER,
  clientId: FB_CLIENTID,
  redirectUrl: FB_REDIRECTURL,
  scopes: FB_SCOPES,
  serviceConfiguration: {
    authorizationEndpoint: FB_AUTHENDPOINT,
    tokenEndpoint: FB_TOKENENDPOINT,
  },

}
const twitterconfig = {
  issuer: TWITTER_ISSUER,
  clientId: TWITTER_CLIENTID,
  clientSecret: TWITTER_CLIENTSECRET,
  redirectUrl:TWITTER_REDIRECTURL,
  serviceConfiguration: {
    authorizationEndpoint: TWITTER_AUTHENDPOINT,
    tokenEndpoint: TWITTER_TOKENENDPOINT,
  },
  authorizationURL: TWITTER_AUTHURL,
  scope: TWITTER_SCOPES,
  state: TWITTER_STATE,
  code_challenge: TWITTER_CODE,
  code_challenge_method:TWITTER_CODE_METHOD
}


const Firstscreen = (props) => {


  const googleSignIn = async () => {

    try {
      const result = await AppAuth.authorize(googleconfig);
      //console.log('Access Token:', result);
      const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${result.accessToken}`,
        },
      });

      const userInfo = await userInfoResponse.json();
      props.navigation.navigate('Home')
      //console.log('User Info:', userInfo);
    } catch (error) {
     // console.error('Google Sign-In Error:', error);
    }
  };



  const githublogin = async () => {

    AppAuth.authorize(githubconfig).then((res) => {
      //console.log(res, "resssss")
      props.navigation.navigate('Home')
    })

  };
  const facebooklogin = async () => {

    
    AppAuth.authorize(facebookconfig).then((res) => {
      console.log(res, "resssss")
    })

  };
  const twitterlogin = async () => {
 AppAuth.authorize(twitterconfig).then((res) => {
      console.log(res, "resssss")
    })

  };










  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <ScrollView>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: '50%' }}>
          <SocialIcon
            type='google'
            onPress={() => googleSignIn()}
          />
          <SocialIcon

            onPress={() => { facebooklogin() }}
            type='facebook'
          />
          <SocialIcon
            // raised={false}
            onPress={() => githublogin()}
            type='github'
          />

          <SocialIcon
            type='twitter'
           onPress={() => twitterlogin()}
          />

        </View> 

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default Firstscreen;