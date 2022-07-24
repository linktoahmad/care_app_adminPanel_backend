import React, {useState} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  PackageItem,
  ProfileDescription,
  ProfilePerformance,
  StepProgress,
  Tag,
  HelpBlock,
} from '@components';
import styles from './styles';
import {UserData, PackageData, WorkProgressData, HelpBlockData} from '@data';
import {useTranslation} from 'react-i18next';

export default function Profile3({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [packageItem] = useState(PackageData[0]);
  const [workProgress] = useState(WorkProgressData);
  const [helpBlock] = useState(HelpBlockData);
  const [userData] = useState(UserData[0]);

  return (
    <View style={{flex: 1}}>
      <Header
        title="Profile3"
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
          <View style={{paddingHorizontal: 20}}>
            <ProfileDescription
              image={userData.image}
              name={userData.name}
              subName={userData.major}
              description={userData.address}
              style={{marginTop: 25}}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Tag primary style={{width: 80}}>
                + {t('follow')}
              </Tag>
              <View style={{flex: 1, paddingVertical: 15, paddingLeft: 10}}>
                <ProfilePerformance
                  data={UserData[0].performance}
                  type="small"
                />
              </View>
            </View>
            <PackageItem
              packageName={packageItem.packageName}
              price={packageItem.price}
              type={packageItem.type}
              description={packageItem.description}
              services={packageItem.services}
              onPressIcon={() => {
                navigation.navigate('PricingTable');
              }}
            />
          </View>
          <Text
            headline
            semibold
            style={{
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}>
            {t('work_progress')}
          </Text>
          <FlatList
            contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={workProgress}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => (
              <StepProgress
                style={{marginLeft: 15}}
                step={item.step}
                title={item.title}
                description={item.description}
                onPress={() => navigation.navigate('PricingTableIcon')}
              />
            )}
          />
          <HelpBlock
            title={helpBlock.title}
            description={helpBlock.description}
            phone={helpBlock.phone}
            email={helpBlock.email}
            style={{margin: 20}}
            onPress={() => {
              navigation.navigate('ContactUs');
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
