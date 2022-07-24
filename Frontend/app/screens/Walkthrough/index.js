import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {SafeAreaView, Text, Button, Image} from '@components';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {BaseColor, BaseStyle, Images, useTheme} from '@config';
import * as Utils from '@utils';
import {useTranslation} from 'react-i18next';
import GoogleButton from "./googlelogin"

export default function Walkthrough({navigation}) {
 
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [slide] = useState([
    {key: 1, image: Images.trip2, text:"Make your mood better everyday"},
    {key: 2, image: Images.trip1, text:"Take a quiz based on your Mood"},
    {key: 3, image: Images.trip3, text:"Daily Activities to make your mood better"},
    {key: 4, image: Images.trip4, text:"Track your daily Mood Progress"},
  ]);
  const {colors} = useTheme();

  const {t} = useTranslation();
  /**
   * @description Simple authentication without call any APIs
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
 

  return (
    <SafeAreaView
      style={BaseStyle.safeAreaView}
      edges={['right', 'left', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.contain}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
        }>
        <View style={styles.wrapper}>
          {/* Images Swiper */}
          <Swiper
            dotStyle={{
              backgroundColor: BaseColor.dividerColor,
            }}
            activeDotColor={colors.primary}
            paginationStyle={styles.contentPage}
            removeClippedSubviews={false}>
            {slide.map((item, index) => {
              return (
                <View style={styles.slide} key={item.key}>
                  <Image source={item.image} style={styles.img} />
                  <Text body1 style={styles.textSlide}>
                  {item.text}
                  </Text>
                </View>
              );
            })}
          </Swiper>
        </View>
        <View style={{width: '100%'}}>
        {/* <Button
            full
            style={{
              backgroundColor: "black",
              marginTop: 20,
            }}
            onPress={() => {
              authentication();
            }}>
            {t('Uee Google Account')}
          </Button> */}
          <GoogleButton />
          <Button
            full
            style={{marginTop: 20}}
            onPress={() => navigation.navigate('SignIn')}>
            {t('sign_in')}
          </Button>
          <View style={styles.contentActionBottom}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text body1 grayColor>
                {t('not_have_account')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text body1 primaryColor>
                {t('join_now')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
