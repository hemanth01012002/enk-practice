// Define the initial state
const initialState = {
  data: [], 
};

// Action handlers
const actionHandlers = {
  ADD_FORM_DATA: (state, action) => ({
    ...state,
    data: [...state.data, action.payload],
  }),

  UPDATE_FORM_DATA: (state, action) => {
    const updatedData = [...state.data];
    updatedData[action.payload.index] = action.payload.data;
    return {
      ...state,
      data: updatedData,
    };
  },

  DELETE_FORM_DATA: (state, action) => ({
    ...state,
    data: state.data.filter((_, index) => index !== action.payload),
  }),
};

// Reducer function
const formReducer = (state = initialState, action) => {
  const handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

// Action creators
export const addFormData = (data) => ({
  type: 'ADD_FORM_DATA',
  payload: data,
});

export const updateFormData = (index, data) => ({
  type: 'UPDATE_FORM_DATA',
  payload: { index, data },
});

export const deleteFormData = (index) => ({
  type: 'DELETE_FORM_DATA',
  payload: index,
});

export default formReducer;

