import React, { useState, useEffect } from "react";
import { BackwardsoleGameObject } from "../model/BackwardsoleGameObject";
import { WordBank } from "../model/WordBank";

type TimerProps = {
  hide: boolean;
};

const Timer = (props: TimerProps) => {
  const [timeUntil6pm, setTimeUntil6pm] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    updateTimer();
    setInterval(updateTimer, 1000);

    const sixpm = new Date();
    const now = new Date();
    sixpm.setUTCHours(18);
    sixpm.setUTCMinutes(0);
    sixpm.setUTCSeconds(0);

    if (now > sixpm) {
      sixpm.setDate(sixpm.getDate() + 1);
    }

    const timeUntil6pm = sixpm.getTime() - now.getTime();
  
    setTimeout(resetApplication, timeUntil6pm);
  }, []);

  const updateTimer = () => {
    const now = new Date();
    const sixpm = new Date();
    sixpm.setUTCHours(18);
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


function resetApplication() {

  const gameObjectString = localStorage.getItem("backwardsole");
  const gameObject: BackwardsoleGameObject =
    gameObjectString && JSON.parse(gameObjectString)
      ? JSON.parse(gameObjectString)
      : null;
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

    localStorage.setItem("backwardsole", JSON.stringify(gameObject));
  }

  // select a new word
}
export default Timer;
