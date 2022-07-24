import React from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function PreviewBusBooking({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('preview_booking')}
        subTitle="Booking Number GAX02"
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
          <View style={{paddingHorizontal: 20}}>
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text body2 style={{marginBottom: 10}}>
                {t('bus_name')}
              </Text>
              <Text body1 semibold>
                Felix Travel
              </Text>
            </View>
            <View style={{paddingVertical: 10}}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                  <Text body2>{t('depart_time')}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text body2 semibold>
                    02-Dec 2018
                  </Text>
                  <Text caption1 grayColor>
                    14:00 PM
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                  <Text body2>{t('arrive_time')}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text body2 semibold>
                    02-Dec 2018
                  </Text>
                  <Text caption1 grayColor>
                    16:00 PM
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                  <Text body2>{t('duration')}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text body2 semibold>
                    2 {t('hours')}
                  </Text>
                  <Text caption1 grayColor></Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                  <Text body2>{t('total_ticket')}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text body2 semibold>
                    4 {t('tickets')}
                  </Text>
                  <Text caption1 grayColor></Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View>
            <Text caption1 semibold>
              5 {t('tickets')}
            </Text>
            <Text title3 primaryColor semibold>
              $399.99
            </Text>
            <Text caption1 semibold style={{marginTop: 5}}>
              {t('total_price')}
            </Text>
          </View>
          <Button
            onPress={() =>
              navigation.navigate('CheckOut', {
                bookingType: 'Bus',
              })
            }>
            {t('continue')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
