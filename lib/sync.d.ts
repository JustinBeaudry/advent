import { AdventState } from './state';
import { AdventEventStore } from './store';
import { AdventTransport } from './transport';
export interface AdventEventSyncConstructParams {
    state: AdventState;
    store: AdventEventStore;
    destinations: AdventDestinationConfiguration[];
}
export interface AdventDestinationConfiguration {
    transport: AdventTransport;
    rate: number;
}
export declare class AdventEventSync {
    static Construct({ destinations, state, store }: AdventEventSyncConstructParams): AdventEventSync;
    private readonly destinations;
    private readonly store;
    private state;
    private constructor();
    start(): void;
    pause(): void;
    configure(state: AdventState): void;
    private sync;
}
//# sourceMappingURL=sync.d.ts.map