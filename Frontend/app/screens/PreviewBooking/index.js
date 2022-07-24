import React from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function PreviewBooking({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

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
                {t('hotels')}
              </Text>
              <Text body1 semibold>
                Hilton San Francisco
              </Text>
            </View>
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                  <Text body2>{t('check_in')}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text body2 semibold>
                    {t('check_in')}
                  </Text>
                  <Text caption1 grayColor>
                    {t('sun')}, 14:00
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                  <Text body2>{t('check_out')}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text body2 semibold>
                    {t('check_out')}
                  </Text>
                  <Text caption1 grayColor>
                    {t('mon')}, 14:00
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 1}}>
                  <Text body2>{t('duration')}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text body2 semibold>
                    1 {t('night')}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text body2 style={{marginBottom: 10}}>
                {t('room')}
              </Text>
              <Text body1 semibold style={{marginBottom: 5}}>
                Standard Twin Room (x1)
              </Text>
              <Text body2 style={{marginBottom: 5}}>
                Other hygienic practices that the new hotel, among other guests
              </Text>
              <Text body2 style={{marginBottom: 5}}>
                Other hygienic practices that the new hotel, among other guests
              </Text>
              <Text body2 style={{marginBottom: 5}}>
                Other hygienic practices that the new hotel, among other guests
              </Text>
            </View>
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text body2 style={{marginBottom: 10}}>
                Contact’s Name
              </Text>
              <Text body1 semibold style={{marginBottom: 5}}>
                Standard Twin Room (x1)
              </Text>
              <Text body2 grayColor style={{marginBottom: 5}}>
                Other hygienic practices that the new hotel — which handles,
                among other guests, patients seeking medical treatment at the
                Texas Medical Center — include removing nonessential items like
                decorative pillows and magazines
              </Text>
            </View>
            <View style={{paddingVertical: 10}}>
              <Text body2 style={{marginBottom: 10}}>
                Price Details
              </Text>
              <Text body1 semibold style={{marginBottom: 5}}>
                Standard Twin Room (x1)
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View>
            <Text caption1 semibold grayColor>
              2 {t('day')} / 1 {t('night')}
            </Text>
            <Text title3 primaryColor semibold>
              $399.99
            </Text>
            <Text caption1 semibold grayColor style={{marginTop: 5}}>
              2 {t('adults')} / 1 {t('children')}
            </Text>
          </View>
          <Button onPress={() => navigation.navigate('CheckOut')}>
            {t('continue')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
