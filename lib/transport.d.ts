import { AdventEvent } from './event';
import { AdventLoggerLevels } from "./logger";
export declare abstract class AdventTransport {
    /**
     *
     * @param {AdventEvent} event
     * @param {AdventLoggerLevels} level
     * @void
     */
    abstract write(event: AdventEvent, level: AdventLoggerLevels): void;
}
//# sourceMappingURL=transport.d.ts.map