import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import {useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import {useDispatch, useStore} from 'react-redux';
import {ApplicationActions} from '@actions';

export default function BookingHistory(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {style, question, answers, scores, number} = props;

  const notSelected = {a: '#98b6e3', b: '#98b6e3', c: '#98b6e3', d: '#98b6e3'};
  const [selected, setSelected] = useState({
    a: '#98b6e3',
    b: '#98b6e3',
    c: '#98b6e3',
    d: '#98b6e3',
  });

  const dispatch = useDispatch();

  const addScore = (selected, value) => {
    setSelected({...notSelected, [selected]: '#57948f'});
    dispatch(ApplicationActions.onAddition(`q${number}`,value));
  };

  return (
    <TouchableOpacity
      style={[styles.contain, {shadowColor: colors.border}, style]}
      activeOpacity={1}>
      <View
        style={[
          styles.nameContent,
          {
            borderBottomColor: colors.card,
            backgroundColor: colors.primaryLight,
          },
        ]}>
        <Text body2 whiteColor semibold>
          Question # {number}
        </Text>
      </View>
      <View
        style={[styles.mainContent, {backgroundColor: colors.primaryLight}]}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text whiteColor>{question}</Text>
        </View>
      </View>
      <View style={[styles.validContent, {backgroundColor: colors.card}]}>
        <TouchableOpacity
          style={{
            backgroundColor: selected.a,
            padding: 5,
            borderRadius: 10,
            flexShrink: 1,
            maxWidth: '25%',
            minWidth: '25%',
            margin: '1%',
            marginLeft: '-3%',
          }}
          onPress={() => addScore('a', scores[0])}
          activeOpacity={0.5}>
          <Text overline semibold>
            {answers[0]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selected.b,
            padding: 5,
            borderRadius: 10,
            flexShrink: 1,
            maxWidth: '25%',
            minWidth: '25%',
            margin: '1%',
          }}
          onPress={() => addScore('b', scores[1])}
          activeOpacity={0.5}>
          <Text overline semibold>
            {answers[1]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selected.c,
            padding: 5,
            borderRadius: 10,
            flexShrink: 1,
            maxWidth: '25%',
            minWidth: '25%',
            margin: '1%',
          }}
          onPress={() => addScore('c', scores[2])}
          activeOpacity={0.5}>
          <Text overline semibold>
            {answers[2]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: selected.d,
            padding: 5,
            borderRadius: 10,
            flexShrink: 1,
            maxWidth: '25%',
            minWidth: '25%',
            margin: '1%',
          }}
          onPress={() => addScore('d', scores[3])}
          activeOpacity={0.5}>
          <Text overline semibold>
            {answers[3]}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

BookingHistory.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  question: PropTypes.string,
  answers: PropTypes.array,
  scores: PropTypes.array,
};

BookingHistory.defaultProps = {
  question: '',
  answers: [],
  scores: [],
  style: {},
};
