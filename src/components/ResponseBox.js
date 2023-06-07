import React from 'react';
import classes from './ResponseBox.module.css';

const ResponseBox = ({value}) => {
  return (
    <textarea
      className={classes.inputbox}
      value={value}
    ></textarea>
  );
};

export default ResponseBox;