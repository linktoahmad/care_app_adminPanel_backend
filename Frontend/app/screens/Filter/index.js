import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Tag, RangeSlider} from '@components';
import * as Utils from '@utils';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function Filter({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [priceBegin, setPriceBegin] = useState(0);
  const [priceEnd, setPriceEnd] = useState(1000);
  const [facilities, setFacilities] = useState([
    {id: '1', name: 'Wifi', checked: true},
    {id: '2', name: 'Parking'},
    {id: '3', name: 'Premier'},
    {id: '4', name: 'Shower'},
  ]);
  const [roomType, setRoomType] = useState([
    {id: '1', name: 'Standart', checked: true},
    {id: '2', name: 'Delux'},
    {id: '3', name: 'Premier'},
    {id: '4', name: 'Other'},
  ]);
  const [interio, setInterio] = useState([
    {id: '1', name: '1', color: '#FD5739', checked: true},
    {id: '2', name: '2', color: '#C31C0D'},
    {id: '3', name: '3', color: '#FF8A65'},
    {id: '4', name: '4', color: '#4A90A4'},
  ]);
  const [adults, setAdults] = useState(2);
  const [childrens, setChildrens] = useState(1);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  /**
   * @description Called when filtering option > Facilities
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {*} select
   */
  const onSelectFacilities = select => {
    setFacilities(
      facilities.map(item => {
        if (item.name == select.name) {
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
   * @description Called when filtering option > Room Types
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {*} select
   */
  const onSelectRoomType = select => {
    setRoomType(
      roomType.map(item => {
        if (item.name == select.name) {
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
   * @description Called when filtering option > Interio
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {*} select
   */
  const onSelectInterio = select => {
    setInterio(
      interio.map(item => {
        if (item.name == select.name) {
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

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('filtering')}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('apply')}
            </Text>
          );
        }}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => navigation.goBack()}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView
          scrollEnabled={scrollEnabled}
          onContentSizeChange={(contentWidth, contentHeight) =>
            setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
          }>
          <View style={{padding: 20}}>
            <Text headline semibold>
              {t('price').toUpperCase()}
            </Text>
            <View style={styles.contentRange}>
              <Text caption1 grayColor>
                $100
              </Text>
              <Text caption1 grayColor>
                $1000
              </Text>
            </View>
            <RangeSlider
              min={100}
              max={1000}
              color={colors.border}
              selectionColor={colors.primary}
              onValueChanged={(low, high) => {
                setPriceBegin(low);
                setPriceEnd(high);
              }}
            />
            <View style={styles.contentResultRange}>
              <Text caption1>{t('avg_price')}</Text>
              <Text caption1>
                ${priceBegin} - ${priceEnd}
              </Text>
            </View>
          </View>
          <Text headline semibold style={{marginLeft: 20, marginTop: 15}}>
            {t('facilities').toUpperCase()}
          </Text>
          <View style={styles.contentList}>
            <FlatList
              contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={facilities}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <Tag
                  primary={item.checked}
                  style={{marginLeft: 15, width: 80}}
                  outline={!item.checked}
                  onPress={() => onSelectFacilities(item)}>
                  {item.name}
                </Tag>
              )}
            />
          </View>
          <View style={{padding: 20}}>
            <Text headline semibold>
              {t('quess').toUpperCase()}
            </Text>
            <View style={styles.contentQuest}>
              <View style={styles.lineRow}>
                <View>
                  <Text body1>{t('adults')}</Text>
                  <Text caption1 grayColor>
                    16+ {t('years')}
                  </Text>
                </View>
                <View style={styles.iconRight}>
                  <TouchableOpacity
                    onPress={() => {
                      setAdults(adults - 1 > 0 ? adults - 1 : 0);
                    }}>
                    <Icon
                      name="minus-circle"
                      size={24}
                      color={BaseColor.grayColor}
                    />
                  </TouchableOpacity>
                  <Text title1>{adults}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setAdults(adults + 1);
                    }}>
                    <Icon name="plus-circle" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.lineRow}>
                <View>
                  <Text body1>{t('children')}</Text>
                  <Text caption1 grayColor>
                    2 - 11 {t('years')}
                  </Text>
                </View>
                <View style={styles.iconRight}>
                  <TouchableOpacity
                    onPress={() => {
                      setChildrens(childrens - 1 > 0 ? childrens - 1 : 0);
                    }}>
                    <Icon
                      name="minus-circle"
                      size={24}
                      color={BaseColor.grayColor}
                    />
                  </TouchableOpacity>
                  <Text title1>{childrens}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setChildrens(childrens + 1);
                    }}>
                    <Icon name="plus-circle" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <Text headline semibold style={{marginLeft: 20, marginTop: 15}}>
            {t('room_type').toUpperCase()}
          </Text>
          <View style={styles.contentList}>
            <FlatList
              contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={roomType}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <Tag
                  style={{marginLeft: 15, width: 80}}
                  outline={!item.checked}
                  primary={item.checked}
                  onPress={() => onSelectRoomType(item)}>
                  {item.name}
                </Tag>
              )}
            />
          </View>
          <Text headline semibold style={{marginLeft: 20, marginTop: 15}}>
            {t('interio').toUpperCase()}
          </Text>
          <View style={styles.contentList}>
            <FlatList
              contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={interio}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={[styles.interioItem, {backgroundColor: item.color}]}
                  onPress={() => onSelectInterio(item)}>
                  {item.checked && (
                    <Icon name="check" size={16} color={BaseColor.whiteColor} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
