import React, {useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  ProfileGroup,
  Tag,
  Image,
  Button,
  EventCard,
} from '@components';
import {useTranslation} from 'react-i18next';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Utils from '@utils';
import styles from './styles';

export default function EventDetail({navigation}) {
  const deltaY = new Animated.Value(0);
  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [region] = useState({
    latitude: 1.352083,
    longitude: 103.819839,
    latitudeDelta: 0.009,
    longitudeDelta: 0.004,
  });
  const [facilities] = useState([
    {id: '1', icon: 'wifi', name: 'Free Wifi', checked: true},
    {id: '2', icon: 'bath', name: 'Shower'},
    {id: '3', icon: 'paw', name: 'Pet Allowed'},
    {id: '4', icon: 'bus', name: 'Shuttle Bus'},
    {id: '5', icon: 'cart-plus', name: 'Supper Market'},
    {id: '6', icon: 'clock', name: 'Open 24/7'},
  ]);
  const [relate] = useState([
    {
      id: '0',
      image: Images.event4,
      title: 'BBC Music Introducing',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
    {
      id: '1',
      image: Images.event5,
      title: 'Bearded Theory Spring Gathering',
      time: 'Thu, Oct 31, 9:00am',
      location: 'Tobacco Dock, London',
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}>
        <Image source={Images.event1} style={{flex: 1}} />
        <Animated.View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingHorizontal: 20,
            width: '100%',
            bottom: 15,
            opacity: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [1, 0, 0],
            }),
          }}>
          <View style={styles.rowBanner}>
            <Image source={Images.profile2} style={styles.userIcon} />
            <View style={{alignItems: 'flex-start'}}>
              <Text headline semibold whiteColor>
                Steve Garrett
              </Text>
              <Text footnote whiteColor>
                5 {t('hour_ago')} | 100k {t('views')}
              </Text>
            </View>
          </View>
          <Tag rateSmall>{t('sold_out')}</Tag>
        </Animated.View>
      </Animated.View>
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
        renderRight={() => {
          return <Icon name="images" size={20} color={BaseColor.whiteColor} />;
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
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          scrollEventThrottle={8}>
          <View style={{height: 255 - heightHeader}} />
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            <Text title1 semibold numberOfLines={1} style={{marginBottom: 10}}>
              Truckfighters: Performing Gravity X
            </Text>
            <ProfileGroup
              name="Steve, Lincoln, Harry"
              detail={`15 ${t('people_like_this')}`}
              users={[
                {image: Images.profile1},
                {image: Images.profile3},
                {image: Images.profile4},
              ]}
            />
            <Text body2 semibold style={{marginTop: 10}}>
              {t('date_time')}
            </Text>
            <Text body2 grayColor style={{marginTop: 10, marginBottom: 20}}>
              Mon 29 Sep, 19:00 - 22:00
            </Text>
            <Text body2 semibold>
              {t('address')}
            </Text>
            <Text body2 grayColor style={{marginVertical: 10}}>
              0408 Collier Falls Apt. 921
            </Text>
            <View
              style={{
                height: 180,
              }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                onRegionChange={() => {}}>
                <Marker
                  coordinate={{
                    latitude: 1.352083,
                    longitude: 103.819839,
                  }}
                />
              </MapView>
            </View>
            <Text body2 semibold style={{marginTop: 20, marginBottom: 10}}>
              {t('description')}
            </Text>
            <Text body2 grayColor lineHeight={20}>
              Desertscene, in association with X-Ray Touring, proudly presents:
              The return of TRUCKFIGHETERS Playing 'Gravity X' from finish to
              start. Plus special guests Swan Valley Heights
            </Text>
            <View style={{alignItems: 'flex-end'}}>
              <Text caption1 accentColor>
                {t('see_details')}
              </Text>
            </View>
            <Text title3 semibold style={{marginTop: 10, marginBottom: 5}}>
              {t('price')}
            </Text>
            <View style={[styles.itemPrice, {borderColor: colors.border}]}>
              <Text headline semibold>
                #{t('ticket_general')}
              </Text>
              <Text body2 grayColor style={{marginVertical: 5}}>
                Provide a baseline experience for attendees. They also help you
                convert people who don’t want
              </Text>
              <View style={styles.linePrice}>
                <Text title3 primaryColor semibold>
                  $399,99
                </Text>
                <View style={styles.iconRight}>
                  <TouchableOpacity>
                    <Icon
                      name="minus-circle"
                      size={24}
                      color={BaseColor.grayColor}
                    />
                  </TouchableOpacity>
                  <Text title1 style={{paddingHorizontal: 10}}>
                    1
                  </Text>
                  <TouchableOpacity>
                    <Icon name="plus-circle" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.itemPrice, {borderColor: colors.border}]}>
              <Text headline semibold>
                #{t('ticket_vip')}
              </Text>
              <Text body2 grayColor style={{marginVertical: 5}}>
                Offer attendees the exact experience they’re looking for, at the
                exact price they’re willing to pay.
              </Text>
              <View style={styles.linePrice}>
                <Text title3 primaryColor semibold>
                  $299,99
                </Text>
                <View style={styles.iconRight}>
                  <TouchableOpacity>
                    <Icon
                      name="minus-circle"
                      size={24}
                      color={BaseColor.grayColor}
                    />
                  </TouchableOpacity>
                  <Text title1 style={{paddingHorizontal: 10}}>
                    1
                  </Text>
                  <TouchableOpacity>
                    <Icon name="plus-circle" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.itemPrice, {borderColor: colors.border}]}>
              <Text headline semibold>
                #{t('ticket_reserved')}
              </Text>
              <Text body2 grayColor style={{marginVertical: 5}}>
                Provide big value for attendees wanting to be closer to a
                performer or speaker at your event.
              </Text>
              <View style={styles.linePrice}>
                <Text title3 primaryColor semibold>
                  $199,99
                </Text>
                <View style={styles.iconRight}>
                  <TouchableOpacity>
                    <Icon
                      name="minus-circle"
                      size={24}
                      color={BaseColor.grayColor}
                    />
                  </TouchableOpacity>
                  <Text title1 style={{paddingHorizontal: 10}}>
                    1
                  </Text>
                  <TouchableOpacity>
                    <Icon name="plus-circle" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text
              title3
              semibold
              style={{
                paddingTop: 10,
              }}>
              {t('facilities')}
            </Text>
            <View style={[styles.wrapContent, {borderColor: colors.border}]}>
              {facilities.map(item => {
                return (
                  <Tag
                    icon={
                      <Icon
                        name={item.icon}
                        size={12}
                        color={colors.accent}
                        solid
                        style={{marginRight: 5}}
                      />
                    }
                    chip
                    key={item.id}
                    style={{
                      marginTop: 10,
                      marginRight: 10,
                    }}>
                    {item.name}
                  </Tag>
                );
              })}
            </View>
          </View>
          <Text
            title3
            semibold
            style={{
              marginLeft: 20,
              marginBottom: 20,
            }}>
            {t('you_may_also_like')}
          </Text>
          <FlatList
            contentContainerStyle={{
              paddingLeft: 5,
              paddingRight: 20,
              marginBottom: 20,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={relate}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <EventCard
                image={item.image}
                title={item.title}
                time={item.time}
                location={item.location}
                onPress={() => navigation.navigate('PreviewBooking')}
                style={{marginLeft: 15}}
              />
            )}
          />
        </ScrollView>
        {/* Pricing & Booking Process */}
        <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View>
            <Text caption1 semibold grayColor>
              {t('avg_price')}
            </Text>
            <Text title3 primaryColor semibold>
              $399.99
            </Text>
            <Text caption1 semibold grayColor style={{marginTop: 5}}>
              {t('person_ticket')}
            </Text>
          </View>
          <Button onPress={() => navigation.navigate('EventPreviewBooking')}>
            {t('book_now')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
