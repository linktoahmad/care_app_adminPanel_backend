import React, {useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, TextInput, Icon, Text} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function SelectBus({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [keyword, setKeyword] = useState('');
  const [bus, setBus] = useState([
    {
      id: '1',
      name: 'Terminal 1',
      value: 'USA',
    },
    {
      id: '2',
      name: 'Terminal 2',
      value: 'SIN',
    },
    {
      id: '3',
      name: 'Terminal 3',
      value: 'SYN',
    },
  ]);
  const [loading, setLoading] = useState(false);

  /**
   * @description Called when setting bus is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {object} select
   */
  const onChange = select => {
    setBus(
      bus.map(item => {
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
    setLoading(true);
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('search_bus')}
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
            style={BaseStyle.textInput}
            onChangeText={text => setKeyword(text)}
            autoCorrect={false}
            placeholder={t('search_bus')}
            placeholderTextColor={BaseColor.grayColor}
            value={keyword}
            selectionColor={colors.primary}
          />
          <FlatList
            contentContainerStyle={{paddingTop: 5}}
            data={bus}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[styles.item, {borderBottomColor: colors.border}]}
                onPress={() => onChange(item)}>
                <Text body1>{item.name}</Text>
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
