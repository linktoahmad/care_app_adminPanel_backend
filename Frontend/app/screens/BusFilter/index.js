import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  DatePicker,
  RangeSlider,
} from '@components';
import Modal from 'react-native-modal';
import * as Utils from '@utils';

import styles from './styles';

export default function BusFilter({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [priceBegin, setPriceBegin] = useState(0);
  const [priceEnd, setPriceEnd] = useState(1000);
  const [people, setPeople] = useState(2);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [modalVisible, setmModalVisible] = useState(false);

  /**
   * render Model Filter
   * @returns
   */
  const renderModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setmModalVisible(false)}
        swipeDirection={['down']}
        style={styles.bottomModal}>
        <View
          style={[styles.contentFilterBottom, {backgroundColor: colors.card}]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <View
            style={[
              styles.contentActionModalBottom,
              {borderBottomColor: colors.border},
            ]}>
            <TouchableOpacity onPress={() => setmModalVisible(false)}>
              <Text body1>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setmModalVisible(false)}>
              <Text body1 primaryColor>
                {t('save')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.lineRow, {marginBottom: 40}]}>
            <View>
              <Text body1>{t('passenger')}</Text>
              <Text caption1 grayColor>
                {t('people')}
              </Text>
            </View>
            <View style={styles.iconRight}>
              <TouchableOpacity
                onPress={() => setPeople(people - 1 > 0 ? people : 0)}>
                <Icon
                  name="minus-circle"
                  size={24}
                  color={BaseColor.grayColor}
                />
              </TouchableOpacity>
              <Text title1>{people}</Text>
              <TouchableOpacity onPress={() => setPeople(people + 1)}>
                <Icon name="plus-circle" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
        {renderModal()}
        <ScrollView
          scrollEnabled={scrollEnabled}
          onContentSizeChange={(contentWidth, contentHeight) =>
            setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
          }>
          <View style={{padding: 20}}>
            <View
              style={[styles.contentPickDate, {backgroundColor: colors.card}]}>
              <TouchableOpacity
                style={styles.itemPick}
                onPress={() => navigation.navigate('SelectBus')}>
                <Text caption1 light style={{marginBottom: 5}}>
                  {t('from')}
                </Text>
                <Text headline semibold numberOfLines={1}>
                  Smart Market
                </Text>
              </TouchableOpacity>
              <View
                style={[styles.linePick, {backgroundColor: colors.border}]}
              />
              <TouchableOpacity
                style={styles.itemPick}
                onPress={() => navigation.navigate('SelectBus')}>
                <Text caption1 light style={{marginBottom: 5}}>
                  {t('to')}
                </Text>
                <Text headline semibold numberOfLines={1}>
                  Harvard University
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentQuest}>
              <DatePicker
                label={t('date')}
                selected="2020-02-29"
                style={{flex: 6, marginRight: 15}}
              />
              <TouchableOpacity
                style={[styles.duration, {backgroundColor: colors.card}]}
                onPress={() => setmModalVisible(true)}>
                <Text caption1 grayColor style={{marginBottom: 5}}>
                  {t('passenger')}
                </Text>
                <Text body1 semibold>
                  {people} {t('people')}
                </Text>
              </TouchableOpacity>
            </View>
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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
