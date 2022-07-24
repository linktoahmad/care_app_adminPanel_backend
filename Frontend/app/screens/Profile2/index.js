import React, {useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  HotelItem,
  Button,
  ProfilePerformance,
} from '@components';
import styles from './styles';
import {TabView, TabBar} from 'react-native-tab-view';
import {UserData, HotelData} from '@data';
import {useTranslation} from 'react-i18next';

export default function Profile2({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'booking', title: t('booking')},
    {key: 'profile', title: t('profile')},
    {key: 'setting', title: t('setting')},
    {key: 'activity', title: t('activity')},
  ]);
  const [userData] = useState(UserData[0]);

  // When tab is activated, set what's index value
  const handleIndexChange = index => setIndex(index);

  // Customize UI tab bar
  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={[styles.indicator, {backgroundColor: colors.primary}]}
      style={[styles.tabbar, {backgroundColor: colors.background}]}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.text}
      renderLabel={({route, focused, color}) => (
        <View style={{flex: 1, width: 100, alignItems: 'center'}}>
          <Text headline semibold={focused} style={{color}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  // Render correct screen container when tab is activated
  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'booking':
        return <BookingTab jumpTo={jumpTo} navigation={navigation} />;
      case 'profile':
        return <ProfileTab jumpTo={jumpTo} navigation={navigation} />;
      case 'setting':
        return <SettingTab jumpTo={jumpTo} navigation={navigation} />;
      case 'activity':
        return <ActivityTab jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title="Profile2"
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
          <View style={{padding: 20}}>
            <Text title1 semibold>
              {userData.name}
            </Text>
            <Text subhead grayColor>
              {userData.major}
            </Text>
            <View style={styles.location}>
              <Icon name="map-marker-alt" size={10} color={colors.primary} />
              <Text
                caption1
                primaryColor
                style={{
                  marginHorizontal: 5,
                }}>
                {userData.address}
              </Text>
            </View>
            <View style={styles.contentInfor}>
              <Image
                style={{width: 100, height: 100}}
                source={Images.profile2}
              />
              <View style={styles.contentInforLeft}>
                <ProfilePerformance
                  data={userData.performance}
                  flexDirection="column"
                />
              </View>
            </View>
            <Button full style={{marginTop: 28, marginBottom: 28}}>
              {t('follow')}
            </Button>
            <Text headline semibold style={{marginBottom: 10}}>
              {t('about_me')}
            </Text>
            <Text body2 numberOfLines={5}>
              {userData.about}
            </Text>
          </View>
          <TabView
            lazy
            navigationState={{index, routes}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={handleIndexChange}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/**
 * @description Show when tab Booking activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function BookingTab({navigation}) {
  const [hotels] = useState(HotelData);

  return (
    <FlatList
      contentContainerStyle={{
        paddingLeft: 5,
        paddingRight: 20,
        paddingTop: 20,
      }}
      numColumns={2}
      data={hotels}
      keyExtractor={(item, index) => item.id}
      renderItem={({item, index}) => (
        <HotelItem
          grid
          image={item.image}
          name={item.name}
          location={item.location}
          price={item.price}
          available={item.available}
          rate={item.rate}
          rateStatus={item.rateStatus}
          numReviews={item.numReviews}
          services={item.services}
          style={{marginLeft: 15, marginBottom: 20}}
          onPress={() => navigation.navigate('HotelDetail')}
        />
      )}
    />
  );
}

/**
 * @description Show when tab Profile activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function ProfileTab({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [reminders, setReminders] = useState(true);

  const toggleSwitch = value => {
    setReminders(value);
  };

  return (
    <View style={{padding: 20}}>
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
          navigation.navigate('ChangeLanguage');
        }}>
        <Text body1>{t('change_language')}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text body1 grayColor>
            English
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
      <View
        style={[
          styles.profileItem,
          {borderBottomColor: colors.border, borderBottomWidth: 1},
        ]}>
        <Text body1>{t('reminders')}</Text>
        <Switch size={18} onValueChange={toggleSwitch} value={reminders} />
      </View>
      <TouchableOpacity
        style={[
          styles.profileItem,
          {borderBottomColor: colors.border, borderBottomWidth: 1},
        ]}
        onPress={() => {
          navigation.navigate('BookingHistory');
        }}>
        <Text body1>{t('booking_history')}</Text>
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
          navigation.navigate('Coupons');
        }}>
        <Text body1>{t('coupons')}</Text>
        <Icon
          name="angle-right"
          size={18}
          color={colors.primary}
          style={{marginLeft: 5}}
          enableRTL={true}
        />
      </TouchableOpacity>
    </View>
  );
}

/**
 * @description Show when tab Setting activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function SettingTab({navigation}) {
  return <View style={{padding: 20}} />;
}

/**
 * @description Show when tab Activity activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function ActivityTab({navigation}) {
  return <View style={{padding: 20}} />;
}
