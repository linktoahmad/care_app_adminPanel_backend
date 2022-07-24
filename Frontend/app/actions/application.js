import * as actionTypes from './actionTypes';


const addition = (key, value) => {
  return {
    type: actionTypes.ADD_SCORE,
    score:value,
    question:key
  };
};


const saveMood = (mood, date) => {
  return {
    type: actionTypes.SAVE_MOOD,
    mood:mood,
    date:date
  };
};


const changeTheme = theme => {
  return {
    type: actionTypes.CHANGE_THEME,
    theme,
  };
};

const changeFont = font => {
  return {
    type: actionTypes.CHANGE_FONT,
    font,
  };
};

const forceTheme = force_dark => {
  return {
    type: actionTypes.FORCE_APPEARANCE,
    force_dark,
  };
};

const changeLanguge = language => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language,
  };
};

export const onAddition = (key, value) => dispatch => {
  dispatch(addition(key, value));
};

export const onSaveMood = (mood, date) => dispatch => {
  dispatch(saveMood(mood, date));
};

export const onChangeTheme = theme => dispatch => {
  dispatch(changeTheme(theme));
};

export const onForceTheme = mode => dispatch => {
  dispatch(forceTheme(mode));
};

export const onChangeFont = font => dispatch => {
  dispatch(changeFont(font));
};

export const onChangeLanguage = language => dispatch => {
  dispatch(changeLanguge(language));
};
