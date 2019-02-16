export interface StaticConstruct<T, U> {
    Construct(params: U): T;
}
/**
 *
 * Decorator used to indicate that the Class Constructor should have a
 * static method called Construct which should take an object and return an
 * instance of the class.
 * @constructor
 */
export declare function StaticImplements<T, U>(): (constructor: StaticConstruct<T, U>) => any;
//# sourceMappingURL=typeHelpers.d.ts.map