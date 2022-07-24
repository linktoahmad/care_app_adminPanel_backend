import React, {useState} from 'react';
import * as Google from 'expo-google-app-auth';
import {Button} from '@components';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiList from "../../apiList"
const GoogleButton = () => {
  const [Name, setName] = useState("Use Google Account");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  // authenticates user and redirects to home
  const authentication = () => {
    setLoading(true);
    dispatch(AuthActions.authentication(true));
  };

  //stores data presistive state
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '736126909442-mfmp94pm94urap5kimrl8ocvkfak03bd.apps.googleusercontent.com',
        iosClientId:
          '663215841316-9pd6e3ne5bj7tgisd6o45h0dgoj903av.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        getUserData(result.accessToken);
      } else {
        console.log('Permission denied');
      }
    } catch (e)  {
      setLoading(false)
      setName("Error Logging in")
    }
  }

  async function getUserData(accessToken) {
    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    );

    userInfoResponse.json().then(data => {
      console.log({
        name: data.name,
        email: data.email,
        password: data.email+data.name,
        image: data.picture,
      });
      // your host api for the backend will go here
      axios
        .post(apiList.signup, {
          name: data.name,
          email: data.email,
          password: data.email+data.name,
          image: data.picture,
        })
        .then(res => {
         // safing token in presistive state
          storeData(res.data.token)
          authentication();
        })
        .catch(e => {
          setLoading(false)
          setName("Error Logging in")
        });
    });
  }

  return (
    <Button
      loading={loading}
      onPress={signInWithGoogleAsync}>
      {Name}
      
    </Button>
  );
};

export default GoogleButton;
