(function(window) {
  'use strict';
  const levels = window.__ADVENT_EXAMPLE_LEVELS__;
  const levelCapitalized = window.__ADVENT_getCapitalizeLevelName;
  const Advent = window.Advent;
  const ConsoleTransport = Advent.defaultTransports.Console;
  const advent = Advent.Construct({
    destinations: [{
      transport: ConsoleTransport.Construct(100),
      rate: 0
    }],
    meta: {
      example: 0
    },
    tags: [
      'example'
    ]
  });
  const getInputByName = name => {
    return document.getElementById('example-form').elements[name];
  };
  const clearInputByName = name => {
    getInputByName(name).value = null;
  };
  const log = (level, name, index) => {
    let msg = getInputByName('input').value;
    const tag = `example${index}`;
    const meta = {
      [`example${index}`]: index
    };
    const tags = [tag];
    if (level === 'error' || level === 'fatal') {
      advent.logger[level](new Error(msg), msg, meta, tags);
    } else {
      advent.logger[level](msg, meta, tags);
    }
    clearInputByName('input');
  };
  levels.forEach((level, i) => {
    window[`log${levelCapitalized(level)}`] = () => log(level,
      `${level}Text`, i + 1);
  });
  window.getEvents = (predicate) => advent.getEvents(predicate);
  window.getTags = () => advent.getTags();
  window.clearEvents = () => {
    advent.flushEvents();
  };
  advent.start();
})(this);
