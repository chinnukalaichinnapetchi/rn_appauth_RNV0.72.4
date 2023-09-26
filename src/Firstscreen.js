

import React, { useEffect, useState ,useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  
} from 'react-native';

import { Icon, SocialIcon } from 'react-native-elements';
import * as AppAuth from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


/// themes
import { useTheme } from '@react-navigation/native';
import { AppContext } from '../App';
import { Switch } from 'react-native-elements';



const googleconfig = {
  issuer:process.env['GOOGLE_ISSUER'],
  skipTokenExchange: "true",
  clientId: process.env.GOOGLE_CLIENTID,
  redirectUrl: process.env.GOOGLE_REDRIECTURL,
  scopes: ['openid', 'https://www.googleapis.com/auth/userinfo.profile', "https://www.googleapis.com/auth/userinfo.email",], // Include scopes for user data you want to access
  serviceConfiguration: {
    authorizationEndpoint: process.env.GOOGLE_AUTHENDPOINT,
    tokenEndpoint: process.env.GOOGLE_TOKENENDPOINT,
  },
  additionalParameters: { prompt: 'login' }
}
const githubconfig = {
  clientId: process.env.GITHUB_CLIENTID,
  clientSecret: process.env.GITHUB_CLIENTSECRET,
  redirectUrl: process.env.GITHUB_REDIRECTURL,
  issuer: process.env['GITHUB_ISSUER'],
  scopes: ['identity', 'user', 'repo', 'offline_access'],

  additionalParameters: {
    access_type:process.env.GITHUB_ACCESSTYPE,
  },
  additionalHeaders: { 'Accept': process.env.GITHUB_HEADERS_ACCEPT },
  serviceConfiguration: {
    authorizationEndpoint:process.env.GITHUB_AUTHENDPOINT,
    tokenEndpoint: process.env.GITHUB_TOKENENDPOINT,
    revocationEndpoint: process.env.GITHUB_REVOCATIONENDPOINT,
  },

}
const facebookconfig = {
  issuer: process.env['FB_ISSUER'],
  clientId: process.env.FB_CLIENTID,
  redirectUrl: process.env.FB_REDIRECTURL,
  scopes:['public_profile'],
  serviceConfiguration: {
    authorizationEndpoint: process.env.FB_AUTHENDPOINT,
    tokenEndpoint: process.env.FB_TOKENENDPOINT,
  },

}
const twitterconfig = {
  issuer: process.env['TWITTER_ISSUER'],
  clientId: process.env.TWITTER_CLIENTID,
  clientSecret: process.env.TWITTER_CLIENTSECRET,
  redirectUrl:process.env.TWITTER_REDIRECTURL,
  serviceConfiguration: {
    authorizationEndpoint: process.env.TWITTER_AUTHENDPOINT,
    tokenEndpoint: process.env.TWITTER_TOKENENDPOINT,
  },
  authorizationURL: process.env.TWITTER_AUTHURL,
  scope: ['offline.access'],
  state: process.env.TWITTER_STATE,
  code_challenge: process.env.TWITTER_CODE,
  code_challenge_method:process.env.TWITTER_CODE_METHOD
}


const Firstscreen = (props) => {
  const [checked, setChecked] = useState(false);
  
  const { colors } = useTheme();
  const {theme,setTheme} = useContext(AppContext);




// console.log(googleconfig1,"googleconfig11111");

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
      <ScrollView >
        <>
        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
        <Text style={{color:colors.text,fontSize:20,}}>
          Change Theme
        </Text>
        <Switch
      value={checked}
      thumbColor={'white'}
      onValueChange={(value) => {setChecked(value),setTheme(theme === 'Light' ? 'Dark' : 'Light'),AsyncStorage.setItem("storetheme",theme === 'Light' ? 'Dark' : 'Light')}}
      ios_backgroundColor={'grey'}
      color='green'
      style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
    
    />
        </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: '50%' }}>
        <Text style={{fontSize:20,color:colors.text,fontFamily:'NotoSans-Italic'}}>Social login</Text>
        <Text style={{fontSize:20,color:colors.text,fontFamily:'NotoSans-Bold'}}>Social login</Text>
        <Text style={{fontSize:20,color:colors.text,fontFamily:'NotoSans-Regular'}}>Social login</Text>
        <Text style={{fontSize:20,color:colors.text,fontFamily:'NotoSans-Medium'}}>Social login</Text>

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
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default Firstscreen;