import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  TextInput,
} from '@components';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';

export default function ProfileEdit({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [id, setId] = useState(UserData[0].id);
  const [name, setName] = useState(UserData[0].name);
  const [email, setEmail] = useState(UserData[0].email);
  const [address, setAddress] = useState(UserData[0].address);
  const [image] = useState(UserData[0].image);
  const [loading, setLoading] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('edit_profile')}
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
        onPressRight={() => {}}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.contain}>
            <View>
              <Image source={image} style={styles.thumb} />
            </View>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('account')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setId(text)}
              placeholder={t('input_id')}
              value={id}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('name')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setName(text)}
              placeholder={t('input_name')}
              value={name}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('email')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setEmail(text)}
              placeholder={t('input_email')}
              value={email}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('address')}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setAddress(text)}
              placeholder={t('input_address')}
              value={address}
            />
          </ScrollView>
          <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
            <Button
              loading={loading}
              full
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  navigation.goBack();
                }, 500);
              }}>
              {t('confirm')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
