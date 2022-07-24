import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import PropTypes from 'prop-types';
import {useTheme} from '@config';
import styles from './styles';

export default function Coupon(props) {
  const {colors} = useTheme();
  const {style, name, code, description, valid, remain, onPress} = props;
  return (
    <TouchableOpacity
      style={[styles.contain, {shadowColor: colors.border}, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View
        style={[
          styles.nameContent,
          {
            borderBottomColor: colors.card,
            backgroundColor: colors.primaryLight,
          },
        ]}>
        <Text body2 whiteColor semibold>
          {name}
        </Text>
      </View>
      <View
        style={[styles.mainContent, {backgroundColor: colors.primaryLight}]}>
        <Text header whiteColor numberOfLines={1}>
          {code}
        </Text>
        <Text body2 whiteColor>
          {description}
        </Text>
      </View>
      <View style={[styles.validContent, {backgroundColor: colors.card}]}>
        <Text overline semibold numberOfLines={1}>
          {valid}
        </Text>
        <Text overline semibold numberOfLines={1}>
          {remain}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

Coupon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  code: PropTypes.string,
  description: PropTypes.string,
  valid: PropTypes.string,
  remain: PropTypes.string,
  onPress: PropTypes.func,
};

Coupon.defaultProps = {
  style: {},
  name: '',
  code: '',
  description: '',
  valid: '',
  remain: '',
  onPress: () => {},
};
