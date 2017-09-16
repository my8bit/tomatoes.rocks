export const changeAction = (value, id) => {
  const type = 'SETTING_CHANGED';
  return {type, value, id};
};
