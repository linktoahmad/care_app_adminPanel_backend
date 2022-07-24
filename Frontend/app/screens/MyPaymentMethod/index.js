import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function MyPaymentMethod({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading] = useState(false);
  const [card] = useState([
    {
      id: 1,
      icon: 'cc-visa',
      title: '**** **** **** 1989',
      subtitle: 'Expiries 02/2020',
      primary: true,
    },
    {
      id: 2,
      icon: 'paypal',
      title: 'steve.garrett@passionui.com',
      subtitle: 'Added 01/2019',
    },
    {
      id: 3,
      icon: 'cc-mastercard',
      title: '**** **** ****2091',
      subtitle: 'Expiries 10/2021',
    },
    {
      id: 4,
      icon: 'apple-pay',
      title: 'steve.garrett@icloud.com',
      subtitle: 'Added 01/2019',
    },
  ]);

  /**
   * call when select card
   * @param {*} item
   */
  const onSelectMethod = item => {
    navigation.navigate('PaymentMethodDetail');
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('my_cards')}
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
        <View style={styles.contain}>
          {card.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.paymentItem, {borderBottomColor: colors.border}]}
                onPress={() => onSelectMethod(item)}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.iconContent}>
                    <Icon name={item.icon} size={48} color={colors.text} />
                  </View>
                  <View>
                    <Text body1>{item.title}</Text>
                    <Text footnote grayColor style={{marginTop: 5}}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                {item.primary ? (
                  <Text footnote primaryColor>
                    {t('primary')}
                  </Text>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{padding: 20}}>
          <Button
            loading={loading}
            full
            onPress={() => navigation.navigate('AddPayment')}>
            {t('add_payment_method')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
