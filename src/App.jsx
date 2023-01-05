import React, { useState, useEffect, } from 'react';
import BzCard from '@components/ui/BzCard/BzCard.index';
import TheGiftTimer from '@components/TheGiftTimer/TheGiftTimer.index'
import styles from './App.styles';
import { fetchWebinar } from '@api/webinar/fetchWebinar';

function App() {
  let startDateInterval = null;
  const [startDateState, setStartDateState] = useState(null)
  const [giftsState, setGiftsState] = useState([])
  const [giftIndexState, setGiftIndexState] = useState(0);
  const [giftState, setGiftState] = useState(null);

  useEffect(() => {
    // console.debug('App/useEffect/FetchWebinar'); //DELETE

    const day = document.getElementById('bizon365_timer_app_embedded__day-filed').attributes['data-value'].value;
    const time = document.getElementById('bizon365_timer_app_embedded__time-filed').attributes['data-value'].value;
    const date = `${day}T${time}`;

    // console.debug('App/useEffect/FetchWebinar/day', day); //DELETE
    // console.debug('App/useEffect/FetchWebinar/time', time); //DELETE
    // console.debug('App/useEffect/FetchWebinar/date', date); //DELETE

    setStartDateState(new Date(date).getTime());
  }, []);
  useEffect(() => {
    // console.debug('App/useEffect/startDateState', startDateState); //DELETE

    if (startDateState !== null) {
      startDateInterval = setInterval(runStartDateInterval, 1000);
    }
  }, [startDateState]);
  useEffect(() => {
    // console.debug('App/useEffect/GiftsStateLength', giftsState.length); //DELETE
    // console.debug('App/useEffect/giftIndexState', giftIndexState); //DELETE
    // console.debug('App/useEffect/GiftsState', giftsState); //DELETE

    if (giftsState.length) {
      setGiftState(giftsState[giftIndexState]);
      setGiftIndexState(giftIndexState);
    }
  }, [giftsState.length]);

  const runStartDateInterval = () => {
    // console.debug('App/services/startDateInterval/startDateState', startDateState); //DELETE

    let now = new Date().getTime();
    let timeleft = startDateState - now;

    // console.debug('GiftTimer/runLinkInterval/now', now); //DELETE
    // console.debug('GiftTimer/runLinkInterval/timeleft', timeleft); //DELETE

    if (timeleft < 0) {
      // console.debug('GiftTimer/runLinkInterval/stop'); //DELETE

      clearInterval(startDateInterval);
      fetch();
    }
  };
  const fetch = async () => {
    // console.debug('App/services/fetch'); //DELETE

    const splitedPathname = window.location.pathname.split('/');
    const webinarCode = splitedPathname[splitedPathname.length - 1];

    // console.debug('App/services/fetch/webinarCode', webinarCode); //DELETE

    const webinar = await fetchWebinar({ code: webinarCode });
    const gifts = webinar.gifts;

    setGiftsState(await offsetFilter({ gifts }));
  };
  const giftTimerFinish = () => {
    // console.debug('App/services/giftTimerFinish'); //DELETE

    setGiftState(giftsState[giftIndexState + 1]);
    setGiftIndexState(giftIndexState + 1);
  };
  const offsetFilter = async ({ gifts }) => {
    // console.debug('App/services/offsetFilter/gifts', gifts); //DELETE

    let now = new Date().getTime();
    let offset = Math.floor((now - startDateState) / 1000);

    // console.debug('GiftTimer/runLinkInterval/now', now); //DELETE
    // console.debug('GiftTimer/runLinkInterval/offset', offset); //DELETE

    if (offset > 0) {
      return await gifts.map(gift => {
        if (offset > 0) {
          let tmpGiftTimer = gift.giftTimer;
          let tmpDownloadTimer = gift.downloadTimer;

          if (offset >= tmpGiftTimer) {
            offset -= tmpGiftTimer;
            tmpGiftTimer = 0;
          } else {
            tmpGiftTimer -= offset;
            offset = 0;
          }

          if (offset >= tmpDownloadTimer) {
            offset -= tmpDownloadTimer;
            tmpDownloadTimer = 0;
          } else {
            tmpDownloadTimer -= offset;
            offset = 0;
          }

          return {
            ...gift,
            giftTimer: tmpGiftTimer,
            downloadTimer: tmpDownloadTimer,
          };
        }

        return { ...gift };
      });
    }

    return gifts;
  };

  return (
    <div className={styles.bizon365_timer_app_embedded}>
      {!!giftsState.length && !!giftState &&
        <BzCard>
          <div className={styles.bizon365_timer_app_embedded__container}>
            <div className={styles.bizon365_timer_app_embedded__gift_progress}>
              Бонус {giftIndexState + 1}/{giftsState.length}
            </div>

            <div className={styles.bizon365_timer_app_embedded__gift_current}>
              {giftState.name}
            </div>

            <TheGiftTimer
              classNames={styles.bizon365_timer_app_embedded__gift_timer}
              finish={giftTimerFinish}
              giftTimer={giftState.giftTimer}
              downloadTimer={giftState.downloadTimer}
              link={giftState.link}
            />
          </div>
        </BzCard>
      }
    </div>
  );
}

export default App;