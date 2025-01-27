const ADD_FORM_DATA = 'ADD_FORM_DATA';
const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA';
const DELETE_FORM_DATA = 'DELETE_FORM_DATA';

const initialState = {
  data: [],
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FORM_DATA:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case UPDATE_FORM_DATA:
      const updatedData = [...state.data];
      updatedData[action.payload.index] = action.payload.data;
      return {
        ...state,
        data: updatedData,
      };

    case DELETE_FORM_DATA:
      return {
        ...state,
        data: state.data.filter((_, index) => index !== action.payload),
      };

    default:
      return state;
  }
};

export const addFormData = (data) => ({
  type: ADD_FORM_DATA,
  payload: data,
});

export const updateFormData = (index, data) => ({
  type: UPDATE_FORM_DATA,
  payload: { index, data },
});

export const deleteFormData = (index) => ({
  type: DELETE_FORM_DATA,
  payload: index,
});

export default formReducer;
