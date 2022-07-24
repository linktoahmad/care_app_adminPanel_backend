import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  DatePicker,
  Text,
  QuantityPicker,
  Button,
} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import Modal from 'react-native-modal';

export default function CruiseSearch({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [night, setNight] = useState(1);

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
                {t('night')}
              </Text>
            </View>
            <View style={styles.iconRight}>
              <TouchableOpacity
                onPress={() => setNight(night - 1 > 0 ? night : 0)}>
                <Icon
                  name="minus-circle"
                  size={24}
                  color={BaseColor.grayColor}
                />
              </TouchableOpacity>
              <Text title1>{night}</Text>
              <TouchableOpacity onPress={() => setNight(night + 1)}>
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
        title={t('cruise_search')}
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
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        {renderModal()}
        <ScrollView>
          <View style={styles.contain}>
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
                style={{flex: 4, marginRight: 15}}
              />
              <TouchableOpacity
                style={[styles.duration, {backgroundColor: colors.card}]}
                onPress={() => setModalVisible(true)}>
                <Text caption1 grayColor style={{marginBottom: 5}}>
                  {t('duration')}
                </Text>
                <Text body1 semibold numberOfLines={1}>
                  4 {t('days')} 5 {t('night')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20, flexDirection: 'row'}}>
              <QuantityPicker
                label={t('adults')}
                detail={`>= 12 ${t('years')}`}
                value={1}
              />
              <QuantityPicker
                label={t('children')}
                detail={`2 - 12 ${t('years')}`}
                value={1}
                style={{marginHorizontal: 15}}
              />
              <QuantityPicker
                label={t('infants')}
                detail={`<= 2 ${t('years')}`}
                value={1}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
          <Button
            loading={loading}
            full
            onPress={() => {
              setLoading(true);
              setTimeout(() => {
                navigation.navigate('Cruise');
                setLoading(false);
              }, 500);
            }}>
            {t('search')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
