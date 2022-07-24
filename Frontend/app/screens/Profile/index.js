import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
  ProfilePerformance,
} from '@components';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import apiList from '../../apiList';

export default function Profile({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [userData, setUserdata] = useState({
    name: '',
    email: '',
    image: '',
    dateCreates: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');

      if (value !== null) {
        axios
          .get(apiList.getUserDate, {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          })
          .then(res =>
            setUserdata({
              name: res.data.name,
              email: res.data.email,
              image: res.data.image,
              dateCreates: res.data.date,
            }),
          )
          .catch(e => console.log(e));
        console.log(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * @description Simple logout with Redux
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const onLogOut = () => {
    setLoading(true);
    dispatch(AuthActions.authentication(false, response => {}));
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('profile')}
        renderRight={() => {
          return <Icon name="bell" size={24} color={colors.primary} />;
        }}
        onPressRight={() => {
          navigation.navigate('Notification');
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView>
          <View style={styles.contain}>
            <ProfileDetail
              image={userData.image}
              textFirst={userData.name}
              // point={userData.name}
              textSecond={userData.email}
              textThird={userData.dateCreates.substring(0, 10)}
              onPress={() => navigation.navigate('Profile4')}
            />
            {/* <ProfilePerformance
              data={userData.performance}
              style={{marginTop: 20, marginBottom: 20}}
            />
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => {
                navigation.navigate('ProfileEdit');
              }}>
              <Text body1>{t('edit_profile')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}>
              <Text body1>{t('change_password')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => {
                navigation.navigate('Currency');
              }}>
              <Text body1>{t('currency')}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text body1 grayColor>
                  USD
                </Text>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{marginLeft: 5}}
                  enableRTL={true}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => navigation.navigate('MyPaymentMethod')}>
              <Text body1>{t('my_cards')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Setting');
              }}>
              <Text body1>{t('setting')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity> */}
          </View>
          <View style={{margin: '20%'}}>
            <Text body1 style={{textAlign: 'center'}}>
              Care APP V 0.1{' '}
            </Text>
            <Text body1 style={{textAlign: 'center'}}>
              About US{' '}
            </Text>
            <Text body1 style={{textAlign: 'center'}}>
              CREATED BY
            </Text>
            <Text style={{textAlign: 'center'}}>NAME 1</Text>
            <Text style={{textAlign: 'center'}}>NAME 2</Text>
            <Text style={{textAlign: 'center'}}>DESCRIPTIPN</Text>
            <Text style={{textAlign: 'center'}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,{' '}
            </Text>
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <Button full loading={loading} onPress={() => onLogOut()}>
            {t('sign_out')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
