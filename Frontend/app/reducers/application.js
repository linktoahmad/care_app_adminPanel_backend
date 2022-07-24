import * as actionTypes from '@actions/actionTypes';
const initialState = {
  questions: {
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
    q6: 0,
    q7: 0,
    q8: 0,
    q9: 0,
    q10: 0,
  },
  quizData: {
    mood: '',
    date: '',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_SCORE:
      return {
        questions: {...state.questions, [action.question]: action.score},
        quizData: state.quizData
      };
    case actionTypes.SAVE_MOOD:
      return {
        questions: state.questions,
        quizData: {mood: action.mood, date: action.date}
      };
    default:
      return state;
  }
};
