import React from 'react';
import {View} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function NotFound({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('page_not_found')}
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
        <View style={styles.contain}>
          <Icon name="wrench" color={colors.text} size={48} solid />
          <Text headline semibold style={{paddingVertical: 15}}>
            {t('this_page_not_found')}
          </Text>
          <Text body2 style={{textAlign: 'center'}}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doque laudantium, totam rem aperiam, eaque ipsa quae ab
            illo inventore veritatis et quasi
          </Text>
          <Button
            full
            style={{marginTop: 15}}
            onPress={() => navigation.goBack()}>
            {t('back')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
