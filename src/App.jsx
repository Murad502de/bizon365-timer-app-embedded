import React from 'react';
import TheGiftTimer from '@components/TheGiftTimer/TheGiftTimer.index'
import styles from './App.styles';

function App() {
  return (
    <div className={styles.bizon365_timer_app_embedded}>
      <div className={styles.bizon365_timer_app_embedded__container}>
        <TheGiftTimer />
      </div>
    </div>
  );
}
export default App;