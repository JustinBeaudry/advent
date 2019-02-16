import { AdventLoggerLevels } from "./logger";
export interface AdventState extends Object {
    level: AdventLoggerLevels;
}
export declare function AdventState(state?: object, previous?: object): AdventState;
//# sourceMappingURL=state.d.ts.map