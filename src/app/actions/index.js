export const changeAction = (value, id) => dispatch => {
  const type = 'SETTING_CHANGED';
  dispatch({type, value, id});
};
