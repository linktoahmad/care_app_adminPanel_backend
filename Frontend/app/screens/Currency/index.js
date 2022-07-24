import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {CurrencyData} from '@data';

export default function Currency({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState(CurrencyData);

  /**
   * @description Called when setting currency is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */
  const onSelect = select => {
    setCurrency(
      currency.map(item => {
        if (item.currency == select.currency) {
          return {
            ...item,
            checked: true,
          };
        } else {
          return {
            ...item,
            checked: false,
          };
        }
      }),
    );
  };

  /**
   * @description Load item one by one
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {*} item
   * @param {*} index
   * @returns
   */
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={[styles.item, {borderBottomColor: colors.border}]}
        onPress={() => onSelect(item)}>
        <Text
          body1
          style={
            item.checked
              ? {
                  color: colors.primary,
                }
              : {}
          }>
          {item.currency}
        </Text>
        {item.checked ? (
          <Icon name="check" size={14} color={colors.primary} />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('currency')}
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
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <Text headline primaryColor numberOfLines={1}>
                {t('Save')}
              </Text>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          setLoading(true);
          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <View style={styles.contain}>
          <View style={{width: '100%', height: '100%'}}>
            <FlatList
              data={currency}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => renderItem(item, index)}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
