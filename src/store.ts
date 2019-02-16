import { AdventEvent } from './event';

export interface AdventEventStoreItem {
  event: AdventEvent;
  seen: boolean;
}

export class AdventEventStore {
  public static Construct(): AdventEventStore {
    return new AdventEventStore();
  }
  private eventIndex: Map<string, AdventEventStoreItem> = new Map();
  private tagsIndex: Map<string, Set<AdventEventStoreItem>> = new Map();
  private constructor() {}
  public addEvent(event: AdventEvent): void {
    const storeItem = {
      event,
      seen: false
    };
    this.eventIndex.set(event.id, storeItem);
    this.addIndexes(storeItem);
  }
  public markEventSeen(eventId: string): void {
    const event = this.eventIndex.get(eventId);
    if (event) {
      event.seen = true;
      this.eventIndex.set(eventId, event);
    }
  }
  public getEventById(id: string): AdventEvent | null {
    const item = this.eventIndex.get(id);
    if (item) {
      return item.event;
    }
    return null;
  }
  public getEventsByTag(tag: string): AdventEvent[] {
    const tags = this.tagsIndex.get(tag);
    if (!tags) {
      return [];
    }
    return Array.from(tags)
      .filter(item => item !== null)
      .map(item => item.event);
  }
  public getEvents(
    predicate?: (item: AdventEventStoreItem) => boolean
  ): AdventEvent[] {
    return Array.from(this.eventIndex.values())
      .filter(item => {
        if (predicate && item != null) {
          return predicate(item);
        }
        return item != null;
      })
      .map(item => item.event);
  }
  public getTags(): string[] {
    return Array.from(this.tagsIndex.keys());
  }
  public flush(): void {
    this.eventIndex = new Map();
    this.tagsIndex = new Map();
  }
  private addIndexes(item: AdventEventStoreItem): void {
    if (item.event.tags.size > 0) {
      for (const tag of item.event.tags) {
        let tagIndex = this.tagsIndex.get(tag)
        if (!tagIndex) {
          tagIndex = new Set();
        }
        tagIndex.add(item);
        this.tagsIndex.set(tag, tagIndex);
      }
    }
  }
}