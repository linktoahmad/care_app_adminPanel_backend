import React, {useState} from 'react';
import {View, Switch} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function PaymentMethodDetail({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [loading, setLoading] = useState(false);
  const [primary, setPrimary] = useState(true);

  /**
   * @description Call when reminder option switch on/off
   */
  const toggleSwitch = value => {
    setPrimary(value);
  };

  const onDeletePayment = () => {
    setLoading(true);
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('card_detail')}
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
        <View style={{flex: 1, padding: 20}}>
          <View
            style={[
              styles.card,
              {backgroundColor: colors.card, borderColor: colors.border},
            ]}>
            <Icon name="cc-visa" size={48} color={colors.text} />
            <Text body1 style={{marginTop: 10}}>
              **** **** **** 1989
            </Text>
            <Text footnote grayColor style={{marginTop: 4}}>
              Expiries 02/2020
            </Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text footnote primaryColor style={{marginTop: 15}}>
                {t('primary')}
              </Text>
            </View>
          </View>
          <View style={[styles.checkDefault, {borderTopColor: colors.border}]}>
            <Text body2>{t('set_as_primary')}</Text>
            <Switch
              name="angle-right"
              size={18}
              onValueChange={toggleSwitch}
              value={primary}
            />
          </View>
        </View>
        <View style={{margin: 20}}>
          <Button loading={loading} outline onPress={() => onDeletePayment}>
            {t('delete')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
