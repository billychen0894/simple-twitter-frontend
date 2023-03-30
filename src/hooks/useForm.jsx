import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE': {
      let formIsValid = true;

      // update the value of formIsValid after input change
      Object.keys(state.inputs).forEach((inputId) => {
        if (!state.inputs[inputId]) {
          return;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      });

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            val: action.val,
            isValid: action.isValid,
          },
        },
        formIsValid,
      };
    }

    case 'SET_DATA': {
      return {
        inputs: action.inputs,
        formIsValid: action.formIsValid,
      };
    }

    default: {
      return state;
    }
  }
};

function useForm(initialInputs, initialFormValidity) {
  const initialFormState = {
    inputs: initialInputs,
    formIsValid: initialFormValidity,
  };

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const handleInput = useCallback((id, val, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', val, isValid, inputId: id });
  }, []);

  const setFormData = useCallback((formInputs, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: formInputs,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, handleInput, setFormData];
}

export default useForm;
