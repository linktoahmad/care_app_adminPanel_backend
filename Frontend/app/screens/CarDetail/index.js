import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  ProfileDetail,
  ProfilePerformance,
  Tag,
  HelpBlock,
  StarRating,
} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {UserData, HelpBlockData} from '@data';

export default function CarDetail({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [slide] = useState([
    {image: Images.car1},
    {image: Images.car2},
    {image: Images.car3},
    {image: Images.car4},
  ]);
  const [services] = useState([
    {icon: 'user', name: '5 seats'},
    {icon: 'history', name: 'Pay at Pick-Up  '},
    {icon: 'snowflake', name: 'AC'},
    {icon: 'paw', name: 'Pet Allowed'},
    {icon: 'wifi', name: 'Free Wifi'},
  ]);
  const [userData] = useState(UserData[0]);
  const [helpBlock] = useState(HelpBlockData);

  // Show bottom modal when user press for booking
  const openModalBottom = () => {
    setModalVisible(true);
  };

  // Render container bottom
  const renderModalBottom = () => {
    return (
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View
          style={[styles.contentFilterBottom, {backgroundColor: colors.card}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <View style={styles.contentModel}>
            <View style={{alignItems: 'flex-start'}}>
              <Text title3>{t('economy')}</Text>
              <Text subhead grayColor>
                Ford Mustang
              </Text>
              <Text title3 primaryColor semibold style={{marginTop: 5}}>
                $399,99
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <StarRating
                  disabled={true}
                  starSize={10}
                  maxStars={5}
                  rating={4}
                  selectedStar={rating => {}}
                  fullStarColor={BaseColor.yellowColor}
                />

                <Text
                  caption1
                  grayColor
                  semibold
                  style={{
                    marginLeft: 3,
                  }}>
                  100 {t('reviews')}
                </Text>
              </View>
            </View>
            <Tag
              primary
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('PreviewBooking');
              }}>
              {t('book_now')}
            </Tag>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('car_detail')}
        subTitle="24 Dec 2018"
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
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('book')}
            </Text>
          );
        }}
        onPressRight={() => {
          openModalBottom();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        {renderModalBottom()}
        <ScrollView>
          <View style={styles.wrapper}>
            <Swiper
              dotStyle={{
                backgroundColor: BaseColor.dividerColor,
              }}
              activeDotColor={colors.primary}
              paginationStyle={styles.contentPage}
              removeClippedSubviews={false}>
              {slide.map((item, index) => {
                return (
                  <Image
                    source={item.image}
                    style={styles.img}
                    resizeMode="contain"
                    key={index}
                  />
                );
              })}
            </Swiper>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
              alignItems: 'flex-start',
            }}>
            <Text headline semibold>
              {t('information')}
            </Text>
            <Text body2 style={{marginTop: 5}}>
              218 Austen Mountain, consectetur adipiscing, sed do eiusmod tempor
              incididunt ut labore et dolore
            </Text>
            <Text headline semibold style={{marginTop: 20}}>
              {t('features')}
            </Text>
            <View style={styles.listContentService}>
              {services.map((item, index) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      flex: 1,
                    }}
                    key={index}>
                    <Icon
                      name={item.icon}
                      color={colors.accent}
                      size={16}
                      solid
                    />
                    <Text
                      overline
                      grayColor
                      numberOfLines={1}
                      style={{marginTop: 5}}>
                      {item.name}
                    </Text>
                  </View>
                );
              })}
              <Icon
                name={'angle-right'}
                color={BaseColor.grayColor}
                size={16}
                solid
                enableRTL={true}
              />
            </View>
          </View>
          <View style={[styles.line, {backgroundColor: colors.border}]} />
          <ProfileDetail
            image={userData.image}
            textFirst={userData.name}
            point={userData.point}
            textSecond={userData.address}
            textThird={userData.id}
            style={{paddingHorizontal: 20}}
            onPress={() => navigation.navigate('Profile1')}
          />
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <ProfilePerformance type="medium" data={userData.performance} />
          </View>
          <View style={styles.contentContact}>
            <Tag
              outline
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Messages')}>
              {t('contact_host')}
            </Tag>
            <Tag primary onPress={() => navigation.navigate('Profile')}>
              {t('view_profile')}
            </Tag>
          </View>
          <View style={[styles.line, {backgroundColor: colors.border}]} />
          <View style={{paddingHorizontal: 20, marginTop: 10}}>
            <HelpBlock
              title={helpBlock.title}
              description={helpBlock.description}
              phone={helpBlock.phone}
              email={helpBlock.email}
              style={{margin: 20}}
              onPress={() => {
                navigation.navigate('ContactUs');
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
