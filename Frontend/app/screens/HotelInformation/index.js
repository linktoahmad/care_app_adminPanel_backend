import React, {useState} from 'react';
import {View, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  ProfileDetail,
  ProfilePerformance,
  Tag,
  PostListItem,
  Button,
} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {UserData} from '@data';

export default function HotelInformation({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [userData] = useState(UserData[0]);
  const [service] = useState([
    {id: '1', name: 'wifi'},
    {id: '2', name: 'coffee'},
    {id: '3', name: 'bath'},
    {id: '4', name: 'car'},
    {id: '5', name: 'paw'},
    {id: '6', name: 'futbol'},
    {id: '7', name: 'user-secret'},
    {id: '8', name: 'clock'},
    {id: '9', name: 'tv'},
    {id: '10', name: 'futbol'},
  ]);

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('hotel_information')}
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
          {/* Image Gallery */}
          <TouchableOpacity
            style={styles.contentGallery}
            onPress={() => {
              navigation.navigate('PreviewImage');
            }}
            activeOpacity={0.9}>
            <View style={styles.galleryLineTop}>
              <View style={{flex: 1, paddingRight: 5}}>
                <Image
                  source={Images.room1}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={Images.room2}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
            </View>
            <View style={styles.galleryLineBottom}>
              <View style={{flex: 1, paddingRight: 5}}>
                <Image
                  source={Images.room3}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <View style={{flex: 1, paddingRight: 5}}>
                <Image
                  source={Images.room4}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={Images.room5}
                  style={{width: '100%', height: '100%'}}
                />
                <Text
                  headline
                  whiteColor
                  style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                  }}>
                  5+
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* Information */}
          <View style={{paddingHorizontal: 20}}>
            <Text title2 semibold style={{marginTop: 10}}>
              Standard Twin Room
            </Text>
            <View
              style={{
                width: 66,
                marginTop: 10,
                marginBottom: 20,
              }}>
              <StarRating
                disabled={true}
                starSize={14}
                maxStars={5}
                rating={4.7}
                selectedStar={rating => {}}
                fullStarColor={BaseColor.yellowColor}
              />
            </View>
            {/* Facilities & Icon */}
            <Text headline style={{marginBottom: 10}} semibold>
              {t('facilities_of_hotel')}
            </Text>
            <FlatList
              numColumns={5}
              data={service}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => (
                <View
                  style={{
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <Icon name={item.name} size={24} color={colors.accent} />
                  <Text overline grayColor>
                    Free Wifi
                  </Text>
                </View>
              )}
            />
            {/* Information */}
            <Text headline semibold style={{marginTop: 10}}>
              {t('hotel_description')}
            </Text>
            <Text footnote grayColor style={{marginBottom: 8, marginTop: 3}}>
              218 Austen Mountain, consectetur adipiscing, do eiusmod tempor
              incididunt ut labore et dolore
            </Text>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <Text caption1 accentColor>
                {t('see_details')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.line, {backgroundColor: colors.border}]} />
          {/* Hosting Profile */}
          <ProfileDetail
            image={userData.image}
            textFirst={userData.name}
            textSecond={userData.address}
            textThird={userData.id}
            point={userData.point}
            style={{paddingHorizontal: 20}}
            onPress={() => navigation.navigate('Profile1')}
          />
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <ProfilePerformance type="medium" data={userData.performance} />
          </View>

          <View style={styles.contentTag}>
            <Tag
              outline
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('Messages')}>
              {t('contact_host')}
            </Tag>
            <Tag primary onPress={() => navigation.navigate('Profile3')}>
              {t('view_profile')}
            </Tag>
          </View>
          {/* Todo Things */}
          <View style={styles.contentTodo}>
            <Text headline semibold>
              {t('todo_things')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
              <Text caption1 grayColor>
                {t('show_more')}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{
              paddingLeft: 5,
              paddingRight: 20,
              paddingBottom: 20,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={[
              {id: '1', image: Images.trip1},
              {id: '2', image: Images.trip2},
              {id: '3', image: Images.trip3},
              {id: '4', image: Images.trip4},
              {id: '5', image: Images.trip5},
            ]}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => (
              <PostListItem
                image={item.image}
                style={{marginLeft: 15}}
                title="South Travon"
                description="Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo"
                date="6 Deals Left"
                onPress={() => navigation.navigate('PostDetail')}
              />
            )}
          />
        </ScrollView>
        {/* Pricing & Booking Process */}
        <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View>
            <Text caption1 semibold>
              {t('price')}
            </Text>
            <Text title3 primaryColor semibold>
              $399.99
            </Text>
            <Text caption1 semibold style={{marginTop: 5}}>
              {t('avg_night')}
            </Text>
          </View>
          <Button onPress={() => navigation.navigate('PreviewBooking')}>
            {t('book_now')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
