import React, {useEffect, useState} from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
import {BaseStyle} from '@config';
import {
  Header,
  SafeAreaView,
  BookingHistory,
  Text,
  Card,
  Button,
} from '@components';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import apiList, {serverIp} from '../../apiList';
import {ApplicationActions} from '@actions';
import styles from './styles';

//todo
// get mode based activity
// rout to activity with data to show activity details
// get activity api is now post because get dont body

export default function Booking({navigation}) {
  const {t} = useTranslation();

  const [result, setResult] = useState(false);
  const [activity, setActivity] = useState({
    name: 'no name',
    mood: 'no mood',
    description: 'no desc',
    image:
      'https://ogden_images.s3.amazonaws.com/www.motherearthliving.com/images/2019/04/20130432/79F3E4F401294522A93B04BDF9F1B634-300x300.jpg',
  });
  const dispatch = useDispatch();
  const totalScore = useSelector(state => state.application);

  const SaveMood = mood => {
    dispatch(
      ApplicationActions.onSaveMood(
        mood,
        new Date().toISOString('uk').substring(0, 10),
      ),
    );
    setResult(true);
    getMoodActivity();
  };

  const getResult = async () => {
    // quiz score max can be 1000 and min is 100
    // quiz score/10 to get value under or equal 100
    console.log(totalScore.questions);
    var sum = 0;
    for (var el in totalScore.questions) {
      if (totalScore.questions.hasOwnProperty(el)) {
        sum += parseFloat(totalScore.questions[el]);
      }
    }
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      console.log(value);
      if (value !== null) {
        axios
          .get(apiList.getUserDate, {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          })
          .then(res => {
            console.log({
              _id: res.data._id,
              score: sum / 10,
            });
            axios
              .post(apiList.SubmitQuiz, {
                _id: res.data._id,
                score: sum / 10,
              })
              .then(() => {
                axios.get(apiList.GetMoodOnScore+`/${Math.round(sum / 10) * 10}`).then(res => {
                  SaveMood(res.data.mood)
                }
                )
              });
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  // questions will be retrived form database and on every answer score will be added to a react hook every answer has a score from 1-10 and max 10 question so total score 100 annd at end uswr will press submit end quiz
  const [quiz, setQuiz] = useState([
    {
      question:
        'How often have you been bothered by feeling bad about yourself, or that you are a failure, or have let yourself or your family down?',
      answers: [
        'not at all',
        'several days',
        'more then half a day',
        'every day',
      ],
      score: [1, 4, 6, 10],
      mumber: 1,
    },
  ]);

  const getQuiz = () => {
    let array = [];
    axios
      .get(apiList.getQuiz)
      .then(res => {
        res.data.forEach((item, key) =>
          array.push({
            question: item.question,
            answers: item.answers,
            score: item.scores,
            number: key + 1,
          }),
        );
        setQuiz(array);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getMoodActivity = () => {
    axios
      .post(apiList.GetMoodActivity, {mood: totalScore.quizData.mood})
      .then(res => {
        setActivity({
          name: res.data[0].name,
          mood: res.data[0].mood,
          description: res.data[0].description,
          image: res.data[0].image,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    // console.log(totalScore.quizData.date);
    // console.log(totalScore.quizData.mood);
    if (
      totalScore.quizData.date === new Date().toISOString('uk').substring(0, 10)
    ) {
      setResult(true);
      getMoodActivity();
    }

    getQuiz();
  }, []);

  const renderItem = item => {
    return (
      <BookingHistory
        question={item.question}
        answers={item.answers}
        scores={item.score}
        number={item.number}
        style={{paddingVertical: 10, marginHorizontal: 20}}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header title={t('Quiz')} />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        {!result ? (
          <FlatList
            data={quiz}
            renderItem={({item}) => renderItem(item)}
            ListFooterComponent={() => (
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#466fc7',
                    padding: 30,
                    borderRadius: 10,
                    marginHorizontal: '5%',
                    display: 'flex',
                  }}
                  onPress={() => getResult()}
                  activeOpacity={0.5}>
                  <Text
                    overline
                    semibold
                    style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <>
            <View style={styles.banner}>
              <Text
                overline
                semibold
                style={{textAlign: 'center', color: 'black', fontSize: 20}}>
                You did it!
              </Text>
              <Text
                overline
                style={{textAlign: 'center', color: 'black', fontSize: 15}}>
                You took the quiz on
              </Text>
              <Text
                overline
                semibold
                style={{textAlign: 'center', color: 'black', fontSize: 20}}>
                {totalScore.quizData.date}
              </Text>
              <Text
                overline
                style={{textAlign: 'center', color: 'black', fontSize: 15}}>
                according to your answers
              </Text>
              <Text
                overline
                style={{textAlign: 'center', color: 'black', fontSize: 15}}>
                you must be feeling
              </Text>
              <Text
                overline
                semibold
                style={{textAlign: 'center', color: 'black', fontSize: 20}}>
                {totalScore.quizData.mood}
              </Text>
            </View>
            <Card
              style={[styles.promotionItem]}
              image={`${serverIp}`+activity.image}
              onPress={() =>
                navigation.navigate('HotelDetail', {activity: activity})
              }>
              <Text subhead whiteColor>
                Recomenended Activity
              </Text>
              <Text title2 whiteColor semibold>
                {activity.name}
              </Text>
              <View style={styles.contentCartPromotion}>
                <Button
                  style={styles.btnPromotion}
                  onPress={() =>
                    navigation.navigate('HotelDetail', {activity: activity})
                  }>
                  <Text body2 semibold whiteColor>
                    More Details
                  </Text>
                </Button>
              </View>
            </Card>
          </>
        )}
      </SafeAreaView>
    </View>
  );
}
