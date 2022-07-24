import React, {useState} from 'react';
import {FlatList, RefreshControl, View, Animated} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, FlightItem, FilterSort} from '@components';
import styles from './styles';
import {FlightData} from '@data';
import {useTranslation} from 'react-i18next';

export default function FlightResult({navigation}) {
  const {t} = useTranslation();
  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    40,
  );

  const [refreshing] = useState(false);
  const [flights] = useState(FlightData);
  const {colors} = useTheme();

  const onChangeSort = () => {};

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const onFilter = () => {
    navigation.navigate('FlightFilter');
  };

  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  const renderContent = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    return (
      <View style={{flex: 1}}>
        <Animated.FlatList
          contentContainerStyle={{
            paddingTop: 50,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnim,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
          data={flights}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <FlightItem
              style={{marginBottom: 10, marginHorizontal: 20}}
              from={item.from}
              to={item.to}
              totalHour={item.totalHour}
              brand={item.brand}
              image={item.image}
              type={item.type}
              price={item.price}
              route={item.route}
              onPress={() => navigation.navigate('FlightSummary')}
            />
          )}
        />
        <Animated.View
          style={[styles.navbar, {transform: [{translateY: navbarTranslate}]}]}>
          <FilterSort
            labelCustom={`204 ${t('results')}`}
            onChangeSort={onChangeSort}
            onFilter={onFilter}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={`SIN ${t('to')} SYN`}
        subTitle="24 Dec 2018, 5 pax, Economy"
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
        {renderContent()}
      </SafeAreaView>
    </View>
  );
}
