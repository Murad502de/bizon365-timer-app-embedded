import React, { useState, useEffect, } from 'react';
import styles from './TheGiftTimer.styles';

const TheGiftTimer = ({
  classNames,
  giftTimer,
  downloadTimer,
  link,
  finish,
}) => {
  let timerInterval = null;
  let linkInterval = null;
  const [giftTimerDownState, setGiftTimerDownState] = useState(-1);
  const [linkTimerDownState, setLinkTimerDownState] = useState(-1);
  // const [daysState, setDaysState] = useState(0);
  const [hoursState, setHoursState] = useState(0);
  const [minutesState, setMinutesState] = useState(0);
  const [secondsState, setSecondsState] = useState(0);
  const [timerShowState, setTimerShowState] = useState(null);
  const [btnShowState, setBtnShowState] = useState(null);

  useEffect(() => {
    console.debug('GiftTimer/useEffect/giftTimer', giftTimer); //DELETE
    console.debug('GiftTimer/useEffect/downloadTimer', downloadTimer); //DELETE

    clearInterval(timerInterval);

    if (giftTimer === 0 && downloadTimer === 0) {
      console.debug('GiftTimer/useEffect/finish'); //DELETE

      finish();
    } else {
      console.debug('GiftTimer/useEffect/run-timer'); //DELETE

      setGiftTimerDownState(new Date().getTime() + giftTimer * 1000);
    }
  }, [
    giftTimer,
    downloadTimer,
    link,
  ]);
  useEffect(() => {
    console.debug('GiftTimer/useEffect/giftTimerDownState', giftTimerDownState); //DELETE

    if (giftTimerDownState !== -1) {
      timerInterval = setInterval(runTimerInterval, 500);
      setTimerShowState(true);
      setBtnShowState(false);
    }

  }, [giftTimerDownState]);
  useEffect(() => {
    console.debug('GiftTimer/useEffect/linkTimerDownState', linkTimerDownState); //DELETE

    if (linkTimerDownState !== -1) {
      linkInterval = setInterval(runLinkInterval, 500);
      setTimerShowState(false);
      setBtnShowState(true);
    }

  }, [linkTimerDownState]);
  useEffect(() => {
    console.debug('GiftTimer/useEffect/timerEnded/timerShowState', timerShowState); //DELETE
    console.debug('GiftTimer/useEffect/timerEnded/btnShowState', btnShowState); //DELETE

    if (
      (!timerShowState && !btnShowState) &&
      (timerShowState !== null) &&
      (btnShowState !== null)
    ) {
      console.debug('GiftTimer/useEffect/timerEnded/end', !timerShowState || !btnShowState); //DELETE

      finish();
    }

  }, [timerShowState, btnShowState]);

  const runTimerInterval = () => {
    // console.debug('GiftTimer/runTimerInterval/giftTimerDownState', giftTimerDownState); //DELETE

    let now = new Date().getTime();
    let timeleft = giftTimerDownState - now;

    // console.debug('GiftTimer/runTimerInterval/now', now); //DELETE

    // setDaysState(Math.floor(timeleft / (1000 * 60 * 60 * 24)));
    setHoursState(Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutesState(Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)));
    setSecondsState(Math.floor((timeleft % (1000 * 60)) / 1000));

    if (timeleft < 0) {
      console.debug('GiftTimer/runTimerInterval/stop'); //DELETE

      clearInterval(timerInterval);
      // setDaysState(0);
      setHoursState(0);
      setMinutesState(0);
      setSecondsState(0);
      setLinkTimerDownState(new Date().getTime() + downloadTimer * 1000);
    }
  };
  const runLinkInterval = () => {
    // console.debug('GiftTimer/runLinkInterval/linkTimerDownState', linkTimerDownState); //DELETE

    let now = new Date().getTime();
    let timeleft = linkTimerDownState - now;

    // console.debug('GiftTimer/runLinkInterval/now', now); //DELETE

    if (timeleft < 0) {
      console.debug('GiftTimer/runLinkInterval/stop'); //DELETE

      clearInterval(linkInterval);
      setBtnShowState(false);
    }
  };
  const getTimerStr = ({ hours, minutes, seconds, }) => {
    console.debug('GiftTimer/services/getTimerStr/hours', hours); //DELETE
    console.debug('GiftTimer/services/getTimerStr/minutes', minutes); //DELETE
    console.debug('GiftTimer/services/getTimerStr/seconds', seconds); //DELETE

    const _hours = hours < 10 ? `0${hours}` : hours;
    const _minutes = minutes < 10 ? `0${minutes}` : minutes;
    const _seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${_hours}:${_minutes}:${_seconds}`
  };

  return (
    <div className={`${styles.bizon_gift_timer} ${classNames}`}>
      <div className={styles.bizon_gift_timer__content}>
        {timerShowState &&
          <div className={styles.bizon_gift_timer__content}>
            {getTimerStr({
              hours: hoursState,
              minutes: minutesState,
              seconds: secondsState,
            })}
          </div>
        }

        {!timerShowState && btnShowState &&
          <a href={link} target="_blank" className={styles.bizon_gift_timer__btn}>
            Получить бонус
          </a>
        }
      </div>
    </div>
  );
};

export default TheGiftTimer;