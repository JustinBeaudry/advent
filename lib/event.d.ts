import { Moment } from 'moment';
import { AdventLoggerLevels } from './logger';
export declare type AdventMessage = string;
export declare type AdventDatetime = Moment;
export declare type AdventMeta = Record<string, Exclude<any, Function>>;
export declare type AdventTags = Set<string>;
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
export declare class AdventEvent implements AdventEvent {
    readonly level: AdventLoggerLevels;
    readonly message: AdventMessage;
    readonly meta: AdventMeta;
    readonly tags: AdventTags;
    readonly datetime: AdventDatetime;
    /**
     *
     * @param {AdventEventConstructParams} params
     * @constructor
     */
    static Construct({ level, tags, meta, datetime, message }: AdventEventConstructParams): AdventEvent;
    [Symbol.toStringTag]: string;
    readonly id: string;
    /**
     *
     * @param {AdventLoggerLevels} level
     * @param {AdventMessage?} message
     * @param {AdventMeta} meta
     * @param {AdventTags} tags
     * @param {AdventDatetime} datetime
     * @constructor
     */
    private constructor();
    /**
     *
     * @private
     * @return {{meta: object, message: string}}
     */
    private toJSON;
    private generateUUID;
}
//# sourceMappingURL=event.d.ts.map