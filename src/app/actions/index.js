export const changeAction = setting => dispatch => {
  const type = 'SETTING_CHANGED';
  // localStorage.setItem('hipchatToken', hipchatToken);
  dispatch({type, setting});
};
