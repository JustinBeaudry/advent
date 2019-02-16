import { AdventEvent } from "./event";
import { AdventLogger, AdventLoggerLevels } from "./logger";
import { AdventEventStoreItem } from "./store";
import { AdventDestinationConfiguration } from "./sync";
export interface AdventConstructParams {
    destinations: AdventDestinationConfiguration[];
    meta?: object;
    tags?: string[];
}
export default class Advent {
    static defaultTransports: {
        Console: object;
        Http: object;
    };
    static Construct({ destinations, meta, tags }: AdventConstructParams): Advent;
    logger: AdventLogger;
    private sync;
    private store;
    private state;
    private destinations;
    private constructor();
    getEvents(predicate?: (item: AdventEventStoreItem) => boolean): AdventEvent[];
    getTags(): string[];
    flushEvents(): void;
    start(): void;
    pause(): void;
    setLevel(level: AdventLoggerLevels): void;
}
//# sourceMappingURL=advent.d.ts.map