(function(window, redom) {
  'use strict';
  const document = window.document;
  const _ = window._;
  const levels = window.__ADVENT_EXAMPLE_LEVELS__;
  const levelMap = window.__ADVENT_EXAMPLE_LEVELMAP;
  const levelCapitalized = window.__ADVENT_getCapitalizeLevelName;
  const { el, text, list, mount, setChildren } = redom;
  const main = document.body.children.item(1);
  const inputNode = main.children.item(0);
  const outputNode = main.children.item(1);

  let orFilters = [];
  let andFilters = [];
  const addFilter = (key, value, map) => {
    map.push({
      key,
      value
    });
  };
  const removeFilter = (key, value, map) => {
    const index = map.findIndex(filter => {
      return filter.key === key && filter.value === value
    });
    if (index > -1) {
      map.splice(index, 1);
    }
  };

  class WithRenderer {
    constructor(list, refresh) {
      this.state = 0;
      this.interval = null;
      this.list = list;
      this.refresh = refresh;
    }
    init() {
      this.interval = setInterval(() => {
        if (this.state === 1) {
          this.list.update(this.refresh());
        }
      }, 10);
    }
    cleanup() {
      clearInterval(this.interval);
      this.interval = null;
    }
    start() {
      if (!this.interval) {
        this.init();
      }
      this.state = 1;
    }
    pause() {
      this.state = 0;
    }
    stop() {
      this.pause();
      this.cleanup();
    }
    restart() {
      this.stop();
      this.start();
    }
  }

  class AdventExampleToolbarTag {
    constructor() {
      this.el = el('span.check')
    }
    update(tag) {
      if (this.el.children.item(0) !== null) {
        return;
      }
      const label = el('label', {
        for: `check-${tag}`,
        name: `check-${tag}`
      }, text(tag));
      const check = el('input', {
        type: 'checkbox',
        id: `check-${tag}`,
        name: `check-${tag}`,
        value: tag
      });
      check.onclick = () => {
        if (check.checked) {
          addFilter('tags', tag, andFilters);
        }  else {
          removeFilter('tags', tag, andFilters);
        }
      };
      setChildren(this.el, [
        label,
        check
      ]);
    }
  }

  class AdventExampleToolbar extends WithRenderer {
    constructor() {
      const filterTags = el('form.tags');
      const tags = list(filterTags, AdventExampleToolbarTag);
      const refresh = () => {
        return window.getTags();
      };
      super(tags, refresh);
      const clearBtn = el('button.clear', {
        name: 'clear'
      }, text('Clear Events'));
      clearBtn.onclick = () => {
        window.clearEvents();
      };
      const filterLevels = el('form.levels', levels.map(level => {
        const label = el('label', {
          for: `check-${level}`,
          name: `check-${level}-label`
        }, text(level));
        const check = el('input', {
          type: 'checkbox',
          id: `check-${level}`,
          name: `check-${level}`,
          value: level,
          checked: true
        });
        if (check.checked) {
          addFilter('level', level, orFilters);
        }
        check.onclick = () => {
          if (check.checked) {
            addFilter('level', level, orFilters);
          } else {
            removeFilter('level', level, orFilters);
          }
        };
        return el('span.check', [
          label,
          check
        ]);
      }));
      const filters = el('div.filters', [
        filterLevels,
        filterTags
      ]);
      this.el = el('div.toolbar',
        clearBtn,
        filters
      );
    }
  }

  class AdventExampleOutput extends WithRenderer {
    constructor() {
      const ul = el('ul');
      const li = list(ul, AdventExampleOutputItem);
      const refresh = window.getEvents.bind(null, item => {
        if (orFilters.length === 0 || andFilters.length === 0) {
          return item;
        }  else {
          const or = orFilters.length > 0 ? orFilters.filter(
            filter => {
              const eventProp = item.event[filter.key];
              if (eventProp instanceof Set) {
                return eventProp.has(filter.value);
              }
              return eventProp === filter.value
            }).length > 0 : true;
          const and = andFilters.length > 0 ? andFilters.filter(
            filter => {
              const eventProp = item.event[filter.key];
              if (eventProp instanceof Set) {
                return eventProp.has(filter.value);
              }
              return eventProp === filter.value;
          }).length === andFilters.length : true;
          return and && or;
        }
      });
      super(li, refresh);
      const toolbar = new AdventExampleToolbar();
      toolbar.start();
      this.el = el('div',
        toolbar,
        ul
      );
      this.events = li;
    }
  }

  class AdventExampleOutputItem {
    constructor() {
      this.pre = el('pre#example-output');
      this.el = el('li', this.pre);
    }
    update(data) {
      this.pre.textContent = JSON.stringify(data, null, 2);
    }
  }

  class AdventExampleMeta {
    constructor() {
      this.el = el('div.meta');
    }
    update(data) {
      if (this.el.children.item.get(0) !== null) {
        return;
      }

    }
  }

  class AdventExampleForm {
    constructor() {
      this.el = el('form#example-form',
        AdventExampleForm.getChildren()
      );
    }
    static getChildren() {
      return [
        AdventExampleForm.getFormInputsFromLevels()
      ];
    }
    static getFormInputsFromLevels() {
      const buttons = levels.map(level => {
        const capitalized = levelCapitalized(level);
        const button = el(`button.${level}`, {
          name: level
        }, text(capitalized));
        button.onclick = e => {
          e.preventDefault();
          const name = `log${capitalized}`;
          const log = window[name];
          if (!log) {
            throw new Error(`No logger on window with name ${name}`);
          }
          log();
        };
        button.onmouseenter = event => {
          const styles = levelMap[level];
          event.target.style.backgroundColor = styles.bg;
          event.target.style.color = styles.color;
        };
        button.onmouseleave = event => {
          event.target.style.backgroundColor = 'white';
          event.target.style.color = 'black';
        };
        return button;
      });
      const textarea = el('textarea', {
        name: 'input',
        placeholder: 'Enter text to log here.'
      });
      return el('div#examples',
        textarea,
        el('div.buttons', [
          buttons
        ])
      );
    }
  }

  const input = new AdventExampleForm();
  const output = new AdventExampleOutput();

  mount(inputNode, input);
  mount(outputNode, output);

  output.start();


})(this, this.redom);
