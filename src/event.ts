import moment, { Moment } from 'moment';
import { AdventLoggerLevels } from './logger';

export type AdventMessage = string;
export type AdventDatetime = Moment;
// disabled because we want to exclude any type of function
/* tslint:disable-next-line */
export type AdventMeta = Record<string, Exclude<any, Function>>;
export type AdventTags = Set<string>;

export interface AdventEventConstructParams {
  readonly datetime?: AdventDatetime;
  readonly level: AdventLoggerLevels;
  readonly message: AdventMessage;
  readonly meta?: AdventMeta;
  readonly tags: AdventTags;
}

export interface AdventEvent {
  readonly datetime: AdventDatetime;
  readonly id: string;
  readonly level: AdventLoggerLevels;
  readonly message: AdventMessage;
  readonly meta: AdventMeta;
  readonly tags: AdventTags;
  delta(asNumber: boolean): number;
  delta(): string;
}
/**
 *
 * @description
 * @name AdventEvent
 */
export class AdventEvent implements AdventEvent {
  /**
   *
   * @param {AdventEventConstructParams} params
   * @constructor
   */
  public static Construct({
    level,
    tags,
    meta,
    datetime,
    message
  }: AdventEventConstructParams): AdventEvent {
    return new AdventEvent(level, message, meta, tags, datetime);
  }
  public [Symbol.toStringTag]: string = 'AdventEvent';
  public readonly id: string = this.generateUUID();
  /**
   *
   * @param {AdventLoggerLevels} level
   * @param {AdventMessage?} message
   * @param {AdventMeta} meta
   * @param {AdventTags} tags
   * @param {AdventDatetime} datetime
   * @constructor
   */
  private constructor(
    readonly level: AdventLoggerLevels,
    readonly message: AdventMessage,
    readonly meta: AdventMeta = {},
    readonly tags: AdventTags = new Set<string>(),
    readonly datetime: AdventDatetime = moment()
  ) {
  }
  /**
   *
   * @param {boolean} asNumber
   * @return {(string|number)}
   */
  public delta(asNumber = false): number | string {
    if (asNumber) {
      return Math.floor(moment().unix() - this.datetime.unix());
    }
    return this.datetime.fromNow();
  }
  // noinspection JSUnusedLocalSymbols
  /**
   *
   * @private
   * @return {{meta: object, message: string}}
   */
  // @ts-ignore
  private toJSON(): object {
    const { id, datetime, level, message, meta, tags } = this;
    return {
      datetime,
      delta: this.delta(),
      id,
      level,
      message,
      meta,
      tags: Array.from(tags)
    };
  }
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
      /* tslint:disable */
      const r = parseFloat('0.' + Math.random().toString().replace('0.', '') + new Date().getTime()) * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      /* tslint:enable */
      return v.toString(16);
    });
  }
}
