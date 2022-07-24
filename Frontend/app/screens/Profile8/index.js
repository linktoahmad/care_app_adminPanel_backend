import React, {useState} from 'react';
import {View, Image, ScrollView, Animated} from 'react-native';
import {useTheme, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Tag,
  ProfilePerformance,
} from '@components';
import * as Utils from '@utils';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';

export default function Profile8({navigation}) {
  const {colors} = useTheme();
  const deltaY = new Animated.Value(0);
  const {t} = useTranslation();

  const [userData] = useState(UserData[0]);
  const [heightHeader, setheightHeader] = useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(335, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 70;

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
                Utils.scaleWithPixel(250),
                Utils.scaleWithPixel(250),
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
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => setheightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}>
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20,
              marginTop: marginTopBanner,
            }}>
            <View style={styles.contentUser}>
              <View style={styles.contentLeftUser}>
                <Text title1 semibold whiteColor>
                  {userData.name}
                </Text>
                <Text subhead whiteColor>
                  {userData.major}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '100%',
                  flex: 1,
                }}>
                <Icon name="map-marker-alt" size={10} color={colors.primary} />
                <Text
                  footnote
                  primaryColor
                  style={{marginHorizontal: 5}}
                  numberOfLines={1}>
                  {userData.address}
                </Text>
              </View>
              <Tag
                primary
                style={{
                  width: 100,
                }}>
                + {t('follow')}
              </Tag>
            </View>
            <Text body2 grayColor numberOfLines={5} style={{marginTop: 10}}>
              {userData.about}
            </Text>
          </View>
          <ProfilePerformance
            data={userData.performance}
            style={{marginHorizontal: 20}}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
