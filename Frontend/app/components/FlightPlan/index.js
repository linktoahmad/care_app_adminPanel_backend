import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, Text} from '@components';
import styles from './styles';
import {useTheme} from '@config';
import {useTranslation} from 'react-i18next';

export default function FlightPlan(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {style, from, fromCode, to, toCode, round, onPressFrom, onPressTo} =
    props;
  return (
    <View style={[styles.contentRow, style]}>
      <TouchableOpacity
        style={styles.colCenter}
        onPress={onPressFrom}
        activeOpacity={0.9}>
        <Text body1 light>
          {t('from')}
        </Text>
        <Text header semibold>
          {fromCode}
        </Text>
        <Text body1>{from}</Text>
      </TouchableOpacity>
      <View style={styles.centerView}>
        <Icon name="plane" color={colors.primary} size={24} solid />
        {round && (
          <Icon
            name="plane"
            color={colors.primary}
            size={24}
            solid
            style={{
              transform: [{rotate: '180deg'}],
              marginTop: 5,
            }}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.colCenter}
        onPress={onPressTo}
        activeOpacity={0.9}>
        <Text body1 light>
          {t('to')}
        </Text>
        <Text header semibold>
          {toCode}
        </Text>
        <Text body1>{to}</Text>
      </TouchableOpacity>
    </View>
  );
}

FlightPlan.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  round: PropTypes.bool,
  fromCode: PropTypes.string,
  toCode: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  onPressFrom: PropTypes.func,
  onPressTo: PropTypes.func,
};

FlightPlan.defaultProps = {
  style: {},
  round: true,
  fromCode: 'SIN',
  toCode: 'SYD',
  from: 'Singapore',
  to: 'Sydney',
  onPressFrom: () => {},
  onPressTo: () => {},
};
