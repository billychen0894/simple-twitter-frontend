import classNames from 'classnames/bind';
import { useEffect, useReducer } from 'react';

import { validate } from 'shared/utils/validators';
import styles from 'shared/components/UIElements/Input.module.scss';

const cx = classNames.bind(styles);

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': {
      return {
        ...state,
        val: action.val,
        isValid: validate(action.val, action.validators),
      };
    }
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      };
    }
    default: {
      return state;
    }
  }
};

function Input({
  id,
  label,
  element,
  type,
  placeholder,
  rows,
  validators,
  errorText,
  onInput,
  initialValue,
  initialValid,
  currTextLength,
  maxTextLength,
  textLength,
  inputStyles,
  inputInlineStyle,
}) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    val: initialValue || '',
    isValid: initialValid || false,
    isTouched: false,
  });

  const { val, isValid } = inputState;

  useEffect(() => {
    onInput(id, val, isValid);
  }, [id, val, isValid, onInput]);

  const handleInputChange = (e) => {
    dispatch({ type: 'CHANGE', val: e.target.value, validators });
  };

  const handleInputTouch = () => {
    dispatch({ type: 'TOUCH' });
  };

  const inputElement =
    element === 'input' ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={handleInputTouch}
        value={inputState.val}
        style={inputInlineStyle}
      />
    ) : (
      <textarea
        id={id}
        rows={rows || 3}
        placeholder={placeholder}
        onChange={handleInputChange}
        onBlur={handleInputTouch}
        value={inputState.val}
      />
    );

  const className = cx({
    formControl: true,
    'formControl--invalid': !inputState.isValid && inputState.isTouched,
  });

  return (
    <div className={`${className} ${inputStyles} `}>
      {inputElement}
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputInfo}>
        {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        {textLength && (
          <span className={styles.textLength}>
            {currTextLength}/{maxTextLength}
          </span>
        )}
      </div>
    </div>
  );
}

export default Input;
