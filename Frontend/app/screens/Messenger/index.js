import React, {useEffect, useState} from 'react';
import {RefreshControl, FlatList, View, AsyncStorage} from 'react-native';
import {BaseColor, useTheme, DefaultFont} from '@config';
import {Text, Icon, FormOption} from '@components';
import {Header, SafeAreaView, ListThumbSquare} from '@components';
import styles from './styles';
import {MessagesData} from '@data';
import {useTranslation} from 'react-i18next';
import axios from 'react-native-axios';
import apiList from '../../apiList';
import {Calendar} from 'react-native-calendars';

//todo
// history color according to mode
// getting history data

export default function Messenger({navigation}) {

  const user_id = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        console.log("___________________________X_____________X__________________")
        console.log(value);
        console.log("___________________________X_____________X__________________")
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const {colors} = useTheme();
  const {t} = useTranslation();

  const [refreshing] = useState(false);
  const [messenger] = useState(MessagesData);
  const [history, setHistory] = useState({});

  const getColorMood = score => {
    switch (true) {
      case score <= 10:
        return '#ff7575';

      case score > 10 && score <= 20:
        return '#ff8c75';

      case score > 20 && score <= 30:
        return '#ffa375';

      case score > 30 && score <= 40:
        return '#ffba75';

      case score > 40 && score <= 50:
        return '#ffd375';

      case score > 50 && score <= 60:
        return '#efff75';

      case score > 60 && score <= 70:
        return '#c3ff75';

      case score > 70 && score <= 80:
        return '#8aff75';

      case score > 80 && score <= 90:
        return '#75ffb3';

      case score > 90:
        return '#75ffe6';
    }
  };

  const getHistory = () => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 2)
      .toISOString('uk')
      .substring(0, 10);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      .toISOString('uk')
      .substring(0, 10);

    // post api because get dont have
    axios
      .post(apiList.GetMonthData, {
        sdate: firstDay, // first day of month
        edate: lastDay, // last day of month
        userId: '628e42e0409975153c6d8f8e',
      })
      .then(res => {
        const x = {};
        res.data.forEach(item => {
          x[item.dateOfQuiz.substring(0, 10)] = {
            customStyles: {
              container: {
                backgroundColor: getColorMood(Number(item.score)),
              },
              text: {
                color: getColorMood(Number(item.score)),
                fontWeight: 'bold',
              },
            },
          };
        });
        console.log("________________________________X_________________________________")
        console.log(x)
        console.log("________________________________X_________________________________")
        setHistory(x);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    user_id();
    getHistory();
    
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title={t('History')} />

      <View style={[styles.contentCalendar, {backgroundColor: colors.card}]}>
        <Calendar markingType={'custom'} markedDates={history} />
      </View>
     
     <FormOption style={{marginTop: 20}} />
    </View>
  );
}
