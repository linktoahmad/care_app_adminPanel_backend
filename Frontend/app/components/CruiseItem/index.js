import React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {Image, Text, Icon, StarRating, Tag} from '@components';
import {BaseColor, useTheme} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function CruiseItem(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const cardColor = colors.card;
  const {
    block,
    grid,
    list,
    style,
    image,
    brand,
    name,
    location,
    price,
    saleOff,
    time,
    rate,
    rateCount,
    rateStatus,
    numReviews,
    itinerary,
    onPress,
    onPressTag,
  } = props;

  /**
   * Display cruise item as block
   */
  const renderBlock = () => {
    return (
      <View style={[{backgroundColor: cardColor}, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.blockImage} />
          {saleOff ? (
            <View
              style={[styles.blockPrice, {backgroundColor: colors.primary}]}>
              <Text title3 whiteColor>
                {saleOff}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
        <View style={styles.blockContent}>
          <View style={{alignItems: 'flex-start'}}>
            <View style={styles.iconLine}>
              <Icon name="calendar-alt" color={BaseColor.grayColor} size={10} />
              <Text caption2 light style={{marginLeft: 3}}>
                {time}
              </Text>
            </View>
            <Text headline semibold style={{marginVertical: 5}}>
              {name}
            </Text>
            <Text caption2 light style={{marginLeft: 3}}>
              {location}
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Tag onPress={onPressTag} rate>
                {rate}
              </Tag>
              <View
                style={{
                  marginLeft: 10,
                }}>
                <Text caption1 grayColor semibold style={{paddingBottom: 5}}>
                  {rateStatus}
                </Text>
                <StarRating
                  disabled={true}
                  starSize={10}
                  maxStars={5}
                  rating={rate}
                  selectedStar={rating => {}}
                  fullStarColor={BaseColor.yellowColor}
                />
              </View>
            </View>
            <View style={styles.blockStatusRate}>
              <Text caption1 semibold grayColor>
                {t('rating')}
              </Text>
              <Text caption1 primaryColor style={{marginLeft: 3}}>
                {rateCount}
              </Text>
            </View>
          </View>
        </View>
        <Text
          caption2
          accentColor
          style={{marginHorizontal: 20, marginTop: 10}}>
          {itinerary}
        </Text>
        <View style={styles.blockBottom}>
          <View style={{alignItems: 'flex-start'}}>
            <Text title3 semibold primaryColor>
              {price}
            </Text>
            <Text caption1>{t('from_person')}</Text>
          </View>
          {brand ? (
            <Image
              style={{height: 30, width: 120}}
              source={brand}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </View>
    );
  };

  /**
   * Display cruise item as list
   */
  const renderList = () => {
    return (
      <View style={[styles.listContent, {backgroundColor: cardColor}, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.listImage} />
          {saleOff ? (
            <View style={[styles.listPrice, {backgroundColor: colors.primary}]}>
              <Text caption2 whiteColor>
                {saleOff}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
        <View style={styles.listContentRight}>
          <Text headline semibold numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.listContentRow}>
            <View style={styles.iconRow}>
              <Icon name="calendar-alt" color={BaseColor.grayColor} size={10} />
              <Text
                caption2
                grayColor
                style={{
                  marginLeft: 3,
                  flex: 1,
                }}
                numberOfLines={1}>
                {time}
              </Text>
            </View>
            <View style={styles.iconRow}>
              <Icon
                name="map-marker-alt"
                color={BaseColor.grayColor}
                size={10}
              />
              <Text
                caption1
                grayColor
                style={{
                  marginLeft: 3,
                }}
                numberOfLines={1}>
                {location}
              </Text>
            </View>
          </View>
          <View style={styles.listContentRow}>
            <StarRating
              disabled={true}
              starSize={10}
              maxStars={5}
              rating={rate}
              selectedStar={rating => {}}
              fullStarColor={BaseColor.yellowColor}
            />
            <Text
              caption1
              grayColor
              semibold
              style={{
                marginLeft: 10,
                marginRight: 3,
              }}>
              {t('rating')}
            </Text>
            <Text caption1 primaryColor semibold>
              {rateCount}
            </Text>
          </View>
          <Text caption2 accentColor style={{marginTop: 5}}>
            {itinerary}
          </Text>
          <View style={styles.listContentPrice}>
            <View style={{alignItems: 'flex-start'}}>
              <Text title3 primaryColor semibold style={{marginTop: 5}}>
                {price}
              </Text>
              <Text caption1>{t('from_person')}</Text>
            </View>
            {brand ? (
              <Image
                style={{
                  height: 30,
                  width: 120,
                }}
                source={brand}
                resizeMode="contain"
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  /**
   * Display cruise item as grid
   */
  const renderGrid = () => {
    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.girdImage} />
        </TouchableOpacity>
        <View style={styles.girdContentName}>
          <Text body2 semibold>
            {name}
          </Text>
          {saleOff ? (
            <View
              style={[styles.girdSaleOff, {backgroundColor: colors.primary}]}>
              <Text caption2 whiteColor>
                {saleOff}
              </Text>
            </View>
          ) : null}
        </View>
        <Text caption2 grayColor numberOfLines={1} style={{paddingVertical: 5}}>
          {location}
        </Text>
        <View style={styles.girdContentRate}>
          <StarRating
            disabled={true}
            starSize={10}
            maxStars={5}
            rating={rate}
            selectedStar={rating => {}}
            fullStarColor={BaseColor.yellowColor}
          />
          <Text caption2 grayColor>
            {numReviews} {t('reviews')}
          </Text>
        </View>
        <Text caption2 accentColor numberOfLines={2} style={{marginTop: 5}}>
          {itinerary}
        </Text>
        <Text
          title3
          primaryColor
          semibold
          style={{
            marginTop: 5,
          }}>
          {price}
        </Text>
      </View>
    );
  };

  if (grid) return renderGrid();
  else if (block) return renderBlock();
  else return renderList();
}

CruiseItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  brand: PropTypes.node,
  list: PropTypes.bool,
  block: PropTypes.bool,
  grid: PropTypes.bool,
  name: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.string,
  saleOff: PropTypes.string,
  time: PropTypes.string,
  rate: PropTypes.number,
  rateCount: PropTypes.string,
  rateStatus: PropTypes.string,
  numReviews: PropTypes.number,
  itinerary: PropTypes.string,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

CruiseItem.defaultProps = {
  style: {},
  image: '',
  brand: '',
  list: true,
  block: false,
  grid: false,
  name: '',
  location: '',
  price: '',
  saleOff: '',
  time: '',
  rate: 0,
  rateCount: '',
  rateStatus: '',
  numReviews: 0,
  itinerary: '',
  onPress: () => {},
  onPressTag: () => {},
};
