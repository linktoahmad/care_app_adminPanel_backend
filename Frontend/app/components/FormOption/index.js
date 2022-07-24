import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Icon} from '@components';
import styles from './styles';
import {useTheme} from '@config';

export default function FormOption(props) {
  const {colors} = useTheme();
  const {style} = props;

  let moods = [
    {name: 'depressed', icon: 'sad-cry', color: '#ff7575'},
    {name: 'stressed', icon: 'sad-tear', color: '#ff8c75'},
    {name: 'upset', icon: 'frown', color: '#ffa375'},
    {name: 'tense', icon: 'flushed', color: '#ffba75'},
    {name: 'fatigued', icon: 'meh', color: '#ffd375'},
    {name: 'calm', icon: 'smile', color: '#efff75'},
    {name: 'relaxed', icon: 'smile-beam', color: '#c3ff75'},
    {name: 'happy', icon: 'grin-alt', color: '#8aff75'},
    {name: 'excited', icon: 'grin-beam', color: '#75ffb3'},
    {name: 'joy', icon: 'grin-stars', color: '#75ffe6'},
  ];
  return (
    <ScrollView style={{margin: 20}}>
      {moods.map(item => (
        <TouchableOpacity
          style={[
            styles.contentForm,
            {
              backgroundColor: colors.card,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            style,
          ]}>
          <View
            style={{display: 'flex', flexDirection: 'column', marginRight: 60}}>
            <Text caption2 light style={{marginBottom: 5}}>
              Mood
            </Text>
            <Text body1 semibold>
              {item.name}
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: item.color,
                borderRadius: 30,
                width: 50,
                height: 50,
                marginRight: 10,
              }}></View>
            <Icon
              name={item.icon}
              size={50}
              color={colors.primary}
              style={{textAlign: 'center'}}
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

FormOption.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

FormOption.defaultProps = {
  style: {},
};
