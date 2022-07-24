import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Icon, Image, StarRating, Tag} from '@components';
import {useTheme} from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
import {useTranslation} from 'react-i18next';
export default function CarItem(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {
    list,
    block,
    grid,
    style,
    image,
    title,
    name,
    price,
    per,
    onPress,
    services,
    rate,
    numReviews,
  } = props;
  /**
   * Display car item as block
   */
  const renderBlock = () => {
    return (
      <View style={[styles.blockContain, style]}>
        <View style={[styles.blockRow, {marginBottom: 3}]}>
          <Text title3 primaryColor semibold>
            {price}
          </Text>
          <Text headline semibold>
            {title}
          </Text>
        </View>
        <View style={[styles.blockRow, {marginBottom: 10}]}>
          <Text footnote>{t(per)}</Text>
          <Text body2>{name}</Text>
        </View>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.blockImage} resizeMode="cover" />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Display car item as list
   */
  const renderList = () => {
    return (
      <View style={[styles.listContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.listImage} resizeMode="cover" />
        </TouchableOpacity>
        <View style={styles.listContentRight}>
          <Text headline semibold>
            {title}
          </Text>
          <Text subhead grayColor style={{marginVertical: 3}}>
            {name}
          </Text>
          <View style={styles.listContentService}>
            {services.map((item, index) => {
              return (
                <Tag
                  key={'service' + index}
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
                  style={{
                    marginTop: 5,
                    marginRight: 5,
                  }}>
                  {item.name}
                </Tag>
              );
            })}
          </View>
          <View style={styles.contentPrice}>
            <Text title3 primaryColor semibold>
              {price}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  /**
   * Display car item as grid
   */
  const renderGrid = () => {
    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image source={image} style={styles.girdImage} resizeMode="cover" />
        </TouchableOpacity>
        <View style={{alignItems: 'flex-start'}}>
          <Text headline semibold style={{marginTop: 5}}>
            {title}
          </Text>
          <Text subhead grayColor style={{marginVertical: 5}}>
            {name}
          </Text>
          <View style={styles.girdContentRate}>
            <View style={{width: 60}}>
              <StarRating
                disabled={true}
                starSize={10}
                maxStars={5}
                rating={rate}
                selectedStar={rating => {}}
                fullStarColor={colors.accent}
              />
            </View>
            <Text caption2 grayColor style={{marginHorizontal: 5}}>
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
      </View>
    );
  };

  if (grid) return renderGrid();
  else if (block) return renderBlock();
  else return renderList();
}

CarItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  list: PropTypes.bool,
  block: PropTypes.bool,
  grid: PropTypes.bool,
  title: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  per: PropTypes.string,
  rate: PropTypes.number,
  numReviews: PropTypes.number,
  services: PropTypes.array,
  onPress: PropTypes.func,
};

CarItem.defaultProps = {
  style: {},
  list: true,
  block: false,
  grid: false,
  image: '',
  title: '',
  name: '',
  price: '',
  per: '',
  rate: 0,
  numReviews: 0,
  services: [],
  onPress: () => {},
};
