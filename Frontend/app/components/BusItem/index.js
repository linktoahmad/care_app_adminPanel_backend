import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Icon} from '@components';
import {BaseColor, useTheme} from '@config';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function BusItem(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const backgroundColor = colors.card;
  const {style, from, to, totalHour, route, brand, type, price, onPress} =
    props;
  return (
    <TouchableOpacity
      style={[styles.content, {backgroundColor}, style]}
      onPress={onPress}>
      <View style={[styles.contentTop, {borderColor: colors.border}]}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text title2>{from.hour}</Text>
          <Text footnote light numberOfLines={1}>
            {from.value}
          </Text>
        </View>
        <View style={{flex: 1.5, alignItems: 'center'}}>
          <Text caption1 light>
            {totalHour} {t('hours')}
          </Text>
          <Icon
            name="long-arrow-alt-right"
            color={colors.primary}
            size={24}
            solid
            enableRTL={true}
          />
          <Text caption1 light>
            {t(route)}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text title2>{to.hour}</Text>
          <Text footnote light numberOfLines={1}>
            {to.value}
          </Text>
        </View>
      </View>
      <View style={styles.contentBottom}>
        <View style={styles.bottomLeft}>
          <Icon name="bus" color={BaseColor.grayColor} size={24} solid />
          <View style={{marginHorizontal: 5}}>
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
            {t('seat')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

BusItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  from: PropTypes.object,
  to: PropTypes.object,
  totalHour: PropTypes.number,
  brand: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.string,
  route: PropTypes.string,
  onPress: PropTypes.func,
};

BusItem.defaultProps = {
  style: {},
  from: {
    name: '',
    value: '',
    hour: '',
  },
  to: {
    name: '',
    value: '',
    hour: '',
  },
  totalHour: 0,
  brand: '',
  type: '',
  price: '',
  route: '',
  onPress: () => {},
};
