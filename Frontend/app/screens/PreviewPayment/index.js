import React, {useState} from 'react';
import {
  View,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, TextInput, Button} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function PreviewPayment({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [card, setCard] = useState('');
  const [valid, setValid] = useState('');
  const [digit, setDigit] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [primary, setPrimary] = useState(true);
  const [success] = useState({
    card: true,
    valid: true,
    digit: true,
    name: true,
  });

  /**
   * @description Call when reminder option switch on/off
   */
  const toggleSwitch = value => {
    setPrimary(value);
  };

  const onPayNow = () => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate('BookingDetail');
    }, 1000);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('payment_method')}
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
          <ScrollView contentContainerStyle={{padding: 20}}>
            <Text headline semibold>
              {t('credit_card_detail')}
            </Text>
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setCard(text)}
              placeholder={t('credit_card_number')}
              success={success.card}
              keyboardType="numeric"
              value={card}
            />
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 6.5}}>
                <TextInput
                  onChangeText={text => setValid(text)}
                  placeholder={t('valid_until')}
                  success={success.valid}
                  value={valid}
                />
              </View>
              <View style={{flex: 3.5, marginLeft: 10}}>
                <TextInput
                  onChangeText={text => setDigit(text)}
                  placeholder={t('digit_num')}
                  success={success.digit}
                  keyboardType="numeric"
                  value={digit}
                />
              </View>
            </View>
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setName(text)}
              placeholder={t('name_on_card')}
              success={success.name}
              value={name}
            />
            <View
              style={[styles.checkDefault, {borderTopColor: colors.border}]}>
              <Text body2>{t('set_as_primary')}</Text>
              <Switch
                name="angle-right"
                size={18}
                onValueChange={toggleSwitch}
                value={primary}
              />
            </View>
          </ScrollView>
          <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Button loading={loading} full onPress={() => onPayNow()}>
              {t('pay_now')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
