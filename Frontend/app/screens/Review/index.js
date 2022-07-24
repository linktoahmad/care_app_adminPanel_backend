import React, {useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  RateDetail,
  CommentItem,
} from '@components';
import styles from './styles';
import {ReviewData} from '@data';
import {useTranslation} from 'react-i18next';

export default function Review({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [refreshing] = useState(false);
  const [rateDetail] = useState({
    point: 4.7,
    maxPoint: 5,
    totalRating: 25,
    data: ['5%', '5%', '35%', '40%', '10%'],
  });
  const [reviewList] = useState(ReviewData);

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('reviews')}
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
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('replay')}
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('Feedback');
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        {/* Sample User Review List */}
        <FlatList
          contentContainerStyle={{padding: 20}}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
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
      </SafeAreaView>
    </View>
  );
}
