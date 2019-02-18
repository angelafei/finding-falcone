export function createReducer(initialState, reducerMap, baseReducer) {
  return (state = initialState, action = {}) => {
    const reducer = reducerMap[action.type];

    if (reducer) {
      return reducer(state, action.payload);
    }

    return baseReducer ? baseReducer(state, action) : state;
  };
}
