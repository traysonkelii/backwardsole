import React, { useState, useEffect } from "react";
import { BackwardsoleGameObject, StartingGameObject } from "../model/BackwardsoleGameObject";
import {
  getGameObject,
  staticValues,
  TwentyFourHoursMilli,
} from "../model/Constants";
import { WordBank } from "../model/WordBank";

type TimerProps = {
  hide: boolean;
  setGameOver: Function;
  setClose: Function;
};

const Timer = (props: TimerProps) => {
  const [timeUntil6pm, setTimeUntil6pm] = useState<number | null>(null);

  useEffect(() => {
    const gameObject = getGameObject();

    const oldGameTime = gameObject.currentGameTime
      ? gameObject.currentGameTime
      : null;

    if (oldGameTime) {
      console.log(oldGameTime)
      if (new Date().getTime() - oldGameTime > TwentyFourHoursMilli) {
        resetApplication(props.setClose, props.setGameOver);
      } else {
        const sixpm = new Date();
        sixpm.setUTCHours(3);
        sixpm.setUTCMinutes(0);
        sixpm.setUTCSeconds(0);
        const oldGameDate = new Date(oldGameTime);
        const oldGameDay = oldGameDate.getDay();
        const oldGameHour = oldGameDate.getHours();
        const currentGameDay = sixpm.getDay();
        const currentGameHour = sixpm.getHours();

        if (oldGameDay === currentGameDay && oldGameHour < currentGameHour)
          resetApplication(props.setClose, props.setGameOver);
        else {
          updateGame();
        }
      }
    } else {
      updateGame();
    }
  }, []);

  const updateGame = () => {
    updateTimer();
    setInterval(updateTimer, 1000);

    const sixpm = new Date();
    const now = new Date();
    sixpm.setUTCHours(3);
    sixpm.setUTCMinutes(0);
    sixpm.setUTCSeconds(0);

    if (now > sixpm) {
      sixpm.setDate(sixpm.getDate() + 1);
    }

    const timeUntil6pm = sixpm.getTime() - now.getTime();

    setTimeout(resetApplication, timeUntil6pm);
  };

  const updateTimer = () => {
    const now = new Date();
    const sixpm = new Date();
    sixpm.setUTCHours(3);
    sixpm.setUTCMinutes(0);
    sixpm.setUTCSeconds(0);

    if (now > sixpm) {
      sixpm.setDate(sixpm.getDate() + 1);
    }

    const timeUntil6pm = sixpm.getTime() - now.getTime();

    setTimeUntil6pm(timeUntil6pm);
  };

  if (timeUntil6pm === null) {
    return null;
  }

  const hours = Math.floor(timeUntil6pm / (1000 * 60 * 60));
  const minutes = Math.floor((timeUntil6pm / (1000 * 60)) % 60);
  const seconds = Math.floor((timeUntil6pm / 1000) % 60);

  return props.hide ? null : (
    <div>
      {hours} hours {minutes} minutes and {seconds} seconds.
    </div>
  );
};

function resetApplication(setClose: Function, setGameOver: Function) {
  const gameObject = getGameObject();

  if (gameObject) {
    gameObject.guesses = [];
    gameObject.rows = [
      { words: [], isEnabled: true, winningRow: false },
      { words: [], isEnabled: true, winningRow: false },
      { words: [], isEnabled: true, winningRow: false },
      { words: [], isEnabled: true, winningRow: false },
      { words: [], isEnabled: true, winningRow: false },
      { words: [], isEnabled: true, winningRow: false },
    ];
    gameObject.playedFirstListen = false;
    gameObject.currentIndex = 0;
    gameObject.gameOver = false;

    const randomNumber = Math.floor(Math.random() * WordBank.length - 1);
    const newWord = WordBank[randomNumber];
    gameObject.answer = newWord;
    gameObject.gameWon = false;
    gameObject.currentGameTime = new Date().getTime();

    localStorage.setItem(
      staticValues.localStorageKey,
      JSON.stringify(gameObject)
    );
  } else {
    
    localStorage.setItem(staticValues.localStorageKey, JSON.stringify(StartingGameObject))
  }

  // select a new word
  window.location.reload();
}
export default Timer;

/**
 *
 *
 *  did they start a game yes => what time was it 5:00pm game restarts at 6:00pm
 *
 *
 */
