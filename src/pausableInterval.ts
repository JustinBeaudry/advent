
export const enum IntervalStates {
  paused,
  running
}

export class PausableInterval {
  public static Constructor({rate, fn}: {rate: number, fn: () => void}) {
    return new PausableInterval(fn, rate);
  }
  private interval: number | null;
  private state: IntervalStates = IntervalStates.paused;
  private readonly rate: number;
  private readonly fn: () => void;
  private constructor(fn: () => void, rate: number) {
    if (rate >= Number.MAX_SAFE_INTEGER) {
      throw new Error(`Interval rate must not exceed ${Number.MAX_SAFE_INTEGER}`);
    }
    this.rate = rate;
    this.fn = fn;
    this.interval = this.createInterval();
  }
  public start() {
    if (!this.interval) {
      this.interval = this.createInterval();
    }
    this.state = IntervalStates.running;
  }
  public pause() {
    this.state = IntervalStates.paused;
  }
  public stop() {
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = null;
    }
    this.state = IntervalStates.paused;
  }
  private createInterval(): number {
    return window.setInterval(() => {
      if (this.state === IntervalStates.running) {
        this.fn();
      }
    }, this.rate);
  }
}