import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {Header, SafeAreaView, TextInput, Icon, Text, Card} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function SearchHistory({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([
    {id: '1', keyword: 'Delux Room'},
    {id: '2', keyword: 'Tripple Room'},
    {id: '3', keyword: 'Single Room'},
    {id: '4', keyword: 'King Room'},
    {id: '5', keyword: 'Lux Room'},
  ]);
  const [discoverMore] = useState([
    {id: '1', keyword: 'Hotel California'},
    {id: '2', keyword: 'Top 10 Things Must To Do In This Autum'},
    {id: '3', keyword: 'Best Hotel Indonesia'},
  ]);
  const [recentlyView] = useState([
    {id: '1', name: 'France', image: Images.trip1},
    {id: '2', name: 'Dublin', image: Images.trip2},
    {id: '3', name: 'Houston', image: Images.trip3},
    {id: '4', name: 'Houston', image: Images.trip4},
  ]);

  /**
   * call when search data
   * @param {*} keyword
   */
  const onSearch = keyword => {
    const found = searchHistory.some(item => item.keyword == keyword);
    let searchData = [];

    if (found) {
      searchData = searchHistory.map(item => {
        return {
          ...item,
          checked: item.keyword == keyword,
        };
      });
    } else {
      searchData = searchHistory.concat({
        keyword: search,
      });
    }
    setSearchHistory(searchData);
    setLoading(true);
    setTimeout(() => navigation.goBack(), 1000);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('search')}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={{padding: 20}}>
            <TextInput
              onChangeText={text => setSearch(text)}
              placeholder={t('search')}
              value={search}
              onSubmitEditing={() => {
                onSearch(search);
              }}
              icon={
                <TouchableOpacity
                  onPress={() => {
                    setSearch('');
                  }}
                  style={styles.btnClearSearch}>
                  <Icon name="times" size={18} color={BaseColor.grayColor} />
                </TouchableOpacity>
              }
            />
            <View style={{paddingTop: 20}}>
              <View style={styles.rowTitle}>
                <Text headline>{t('search_history').toUpperCase()}</Text>
                <TouchableOpacity onPress={() => setSearchHistory([])}>
                  <Text caption1 accentColor>
                    {t('clear')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {searchHistory.map((item, index) => (
                  <TouchableOpacity
                    style={[
                      styles.itemHistory,
                      {backgroundColor: colors.card},
                      item.checked
                        ? {
                            backgroundColor: colors.primary,
                          }
                        : {},
                    ]}
                    onPress={() => onSearch(item.keyword)}
                    key={'search' + index}>
                    <Text
                      caption2
                      style={
                        item.checked
                          ? {
                              color: BaseColor.whiteColor,
                            }
                          : {}
                      }>
                      {item.keyword}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={{paddingTop: 20}}>
              <View style={styles.rowTitle}>
                <Text headline>{t('discover_more').toUpperCase()}</Text>
                <TouchableOpacity>
                  <Text caption1 accentColor>
                    {t('refresh')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {discoverMore.map((item, index) => (
                  <TouchableOpacity
                    style={[styles.itemHistory, {backgroundColor: colors.card}]}
                    key={'discover' + index}>
                    <Text caption2>{item.keyword}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={{paddingTop: 20}}>
              <Text headline>{t('recently_view').toUpperCase()}</Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={recentlyView}
                keyExtractor={(item, index) => item.id}
                renderItem={({item, index}) => (
                  <Card
                    style={{
                      width: 100,
                      height: 100,
                      marginRight: 20,
                      marginTop: 5,
                    }}
                    image={item.image}
                    onPress={() => navigation.navigate('HotelDetail')}>
                    <Text headline semibold whiteColor>
                      {item.name}
                    </Text>
                  </Card>
                )}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
