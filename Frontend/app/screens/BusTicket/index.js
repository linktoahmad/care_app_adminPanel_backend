import React from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {Header, SafeAreaView, Icon, Text, BusPlan, Button} from '@components';
import styles from './styles';

export default function BusTicket({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  return (
    <View style={{flex: 1}}>
      <Header
        title={t('tickets')}
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
            <BusPlan
              fromCode="SSM"
              toCode="SHU"
              from="Smart Market"
              to="Harvard University"
            />
            <View style={styles.line} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text caption1 light>
                  Felix Travel
                </Text>
                <Text headline style={{marginTop: 5}}>
                  Felix Travel
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text caption1 light>
                  {t('time')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  05:45 PM
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 25}}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text caption1 light>
                  {t('passenger')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  5 {t('persons')}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text caption1 light>
                  {t('seat_number')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  1, 2, 3, 7, 10
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 25}}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text caption1 light>
                  {t('ticket_no')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  CLMVBG
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text caption1 light>
                  {t('confirm_date')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  10/10/2019
                </Text>
              </View>
            </View>
            <View style={styles.line} />
            <View style={{alignItems: 'flex-end'}}>
              <Text caption1 light>
                {t('total_fare')}
              </Text>
              <Text title3 semibold>
                $200
              </Text>
            </View>
            <View style={styles.code}>
              <Icon name="qrcode" size={150} color={colors.text} />
            </View>
          </View>
        </ScrollView>
        <View style={{margin: 20}}>
          <Button full>{t('download')}</Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
