import { AdventLoggerLevels } from "./logger";

export interface AdventState extends Object {
  level: AdventLoggerLevels
}

const INITIAL_STATE = {
  level: AdventLoggerLevels.info,
  transports: {
    console: {},
    remote: {}
  }
};

export function AdventState(
  state: object=INITIAL_STATE,
  previous?: object
): AdventState {
  let newState;
  if (previous) {
    newState = {
      ...previous,
      ...state
    };
  } else {
    newState = {
      ...state
    };
  }
  return newState as AdventState;
}
