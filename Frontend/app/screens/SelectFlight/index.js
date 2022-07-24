import React, {useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, TextInput, Text, Image} from '@components';
import styles from './styles';
import {FlightBrandData} from '@data';
import {useTranslation} from 'react-i18next';

export default function SelectFlight({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [airplane, setAirplane] = useState('');
  const [flight, setFlight] = useState(
    FlightBrandData.map(item => {
      const {selected} = route.params;
      return {
        ...item,
        checked: item.value === selected?.value,
      };
    }),
  );
  const [loading, setLoading] = useState(false);

  /**
   * @description Called when setting flight is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */
  const onChange = select => {
    setFlight(
      flight.map(item => {
        if (item.value == select.value) {
          return {
            ...item,
            checked: true,
          };
        } else {
          return {
            ...item,
            checked: false,
          };
        }
      }),
    );
  };

  /**
   * call when on save
   */
  const onSave = () => {
    const {onChangeAir} = route.params;
    const selected = flight.filter(item => item.checked);
    if (selected.length > 0 && onChangeAir) {
      setLoading(true);
      setTimeout(() => {
        onChangeAir(selected[0]);
        navigation.goBack();
      }, 500);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('airplane')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <Text headline primaryColor numberOfLines={1}>
                {t('save')}
              </Text>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => onSave()}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <View style={styles.contain}>
          <TextInput
            onChangeText={text => setAirplane(text)}
            placeholder={t('search_airplane')}
            value={airplane}
          />
          <FlatList
            contentContainerStyle={{paddingTop: 5}}
            data={flight}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[styles.item, {borderBottomColor: colors.border}]}
                onPress={() => onChange(item)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={styles.imageBrand}
                    source={item.image}
                    resizeMode="contain"
                  />
                  <Text body1>{item.name}</Text>
                </View>
                {item.checked && (
                  <Icon name="check" size={14} color={colors.primary} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
