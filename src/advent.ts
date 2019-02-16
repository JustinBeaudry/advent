import { AdventEvent } from "./event";
import { AdventLogger, AdventLoggerLevels } from "./logger";
import { AdventState } from "./state";
import { AdventEventStore, AdventEventStoreItem } from "./store";
import { AdventDestinationConfiguration, AdventEventSync } from "./sync";
import { AdventConsoleTransport } from "./transports/console";
import { AdventHTTPTransport } from "./transports/http";

export interface AdventConstructParams {
  destinations: AdventDestinationConfiguration[];
  meta?: object;
  tags?: string[];
}

export default class Advent {
  public static defaultTransports: {
    Console: object,
    Http: object
  } = {
    Console: AdventConsoleTransport,
    Http: AdventHTTPTransport
  };
  public static Construct({
    destinations,
    meta,
    tags
  }: AdventConstructParams): Advent {
    return new Advent(destinations, meta, tags);
  }
  public logger: AdventLogger;
  private sync: AdventEventSync;
  private store: AdventEventStore = AdventEventStore.Construct();
  private state: AdventState = AdventState();
  private destinations: AdventDestinationConfiguration[];
  private constructor(
    destinations: AdventConstructParams['destinations'],
    meta?: object,
    tags?: string[]
  ) {
    this.destinations = destinations;
    const { state, store } = this;
    this.sync = AdventEventSync.Construct({
      destinations,
      state,
      store
    });
    this.logger = AdventLogger.Construct({
      meta,
      store,
      tags
    });
  }
  public getEvents(predicate?: (item: AdventEventStoreItem) => boolean): AdventEvent[] {
    return this.store.getEvents(predicate);
  }
  public getTags(): string[] {
    return this.store.getTags();
  }
  public flushEvents(): void {
    this.store.flush();
  }
  public start() {
    this.sync.start();
  }
  public pause() {
    this.sync.pause();
  }
  public setLevel(level: AdventLoggerLevels): void {
      this.state = AdventState(
        {level},
        this.state
      );
      const { destinations, state, store } = this;
      this.sync = AdventEventSync.Construct({
        destinations,
        state,
        store
      });
    }
}