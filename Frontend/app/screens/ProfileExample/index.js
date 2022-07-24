import React, {useState} from 'react';
import {FlatList, RefreshControl, View, TouchableOpacity} from 'react-native';
import {BaseStyle, Images, useTheme} from '@config';
import {Image, Header, SafeAreaView, Icon, Text} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function ProfileExample({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [refreshing] = useState(false);
  const [profileScreen] = useState([
    {
      id: '1',
      screen: 'Profile1',
      image: Images.profile1,
    },
    {
      id: '2',
      screen: 'Profile2',
      image: Images.profile2,
    },
    {
      id: '3',
      screen: 'Profile3',
      image: Images.profile3,
    },
    {
      id: '4',
      screen: 'Profile4',
      image: Images.profile4,
    },
    {
      id: '5',
      screen: 'Profile5',
      image: Images.profile5,
    },
    {
      id: '6',
      screen: 'Profile6',
      image: Images.profile6,
    },
    {
      id: '7',
      screen: 'Profile7',
      image: Images.profile7,
    },
    {
      id: '8',
      screen: 'Profile8',
      image: Images.profile8,
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('profile')}
        subTitle="Profile 8 Screens"
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
        <FlatList
          contentContainerStyle={{
            paddingLeft: 5,
            paddingRight: 20,
            paddingTop: 15,
          }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={profileScreen}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <View style={[styles.iconProFile, {marginLeft: 15}]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(item.screen);
                }}
                style={{alignItems: 'center'}}
                activeOpacity={0.9}>
                <Image source={item.image} style={styles.imgProfile} />
                <Text body1>{item.screen}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
