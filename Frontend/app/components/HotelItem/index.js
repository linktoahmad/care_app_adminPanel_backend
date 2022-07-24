import React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {Image, Text, Icon, StarRating, Tag} from '@components';
import {BaseColor, useTheme} from '@config';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import styles from './styles';
export default function HotelItem(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {
    list,
    block,
    grid,
    style,
    image,
    name,
    location,
    price,
    available,
    rate,
    rateStatus,
    onPress,
    onPressTag,
    services,
    rateCount,
    numReviews,
  } = props;

  /**
   * Display hotel item as block
   */
  const renderBlock = () => {
    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.blockImage} />
        </TouchableOpacity>
        <View style={{paddingHorizontal: 20}}>
          <Text title2 semibold style={{marginTop: 5}} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.blockContentAddress}>
            <Icon name="map-marker-alt" color={colors.primaryLight} size={10} />
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
          <View style={styles.blockContentDetail}>
            <View style={{flex: 1}}>
              <Text title3 primaryColor semibold>
                {price}
              </Text>
              <Text
                caption1
                accentColor
                style={{
                  marginTop: 3,
                }}
                numberOfLines={1}>
                {available}
              </Text>
            </View>
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
          </View>
        </View>
        <View style={styles.contentService}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={services}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <View style={styles.serviceItemBlock} key={'block' + index}>
                <Icon name={item.icon} size={16} color={colors.accent} />
                <Text
                  overline
                  grayColor
                  style={{marginTop: 4}}
                  numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingHorizontal: 12,
            }}>
            <Icon name="angle-right" size={16} color={BaseColor.dividerColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /**
   * Display hotel item as list
   */
  const renderList = () => {
    return (
      <View style={[styles.listContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.listImage} />
        </TouchableOpacity>
        <View style={styles.listContentRight}>
          <Text headline semibold numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.listContentRow}>
            <Icon name="map-marker-alt" color={colors.primaryLight} size={10} />
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
          <Text
            title3
            primaryColor
            semibold
            style={{marginTop: 5, marginBottom: 5}}>
            {price}
          </Text>
          <Text caption1 semibold>
            {t('avg_night')}
          </Text>
          <Text footnote accentColor style={{marginTop: 3}}>
            {available}
          </Text>
        </View>
      </View>
    );
  };

  /**
   * Display hotel item as grid
   */
  const renderGrid = () => {
    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.girdImage} />
        </TouchableOpacity>
        <View style={styles.girdContentLocation}>
          <Icon name="map-marker-alt" color={colors.primary} size={10} />
          <Text
            caption2
            grayColor
            style={{
              marginHorizontal: 5,
            }}
            numberOfLines={1}>
            {location}
          </Text>
        </View>
        <Text
          body2
          semibold
          style={{
            marginTop: 5,
          }}>
          {name}
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

HotelItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  list: PropTypes.bool,
  block: PropTypes.bool,
  grid: PropTypes.bool,
  name: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.string,
  available: PropTypes.string,
  rate: PropTypes.number,
  rateCount: PropTypes.string,
  rateStatus: PropTypes.string,
  numReviews: PropTypes.number,
  services: PropTypes.array,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

HotelItem.defaultProps = {
  style: {},
  image: '',
  list: true,
  block: false,
  grid: false,
  name: '',
  location: '',
  price: '',
  available: '',
  rate: 0,
  rateCount: '',
  rateStatus: '',
  numReviews: 0,
  services: [],
  onPress: () => {},
  onPressTag: () => {},
};
