import React, {useState} from 'react';
import {View, ScrollView, Animated} from 'react-native';
import {Images, useTheme} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfilePerformance,
} from '@components';
import * as Utils from '@utils';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';

export default function Profile5({navigation}) {
  const deltaY = new Animated.Value(0);
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [userData] = useState(UserData[0]);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(335, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 120;

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={Images.room6}
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(280),
                Utils.scaleWithPixel(290),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}
      />
      <Header
        title=""
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
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <View style={{flex: 1}}>
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
            <View style={[styles.contentUser, {marginTop: marginTopBanner}]}>
              <Image
                source={Images.profile2}
                style={styles.imgUser}
                resizeMode="cover"
              />
              <View style={styles.contentLeftUser}>
                <Text title1 semibold whiteColor>
                  {userData.name}
                </Text>
                <Text subhead whiteColor style={{marginBottom: 9}}>
                  {userData.major}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="map-marker-alt"
                    size={10}
                    color={colors.primary}
                  />
                  <Text
                    footnote
                    primaryColor
                    numberOfLines={1}
                    style={{marginHorizontal: 5}}>
                    {userData.address}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                padding: 20,
              }}>
              <Text headline semibold>
                {t('about_me')}
              </Text>
              <Text body2 numberOfLines={5} style={{marginTop: 10}}>
                {userData.about}
              </Text>
            </View>
            <View style={{paddingHorizontal: 20}}>
              <ProfilePerformance data={userData.performance} />
            </View>
            <View style={{padding: 20}}>
              <Button full>{t('follow')}</Button>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
