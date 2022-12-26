import React, { useState, useEffect, } from 'react';
import styles from './BzCard.styles';

const BzCard = ({ children }) => {
  useEffect(() => {
    console.debug('BzCard[useEffect]'); //DELETE
  }, []);

  return (
    <div className={styles.bzcard}>
      {children}
    </div>
  );
};

export default BzCard;