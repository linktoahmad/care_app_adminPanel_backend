import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import * as Font from 'expo-font';
import {Images, BaseColor, useTheme} from '@config';
import {Image} from '@components';
import styles from './styles';

export default function Loading({navigation}) {
  const {colors} = useTheme();

  const onProcess = async () => {
    await Font.loadAsync({
      'Merriweather-Black': require('app/assets/fonts/Merriweather-Black.ttf'),
      'Merriweather-BlackItalic': require('app/assets/fonts/Merriweather-BlackItalic.ttf'),
      'Merriweather-Bold': require('app/assets/fonts/Merriweather-Bold.ttf'),
      'Merriweather-BoldItalic': require('app/assets/fonts/Merriweather-BoldItalic.ttf'),
      'Merriweather-Italic': require('app/assets/fonts/Merriweather-Italic.ttf'),
      'Merriweather-Light': require('app/assets/fonts/Merriweather-Light.ttf'),
      'Merriweather-LightItalic': require('app/assets/fonts/Merriweather-LightItalic.ttf'),
      'Merriweather-Regular': require('app/assets/fonts/Merriweather-Regular.ttf'),
      Merriweather: require('app/assets/fonts/Merriweather-Regular.ttf'),
      'Raleway-Black': require('app/assets/fonts/Raleway-Black.ttf'),
      'Raleway-BlackItalic': require('app/assets/fonts/Raleway-BlackItalic.ttf'),
      'Raleway-Bold': require('app/assets/fonts/Raleway-Bold.ttf'),
      'Raleway-BoldItalic': require('app/assets/fonts/Raleway-BoldItalic.ttf'),
      'Raleway-ExtraBold': require('app/assets/fonts/Raleway-ExtraBold.ttf'),
      'Raleway-ExtraBoldItalic': require('app/assets/fonts/Raleway-ExtraBoldItalic.ttf'),
      'Raleway-ExtraLight': require('app/assets/fonts/Raleway-ExtraLight.ttf'),
      'Raleway-ExtraLightItalic': require('app/assets/fonts/Raleway-ExtraLightItalic.ttf'),
      'Raleway-Italic': require('app/assets/fonts/Raleway-Italic.ttf'),
      'Raleway-Light': require('app/assets/fonts/Raleway-Light.ttf'),
      'Raleway-LightItalic': require('app/assets/fonts/Raleway-LightItalic.ttf'),
      'Raleway-Medium': require('app/assets/fonts/Raleway-Medium.ttf'),
      'Raleway-MediumItalic': require('app/assets/fonts/Raleway-MediumItalic.ttf'),
      'Raleway-Regular': require('app/assets/fonts/Raleway-Regular.ttf'),
      Raleway: require('app/assets/fonts/Raleway-Regular.ttf'),
      'Raleway-SemiBold': require('app/assets/fonts/Raleway-SemiBold.ttf'),
      'Raleway-SemiBoldItalic': require('app/assets/fonts/Raleway-SemiBoldItalic.ttf'),
      'Raleway-Thin': require('app/assets/fonts/Raleway-Thin.ttf'),
      'Raleway-ThinItalic': require('app/assets/fonts/Raleway-ThinItalic.ttf'),
      'Roboto-Black': require('app/assets/fonts/Roboto-Black.ttf'),
      'Roboto-BlackItalic': require('app/assets/fonts/Roboto-BlackItalic.ttf'),
      'Roboto-Bold': require('app/assets/fonts/Roboto-Bold.ttf'),
      'Roboto-BoldItalic': require('app/assets/fonts/Roboto-BoldItalic.ttf'),
      'Roboto-Italic': require('app/assets/fonts/Roboto-Italic.ttf'),
      'Roboto-Light': require('app/assets/fonts/Roboto-Light.ttf'),
      'Roboto-LightItalic': require('app/assets/fonts/Roboto-LightItalic.ttf'),
      'Roboto-Medium': require('app/assets/fonts/Roboto-Medium.ttf'),
      'Roboto-MediumItalic': require('app/assets/fonts/Roboto-MediumItalic.ttf'),
      'Roboto-Regular': require('app/assets/fonts/Roboto-Regular.ttf'),
      Roboto: require('app/assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Thin': require('app/assets/fonts/Roboto-Thin.ttf'),
      'Roboto-ThinItalic': require('app/assets/fonts/Roboto-ThinItalic.ttf'),
    });
    setTimeout(() => {
      navigation.replace('Main');
    }, 500);
  };
  useEffect(() => {
    onProcess();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={styles.title}>CARE</Text>
        <ActivityIndicator
          size="large"
          color={BaseColor.whiteColor}
          style={{
            marginTop: 20,
          }}
        />
      </View>
    </View>
  );
}
