import React, {useState} from 'react';
import {RefreshControl, FlatList, View} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, PostItem, ProfileAuthor} from '@components';
import styles from './styles';
import {PostData} from '@data';
import {useTranslation} from 'react-i18next';

export default function Post({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [refreshing] = useState(false);
  const [posts] = useState(PostData);

  return (
    <View style={{flex: 1}}>
      <Header title={t('post')} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={posts}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <PostItem
              image={item.image}
              title={item.title}
              description={item.description}
              onPress={() => navigation.navigate('PostDetail')}>
              <ProfileAuthor
                image={item.authorImage}
                name={item.name}
                description={item.detail}
                style={{paddingHorizontal: 20}}
              />
            </PostItem>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
