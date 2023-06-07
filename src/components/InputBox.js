import React from 'react';
import classes from './InputBox.module.css';

const InputBox = ({ id, placeholder, value, onChange }) => {
  return (
    <textarea
      className={classes.inputbox}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></textarea>
  );
};

export default InputBox;