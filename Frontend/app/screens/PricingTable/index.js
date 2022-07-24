import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, PackageItem} from '@components';
import styles from './styles';
import {PackageData} from '@data';
import {useTranslation} from 'react-i18next';

export default function PricingTable({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [item] = useState(PackageData[0]);
  const [detail] = useState(PackageData[1]);

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('price_table')}
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
        <ScrollView>
          <View style={styles.contain}>
            {/* Package Component > Summarize */}
            <PackageItem
              packageName={item.packageName}
              price={item.price}
              type={item.type}
              description={item.description}
              onPressIcon={() => {
                navigation.navigate('PricingTable');
              }}
              onPress={() => {
                navigation.navigate('PreviewBooking');
              }}
              style={{marginBottom: 10}}
            />
            {/* Package Component > Expand Detail */}
            <PackageItem
              detail
              packageName={detail.packageName}
              price={detail.price}
              type={detail.type}
              description={detail.description}
              services={detail.services}
              onPress={() => {
                navigation.navigate('PreviewBooking');
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
