import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  StarRating,
  TextInput,
} from '@components';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function Feedback({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [rate, setRate] = useState(4.5);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('feedback')}
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
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('save')}
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('Review');
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{alignItems: 'center', padding: 20}}>
            <Image
              source={Images.profile2}
              style={{
                width: 62,
                height: 62,
                borderRadius: 31,
              }}
            />
            <View style={{width: 160}}>
              <StarRating
                starSize={26}
                maxStars={5}
                rating={rate}
                selectedStar={rating => {
                  setRate(rating);
                }}
                fullStarColor={BaseColor.yellowColor}
                containerStyle={{padding: 5}}
              />
              <Text caption1 grayColor style={{textAlign: 'center'}}>
                {t('tap_to_rate')}
              </Text>
            </View>
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setTitle(text)}
              placeholder={t('input_title')}
              value={title}
            />
            <TextInput
              style={{marginTop: 20, height: 150}}
              onChangeText={text => setReview(text)}
              textAlignVertical="top"
              multiline={true}
              placeholder={t('input')}
              value={review}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
