import React from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, FlightPlan, Tag} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function FlightTicket({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('tickets')}
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
        <ScrollView>
          <View style={styles.contain}>
            <View style={styles.classContent}>
              <Tag outline round>
                {t('economic_class')}
              </Tag>
            </View>
            <FlightPlan
              round={false}
              fromCode="SIN"
              toCode="SYD"
              from="Singapore"
              to="Sydney"
            />
            <View style={styles.line} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  {t('passenger')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  Steve Garrett
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  {t('date')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  {t('thur')}, 15 Aug 09
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 25}}>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  {t('flight')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  SIN1009
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  {t('gate')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  22A
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 25}}>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  {t('class')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  {t('economic_class')}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text caption1 light>
                  {t('seat')}
                </Text>
                <Text headline style={{marginTop: 5}}>
                  21D
                </Text>
              </View>
            </View>
            <View style={styles.line} />
            <View style={[styles.code, {backgroundColor: colors.text}]}>
              <Text header whiteColor style={{color: colors.card}}>
                CLMVBG
              </Text>
            </View>
            <Text caption1 light style={{textAlign: 'center', marginTop: 15}}>
              0944 0923 1238 9801
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
