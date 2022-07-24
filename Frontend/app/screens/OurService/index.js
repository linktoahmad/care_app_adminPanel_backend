import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Image,
  ProfileDescription,
} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function OurService({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [ourTeam] = useState([
    {
      image: Images.profile2,
      subName: 'CEO Founder',
      name: 'Kondo Ieyasu',
      screen: 'Profile1',
      description:
        'Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo',
    },
    {
      image: Images.profile3,
      subName: 'Sale Manager',
      name: 'Yeray Rosales',
      screen: 'Profile2',
      description:
        'Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo',
    },
    {
      image: Images.profile5,
      subName: 'Product Manager',
      name: 'Alf Huncoot',
      screen: 'Profile3',
      description:
        'Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo',
    },
    {
      image: Images.profile4,
      subName: 'Designer UI/UX',
      name: 'Chioke Okonkwo',
      screen: 'Profile4',
      description:
        'Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo',
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('our_service')}
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
          <View>
            <Image source={Images.trip4} style={{width: '100%', height: 135}} />
            <View style={styles.titleAbout}>
              <Text title1 semibold whiteColor>
                {t('our_service')}
              </Text>
              <Text subhead whiteColor>
                {t('sologan_about_us')}
              </Text>
            </View>
          </View>
          <View style={{padding: 20}}>
            <ProfileDescription
              image={require('@assets/images/profile-2.jpg')}
              name="Steve Garrett"
              subName="Travel Agency"
              description="Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo"
              onPress={() => navigation.navigate('Profile1')}
            />
            {/* Package */}
            <View style={{marginTop: 20}}>
              <Image
                source={Images.trip1}
                style={{width: '100%', height: 100}}
              />
              <View
                style={[
                  styles.titleAbout,
                  {
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                  },
                ]}>
                <Icon
                  name="creative-commons"
                  solid
                  size={24}
                  color={BaseColor.whiteColor}
                />
                <View style={{marginLeft: 10}}>
                  <Text title3 semibold whiteColor>
                    {t('basic_package')}
                  </Text>
                  <Text footnote whiteColor numberOfLines={2}>
                    Andaz Tokyo Toranomon Hills is one of the newest luxury
                    hotels in Tokyo. Located in one of the uprising areas of
                    Tokyo
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Image
                source={Images.trip2}
                style={{width: '100%', height: 100}}
              />
              <View
                style={[
                  styles.titleAbout,
                  {
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                  },
                ]}>
                <Icon
                  name="app-store-ios"
                  solid
                  size={24}
                  color={BaseColor.whiteColor}
                />
                <View style={{marginLeft: 10}}>
                  <Text title3 semibold whiteColor>
                    {t('standard_package')}
                  </Text>
                  <Text footnote whiteColor numberOfLines={2}>
                    Andaz Tokyo Toranomon Hills is one of the newest luxury
                    hotels in Tokyo. Located in one of the uprising areas of
                    Tokyo
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <Image
                source={Images.trip3}
                style={{width: '100%', height: 100}}
              />
              <View
                style={[
                  styles.titleAbout,
                  {
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                  },
                ]}>
                <Icon
                  name="algolia"
                  solid
                  size={24}
                  color={BaseColor.whiteColor}
                />
                <View style={{marginLeft: 10}}>
                  <Text title3 semibold whiteColor>
                    {t('premium_package')}
                  </Text>
                  <Text footnote whiteColor numberOfLines={2}>
                    Andaz Tokyo Toranomon Hills is one of the newest luxury
                    hotels in Tokyo. Located in one of the uprising areas of
                    Tokyo
                  </Text>
                </View>
              </View>
            </View>
            {/* Service */}
            <Text headline semibold style={{marginTop: 20}}>
              {t('our_service').toUpperCase()}
            </Text>
            {ourTeam.map((item, index) => {
              return (
                <ProfileDescription
                  style={{marginTop: 10}}
                  key={'service' + index}
                  image={item.image}
                  description={item.description}
                  name={item.name}
                  subName={item.subName}
                  onPress={() => navigation.navigate(item.screen)}
                />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
