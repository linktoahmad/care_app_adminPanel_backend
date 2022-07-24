import React, {useState} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  HotelItem,
  Tag,
  ProfilePerformance,
  Card,
} from '@components';
import styles from './styles';
import {UserData, HotelData, TourData} from '@data';
import {useTranslation} from 'react-i18next';

export default function Profile1({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [tours] = useState(TourData);
  const [hotels] = useState(HotelData);
  const [userData] = useState(UserData[0]);

  return (
    <View style={{flex: 1}}>
      <Header
        title="Profile1"
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
        <ScrollView style={{marginBottom: 20}}>
          {/* Profile Information */}
          <View style={{alignItems: 'center'}}>
            <Image source={userData.image} style={styles.image} />
            <Text title1 semibold>
              {userData.name}
            </Text>
            <Text subhead grayColor>
              {userData.major}
            </Text>
            <Tag primary style={styles.tagFollow}>
              + {t('follow')}
            </Tag>
            <View style={styles.location}>
              <Icon name="map-marker-alt" size={10} color={colors.primary} />
              <Text
                caption1
                primaryColor
                style={{
                  marginLeft: 3,
                }}>
                {userData.address}
              </Text>
            </View>
          </View>
          <Text body2 grayColor style={styles.description}>
            {userData.about}
          </Text>
          <View style={styles.contentField}>
            <ProfilePerformance type="primary" data={userData.performance} />
          </View>
          {/* Tour Information */}
          <View>
            <Text
              title3
              semibold
              style={{
                marginLeft: 20,
                marginTop: 20,
                marginBottom: 10,
              }}>
              {t('tours')}
            </Text>
            <FlatList
              contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={tours}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => {
                return (
                  <Card
                    style={[styles.tourItem, {marginLeft: 15}]}
                    image={item.image}
                    onPress={() => navigation.navigate('TourDetail')}>
                    <Text headline semibold whiteColor>
                      {item.name}
                    </Text>
                  </Card>
                );
              }}
            />
          </View>
          {/* Hotel Information */}
          <View>
            <Text
              title3
              semibold
              style={{
                marginLeft: 20,
                marginTop: 20,
                marginBottom: 10,
              }}>
              {t('hotels')}
            </Text>
            <FlatList
              contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={hotels}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <HotelItem
                  grid
                  style={[styles.hotelItem, {marginLeft: 15}]}
                  image={item.image}
                  name={item.name}
                  location={item.location}
                  price={item.price}
                  available={item.available}
                  rate={item.rate}
                  rateStatus={item.rateStatus}
                  numReviews={item.numReviews}
                  onPress={() => {
                    navigation.navigate('HotelDetail');
                  }}
                />
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
