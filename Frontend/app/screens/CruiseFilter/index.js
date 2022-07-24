import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
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
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function CruiseFilter({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [priceBegin, setPriceBegin] = useState(0);
  const [priceEnd, setPriceEnd] = useState(1000);
  const [day, setDay] = useState(2);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  /**
   *render modal UI
   * @returns
   */
  const renderModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
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
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text body1>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text body1 primaryColor>
                {t('save')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.lineRow, {marginBottom: 40}]}>
            <View style={{alignItems: 'flex-start'}}>
              <Text body1>{t('duration')}</Text>
              <Text caption1 grayColor>
                {t('days')}
              </Text>
            </View>
            <View style={styles.iconRight}>
              <TouchableOpacity onPress={() => setDay(day - 1 > 0 ? day : 0)}>
                <Icon
                  name="minus-circle"
                  size={24}
                  color={BaseColor.grayColor}
                />
              </TouchableOpacity>
              <Text title1>{day}</Text>
              <TouchableOpacity onPress={() => setDay(day + 1)}>
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
                onPress={() => navigation.navigate('SelectCruise')}>
                <Text caption1 light style={{marginBottom: 5}}>
                  {t('from')}
                </Text>
                <Text headline semibold>
                  Caribbean
                </Text>
              </TouchableOpacity>
              <View
                style={[styles.linePick, {backgroundColor: colors.border}]}
              />
              <TouchableOpacity
                style={styles.itemPick}
                onPress={() => navigation.navigate('SelectCruise')}>
                <Text caption1 light style={{marginBottom: 5}}>
                  {t('to')}
                </Text>
                <Text headline semibold>
                  Bahamas
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentQuest}>
              <DatePicker
                label="Depart From"
                time="01 Aug 2019"
                style={{flex: 6, marginRight: 15}}
              />
              <TouchableOpacity
                style={[styles.duration, {backgroundColor: colors.card}]}
                onPress={() => setModalVisible(true)}>
                <Text caption1 grayColor style={{marginBottom: 5}}>
                  {t('duration')}
                </Text>
                <Text body1 semibold>
                  {day} {t('days')}
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
