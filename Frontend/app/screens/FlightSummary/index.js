import React from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  FlightPlan,
  Text,
  FlightItem,
  Button,
} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function FlightSummary({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('booking_summary')}
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
            <FlightPlan
              round={true}
              fromCode="SIN"
              toCode="SYD"
              from="Singapore"
              to="Sydney"
            />
            <View style={styles.line} />
            <Text title3 style={{paddingVertical: 10}}>
              {t('thur')}, 15 Aug 2019
            </Text>
            <FlightItem
              from={{
                name: 'United State',
                value: 'USA',
                image: Images.airline1,
                hour: '05:00',
              }}
              to={{
                name: 'Singapore',
                value: 'SIN',
                image: Images.airline2,
                hour: '18:00',
              }}
              totalHour={13.5}
              brand="Singapore Air"
              image={Images.airline2}
              type="Economy"
              price="$499.99"
              route="non_stop"
              onPress={() => navigation.navigate('FlightTicket')}
            />
            <View style={styles.line} />
            <Text title3 style={{paddingVertical: 10}}>
              Thu, 20 Aug 2019
            </Text>
            <FlightItem
              from={{
                name: 'United State',
                value: 'USA',
                image: Images.airline1,
                hour: '05:00',
              }}
              to={{
                name: 'Singapore',
                value: 'SIN',
                image: Images.airline3,
                hour: '18:00',
              }}
              totalHour={13.5}
              brand="Emirates Air"
              image={Images.airline3}
              type="Economy"
              price="$499.99"
              route="non_stop"
              onPress={() => navigation.navigate('FlightTicket')}
            />
          </View>
        </ScrollView>
        <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View>
            <Text caption1 semibold>
              {t('total_price')}
            </Text>
            <Text title3 primaryColor semibold>
              $399.99
            </Text>
            <Text caption1 semibold style={{marginTop: 5}}>
              {t('all_charged_included')}
            </Text>
          </View>
          <Button onPress={() => navigation.navigate('PreviewBooking')}>
            {t('book_now')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
