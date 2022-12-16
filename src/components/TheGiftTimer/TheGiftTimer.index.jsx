import React, { useState, useEffect, } from 'react';
import BzCard from '@components/ui/BzCard/BzCard.index';
import styles from './TheGiftTimer.styles';

const TheGiftTimer = () => {
  useEffect(() => {
    console.debug('GiftTimer[useEffect]'); //DELETE
  }, []);

  return (
    <div className="bizon-gift-timer">
      <BzCard>
        <div className="bizon-gift-timer__content">
          GiftTimer React Component
        </div>
      </BzCard>
    </div>
  );
};

export default TheGiftTimer;