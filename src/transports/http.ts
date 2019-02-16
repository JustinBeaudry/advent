import 'promise-polyfill';
import 'whatwg-fetch';
import { AdventEvent } from '../event';
import { AdventTransport } from '../transport';

export class AdventHTTPTransport implements AdventTransport {
  public static Construct({
    uri,
    batchSize
  }: {
    uri: string,
    batchSize: number
  }): AdventHTTPTransport {
    return new AdventHTTPTransport(uri, batchSize);
  }
  private writing: boolean = false;
  private readonly uri: string;
  private readonly batchSize: number;
  private batch: AdventEvent[] = [];
  private constructor(uri: string, batchSize: number) {
    this.uri = uri;
    this.batchSize = batchSize;
  }
  public write(event: AdventEvent): void {
    if (this.batch.length < this.batchSize) {
      this.batch.push(event);
      return;
    }
    if (this.writing) {
      return;
    }
    this.writing = true;
    window.fetch(this.uri, {
      body: JSON.stringify(this.getNextBatch()),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => {
      if (response.status < 300) {
        window.console.warn(`[ADVENT] HTTP Transport POST request to ${this.uri} returned a non-200 status code`);
        window.console.error(response.statusText);
      }
      this.writing = false;
    })
    .catch(err => {
      window.console.error(err);
      this.writing = false;
    });
  }
  private getNextBatch(): AdventEvent[] {
    let batchSize;
    if (this.batch.length < this.batchSize) {
      batchSize = this.batch.length;
    } else {
      batchSize = this.batchSize;
    }
    const nextBatch = this.batch.slice(0, batchSize);
    this.batch.splice(0, batchSize);
    return nextBatch;
  }
}
