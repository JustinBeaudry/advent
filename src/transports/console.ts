import { AdventEvent } from '../event';
import { AdventLoggerLevels } from '../logger';
import { AdventTransport } from '../transport';

export class AdventConsoleTransport implements AdventTransport {
  public static Construct({
      throttle
  }: {
    throttle?: number
  } = {}): AdventConsoleTransport {
    return new AdventConsoleTransport(throttle);
  }
  private static throttledWrite(event: AdventEvent, level: AdventLoggerLevels): void {
    switch(level) {
      case AdventLoggerLevels.debug: {
        window.console.debug(event.message);
        break;
      }
      case AdventLoggerLevels.trace: {
        window.console.trace(event.message);
        break;
      }
      case AdventLoggerLevels.info: {
        window.console.info(event.message);
        break;
      }
      case AdventLoggerLevels.warn: {
        window.console.warn(event.message);
        break;
      }
      case AdventLoggerLevels.error: {
        window.console.error(event.message);
        break;
      }
      case AdventLoggerLevels.fatal: {
        window.console.assert(event.message);
        break;
      }
    }
  }
  private readonly throttle: number;
  private writeStart: number | undefined;
  private get delta() {
    if (!this.writeStart) {
      return 0;
    }
    return Math.floor(Date.now() - this.writeStart);
  }
  private get writable(): boolean {
    return this.delta >= this.throttle;
  }
  private constructor(throttle: number=100) {
    this.throttle = throttle;
  }
  public write(event: AdventEvent, level: AdventLoggerLevels): void {
    if (!this.writable) {
      this.writeStart = Date.now();
    }
    AdventConsoleTransport.throttledWrite(event, level);
  }
}
