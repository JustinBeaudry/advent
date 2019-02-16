import { AdventEvent, AdventMeta } from './event';
import { AdventEventStore } from './store';

export const enum AdventLoggerLevels {
  debug = 'debug',
  trace = 'trace',
  info = 'info',
  warn = 'warn',
  error = 'error',
  fatal = 'fatal'
}

export interface AdventLoggerConstructParams {
  store: AdventEventStore;
  readonly meta?: AdventMeta;
  tags?: string[];
}

export interface AdventLoggerChildParams {
  meta: AdventMeta;
  tags: string[];
}

export class AdventLogger {
  /**
   *
   * @param {object} params
   * @param {AdventEventStore} params.store
   * @param {object} params.meta
   * @param {string[]} params.tags
   * @constructor
   */
  public static Construct({
    store,
    meta,
    tags
  }: AdventLoggerConstructParams): AdventLogger {
    return new AdventLogger(store, meta, tags);
  }
  /**
   * @description The Store of Events Dependency Injected into the constructor.
   * @property {AdventEventStore} store
   */
  private readonly store: AdventEventStore;
  /**
   *
   * @description Metadata to be passed to each Event instance generated
   * during a log event.
   * @property {AdventMeta} [meta={}]
   */
  private readonly meta: AdventMeta = {};
  /**
   *
   * @description String tags that are indexed when logging
   * @property {string[]} tags
   */
  private readonly tags: string[] = [];
  private constructor(
    store: AdventEventStore,
    meta?: AdventMeta,
    tags?: string[]
  ) {
    this.store = store;
    if (meta) {
      this.meta = meta;
    }
    if (tags) {
      this.tags = tags;
    }
  }
  /**
   *
   * @param {string} message
   * @param {object} meta
   * @param {string[]} tags
   */
  public debug(message: string, meta?: AdventMeta, tags?: string[]): void {
    this.log(AdventLoggerLevels.debug, message, meta, tags);
  }
  /**
   *
   * @param {string} message
   * @param {object} meta
   * @param {string[]} tags
   */
  public trace(message: string, meta?: AdventMeta, tags?: string[]): void {
    this.log(AdventLoggerLevels.trace, message, meta, tags);
  }
  /**
   *
   * @param {string} message
   * @param {object} meta
   * @param {string[]} tags
   */
  public info(message: string, meta?: AdventMeta, tags?: string[]): void {
    this.log(AdventLoggerLevels.info, message, meta, tags);
  }
  /**
   *
   * @param {string} message
   * @param {?object} meta
   * @param {?string[]} tags
   */
  public warn(message: string, meta?: AdventMeta, tags?: string[]): void {
    this.log(AdventLoggerLevels.warn, message, meta, tags);
  }
  /**
   *
   * @param {Error} err
   * @param {string} message
   * @param {?object} additionalMeta
   * @param {?string[]} tags
   */
  public error(err: Error, message: string, additionalMeta?: AdventMeta, tags?: string[]): void {
    const meta = {
      ...additionalMeta,
      error: {
        message: err.message,
        stack: err.stack || err.toString()
      }
    };
    this.log(AdventLoggerLevels.error, message, meta, tags);
  }
  /**
   *
   * @param {Error} err
   * @param {string} message
   * @param {?object} additionalMeta
   * @param {?string[]} tags
   */
  public fatal(err: Error, message: string, additionalMeta?: AdventMeta, tags?: string[]): void {
    const meta = {
      ...additionalMeta,
      error: {
        message: err.message,
        name: err.name,
        stack: `${err.stack}`

      }
    };
    this.log(AdventLoggerLevels.fatal, message, meta, tags);
  }
  /**
   *
   * @param {object} meta
   * @param {string[]} tags
   */
  public child({
    meta = {},
    tags = []
  }: AdventLoggerChildParams): AdventLogger {
    return AdventLogger.Construct({
      meta: {...this.meta, ...meta},
      store: this.store,
      tags: [...tags]
    });
  }
  private log(
    level: AdventLoggerLevels,
    message: string,
    meta: AdventMeta = {},
    tags: string[] = []
  ): void {
    const event = AdventEvent.Construct({
      level,
      message,
      meta: {...this.meta, ...meta},
      tags: new Set([...this.tags, ...tags])
    });
    this.store.addEvent(event);
  }
}