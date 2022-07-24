import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Icon} from '@components';
import {BaseColor, Images, useTheme} from '@config';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function FlightItem(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {
    style,
    from,
    to,
    totalHour,
    route,
    image,
    brand,
    type,
    price,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.content, {backgroundColor: colors.card}, style]}
      onPress={onPress}>
      <View style={[styles.contentTop, {borderBottomColor: colors.border}]}>
        <View style={{flex: 1}}>
          <Text title2>{from.hour}</Text>
          <Text footnote light>
            {from.value}
          </Text>
        </View>
        <View style={{flex: 1.5, alignItems: 'center'}}>
          <Text caption1 light>
            {totalHour} Hours
          </Text>
          <View style={styles.contentLine}>
            <View style={[styles.line, {borderColor: colors.border}]} />
            <Icon
              name="plane"
              color={BaseColor.dividerColor}
              size={24}
              solid
              enableRTL={true}
            />
            <View style={[styles.dot, {backgroundColor: colors.primary}]} />
          </View>
          <Text caption1 light>
            {t('non_stop')}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text title2>{to.hour}</Text>
          <Text footnote light>
            {to.value}
          </Text>
        </View>
      </View>
      <View style={styles.contentBottom}>
        <View style={styles.bottomLeft}>
          <Image style={styles.image} resizeMode="cover" source={image} />
          <View>
            <Text caption1 semibold accentColor>
              {brand}
            </Text>
            <Text caption2 light>
              {type}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Text title3 semibold primaryColor>
            {price}
          </Text>
          <Text caption1 light style={{marginLeft: 5}}>
            Pax
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

FlightItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  from: PropTypes.object,
  to: PropTypes.object,
  totalHour: PropTypes.number,
  brand: PropTypes.string,
  image: PropTypes.node.isRequired,
  type: PropTypes.string,
  price: PropTypes.string,
  route: PropTypes.string,
  onPress: PropTypes.func,
};

FlightItem.defaultProps = {
  style: {},
  from: {
    name: 'United State',
    value: 'USA',
    image: Images.airline1,
    hour: '05:00',
  },
  to: {
    name: 'Singapore',
    value: 'SIN',
    image: Images.airline2,
    hour: '18:00',
  },
  totalHour: 13.5,
  brand: 'Vietjet',
  image: Images.airline2,
  type: 'Economy',
  price: '$499,99',
  route: 'non_stop',
  onPress: () => {},
};
