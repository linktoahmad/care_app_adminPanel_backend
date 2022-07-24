import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, PackageItem} from '@components';
import styles from './styles';
import {PackageData} from '@data';
import {useTranslation} from 'react-i18next';

export default function PricingTable({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [packageItem] = useState(PackageData[0]);

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
            <PackageItem
              icon
              packageName={packageItem.packageName}
              price={packageItem.price}
              type={packageItem.type}
              description={packageItem.description}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
