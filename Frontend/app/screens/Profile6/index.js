import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
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

export default function Profile6({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [userData] = useState(UserData[0]);
  const heightBanner = Utils.scaleWithPixel(178);

  return (
    <View style={{flex: 1}}>
      <Image
        source={Images.room6}
        style={[styles.imgBanner, {height: heightBanner}]}
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
        <Image
          source={Images.profile2}
          style={[styles.imgimage, {top: heightBanner - 50}]}
        />
        <ScrollView style={{marginTop: heightBanner}}>
          <View
            style={{
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <Text title1 semibold>
              {userData.name}
            </Text>
            <Text subhead grayColor style={{marginBottom: 9}}>
              {userData.major}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon name="map-marker-alt" size={10} color={colors.primary} />
              <Text footnote primaryColor style={{marginLeft: 3}}>
                {userData.address}
              </Text>
            </View>
            <Text body2 numberOfLines={5} style={{marginVertical: 10}}>
              {userData.about}
            </Text>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <ProfilePerformance type="small" data={userData.performance} />
          </View>
          <View style={{padding: 20}}>
            <Button full>{t('follow')}</Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
