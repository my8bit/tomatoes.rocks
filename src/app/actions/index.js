export const increaseTime = () => {
  return {
    type: 'INCREASE'
  };
};

export const getMoviesAction = () => dispatch => {
  dispatch({
    type: 'SET_POSTER'
  });
};
