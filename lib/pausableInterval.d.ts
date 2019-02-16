export declare const enum IntervalStates {
    paused = 0,
    running = 1
}
export declare class PausableInterval {
    static Constructor({ rate, fn }: {
        rate: number;
        fn: () => void;
    }): PausableInterval;
    private interval;
    private state;
    private readonly rate;
    private readonly fn;
    private constructor();
    start(): void;
    pause(): void;
    stop(): void;
    private createInterval;
}
//# sourceMappingURL=pausableInterval.d.ts.map