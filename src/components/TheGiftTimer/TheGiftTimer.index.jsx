import React, { useState, useEffect, } from 'react';
import BzCard from '@components/ui/BzCard/BzCard.index';
import styles from './TheGiftTimer.styles';

const TheGiftTimer = () => {
  useEffect(() => {
    console.debug('GiftTimer[useEffect]'); //DELETE
  }, []);

  return (
    <div className={styles.bizon_gift_timer}>
      <BzCard>
        <div className={styles.bizon_gift_timer__content}>
          GiftTimer React Component
        </div>
      </BzCard>
    </div>
  );
};

export default TheGiftTimer;