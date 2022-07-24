import React, {useState, useRef} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, Images, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Image, Text, TextInput} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

export default function Messages({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const refFlatList = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: 'Hello developer',
      created: '08:43 AM',
      user: {
        id: 1,
        name: 'Steve Garrett',
        avatar: Images.profile2,
      },
    },
    {
      id: 2,
      message: 'You are there. Can you help me ?',
      created: '08:43 AM',
      user: {
        id: 1,
        name: 'Steve Garrett',
        avatar: Images.profile2,
      },
    },
    {
      id: 3,
      message: "Hi, I'm here !\nHow can I help you?",
      created: '08:45 AM',
    },
  ]);

  const renderItem = item => {
    if (item.user) {
      return (
        <View style={styles.userContent}>
          <Image
            source={Images.profile2}
            style={[styles.avatar, {borderColor: colors.border}]}
          />
          <View style={{paddingHorizontal: 8, flex: 7}}>
            <Text caption1>{item.user.name}</Text>
            <View
              style={[
                styles.userContentMessage,
                {backgroundColor: colors.primaryLight},
              ]}>
              <Text body2 whiteColor>
                {item.message}
              </Text>
            </View>
          </View>
          <View style={styles.userContentDate}>
            <Text footnote numberOfLines={1}>
              {item.created}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.meContent}>
        <View style={styles.meContentDate}>
          <Text footnote numberOfLines={1}>
            {item.created}
          </Text>
        </View>
        <View style={{paddingLeft: 8, flex: 7}}>
          <View
            style={[styles.meContentMessage, {backgroundColor: colors.card}]}>
            <Text body2>{item.message}</Text>
          </View>
        </View>
      </View>
    );
  };

  const sendMessage = () => {
    if (input != '') {
      messages.push({
        id: Math.random().toString(),
        message: input,
        created: '08:45 AM',
      });
      setInput('');
      setMessages(messages);
      if (refFlatList.current) {
        setTimeout(() => {
          refFlatList.current.scrollToEnd({animated: false});
        }, 500);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('messages')}
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
        <KeyboardAvoidingView
          style={{flex: 1, justifyContent: 'flex-end'}}
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          enabled>
          <View style={{flex: 1}}>
            <FlatList
              ref={refFlatList}
              data={messages}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({item}) => renderItem(item)}
            />
          </View>

          <View style={styles.inputContent}>
            <View style={{flex: 1}}>
              <TextInput
                onChangeText={text => setInput(text)}
                onSubmitEditing={() => sendMessage()}
                placeholder={t('type_message')}
                value={input}
              />
            </View>
            <TouchableOpacity
              style={[styles.sendIcon, {backgroundColor: colors.primary}]}
              onPress={sendMessage}>
              <Icon
                name="paper-plane"
                size={20}
                color="white"
                enableRTL={true}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
