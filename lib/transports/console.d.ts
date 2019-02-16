import { AdventEvent } from '../event';
import { AdventLoggerLevels } from '../logger';
import { AdventTransport } from '../transport';
export declare class AdventConsoleTransport implements AdventTransport {
    static Construct({ throttle }?: {
        throttle?: number;
    }): AdventConsoleTransport;
    private static throttledWrite;
    private readonly throttle;
    private writeStart;
    private readonly delta;
    private readonly writable;
    private constructor();
    write(event: AdventEvent, level: AdventLoggerLevels): void;
}
//# sourceMappingURL=console.d.ts.map