import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  BookingTime,
  Tag,
  FlightPlan,
  FormOption,
  QuantityPicker,
  Button,
} from '@components';

import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function FlightSearch({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [round, setRound] = useState(true);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState({
    id: '2',
    name: 'Singapore',
    value: 'SIN',
    image: Images.airline2,
  });
  const [to, setTo] = useState({
    id: '3',
    name: 'Sydney',
    value: 'SYN',
    image: Images.airline3,
  });

  /**
   * select FlightType
   * @param {*} round
   */
  const onSetFlightType = round => {
    setRound(round);
  };

  /**
   * onSelect Flight
   * @param {*} type
   */
  const onSelectFlight = type => {
    switch (type) {
      case 'to':
        navigation.navigate('SelectFlight', {
          selected: to,
          onChangeAir: air => setTo(air),
        });
        break;
      case 'from':
        navigation.navigate('SelectFlight', {
          selected: from,
          onChangeAir: air => setFrom(air),
        });
        break;
      default:
        break;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('search_flight')}
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
        <ScrollView contentContainerStyle={styles.contain} style={{flex: 1}}>
          <View style={styles.flightType}>
            <Tag
              outline={!round}
              primary={round}
              round
              onPress={() => onSetFlightType(true)}
              style={{marginHorizontal: 20}}>
              {t('round_trip')}
            </Tag>
            <Tag
              outline={round}
              primary={!round}
              round
              onPress={() => onSetFlightType(false)}>
              {t('one_way')}
            </Tag>
          </View>
          <FlightPlan
            round={round}
            fromCode={from.value}
            toCode={to.value}
            from={from.name}
            to={to.name}
            style={{marginTop: 20}}
            onPressFrom={() => onSelectFlight('from')}
            onPressTo={() => onSelectFlight('to')}
          />
          <BookingTime style={{marginTop: 20}} />
          <FormOption style={{marginTop: 20}} />
          <View style={{marginTop: 20, flexDirection: 'row'}}>
            <QuantityPicker
              label={t('adults')}
              detail={`>= 12 ${t('years')}`}
              value={1}
            />
            <QuantityPicker
              label={t('children')}
              detail={`2 - 12 ${t('years')}`}
              value={1}
              style={{marginHorizontal: 15}}
            />
            <QuantityPicker
              label={t('infants')}
              detail={`<= 2 ${t('years')}`}
              value={1}
            />
          </View>
        </ScrollView>
        <View style={{padding: 20}}>
          <Button
            loading={loading}
            full
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                navigation.navigate('FlightResult');
                setLoading(false);
              }, 500);
            }}>
            {t('search')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
