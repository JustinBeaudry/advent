import { PausableInterval } from './pausableInterval';
import { AdventState } from './state';
import { AdventEventStore, AdventEventStoreItem } from './store';
import { AdventTransport } from './transport';

export interface AdventEventSyncConstructParams {
  state: AdventState,
  store: AdventEventStore,
  destinations: AdventDestinationConfiguration[]
}

export interface AdventDestinationConfiguration {
  transport: AdventTransport;
  rate: number;
}

export class AdventEventSync {
  public static Construct({
    destinations,
    state,
    store
  }: AdventEventSyncConstructParams) {
    return new AdventEventSync(destinations, state, store);
  }
  private readonly destinations: PausableInterval[] = [];
  private readonly store: AdventEventStore;
  private state: AdventState;
  private constructor(
    destinations: AdventDestinationConfiguration[],
    state: AdventState,
    store: AdventEventStore
  ) {
    this.store = store;
    this.state = state;
    for (const dest of destinations) {
      this.destinations.push(
        PausableInterval.Constructor({
          fn: () => {
            this.sync(dest.transport);
          },
          rate: dest.rate
        })
      );
    }
  }
  public start(): void {
    for(const dest of this.destinations) {
      dest.start();
    }
  }
  public pause(): void {
    for(const dest of this.destinations) {
      dest.pause();
    }
  }
  public configure(state: AdventState): void {
    this.state = AdventState(state, this.state);
  }
  private sync(transport: AdventTransport): void {
    const predicate = (item: AdventEventStoreItem) => !item.seen;
    for (const event of this.store.getEvents(predicate)) {
      transport.write(event, this.state.level);
      this.store.markEventSeen(event.id);
    }
  }
}