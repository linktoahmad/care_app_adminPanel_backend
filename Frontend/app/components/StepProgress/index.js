import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import {Text} from '@components';
import PropTypes from 'prop-types';
import {useTheme} from '@config';

export default function StepProgress(props) {
  const {colors} = useTheme();
  const {style, onPress, step, title, description} = props;
  return (
    <TouchableOpacity
      style={[styles.contain, {backgroundColor: colors.card}, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Text headline primaryColor semibold>
        {step}
      </Text>
      <Text
        title3
        semibold
        style={{
          marginTop: 8,
        }}
        numberOfLines={1}>
        {title}
      </Text>
      <Text
        body2
        style={{
          marginTop: 8,
        }}
        numberOfLines={5}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

StepProgress.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  step: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

StepProgress.defaultProps = {
  step: '',
  title: '',
  description: '',
  style: {},
  onPress: () => {},
};
