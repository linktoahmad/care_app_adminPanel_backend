import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Animated,
  FlatList,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Tag, HotelItem} from '@components';
import {TabView, TabBar} from 'react-native-tab-view';
import {UserData, HotelData} from '@data';
import * as Utils from '@utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function Profile4({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const scrollY = new Animated.Value(0);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'profile', title: t('profile')},
    {key: 'booking', title: t('booking')},
    {key: 'payment', title: t('payment')},
  ]);
  const [userData] = useState(UserData[0]);

  /**
   * call when change index tab
   * @param {*} index
   */
  const handleIndexChange = index => setIndex(index);

  /**
   * render UI tab bar
   * @param {*} props
   */
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
        <View
          style={{
            flex: 1,
            width: Utils.getWidthDevice() / 3,
            alignItems: 'center',
          }}>
          <Text headline semibold={focused} style={{color}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  /**
   * render UI content tab
   * @param {*} {route, jumpTo}
   * @returns
   */
  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'booking':
        return <BookingTab jumpTo={jumpTo} navigation={navigation} />;
      case 'profile':
        return <ProfileTab jumpTo={jumpTo} navigation={navigation} />;
      case 'payment':
        return <PaymentTab jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  const imageScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [-5, 50],
    extrapolate: 'clamp',
  });
  return (
    <View style={{flex: 1}}>
      <Header
        title="Profile4"
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
        <ScrollView
          scrollEventThrottle={8}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: scrollY},
              },
            },
          ])}>
          <View style={[styles.containField, {backgroundColor: colors.card}]}>
            <View style={styles.contentLeftItem}>
              <Text title2 semibold>
                {userData.performance[2].value}
              </Text>
              <Text caption1 grayColor>
                {userData.performance[2].title}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Animated.Image
                source={Images.profile2}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  position: 'absolute',
                  alignSelf: 'center',
                  bottom: 70,
                  transform: [
                    {
                      scale: imageScale,
                    },
                    {
                      translateY: imageTranslateY,
                    },
                  ],
                }}
              />
              <Text headline semibold numberOfLines={1}>
                {userData.name}
              </Text>
              <Tag primary style={styles.tagFollow}>
                + {t('follow')}
              </Tag>
            </View>
            <View style={styles.contentLeftItem}>
              <Text title2 semibold>
                {userData.performance[1].value}
              </Text>
              <Text caption1 grayColor>
                {userData.performance[1].title}
              </Text>
            </View>
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

function BookingTab(props) {
  const {navigation} = props;
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

function ProfileTab(props) {
  const {navigation} = props;
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [reminders, setReminders] = useState(true);

  /**
   *
   * call when change reminder
   * @param {*} value
   */
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
        onPress={() => {}}>
        <Text body1>{t('booking_history')}</Text>
        <Icon
          name="angle-right"
          size={18}
          color={colors.primary}
          style={{marginLeft: 5}}
          enableRTL={true}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileItem} onPress={() => {}}>
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
function PaymentTab(props) {
  return <View style={{marginTop: 20}} />;
}
