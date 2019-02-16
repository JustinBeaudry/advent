import { AdventEvent } from './event';
export interface AdventEventStoreItem {
    event: AdventEvent;
    seen: boolean;
}
export declare class AdventEventStore {
    static Construct(): AdventEventStore;
    private eventIndex;
    private tagsIndex;
    private constructor();
    addEvent(event: AdventEvent): void;
    markEventSeen(eventId: string): void;
    getEventById(id: string): AdventEvent | null;
    getEventsByTag(tag: string): AdventEvent[];
    getEvents(predicate?: (item: AdventEventStoreItem) => boolean): AdventEvent[];
    getTags(): string[];
    flush(): void;
    private addIndexes;
}
//# sourceMappingURL=store.d.ts.map