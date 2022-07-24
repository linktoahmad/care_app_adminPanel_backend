import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  TextInput,
  EventCard,
  EventItem,
} from '@components';
import {EventListData} from '@data';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function DashboardEvent({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [search, setSearch] = useState('');
  const [loading] = useState(false);
  const [recommend] = useState(EventListData);
  const [services] = useState([
    {
      id: '1',
      color: colors.primaryLight,
      icon: 'compass',
      name: 'all',
    },
    {
      id: '2',
      color: BaseColor.kashmir,
      icon: 'music',
      name: 'music',
    },
    {
      id: '3',
      color: BaseColor.blueColor,
      icon: 'futbol',
      name: 'sports',
    },
    {
      id: '4',
      color: BaseColor.pinkColor,
      icon: 'star',
      name: 'shows',
    },
    {
      id: '5',
      color: colors.primary,
      icon: 'bullseye',
      name: 'discounts',
    },
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

  /**
   * onSearch change
   * @param {*} keyword
   */
  const onSearch = keyword => {};

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('search')}
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
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView>
          <View style={{padding: 20}}>
            <TextInput
              onChangeText={text => setSearch(text)}
              placeholder={t('search')}
              value={search}
              onSubmitEditing={() => {
                onSearch(search);
              }}
              icon={
                <TouchableOpacity
                  onPress={() => {
                    setSearch('');
                  }}
                  style={styles.btnClearSearch}>
                  <Icon name="times" size={18} color={BaseColor.grayColor} />
                </TouchableOpacity>
              }
            />
          </View>
          <FlatList
            data={services}
            horizontal={true}
            keyExtractor={(item, index) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.serviceItem}
                  onPress={() => {
                    navigation.navigate('Event');
                  }}>
                  <View
                    style={[
                      styles.serviceCircleIcon,
                      {backgroundColor: item.color},
                    ]}>
                    <Icon
                      name={item.icon}
                      size={20}
                      color={BaseColor.whiteColor}
                      solid
                    />
                  </View>
                  <Text
                    footnote
                    style={{
                      marginTop: 5,
                    }}>
                    {t(item.name)}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <Text title3 semibold style={{padding: 20}}>
            {t('up_comming_events')}
          </Text>
          <View>
            <FlatList
              contentContainerStyle={{
                paddingRight: 20,
                paddingLeft: 5,
              }}
              horizontal={true}
              data={relate}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <EventCard
                  image={item.image}
                  title={item.title}
                  time={item.time}
                  location={item.location}
                  onPress={() => navigation.navigate('EventDetail')}
                  style={{marginLeft: 15}}
                />
              )}
            />
          </View>
          <Text title3 semibold style={{padding: 20}}>
            {t('recommend_for_you')}
          </Text>
          <FlatList
            contentContainerStyle={{
              paddingRight: 20,
              paddingLeft: 5,
              paddingBottom: 20,
            }}
            horizontal={true}
            data={recommend}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <EventItem
                grid
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                location={item.location}
                tracking={item.tracking}
                rate={item.rate}
                status={item.status}
                price={item.price}
                priceSale={item.priceSale}
                eventType={item.eventType}
                time={item.time}
                user={item.user}
                numTicket={item.numTicket}
                liked={item.liked}
                style={{marginLeft: 15, width: 200}}
                onPress={() => navigation.navigate('EventDetail')}
                onPressTag={() => navigation.navigate('Review')}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
