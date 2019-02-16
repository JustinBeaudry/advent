import { AdventMeta } from './event';
import { AdventEventStore } from './store';
export declare const enum AdventLoggerLevels {
    debug = "debug",
    trace = "trace",
    info = "info",
    warn = "warn",
    error = "error",
    fatal = "fatal"
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
export declare class AdventLogger {
    /**
     *
     * @param {object} params
     * @param {AdventEventStore} params.store
     * @param {object} params.meta
     * @param {string[]} params.tags
     * @constructor
     */
    static Construct({ store, meta, tags }: AdventLoggerConstructParams): AdventLogger;
    /**
     * @description The Store of Events Dependency Injected into the constructor.
     * @property {AdventEventStore} store
     */
    private readonly store;
    /**
     *
     * @description Metadata to be passed to each Event instance generated
     * during a log event.
     * @property {AdventMeta} [meta={}]
     */
    private readonly meta;
    /**
     *
     * @description String tags that are indexed when logging
     * @property {string[]} tags
     */
    private readonly tags;
    private constructor();
    /**
     *
     * @param {string} message
     * @param {object} meta
     * @param {string[]} tags
     */
    debug(message: string, meta?: AdventMeta, tags?: string[]): void;
    /**
     *
     * @param {string} message
     * @param {object} meta
     * @param {string[]} tags
     */
    trace(message: string, meta?: AdventMeta, tags?: string[]): void;
    /**
     *
     * @param {string} message
     * @param {object} meta
     * @param {string[]} tags
     */
    info(message: string, meta?: AdventMeta, tags?: string[]): void;
    /**
     *
     * @param {string} message
     * @param {?object} meta
     * @param {?string[]} tags
     */
    warn(message: string, meta?: AdventMeta, tags?: string[]): void;
    /**
     *
     * @param {Error} err
     * @param {string} message
     * @param {?object} additionalMeta
     * @param {?string[]} tags
     */
    error(err: Error, message: string, additionalMeta?: AdventMeta, tags?: string[]): void;
    /**
     *
     * @param {Error} err
     * @param {string} message
     * @param {?object} additionalMeta
     * @param {?string[]} tags
     */
    fatal(err: Error, message: string, additionalMeta?: AdventMeta, tags?: string[]): void;
    /**
     *
     * @param {object} meta
     * @param {string[]} tags
     */
    child({ meta, tags }: AdventLoggerChildParams): AdventLogger;
    private log;
}
//# sourceMappingURL=logger.d.ts.map