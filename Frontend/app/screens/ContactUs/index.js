import React, {useState} from 'react';
import {View, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from './styles';

export default function ContactUs({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState({
    name: true,
    email: true,
    message: true,
  });
  const [loading, setLoading] = useState(false);
  const [region] = useState({
    latitude: 10.73902,
    longitude: 106.704938,
    latitudeDelta: 0.009,
    longitudeDelta: 0.004,
  });

  /**
   * @description Called when user sumitted form
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const onSubmit = () => {
    if (name == '' || email == '' || message == '') {
      setSuccess({
        ...success,
        email: email != '' ? true : false,
        name: name != '' ? true : false,
        message: message != '' ? true : false,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(true);
        navigation.goBack();
      }, 500);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('contact_us')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
            <View style={{height: 180, width: '100%'}}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                onRegionChange={() => {}}>
                <Marker
                  coordinate={{
                    latitude: 10.73902,
                    longitude: 106.704938,
                  }}
                />
              </MapView>
            </View>
            <Text headline style={{marginVertical: 10}}>
              {t('contact_details')}
            </Text>
            <TextInput
              onChangeText={text => setName(text)}
              placeholder={t('name')}
              success={success.name}
              value={name}
            />
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setEmail(text)}
              placeholder={t('email')}
              keyboardType="email-address"
              success={success.email}
              value={email}
            />
            <TextInput
              style={{marginTop: 10, height: 120}}
              onChangeText={text => setMessage(text)}
              textAlignVertical="top"
              multiline={true}
              placeholder={t('message')}
              success={success.message}
              value={message}
            />
          </ScrollView>
          <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
            <Button
              loading={loading}
              full
              onPress={() => {
                onSubmit();
              }}>
              {t('send')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
