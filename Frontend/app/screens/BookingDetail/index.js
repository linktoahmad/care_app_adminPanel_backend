import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import {TabView, TabBar} from 'react-native-tab-view';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function BookingDetail({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'preview', title: t('preview')},
    {key: 'confirm', title: t('confirm')},
    {key: 'complete', title: t('complete')},
    {key: 'detail', title: t('detail')},
  ]);

  // When tab is activated, set what's index value
  const handleIndexChange = index => {
    setIndex(index);
  };

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
        <View style={{flex: 1, alignItems: 'center', width: 100}}>
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
      case 'preview':
        return <PreviewTab jumpTo={jumpTo} navigation={navigation} />;
      case 'confirm':
        return <ConfirmTab jumpTo={jumpTo} navigation={navigation} />;
      case 'complete':
        return <CompleteTab jumpTo={jumpTo} navigation={navigation} />;
      case 'detail':
        return <DetailTab jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('booking_detail')}
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
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('save')}
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('Home');
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <TabView
          lazy
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
        />
      </SafeAreaView>
    </View>
  );
}

/**
 * @description Show when tab Preview activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function PreviewTab() {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [bookID] = useState('01233');
  return (
    <ScrollView contentContainerStyle={{padding: 20, alignItems: 'center'}}>
      <Icon
        name="copy"
        size={72}
        color={colors.primaryLight}
        style={{paddingTop: 50, paddingBottom: 20}}
      />
      <Text title3 style={{marginVertical: 25}} semibold>
        {t('booking_id')} {bookID}
      </Text>
      <Text body1 grayColor style={{textAlign: 'center'}}>
        {t('payment_completed_text')}
      </Text>
    </ScrollView>
  );
}

/**
 * @description Show when tab Confirm activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function ConfirmTab() {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [bookID] = useState('01233');
  return (
    <ScrollView contentContainerStyle={{padding: 20, alignItems: 'center'}}>
      <Icon
        name="copy"
        size={72}
        color={colors.primaryLight}
        style={{paddingTop: 50, paddingBottom: 20}}
      />
      <Text title3 style={{marginVertical: 25}} semibold>
        {t('booking_id')} {bookID}
      </Text>
      <Text body1 grayColor style={{textAlign: 'center'}}>
        {t('payment_completed_text')}
      </Text>
    </ScrollView>
  );
}

/**
 * @description Show when tab Detail activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function DetailTab() {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [bookID] = useState('01233');
  return (
    <ScrollView contentContainerStyle={{padding: 20, alignItems: 'center'}}>
      <Icon
        name="copy"
        size={72}
        color={colors.primaryLight}
        style={{paddingTop: 50, paddingBottom: 20}}
      />
      <Text title3 style={{marginVertical: 25}} semibold>
        {t('booking_id')} {bookID}
      </Text>
      <Text body1 grayColor style={{textAlign: 'center'}}>
        {t('payment_completed_text')}
      </Text>
    </ScrollView>
  );
}

/**
 * @description Show when tab Complete activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function CompleteTab() {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [bookID] = useState('01233');
  return (
    <ScrollView contentContainerStyle={{padding: 20, alignItems: 'center'}}>
      <Icon
        name="copy"
        size={72}
        color={colors.primaryLight}
        style={{paddingTop: 50, paddingBottom: 20}}
      />
      <Text title3 style={{marginVertical: 25}} semibold>
        {t('booking_id')} {bookID}
      </Text>
      <Text body1 grayColor style={{textAlign: 'center'}}>
        {t('payment_completed_text')}
      </Text>
    </ScrollView>
  );
}
