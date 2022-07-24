import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  Image,
  Text,
  Icon,
  StarRating,
  Tag,
  ProfileGroupSmall,
} from '@components';
import {BaseColor, Images, useTheme} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function EventItem(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {
    grid,
    list,
    block,
    style,
    image,
    title,
    price,
    location,
    priceSale,
    eventType,
    time,
    numTicket,
    liked,
    onPress,
    subtitle,
    tracking,
    rate,
    onPressTag,
    status,
  } = props;
  /**
   * Display event item as block
   */
  const renderBlock = () => {
    return (
      <View style={style}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.blockImage} />
          <Tag status style={styles.tagStatus}>
            {eventType}
          </Tag>
          <Icon
            name="heart"
            solid={liked}
            color={liked ? colors.primaryLight : BaseColor.whiteColor}
            size={24}
            style={styles.iconLike}
          />
        </TouchableOpacity>
        <View style={styles.blockContent}>
          <View style={styles.blockLineMap}>
            <Icon
              name="map-marker-alt"
              color={BaseColor.grayColor}
              size={12}
              style={{marginRight: 3}}
            />
            <Text caption1 grayColor>
              {location}
            </Text>
          </View>
          <Text title2 semibold numberOfLines={1} style={{marginTop: 5}}>
            {title}
          </Text>
          <View style={styles.blockContentStatus}>
            <Text
              body2
              grayColor
              style={{
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              }}>
              {price}
            </Text>
            <Text body2 semibold grayColor>
              {time}
            </Text>
          </View>
          <View style={styles.blockContentPrice}>
            <Text title3 semibold primaryColor>
              {priceSale}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="bookmark"
                color={colors.accent}
                size={12}
                solid
                style={{marginRight: 5}}
              />
              <Text caption1 grayColor>
                {numTicket} {t('ticket_sale')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  /**
   * Display event item as list
   */
  const renderList = () => {
    return (
      <TouchableOpacity
        style={[styles.listContent, {backgroundColor: colors.card}, style]}
        onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Tag rateSmall>{t('music')}</Tag>
          <Icon
            name="heart"
            solid={liked}
            color={liked ? colors.primaryLight : BaseColor.whiteColor}
            size={18}
          />
        </View>
        <Text headline semibold numberOfLines={1} style={{marginVertical: 5}}>
          {title}
        </Text>
        <View style={styles.listLineMap}>
          <Icon
            name="map-marker-alt"
            color={BaseColor.grayColor}
            size={12}
            style={{marginRight: 5}}
          />
          <Text caption1 grayColor>
            {location}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <Icon
            name="calendar-alt"
            color={BaseColor.grayColor}
            solid
            size={16}
          />
          <Text caption1 grayColor style={{marginLeft: 5}}>
            {time}
          </Text>
        </View>
        <View style={styles.listRow}>
          <View style={{alignItems: 'flex-start'}}>
            <Text
              body2
              grayColor
              style={{
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              }}>
              {price}
            </Text>
            <Text title3 semibold primaryColor>
              {priceSale}
            </Text>
            <Tag
              rateSmall
              style={{
                backgroundColor: colors.accent,
                marginTop: 3,
              }}>
              {status}
            </Tag>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <ProfileGroupSmall
              users={[
                {image: Images.profile1},
                {image: Images.profile3},
                {image: Images.profile4},
              ]}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Icon
                name="bookmark"
                color={colors.accent}
                size={12}
                solid
                style={{marginRight: 5}}
              />
              <Text caption1 grayColor>
                {numTicket} {t('ticket_sale')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * Display event item as grid
   */
  const renderGrid = () => {
    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.girdImage} />
          <Tag status style={styles.tagGirdStatus}>
            {eventType}
          </Tag>
          <Icon
            name="heart"
            solid={liked}
            color={liked ? colors.primaryLight : BaseColor.whiteColor}
            size={18}
            style={styles.iconGirdLike}
          />
        </TouchableOpacity>
        <Text
          footnote
          semibold
          grayColor
          style={{marginTop: 5}}
          numberOfLines={1}>
          {subtitle}
        </Text>
        <Text subhead semibold style={{marginTop: 5}} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.girdRowRate}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Tag onPress={onPressTag} rateSmall style={{marginRight: 5}}>
              {rate}
            </Tag>
            <StarRating
              disabled={false}
              starSize={10}
              maxStars={5}
              rating={rate}
              selectedStar={onPressTag}
              fullStarColor={BaseColor.yellowColor}
            />
          </View>
          <Text caption2 grayColor numberOfLines={1}>
            {tracking}
          </Text>
        </View>
      </View>
    );
  };

  if (grid) return renderGrid();
  else if (block) return renderBlock();
  else return renderList();
}

EventItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  list: PropTypes.bool,
  block: PropTypes.bool,
  grid: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  location: PropTypes.string,
  tracking: PropTypes.string,
  rate: PropTypes.number,
  status: PropTypes.string,
  price: PropTypes.string,
  priceSale: PropTypes.string,
  eventType: PropTypes.string,
  time: PropTypes.string,
  user: PropTypes.array,
  numTicket: PropTypes.number,
  liked: PropTypes.bool,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
};

EventItem.defaultProps = {
  style: {},
  image: '',
  list: true,
  block: false,
  grid: false,
  title: '',
  subtitle: '',
  location: '',
  tracking: '3km',
  rate: 4.5,
  status: '',
  price: '',
  priceSale: '',
  eventType: '',
  time: '15 Sep 2019',
  user: [],
  numTicket: 400,
  liked: true,
  onPress: () => {},
  onPressTag: () => {},
};
