(function(window) {
  'use strict';
  window.__ADVENT_EXAMPLE_LEVELMAP = {
    trace: {
      color: 'black',
      bg: 'lightcyan'
    },
    debug: {
      color: 'black',
      bg: 'lightgray'
    },
    info: {
      color: 'black',
      bg: 'lightskyblue'
    },
    warn: {
      color: 'back',
      bg: 'lightgoldenrodyellow'
    },
    error: {
      color: 'white',
      bg: 'lightsalmon'
    },
    fatal: {
      color: 'white',
      bg: 'lightcoral'
    }
  }
  window.__ADVENT_EXAMPLE_LEVELS__ = Object.keys(window.__ADVENT_EXAMPLE_LEVELMAP);
  window.__ADVENT_getCapitalizeLevelName = level => {
    return `${level.charAt(0).toUpperCase()}${level.slice(1)}`;
  };
})(this);
