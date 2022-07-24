import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  RefreshControl,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  Image,
  RateDetail,
  CommentItem,
  PostListItem,
  HelpBlock,
  StarRating,
  TextInput,
} from '@components';
import {TabView, TabBar} from 'react-native-tab-view';
import * as Utils from '@utils';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {HelpBlockData, ReviewData} from '@data';

export default function CruiseDetail({navigation}) {
  const {t} = useTranslation();
  const deltaY = new Animated.Value(0);
  const {colors} = useTheme();

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
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
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'itinerary', title: t('itinerary')},
    {key: 'information', title: t('information')},
    {key: 'review', title: t('reviews')},
    {key: 'feedback', title: t('feedback')},
  ]);

  // When tab is activated, set what's index value
  const handleIndexChange = index => {
    setIndex(index);
  };

  // Customize UI tab bar
  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={[styles.indicator, {backgroundColor: colors.primary}]}
      style={[styles.tabbar, {backgroundColor: colors.background}]}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.text}
      renderLabel={({route, focused, color}) => (
        <View style={{flex: 1, width: 130, alignItems: 'center'}}>
          <Text headline semibold={focused} style={{color}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );
  // Render correct screen container when tab is activated
  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'information':
        return <InformationTab jumpTo={jumpTo} navigation={navigation} />;
      case 'itinerary':
        return <Itinerary jumpTo={jumpTo} navigation={navigation} />;
      case 'feedback':
        return <Feedback jumpTo={jumpTo} navigation={navigation} />;
      case 'review':
        return <ReviewTab jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader;

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(150),
                Utils.scaleWithPixel(150),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}>
        <Image
          source={Images.cruise1}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
        <Text
          title2
          semibold
          whiteColor
          style={{
            position: 'absolute',
            paddingTop: heightHeader - 45,
          }}>
          Europe Cruises
        </Text>
      </Animated.View>
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
        {/* Header */}

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
          <View
            style={[
              {paddingHorizontal: 20, paddingTop: 10},
              {marginTop: marginTopBanner},
            ]}>
            <Text headline semibold style={{marginBottom: 10}}>
              {t('specials')}
            </Text>
            <FlatList
              numColumns={5}
              data={service}
              keyExtractor={(item, index) => item.id}
              renderItem={({item}) => (
                <View style={styles.serviceItem}>
                  <Icon name={item.name} size={24} color={colors.accent} />
                  <Text overline grayColor>
                    Free Wifi
                  </Text>
                </View>
              )}
            />
          </View>
          <TabView
            lazy
            navigationState={{index, routes}}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={handleIndexChange}
          />
        </ScrollView>
        {/* Pricing & Booking Process */}
        <View
          style={[styles.contentButtonBottom, {borderTopColor: colors.border}]}>
          <View style={{alignItems: 'flex-start'}}>
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

/**
 * @description Show when tab Information activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function InformationTab({navigation}) {
  const {t} = useTranslation();
  return (
    <View style={{paddingHorizontal: 20, marginTop: 10}}>
      <Text headline semibold>
        {t('day')} 1: London - Somme - Paris
      </Text>
      <Image
        source={Images.cruise1}
        style={{height: 120, width: '100%', marginTop: 10}}
      />
      <Text body2 style={{marginTop: 10}}>
        Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo.
        Located in one of the uprising areas of Tokyo
      </Text>
      <Text body2 style={{marginTop: 10}}>
        Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo.
        Located in one of the uprising areas of Tokyo
      </Text>
      <Text body2 style={{marginTop: 10}}>
        Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo.
        Located in one of the uprising areas of Tokyo
      </Text>
      <Text headline semibold style={{marginTop: 20}}>
        {t('day')} 2: Paris - Burgundy - Swiss Alps
      </Text>
      <Image
        source={Images.cruise2}
        style={{height: 120, width: '100%', marginTop: 10}}
      />
      <Text body2 style={{marginTop: 10}}>
        Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo.
        Located in one of the uprising areas of Tokyo
      </Text>
      <Text body2 style={{marginTop: 10}}>
        Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo.
        Located in one of the uprising areas of Tokyo
      </Text>
      <Text body2 style={{marginTop: 10}}>
        Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo.
        Located in one of the uprising areas of Tokyo
      </Text>
      <Text headline semibold style={{marginTop: 20}}>
        {t('day')} 3: Swiss Alps - Strasbourg - Heidel…
      </Text>
      <Image
        source={Images.cruise3}
        style={{height: 120, width: '100%', marginTop: 10}}
      />
      <Text body2 style={{marginTop: 10}}>
        Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo.
        Located in one of the uprising areas of Tokyo
      </Text>
      <Text body2 style={{marginTop: 10}}>
        Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo.
        Located in one of the uprising areas of Tokyo
      </Text>
      <Text body2 style={{marginTop: 10}}>
        Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo.
        Located in one of the uprising areas of Tokyo
      </Text>
    </View>
  );
}

/**
 * @description Show when tab Itinerary activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function Itinerary({navigation}) {
  const {t} = useTranslation();
  const [renderMapView, setRenderMapView] = useState(false);
  const [region] = useState({
    latitude: 1.9344,
    longitude: 103.358727,
    latitudeDelta: 0.05,
    longitudeDelta: 0.004,
  });
  const [helpBlock] = useState(HelpBlockData);
  const [todo] = useState([
    {
      id: '1',
      title: 'South Travon',
      image: Images.trip1,
    },
    {
      id: '2',
      title: 'South Travon',
      image: Images.trip2,
    },
    {
      id: '3',
      title: 'South Travon',
      image: Images.trip3,
    },
    {
      id: '4',
      title: 'South Travon',
      image: Images.trip4,
    },
    {
      id: '5',
      title: 'South Travon',
      image: Images.trip5,
    },
  ]);
  const {colors} = useTheme();
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setRenderMapView(true);
    });
  }, []);

  return (
    <View style={{paddingHorizontal: 20, alignItems: 'flex-start'}}>
      <Text body2 style={{marginTop: 15}}>
        The beauty of natural wonders and rustic wildlife sightings makes this
        Alaska cruise a remarkable experience. Venture into the wilderness on a
        dogsled ride in Juneau, witness Misty Fjords aboard a jet-powered
        catamaran in Ketchikan, and take it all in via the rails on the Skagway
        White Pass Scenic Railway.
      </Text>
      <View style={styles.mapContent}>
        {renderMapView && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            onRegionChange={() => {}}>
            <Marker
              coordinate={{
                latitude: 1.9344,
                longitude: 103.358727,
              }}
            />
          </MapView>
        )}
      </View>
      <View style={[styles.lineInfor, {borderColor: colors.border}]}>
        <Text headline numberOfLines={1} style={{flex: 1}}>
          {t('day')}
        </Text>
        <Text headline numberOfLines={1} style={{flex: 2}}>
          {t('ports')}
        </Text>
        <Text headline numberOfLines={1} style={{flex: 1}}>
          {t('arrive')}
        </Text>
        <Text headline numberOfLines={1} style={{flex: 1, textAlign: 'right'}}>
          {t('depart')}
        </Text>
      </View>
      <View style={[styles.lineInfor, {borderColor: colors.border}]}>
        <Text caption1 numberOfLines={1} style={{flex: 1}}>
          {t('mon')}
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 2}}>
          Seattle, Washington
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 1}}>
          --
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 1, textAlign: 'right'}}>
          5:00 pm
        </Text>
      </View>
      <View style={[styles.lineInfor, {borderColor: colors.border}]}>
        <Text caption1 numberOfLines={1} style={{flex: 1}}>
          {t('tue')}
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 2}}>
          Skagway, Alaska
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 1}}>
          7:00 am
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 1, textAlign: 'right'}}>
          8:00 pm
        </Text>
      </View>
      <View style={[styles.lineInfor, {borderColor: colors.border}]}>
        <Text caption1 numberOfLines={1} style={{flex: 1}}>
          {t('wed')}
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 2}}>
          Skagway, Alaska
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 1}}>
          7:00 am
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 1, textAlign: 'right'}}>
          8:00 pm
        </Text>
      </View>
      <View style={styles.lineInfor}>
        <Text caption1 numberOfLines={1} style={{flex: 1}}>
          {t('thur')}
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 2}}>
          Skagway, Alaska
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 1}}>
          7:00 am
        </Text>
        <Text caption1 numberOfLines={1} style={{flex: 1, textAlign: 'right'}}>
          8:00 pm
        </Text>
      </View>
      <View style={styles.todoTitle}>
        <Text headline semibold>
          {t('todo_things')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Post');
          }}>
          <Text caption1 grayColor>
            {t('show_more')}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={todo}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <PostListItem
            style={{marginRight: 15}}
            title="South Travon"
            date="6 Deals Left"
            description="Andaz Tokyo Toranomon Hills is one of the newest luxury hotels in Tokyo. Located in one of the uprising areas of Tokyo"
            image={item.image}
            onPress={() => {
              navigation.navigate('PostDetail');
            }}
          />
        )}
      />
      <HelpBlock
        title={helpBlock.title}
        description={helpBlock.description}
        phone={helpBlock.phone}
        email={helpBlock.email}
        style={{marginTop: 15}}
        onPress={() => {
          navigation.navigate('ContactUs');
        }}
      />
      <View
        style={{
          paddingVertical: 15,
          alignItems: 'flex-start',
        }}>
        <Text headline semibold>
          {t('if_you_have_question')}
        </Text>
        <View style={styles.itemReason}>
          <Icon name="map-marker-alt" size={18} color={colors.accent} />
          <View style={{paddingHorizontal: 10, alignItems: 'flex-start'}}>
            <Text subhead semibold>
              How Can We Get Great Food
            </Text>
            <Text body2 style={{flex: 1}}>
              Excellent cuisine, typical dishes from the best Romagna tradition
              and more!
            </Text>
          </View>
        </View>
        <View style={styles.itemReason}>
          <Icon name="pagelines" size={18} color={colors.accent} />
          <View style={{paddingHorizontal: 10}}>
            <Text subhead semibold>
              Great Food
            </Text>
            <Text body2 style={{flex: 1}}>
              Excellent cuisine, typical dishes from the best Romagna tradition
              and more!
            </Text>
          </View>
        </View>
        <View style={styles.itemReason}>
          <Icon name="servicestack" size={18} color={colors.accent} />
          <View style={{paddingHorizontal: 10}}>
            <Text subhead semibold>
              Private Beach
            </Text>
            <Text body2 style={{flex: 1}}>
              Excellent cuisine, typical dishes from the best Romagna tradition
              and more!
            </Text>
          </View>
        </View>
        <View style={styles.itemReason}>
          <Icon name="trophy" size={18} color={colors.accent} />
          <View style={{paddingHorizontal: 10}}>
            <Text subhead semibold>
              5 Stars Hospitality
            </Text>
            <Text body2 style={{flex: 1}}>
              Romagna hospitality, typical and much
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * @description Show when tab Package activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function Feedback({navigation}) {
  const {t} = useTranslation();
  const [rate, setRate] = useState(4.5);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  return (
    <View style={{alignItems: 'center', padding: 20}}>
      <View style={{width: 160}}>
        <StarRating
          starSize={26}
          maxStars={5}
          rating={rate}
          selectedStar={rating => {
            setRate(rating);
          }}
          fullStarColor={BaseColor.yellowColor}
          containerStyle={{padding: 5}}
        />
        <Text caption1 grayColor style={{textAlign: 'center'}}>
          {t('tap_to_rate')}
        </Text>
      </View>
      <TextInput
        style={{marginTop: 10}}
        onChangeText={text => setTitle(text)}
        placeholder={t('input_title')}
        value={title}
      />
      <TextInput
        style={{marginTop: 20, height: 140}}
        onChangeText={text => setReview(text)}
        textAlignVertical="top"
        multiline={true}
        placeholder="Reviews"
        value={review}
      />
      <Button full style={{marginTop: 20}} onPress={() => {}}>
        {t('send')}
      </Button>
    </View>
  );
}

/**
 * @description Show when tab Review activated
 * @author Passion UI <passionui.com>
 * @date 2019-08-03
 * @class PreviewTab
 * @extends {Component}
 */
function ReviewTab({navigation}) {
  const [rateDetail] = useState({
    point: 4.7,
    maxPoint: 5,
    totalRating: 25,
    data: ['80%', '10%', '10%', '0%', '0%'],
  });
  const [reviewList] = useState(ReviewData);
  const {colors} = useTheme();

  return (
    <FlatList
      contentContainerStyle={{padding: 20}}
      refreshControl={
        <RefreshControl
          colors={[colors.primary]}
          tintColor={colors.primary}
          onRefresh={() => {}}
        />
      }
      data={reviewList}
      keyExtractor={(item, index) => item.id}
      ListHeaderComponent={() => (
        <RateDetail
          point={rateDetail.point}
          maxPoint={rateDetail.maxPoint}
          totalRating={rateDetail.totalRating}
          data={rateDetail.data}
        />
      )}
      renderItem={({item}) => (
        <CommentItem
          style={{marginTop: 10}}
          image={item.source}
          name={item.name}
          rate={item.rate}
          date={item.date}
          title={item.title}
          comment={item.comment}
        />
      )}
    />
  );
}
