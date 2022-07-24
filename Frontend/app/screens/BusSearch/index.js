import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  DatePicker,
  Text,
  Button,
} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import Modal from 'react-native-modal';

export default function BusSearch({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [people, setPeople] = useState(1);

  /**
   * render Modal for search
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
        title={t('shutle_bus_search')}
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
                style={{flex: 6, marginRight: 15}}
              />
              <TouchableOpacity
                style={[styles.duration, {backgroundColor: colors.card}]}
                onPress={() => setModalVisible(true)}>
                <Text caption1 grayColor style={{marginBottom: 5}}>
                  {t('passenger')}
                </Text>
                <Text body1 semibold>
                  {people} {t('people')}
                </Text>
              </TouchableOpacity>
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
                navigation.navigate('BusList');
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
