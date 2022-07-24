import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function PaymentMethod({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const onPreviewMethod = () => {
    navigation.navigate('PreviewPayment');
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
        <View style={styles.contain}>
          <TouchableOpacity
            style={[
              styles.methodItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => onPreviewMethod()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.iconContent}>
                <Icon name="credit-card" size={24} color={colors.text} />
              </View>
              <Text headline>{t('domestic_card')}</Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => onPreviewMethod()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.iconContent}>
                <Icon name="cc-visa" size={24} color={colors.text} />
              </View>
              <Text headline>{t('credit_card')}</Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => onPreviewMethod()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.iconContent}>
                <Icon name="globe" size={24} color={colors.text} />
              </View>
              <Text headline>{t('internet_banking')}</Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.methodItem}
            onPress={() => onPreviewMethod()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={styles.iconContent}>
                <Icon name="mobile-alt" size={24} color={colors.text} />
              </View>
              <Text headline>{t('mobile_wallet')}</Text>
            </View>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              enableRTL={true}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
