import React, {useState} from 'react';
import {View, ScrollView, Animated} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text} from '@components';
import * as Utils from '@utils';
import {serverIp} from "../../apiList"

import styles from './styles';

import {useTranslation} from 'react-i18next';

export default function HotelDetail({route, navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const {activity} = route.params;
 
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const deltaY = new Animated.Value(0);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={{
          uri: serverIp+`${activity.image}`,
        }}
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(200),
                Utils.scaleWithPixel(200),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}
      />
      {/* Header */}
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.whiteColor}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('PreviewImage');
        }}
      />
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}>
          {/* Main Container */}
          <View style={{paddingHorizontal: 20}}>
            {/* Information */}
            <View
              style={[
                styles.contentBoxTop,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.card,
                  shadowColor: colors.border,
                  borderColor: colors.border,
                },
              ]}>
              <Text title2 semibold>
                {activity.name}
              </Text>
            </View>
            {/* Rating Review */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <View style={styles.contentRateDetail}>
                <View style={[styles.contentLineRate, {marginRight: 10}]}>
                  <View style={{flex: 1}}>
                    <Text caption2 grayColor style={{marginBottom: 5}}>
                      Boost mood
                    </Text>
                    <View style={styles.lineBaseRate} />
                    <View
                      style={[
                        styles.linePercent,
                        {backgroundColor: colors.accent},
                        {width: `${Math.floor(Math.random() * 100)}%`},
                      ]}
                    />
                  </View>
                </View>
                <View style={styles.contentLineRate}>
                  <View style={{flex: 1}}>
                    <Text caption2 grayColor style={{marginBottom: 5}}>
                      Mental Relaxation
                    </Text>
                    <View style={styles.lineBaseRate} />
                    <View
                      style={[
                        styles.linePercent,
                        {backgroundColor: colors.accent},
                        {width: `${Math.floor(Math.random() * 100)}%`},
                      ]}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.contentRateDetail}>
                <View style={[styles.contentLineRate, {marginRight: 10}]}>
                  <View style={{flex: 1}}>
                    <Text caption2 grayColor style={{marginBottom: 5}}>
                      Good for Heart
                    </Text>
                    <View style={styles.lineBaseRate} />
                    <View
                      style={[
                        styles.linePercent,
                        {backgroundColor: colors.accent},
                        {width: `${Math.floor(Math.random() * 100)}%`},
                      ]}
                    />
                  </View>
                </View>
                <View style={styles.contentLineRate}>
                  <View style={{flex: 1}}>
                    <Text caption2 grayColor style={{marginBottom: 5}}>
                      Overall Benefits
                    </Text>
                    <View style={styles.lineBaseRate} />
                    <View
                      style={[
                        styles.linePercent,
                        {backgroundColor: colors.accent},
                        {width: `${Math.floor(Math.random() * 100)}%`},
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* Description */}
            <View
              style={[styles.blockView, {borderBottomColor: colors.border}]}>
              <Text headline semibold>
                Activity Description
              </Text>
              <Text body2 style={{marginTop: 5}}>
                {activity.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
