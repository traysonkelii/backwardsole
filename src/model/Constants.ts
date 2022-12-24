import { BackwardsoleGameObject } from "./BackwardsoleGameObject";

export const staticValues = { localStorageKey: 'backwordsle-1.0'}

export const TwentyFourHoursMilli = 86400000;

export const getGameObject = (fromLocation?: string) => {
  console.log(fromLocation);
  const gameObjectString = localStorage.getItem(staticValues.localStorageKey);
  const gameObject: BackwardsoleGameObject =
  gameObjectString && JSON.parse(gameObjectString)
    ? JSON.parse(gameObjectString)
    : null;
  
  return gameObject;
}