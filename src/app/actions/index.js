export const changeAction = (value, id) => dispatch => {
  const type = 'SETTING_CHANGED';
  // const setting = {value, id};
  // localStorage.setItem('hipchatToken', hipchatToken);
  dispatch({type, value, id});
};
