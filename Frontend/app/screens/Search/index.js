import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, BaseColor, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  BookingTime,
  TextInput,
} from '@components';
import Modal from 'react-native-modal';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function Search({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [keyword, setKeyword] = useState('');
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(1);
  const [night, setNight] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * call when action modal
   * @param {*} modal
   */
  const openModal = modal => {
    setModalVisible(modal);
  };

  /**
   * call when on change value
   * @param {*} mode
   * @param {*} value
   */
  const setValue = (mode, value) => {
    switch (value) {
      case 'adult':
        if (mode == 'up') {
          setAdult(adult + 1);
        } else {
          setAdult(adult - 1 > 0 ? adult - 1 : 0);
        }
        break;
      case 'children':
        if (mode == 'up') {
          setChildren(children + 1);
        } else {
          setChildren(children - 1 > 0 ? children - 1 : 0);
        }
        break;
      case 'night':
        if (mode == 'up') {
          setNight(night + 1);
        } else {
          setNight(night - 1 > 0 ? night - 1 : 0);
        }
        break;
    }
  };

  /**
   * render UI modal
   * @returns
   */
  const renderModal = () => {
    return (
      <View>
        <Modal
          isVisible={modalVisible === 'quest'}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['down']}
          style={styles.bottomModal}>
          <View
            style={[
              styles.contentFilterBottom,
              {backgroundColor: colors.card},
            ]}>
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
            <View style={styles.lineRow}>
              <View>
                <Text body1>{t('adults')}</Text>
                <Text caption1 grayColor>
                  16+ {t('years')}
                </Text>
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity onPress={() => setValue('down', 'adult')}>
                  <Icon
                    name="minus-circle"
                    size={24}
                    color={BaseColor.grayColor}
                  />
                </TouchableOpacity>
                <Text title1>{adult}</Text>
                <TouchableOpacity onPress={() => setValue('up', 'adult')}>
                  <Icon name="plus-circle" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineRow}>
              <View>
                <Text body1>{t('children')}</Text>
                <Text caption1 grayColor>
                  2-11 {t('years')}
                </Text>
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity onPress={() => setValue('down', 'children')}>
                  <Icon
                    name="minus-circle"
                    size={24}
                    color={BaseColor.grayColor}
                  />
                </TouchableOpacity>
                <Text title1>{children}</Text>
                <TouchableOpacity onPress={() => setValue('up', 'children')}>
                  <Icon name="plus-circle" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={modalVisible === 'duration'}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection={['down']}
          style={styles.bottomModal}>
          <View
            style={[
              styles.contentFilterBottom,
              {backgroundColor: colors.card},
            ]}>
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
              <View>
                <Text body1>{t('duration')}</Text>
                <Text caption1 grayColor>
                  {t('night')}
                </Text>
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity onPress={() => setValue('down', 'night')}>
                  <Icon
                    name="minus-circle"
                    size={24}
                    color={BaseColor.grayColor}
                  />
                </TouchableOpacity>
                <Text title1>{night}</Text>
                <TouchableOpacity onPress={() => setValue('up', 'night')}>
                  <Icon name="plus-circle" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('asdasd')}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        {renderModal()}

        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={{padding: 20}}>
            <TextInput
              onChangeText={text => setKeyword(text)}
              placeholder={t('what_are_you_looking_for')}
              value={keyword}
            />
            <BookingTime style={{marginTop: 15}} />
            <View style={styles.contentQuest}>
              <TouchableOpacity
                style={[styles.total, {backgroundColor: colors.card}]}
                onPress={() => openModal('quest')}>
                <Text caption1 grayColor style={{marginBottom: 5}}>
                  {t('total_guest')}
                </Text>
                <Text body1 semibold numberOfLines={1}>
                  2 {t('adults')}, 1 {t('children')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.duration, {backgroundColor: colors.card}]}
                onPress={() => openModal('duration')}>
                <Text caption1 grayColor style={{marginBottom: 5}}>
                  {t('duration')}
                </Text>
                <Text body1 semibold>
                  1 {t('night')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <Button
              full
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  navigation.navigate('Hotel');
                  setLoading(false);
                }, 500);
              }}
              loading={loading}>
              {t('apply')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
