import 'promise-polyfill';
import 'whatwg-fetch';
import { AdventEvent } from '../event';
import { AdventTransport } from '../transport';
export declare class AdventHTTPTransport implements AdventTransport {
    static Construct({ uri, batchSize }: {
        uri: string;
        batchSize: number;
    }): AdventHTTPTransport;
    private writing;
    private readonly uri;
    private readonly batchSize;
    private batch;
    private constructor();
    write(event: AdventEvent): void;
    private getNextBatch;
}
//# sourceMappingURL=http.d.ts.map