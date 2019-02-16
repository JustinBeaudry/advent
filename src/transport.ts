import { AdventEvent } from './event';
import { AdventLoggerLevels } from "./logger";

export abstract class AdventTransport {
  /**
   *
   * @param {AdventEvent} event
   * @param {AdventLoggerLevels} level
   * @void
   */
  public abstract write(event: AdventEvent, level: AdventLoggerLevels): void;
}
