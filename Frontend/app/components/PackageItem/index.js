import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Icon, Button} from '@components';
import {useTheme} from '@config';
import styles from './styles';
import PropTypes from 'prop-types';

export default function PackageItem(props) {
  const {colors} = useTheme();

  const {
    icon,
    detail,
    style,
    packageName,
    price,
    type,
    description,
    onPress,
    onPressIcon,
    services,
  } = props;

  const renderPackage = () => {
    return (
      <View style={[styles.contain, {backgroundColor: colors.card}, style]}>
        <View style={styles.packageTitleContent}>
          <Text title2 semibold>
            {packageName}
          </Text>
          <TouchableOpacity onPress={onPressIcon} activeOpacity={0.9}>
            <Icon name="angle-down" size={36} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentPrice}>
          <Text title1 primaryColor semibold>
            {price}
          </Text>
          <Text
            footnote
            accentColor
            style={{
              marginLeft: 10,
              alignSelf: 'flex-end',
            }}>
            {type}
          </Text>
        </View>
        <Text body2 numberOfLines={5} style={{marginTop: 10}}>
          {description}
        </Text>
        <Button full style={{marginTop: 10}} onPress={onPress}>
          Book Now
        </Button>
      </View>
    );
  };

  const renderPackageIcon = () => {
    return (
      <View style={style}>
        <View style={[styles.contentTopIcon, {backgroundColor: colors.card}]}>
          <View style={[styles.icon, {backgroundColor: colors.primaryLight}]}>
            <Icon
              name="tag"
              style={{
                fontSize: 32,
                color: 'white',
              }}
            />
          </View>
          <View style={styles.lineIcon} />
          <Text title2 semibold>
            {packageName}
          </Text>
        </View>
        <View style={styles.serviceContentIcon}>
          {services.map((item, index) => (
            <Text
              key={index}
              body2
              grayColor
              style={{
                marginBottom: 20,
              }}>
              {item.detail}
            </Text>
          ))}
        </View>
        <View style={styles.priceContentIcon}>
          <Text title1 semibold primaryColor>
            {price}
          </Text>
          <Text
            footnote
            accentColor
            style={{
              marginLeft: 10,
              alignSelf: 'flex-end',
            }}>
            {type}
          </Text>
        </View>
        <View>
          <Button full onPress={onPress}>
            Book Now
          </Button>
        </View>
      </View>
    );
  };

  const renderPackageDetail = () => {
    return (
      <View style={[styles.contain, {backgroundColor: colors.card}, style]}>
        <View style={styles.packageTitleContent}>
          <Text title2 semibold>
            {packageName}
          </Text>
        </View>
        <View style={styles.contentPrice}>
          <Text title1 primaryColor semibold>
            {price}
          </Text>
          <Text
            footnote
            accentColor
            style={{
              marginLeft: 10,
              alignSelf: 'flex-end',
            }}>
            {type}
          </Text>
        </View>
        <Text body2 numberOfLines={5} style={{marginVertical: 10}}>
          {description}
        </Text>
        {services.map((item, index) => {
          return (
            <View
              key={item.name}
              style={[styles.containItem, {borderTopColor: colors.border}]}>
              <Text headline accentColor style={{marginBottom: 6}}>
                {item.name}
              </Text>
              <Text body2 grayColor>
                {item.desc}
              </Text>
            </View>
          );
        })}
        <Button full style={{marginTop: 10}} onPress={onPress}>
          Book Now
        </Button>
      </View>
    );
  };

  if (icon) return renderPackageIcon();
  else if (detail) return renderPackageDetail();
  else return renderPackage();
}

PackageItem.propTypes = {
  icon: PropTypes.bool,
  detail: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  packageName: PropTypes.string,
  price: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  services: PropTypes.array,
  onPress: PropTypes.func,
  onPressIcon: PropTypes.func,
};

PackageItem.defaultProps = {
  icon: false,
  detail: false,
  packageName: '',
  description: '',
  price: '',
  type: '',
  services: [],
  style: {},
  onPress: () => {},
  onPressIcon: () => {},
};
