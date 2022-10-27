import React, {useEffect, useState} from 'react';
import {View, Animated, TouchableOpacity, FlatList} from 'react-native';
import {Text, Icon, Card, Button, SafeAreaView} from '@components';
import {Images, useTheme} from '@config';
import * as Utils from '@utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import axios from 'react-native-axios';
import apiList, {serverIp} from '../../apiList';
import Cover from "../CareCover.png"

export default function Home({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const moodStatus = useSelector(state => state.application);

  const [activities, setActivities] = useState([
    {
      name: 'Jogging',
      mood: 'relaxed',
      description:
        'Jogging is an relaxing axtivity for enthusastic individuals',
      image:
        'http://192.168.0.8:4000/host/images/130931e4-0519-4fd0-94f5-5eb84acb7447.jpg',
    },
    {
      name: 'Running',
      mood: 'joy',
      description: 'Running is an Joyful axtivity for enthusastic individuals',
      image:
        'http://192.168.0.8:4000/host/images/130931e4-0519-4fd0-94f5-5eb84acb7447.jpg',
    },
    {
      name: 'Reading',
      mood: 'calm',
      description: 'reading is an calm axtivity for intellect individuals',
      image:
        'http://192.168.0.8:4000/host/images/130931e4-0519-4fd0-94f5-5eb84acb7447.jpg',
    },
  ]);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const deltaY = new Animated.Value(0);

  const getActivities = () => {
    axios
      .get(apiList.GetDisplayActivity)
      .then(res => {
        console.log(res.data);
        setActivities(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const renderIconService = () => {
    /* [sad-cry,sad-tear,frown,flushed,meh,smile,smile-beam,grin-alt,grin-beam,grin-stars] */
    // moods enum=[depressed,stressed,upset,tense,fatigued,calm,relaxed,happy,excited,joy]

    switch (moodStatus.quizData.mood) {
      case 'depressed':
        return 'sad-cry';
        break;
      case 'stressed':
        return 'sad-tear';
        break;
      case 'upset':
        return 'frown';
        break;
      case 'tense':
        return 'flushed';
        break;
      case 'fatigued':
        return 'meh';
        break;
      case 'calm':
        return 'smile';
        break;
      case 'relaxed':
        return 'smile-beam';
        break;
      case 'happy':
        return 'grin-alt';
        break;
      case 'excited':
        return 'grin-beam';
        break;
      case 'joy':
        return 'grin-stars';
        break;
      case '':
        return 'heart';
        break;
      default:
        return 'heart';
    }
  };

  const heightImageBanner = Utils.scaleWithPixel(140);
  const marginTopBanner = heightImageBanner - heightHeader;

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={Cover}
        style={[
          styles.imageBackground,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(100),
                Utils.scaleWithPixel(100),
              ],
              outputRange: [heightImageBanner, heightHeader, 0],
            }),
          },
        ]}
      />
      <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
        <FlatList
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}
          ListHeaderComponent={
            <View style={{paddingHorizontal: 20}}>
              <View
                style={[
                  styles.searchForm,
                  {
                    marginTop: marginTopBanner,
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    shadowColor: colors.border,
                  },
                ]}>
                <Text semibold style={styles.titleView}>
                  Mood According to last quiz
                </Text>
                <Icon
                  name={renderIconService()}
                  size={100}
                  color={colors.primary}
                  style={{textAlign: 'center'}}
                />
                <Text title3 semibold style={{textAlign: 'center'}}>
                  {moodStatus.quizData.mood !== ''
                    ? moodStatus.quizData.mood
                    : ''}
                </Text>
                <Text style={styles.titleView}>
                  Following are some activities that should boost your mood
                </Text>
              </View>
            </View>
          }
          ListFooterComponent={
            <View>
              <View>
                <Text title3 semibold style={{paddingLeft: 20}}>
                  {t('Recomended')}
                </Text>
                <Text body2 grayColor style={{paddingLeft: 20}}>
                  {t('Recomended for everyone')}
                </Text>
                <FlatList
                  contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={activities}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({item, index}) => (
                    <Card
                      style={[styles.promotionItem]}
                      image={serverIp + item.image}
                      onPress={() =>
                        navigation.navigate('HotelDetail', {activity: item})
                      }>
                      <Text subhead whiteColor>
                        Recomenended Activity
                      </Text>
                      <Text title2 whiteColor semibold>
                        {item.name}
                      </Text>
                      <View style={styles.contentCartPromotion}>
                        <Button
                          style={styles.btnPromotion}
                          onPress={() =>
                            navigation.navigate('HotelDetail', {activity: item})
                          }>
                          <Text body2 semibold whiteColor>
                            More Details
                          </Text>
                        </Button>
                      </View>
                    </Card>
                  )}
                />
              </View>
              {/* Hiking */}
              <View>
                <Text title3 semibold style={{paddingLeft: 20}}>
                  {t('Helpful With Mood')}
                </Text>
                <Text body2 grayColor style={{paddingLeft: 20}}>
                  {t('this will boost your mood')}
                </Text>
                <FlatList
                  contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={activities}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({item, index}) => (
                    <Card
                      style={[styles.promotionItem]}
                      image={serverIp + item.image}
                      onPress={() =>
                        navigation.navigate('HotelDetail', {activity: item})
                      }>
                      <Text subhead whiteColor>
                        Recomenended Activity
                      </Text>
                      <Text title2 whiteColor semibold>
                        {item.name}
                      </Text>
                      <View style={styles.contentCartPromotion}>
                        <Button
                          style={styles.btnPromotion}
                          onPress={() =>
                            navigation.navigate('HotelDetail', {activity: item})
                          }>
                          <Text body2 semibold whiteColor>
                            More Details
                          </Text>
                        </Button>
                      </View>
                    </Card>
                  )}
                />
              </View>
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
