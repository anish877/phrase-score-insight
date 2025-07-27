
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Domain
 * 
 */
export type Domain = $Result.DefaultSelection<Prisma.$DomainPayload>
/**
 * Model DomainVersion
 * 
 */
export type DomainVersion = $Result.DefaultSelection<Prisma.$DomainVersionPayload>
/**
 * Model CrawlResult
 * 
 */
export type CrawlResult = $Result.DefaultSelection<Prisma.$CrawlResultPayload>
/**
 * Model Keyword
 * 
 */
export type Keyword = $Result.DefaultSelection<Prisma.$KeywordPayload>
/**
 * Model Phrase
 * 
 */
export type Phrase = $Result.DefaultSelection<Prisma.$PhrasePayload>
/**
 * Model AIQueryResult
 * 
 */
export type AIQueryResult = $Result.DefaultSelection<Prisma.$AIQueryResultPayload>
/**
 * Model DashboardAnalysis
 * 
 */
export type DashboardAnalysis = $Result.DefaultSelection<Prisma.$DashboardAnalysisPayload>
/**
 * Model CompetitorAnalysis
 * 
 */
export type CompetitorAnalysis = $Result.DefaultSelection<Prisma.$CompetitorAnalysisPayload>
/**
 * Model SuggestedCompetitor
 * 
 */
export type SuggestedCompetitor = $Result.DefaultSelection<Prisma.$SuggestedCompetitorPayload>
/**
 * Model OnboardingProgress
 * 
 */
export type OnboardingProgress = $Result.DefaultSelection<Prisma.$OnboardingProgressPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.domain`: Exposes CRUD operations for the **Domain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Domains
    * const domains = await prisma.domain.findMany()
    * ```
    */
  get domain(): Prisma.DomainDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.domainVersion`: Exposes CRUD operations for the **DomainVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DomainVersions
    * const domainVersions = await prisma.domainVersion.findMany()
    * ```
    */
  get domainVersion(): Prisma.DomainVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.crawlResult`: Exposes CRUD operations for the **CrawlResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CrawlResults
    * const crawlResults = await prisma.crawlResult.findMany()
    * ```
    */
  get crawlResult(): Prisma.CrawlResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.keyword`: Exposes CRUD operations for the **Keyword** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Keywords
    * const keywords = await prisma.keyword.findMany()
    * ```
    */
  get keyword(): Prisma.KeywordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.phrase`: Exposes CRUD operations for the **Phrase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Phrases
    * const phrases = await prisma.phrase.findMany()
    * ```
    */
  get phrase(): Prisma.PhraseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIQueryResult`: Exposes CRUD operations for the **AIQueryResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIQueryResults
    * const aIQueryResults = await prisma.aIQueryResult.findMany()
    * ```
    */
  get aIQueryResult(): Prisma.AIQueryResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dashboardAnalysis`: Exposes CRUD operations for the **DashboardAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DashboardAnalyses
    * const dashboardAnalyses = await prisma.dashboardAnalysis.findMany()
    * ```
    */
  get dashboardAnalysis(): Prisma.DashboardAnalysisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.competitorAnalysis`: Exposes CRUD operations for the **CompetitorAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompetitorAnalyses
    * const competitorAnalyses = await prisma.competitorAnalysis.findMany()
    * ```
    */
  get competitorAnalysis(): Prisma.CompetitorAnalysisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.suggestedCompetitor`: Exposes CRUD operations for the **SuggestedCompetitor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SuggestedCompetitors
    * const suggestedCompetitors = await prisma.suggestedCompetitor.findMany()
    * ```
    */
  get suggestedCompetitor(): Prisma.SuggestedCompetitorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.onboardingProgress`: Exposes CRUD operations for the **OnboardingProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OnboardingProgresses
    * const onboardingProgresses = await prisma.onboardingProgress.findMany()
    * ```
    */
  get onboardingProgress(): Prisma.OnboardingProgressDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Domain: 'Domain',
    DomainVersion: 'DomainVersion',
    CrawlResult: 'CrawlResult',
    Keyword: 'Keyword',
    Phrase: 'Phrase',
    AIQueryResult: 'AIQueryResult',
    DashboardAnalysis: 'DashboardAnalysis',
    CompetitorAnalysis: 'CompetitorAnalysis',
    SuggestedCompetitor: 'SuggestedCompetitor',
    OnboardingProgress: 'OnboardingProgress'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "domain" | "domainVersion" | "crawlResult" | "keyword" | "phrase" | "aIQueryResult" | "dashboardAnalysis" | "competitorAnalysis" | "suggestedCompetitor" | "onboardingProgress"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Domain: {
        payload: Prisma.$DomainPayload<ExtArgs>
        fields: Prisma.DomainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DomainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DomainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          findFirst: {
            args: Prisma.DomainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DomainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          findMany: {
            args: Prisma.DomainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          create: {
            args: Prisma.DomainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          createMany: {
            args: Prisma.DomainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DomainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          delete: {
            args: Prisma.DomainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          update: {
            args: Prisma.DomainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          deleteMany: {
            args: Prisma.DomainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DomainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DomainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          aggregate: {
            args: Prisma.DomainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDomain>
          }
          groupBy: {
            args: Prisma.DomainGroupByArgs<ExtArgs>
            result: $Utils.Optional<DomainGroupByOutputType>[]
          }
          count: {
            args: Prisma.DomainCountArgs<ExtArgs>
            result: $Utils.Optional<DomainCountAggregateOutputType> | number
          }
        }
      }
      DomainVersion: {
        payload: Prisma.$DomainVersionPayload<ExtArgs>
        fields: Prisma.DomainVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DomainVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DomainVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainVersionPayload>
          }
          findFirst: {
            args: Prisma.DomainVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DomainVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainVersionPayload>
          }
          findMany: {
            args: Prisma.DomainVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainVersionPayload>[]
          }
          create: {
            args: Prisma.DomainVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainVersionPayload>
          }
          createMany: {
            args: Prisma.DomainVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DomainVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainVersionPayload>[]
          }
          delete: {
            args: Prisma.DomainVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainVersionPayload>
          }
          update: {
            args: Prisma.DomainVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainVersionPayload>
          }
          deleteMany: {
            args: Prisma.DomainVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DomainVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DomainVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainVersionPayload>
          }
          aggregate: {
            args: Prisma.DomainVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDomainVersion>
          }
          groupBy: {
            args: Prisma.DomainVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DomainVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DomainVersionCountArgs<ExtArgs>
            result: $Utils.Optional<DomainVersionCountAggregateOutputType> | number
          }
        }
      }
      CrawlResult: {
        payload: Prisma.$CrawlResultPayload<ExtArgs>
        fields: Prisma.CrawlResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CrawlResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CrawlResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlResultPayload>
          }
          findFirst: {
            args: Prisma.CrawlResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CrawlResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlResultPayload>
          }
          findMany: {
            args: Prisma.CrawlResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlResultPayload>[]
          }
          create: {
            args: Prisma.CrawlResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlResultPayload>
          }
          createMany: {
            args: Prisma.CrawlResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CrawlResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlResultPayload>[]
          }
          delete: {
            args: Prisma.CrawlResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlResultPayload>
          }
          update: {
            args: Prisma.CrawlResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlResultPayload>
          }
          deleteMany: {
            args: Prisma.CrawlResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CrawlResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CrawlResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrawlResultPayload>
          }
          aggregate: {
            args: Prisma.CrawlResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCrawlResult>
          }
          groupBy: {
            args: Prisma.CrawlResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<CrawlResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.CrawlResultCountArgs<ExtArgs>
            result: $Utils.Optional<CrawlResultCountAggregateOutputType> | number
          }
        }
      }
      Keyword: {
        payload: Prisma.$KeywordPayload<ExtArgs>
        fields: Prisma.KeywordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KeywordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeywordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KeywordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeywordPayload>
          }
          findFirst: {
            args: Prisma.KeywordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeywordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KeywordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeywordPayload>
          }
          findMany: {
            args: Prisma.KeywordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeywordPayload>[]
          }
          create: {
            args: Prisma.KeywordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeywordPayload>
          }
          createMany: {
            args: Prisma.KeywordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KeywordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeywordPayload>[]
          }
          delete: {
            args: Prisma.KeywordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeywordPayload>
          }
          update: {
            args: Prisma.KeywordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeywordPayload>
          }
          deleteMany: {
            args: Prisma.KeywordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KeywordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KeywordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeywordPayload>
          }
          aggregate: {
            args: Prisma.KeywordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKeyword>
          }
          groupBy: {
            args: Prisma.KeywordGroupByArgs<ExtArgs>
            result: $Utils.Optional<KeywordGroupByOutputType>[]
          }
          count: {
            args: Prisma.KeywordCountArgs<ExtArgs>
            result: $Utils.Optional<KeywordCountAggregateOutputType> | number
          }
        }
      }
      Phrase: {
        payload: Prisma.$PhrasePayload<ExtArgs>
        fields: Prisma.PhraseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhraseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhrasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhraseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhrasePayload>
          }
          findFirst: {
            args: Prisma.PhraseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhrasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhraseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhrasePayload>
          }
          findMany: {
            args: Prisma.PhraseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhrasePayload>[]
          }
          create: {
            args: Prisma.PhraseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhrasePayload>
          }
          createMany: {
            args: Prisma.PhraseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhraseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhrasePayload>[]
          }
          delete: {
            args: Prisma.PhraseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhrasePayload>
          }
          update: {
            args: Prisma.PhraseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhrasePayload>
          }
          deleteMany: {
            args: Prisma.PhraseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhraseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PhraseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhrasePayload>
          }
          aggregate: {
            args: Prisma.PhraseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhrase>
          }
          groupBy: {
            args: Prisma.PhraseGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhraseGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhraseCountArgs<ExtArgs>
            result: $Utils.Optional<PhraseCountAggregateOutputType> | number
          }
        }
      }
      AIQueryResult: {
        payload: Prisma.$AIQueryResultPayload<ExtArgs>
        fields: Prisma.AIQueryResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIQueryResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIQueryResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIQueryResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIQueryResultPayload>
          }
          findFirst: {
            args: Prisma.AIQueryResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIQueryResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIQueryResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIQueryResultPayload>
          }
          findMany: {
            args: Prisma.AIQueryResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIQueryResultPayload>[]
          }
          create: {
            args: Prisma.AIQueryResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIQueryResultPayload>
          }
          createMany: {
            args: Prisma.AIQueryResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIQueryResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIQueryResultPayload>[]
          }
          delete: {
            args: Prisma.AIQueryResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIQueryResultPayload>
          }
          update: {
            args: Prisma.AIQueryResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIQueryResultPayload>
          }
          deleteMany: {
            args: Prisma.AIQueryResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIQueryResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AIQueryResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIQueryResultPayload>
          }
          aggregate: {
            args: Prisma.AIQueryResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIQueryResult>
          }
          groupBy: {
            args: Prisma.AIQueryResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIQueryResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIQueryResultCountArgs<ExtArgs>
            result: $Utils.Optional<AIQueryResultCountAggregateOutputType> | number
          }
        }
      }
      DashboardAnalysis: {
        payload: Prisma.$DashboardAnalysisPayload<ExtArgs>
        fields: Prisma.DashboardAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DashboardAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DashboardAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardAnalysisPayload>
          }
          findFirst: {
            args: Prisma.DashboardAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DashboardAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardAnalysisPayload>
          }
          findMany: {
            args: Prisma.DashboardAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardAnalysisPayload>[]
          }
          create: {
            args: Prisma.DashboardAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardAnalysisPayload>
          }
          createMany: {
            args: Prisma.DashboardAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DashboardAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardAnalysisPayload>[]
          }
          delete: {
            args: Prisma.DashboardAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardAnalysisPayload>
          }
          update: {
            args: Prisma.DashboardAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.DashboardAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DashboardAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DashboardAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardAnalysisPayload>
          }
          aggregate: {
            args: Prisma.DashboardAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDashboardAnalysis>
          }
          groupBy: {
            args: Prisma.DashboardAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<DashboardAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.DashboardAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<DashboardAnalysisCountAggregateOutputType> | number
          }
        }
      }
      CompetitorAnalysis: {
        payload: Prisma.$CompetitorAnalysisPayload<ExtArgs>
        fields: Prisma.CompetitorAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompetitorAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitorAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompetitorAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitorAnalysisPayload>
          }
          findFirst: {
            args: Prisma.CompetitorAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitorAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompetitorAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitorAnalysisPayload>
          }
          findMany: {
            args: Prisma.CompetitorAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitorAnalysisPayload>[]
          }
          create: {
            args: Prisma.CompetitorAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitorAnalysisPayload>
          }
          createMany: {
            args: Prisma.CompetitorAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompetitorAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitorAnalysisPayload>[]
          }
          delete: {
            args: Prisma.CompetitorAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitorAnalysisPayload>
          }
          update: {
            args: Prisma.CompetitorAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitorAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.CompetitorAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompetitorAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompetitorAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompetitorAnalysisPayload>
          }
          aggregate: {
            args: Prisma.CompetitorAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompetitorAnalysis>
          }
          groupBy: {
            args: Prisma.CompetitorAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompetitorAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompetitorAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<CompetitorAnalysisCountAggregateOutputType> | number
          }
        }
      }
      SuggestedCompetitor: {
        payload: Prisma.$SuggestedCompetitorPayload<ExtArgs>
        fields: Prisma.SuggestedCompetitorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SuggestedCompetitorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestedCompetitorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SuggestedCompetitorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestedCompetitorPayload>
          }
          findFirst: {
            args: Prisma.SuggestedCompetitorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestedCompetitorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SuggestedCompetitorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestedCompetitorPayload>
          }
          findMany: {
            args: Prisma.SuggestedCompetitorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestedCompetitorPayload>[]
          }
          create: {
            args: Prisma.SuggestedCompetitorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestedCompetitorPayload>
          }
          createMany: {
            args: Prisma.SuggestedCompetitorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SuggestedCompetitorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestedCompetitorPayload>[]
          }
          delete: {
            args: Prisma.SuggestedCompetitorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestedCompetitorPayload>
          }
          update: {
            args: Prisma.SuggestedCompetitorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestedCompetitorPayload>
          }
          deleteMany: {
            args: Prisma.SuggestedCompetitorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SuggestedCompetitorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SuggestedCompetitorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestedCompetitorPayload>
          }
          aggregate: {
            args: Prisma.SuggestedCompetitorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuggestedCompetitor>
          }
          groupBy: {
            args: Prisma.SuggestedCompetitorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuggestedCompetitorGroupByOutputType>[]
          }
          count: {
            args: Prisma.SuggestedCompetitorCountArgs<ExtArgs>
            result: $Utils.Optional<SuggestedCompetitorCountAggregateOutputType> | number
          }
        }
      }
      OnboardingProgress: {
        payload: Prisma.$OnboardingProgressPayload<ExtArgs>
        fields: Prisma.OnboardingProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OnboardingProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OnboardingProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingProgressPayload>
          }
          findFirst: {
            args: Prisma.OnboardingProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OnboardingProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingProgressPayload>
          }
          findMany: {
            args: Prisma.OnboardingProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingProgressPayload>[]
          }
          create: {
            args: Prisma.OnboardingProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingProgressPayload>
          }
          createMany: {
            args: Prisma.OnboardingProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OnboardingProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingProgressPayload>[]
          }
          delete: {
            args: Prisma.OnboardingProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingProgressPayload>
          }
          update: {
            args: Prisma.OnboardingProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingProgressPayload>
          }
          deleteMany: {
            args: Prisma.OnboardingProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OnboardingProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OnboardingProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingProgressPayload>
          }
          aggregate: {
            args: Prisma.OnboardingProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOnboardingProgress>
          }
          groupBy: {
            args: Prisma.OnboardingProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<OnboardingProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.OnboardingProgressCountArgs<ExtArgs>
            result: $Utils.Optional<OnboardingProgressCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    domain?: DomainOmit
    domainVersion?: DomainVersionOmit
    crawlResult?: CrawlResultOmit
    keyword?: KeywordOmit
    phrase?: PhraseOmit
    aIQueryResult?: AIQueryResultOmit
    dashboardAnalysis?: DashboardAnalysisOmit
    competitorAnalysis?: CompetitorAnalysisOmit
    suggestedCompetitor?: SuggestedCompetitorOmit
    onboardingProgress?: OnboardingProgressOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    domains: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domains?: boolean | UserCountOutputTypeCountDomainsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDomainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainWhereInput
  }


  /**
   * Count Type DomainCountOutputType
   */

  export type DomainCountOutputType = {
    crawlResults: number
    keywords: number
    dashboardAnalyses: number
    competitorAnalyses: number
    suggestedCompetitors: number
    onboardingProgresses: number
    versions: number
  }

  export type DomainCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crawlResults?: boolean | DomainCountOutputTypeCountCrawlResultsArgs
    keywords?: boolean | DomainCountOutputTypeCountKeywordsArgs
    dashboardAnalyses?: boolean | DomainCountOutputTypeCountDashboardAnalysesArgs
    competitorAnalyses?: boolean | DomainCountOutputTypeCountCompetitorAnalysesArgs
    suggestedCompetitors?: boolean | DomainCountOutputTypeCountSuggestedCompetitorsArgs
    onboardingProgresses?: boolean | DomainCountOutputTypeCountOnboardingProgressesArgs
    versions?: boolean | DomainCountOutputTypeCountVersionsArgs
  }

  // Custom InputTypes
  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainCountOutputType
     */
    select?: DomainCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountCrawlResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlResultWhereInput
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountKeywordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KeywordWhereInput
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountDashboardAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardAnalysisWhereInput
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountCompetitorAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompetitorAnalysisWhereInput
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountSuggestedCompetitorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuggestedCompetitorWhereInput
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountOnboardingProgressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OnboardingProgressWhereInput
  }

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainVersionWhereInput
  }


  /**
   * Count Type DomainVersionCountOutputType
   */

  export type DomainVersionCountOutputType = {
    crawlResults: number
    keywords: number
    dashboardAnalyses: number
    competitorAnalyses: number
    suggestedCompetitors: number
    onboardingProgresses: number
  }

  export type DomainVersionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    crawlResults?: boolean | DomainVersionCountOutputTypeCountCrawlResultsArgs
    keywords?: boolean | DomainVersionCountOutputTypeCountKeywordsArgs
    dashboardAnalyses?: boolean | DomainVersionCountOutputTypeCountDashboardAnalysesArgs
    competitorAnalyses?: boolean | DomainVersionCountOutputTypeCountCompetitorAnalysesArgs
    suggestedCompetitors?: boolean | DomainVersionCountOutputTypeCountSuggestedCompetitorsArgs
    onboardingProgresses?: boolean | DomainVersionCountOutputTypeCountOnboardingProgressesArgs
  }

  // Custom InputTypes
  /**
   * DomainVersionCountOutputType without action
   */
  export type DomainVersionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersionCountOutputType
     */
    select?: DomainVersionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DomainVersionCountOutputType without action
   */
  export type DomainVersionCountOutputTypeCountCrawlResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlResultWhereInput
  }

  /**
   * DomainVersionCountOutputType without action
   */
  export type DomainVersionCountOutputTypeCountKeywordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KeywordWhereInput
  }

  /**
   * DomainVersionCountOutputType without action
   */
  export type DomainVersionCountOutputTypeCountDashboardAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardAnalysisWhereInput
  }

  /**
   * DomainVersionCountOutputType without action
   */
  export type DomainVersionCountOutputTypeCountCompetitorAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompetitorAnalysisWhereInput
  }

  /**
   * DomainVersionCountOutputType without action
   */
  export type DomainVersionCountOutputTypeCountSuggestedCompetitorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuggestedCompetitorWhereInput
  }

  /**
   * DomainVersionCountOutputType without action
   */
  export type DomainVersionCountOutputTypeCountOnboardingProgressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OnboardingProgressWhereInput
  }


  /**
   * Count Type KeywordCountOutputType
   */

  export type KeywordCountOutputType = {
    phrases: number
  }

  export type KeywordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    phrases?: boolean | KeywordCountOutputTypeCountPhrasesArgs
  }

  // Custom InputTypes
  /**
   * KeywordCountOutputType without action
   */
  export type KeywordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeywordCountOutputType
     */
    select?: KeywordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KeywordCountOutputType without action
   */
  export type KeywordCountOutputTypeCountPhrasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhraseWhereInput
  }


  /**
   * Count Type PhraseCountOutputType
   */

  export type PhraseCountOutputType = {
    aiQueryResults: number
  }

  export type PhraseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aiQueryResults?: boolean | PhraseCountOutputTypeCountAiQueryResultsArgs
  }

  // Custom InputTypes
  /**
   * PhraseCountOutputType without action
   */
  export type PhraseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhraseCountOutputType
     */
    select?: PhraseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PhraseCountOutputType without action
   */
  export type PhraseCountOutputTypeCountAiQueryResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIQueryResultWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domains?: boolean | User$domainsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domains?: boolean | User$domainsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      domains: Prisma.$DomainPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domains<T extends User$domainsArgs<ExtArgs> = {}>(args?: Subset<T, User$domainsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.domains
   */
  export type User$domainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    where?: DomainWhereInput
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    cursor?: DomainWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Domain
   */

  export type AggregateDomain = {
    _count: DomainCountAggregateOutputType | null
    _avg: DomainAvgAggregateOutputType | null
    _sum: DomainSumAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  export type DomainAvgAggregateOutputType = {
    id: number | null
    version: number | null
    userId: number | null
  }

  export type DomainSumAggregateOutputType = {
    id: number | null
    version: number | null
    userId: number | null
  }

  export type DomainMinAggregateOutputType = {
    id: number | null
    url: string | null
    context: string | null
    version: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    location: string | null
  }

  export type DomainMaxAggregateOutputType = {
    id: number | null
    url: string | null
    context: string | null
    version: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
    location: string | null
  }

  export type DomainCountAggregateOutputType = {
    id: number
    url: number
    context: number
    version: number
    userId: number
    createdAt: number
    updatedAt: number
    location: number
    _all: number
  }


  export type DomainAvgAggregateInputType = {
    id?: true
    version?: true
    userId?: true
  }

  export type DomainSumAggregateInputType = {
    id?: true
    version?: true
    userId?: true
  }

  export type DomainMinAggregateInputType = {
    id?: true
    url?: true
    context?: true
    version?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    location?: true
  }

  export type DomainMaxAggregateInputType = {
    id?: true
    url?: true
    context?: true
    version?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    location?: true
  }

  export type DomainCountAggregateInputType = {
    id?: true
    url?: true
    context?: true
    version?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    location?: true
    _all?: true
  }

  export type DomainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Domain to aggregate.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Domains
    **/
    _count?: true | DomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DomainAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DomainSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DomainMaxAggregateInputType
  }

  export type GetDomainAggregateType<T extends DomainAggregateArgs> = {
        [P in keyof T & keyof AggregateDomain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDomain[P]>
      : GetScalarType<T[P], AggregateDomain[P]>
  }




  export type DomainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainWhereInput
    orderBy?: DomainOrderByWithAggregationInput | DomainOrderByWithAggregationInput[]
    by: DomainScalarFieldEnum[] | DomainScalarFieldEnum
    having?: DomainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DomainCountAggregateInputType | true
    _avg?: DomainAvgAggregateInputType
    _sum?: DomainSumAggregateInputType
    _min?: DomainMinAggregateInputType
    _max?: DomainMaxAggregateInputType
  }

  export type DomainGroupByOutputType = {
    id: number
    url: string
    context: string | null
    version: number
    userId: number | null
    createdAt: Date
    updatedAt: Date
    location: string | null
    _count: DomainCountAggregateOutputType | null
    _avg: DomainAvgAggregateOutputType | null
    _sum: DomainSumAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  type GetDomainGroupByPayload<T extends DomainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DomainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DomainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DomainGroupByOutputType[P]>
            : GetScalarType<T[P], DomainGroupByOutputType[P]>
        }
      >
    >


  export type DomainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    context?: boolean
    version?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean
    user?: boolean | Domain$userArgs<ExtArgs>
    crawlResults?: boolean | Domain$crawlResultsArgs<ExtArgs>
    keywords?: boolean | Domain$keywordsArgs<ExtArgs>
    dashboardAnalyses?: boolean | Domain$dashboardAnalysesArgs<ExtArgs>
    competitorAnalyses?: boolean | Domain$competitorAnalysesArgs<ExtArgs>
    suggestedCompetitors?: boolean | Domain$suggestedCompetitorsArgs<ExtArgs>
    onboardingProgresses?: boolean | Domain$onboardingProgressesArgs<ExtArgs>
    versions?: boolean | Domain$versionsArgs<ExtArgs>
    _count?: boolean | DomainCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    context?: boolean
    version?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean
    user?: boolean | Domain$userArgs<ExtArgs>
  }, ExtArgs["result"]["domain"]>


  export type DomainSelectScalar = {
    id?: boolean
    url?: boolean
    context?: boolean
    version?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    location?: boolean
  }

  export type DomainOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "context" | "version" | "userId" | "createdAt" | "updatedAt" | "location", ExtArgs["result"]["domain"]>
  export type DomainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Domain$userArgs<ExtArgs>
    crawlResults?: boolean | Domain$crawlResultsArgs<ExtArgs>
    keywords?: boolean | Domain$keywordsArgs<ExtArgs>
    dashboardAnalyses?: boolean | Domain$dashboardAnalysesArgs<ExtArgs>
    competitorAnalyses?: boolean | Domain$competitorAnalysesArgs<ExtArgs>
    suggestedCompetitors?: boolean | Domain$suggestedCompetitorsArgs<ExtArgs>
    onboardingProgresses?: boolean | Domain$onboardingProgressesArgs<ExtArgs>
    versions?: boolean | Domain$versionsArgs<ExtArgs>
    _count?: boolean | DomainCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DomainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Domain$userArgs<ExtArgs>
  }

  export type $DomainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Domain"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      crawlResults: Prisma.$CrawlResultPayload<ExtArgs>[]
      keywords: Prisma.$KeywordPayload<ExtArgs>[]
      dashboardAnalyses: Prisma.$DashboardAnalysisPayload<ExtArgs>[]
      competitorAnalyses: Prisma.$CompetitorAnalysisPayload<ExtArgs>[]
      suggestedCompetitors: Prisma.$SuggestedCompetitorPayload<ExtArgs>[]
      onboardingProgresses: Prisma.$OnboardingProgressPayload<ExtArgs>[]
      versions: Prisma.$DomainVersionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      context: string | null
      version: number
      userId: number | null
      createdAt: Date
      updatedAt: Date
      location: string | null
    }, ExtArgs["result"]["domain"]>
    composites: {}
  }

  type DomainGetPayload<S extends boolean | null | undefined | DomainDefaultArgs> = $Result.GetResult<Prisma.$DomainPayload, S>

  type DomainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DomainFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DomainCountAggregateInputType | true
    }

  export interface DomainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Domain'], meta: { name: 'Domain' } }
    /**
     * Find zero or one Domain that matches the filter.
     * @param {DomainFindUniqueArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DomainFindUniqueArgs>(args: SelectSubset<T, DomainFindUniqueArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Domain that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DomainFindUniqueOrThrowArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DomainFindUniqueOrThrowArgs>(args: SelectSubset<T, DomainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Domain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DomainFindFirstArgs>(args?: SelectSubset<T, DomainFindFirstArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Domain that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstOrThrowArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DomainFindFirstOrThrowArgs>(args?: SelectSubset<T, DomainFindFirstOrThrowArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Domains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Domains
     * const domains = await prisma.domain.findMany()
     * 
     * // Get first 10 Domains
     * const domains = await prisma.domain.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const domainWithIdOnly = await prisma.domain.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DomainFindManyArgs>(args?: SelectSubset<T, DomainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Domain.
     * @param {DomainCreateArgs} args - Arguments to create a Domain.
     * @example
     * // Create one Domain
     * const Domain = await prisma.domain.create({
     *   data: {
     *     // ... data to create a Domain
     *   }
     * })
     * 
     */
    create<T extends DomainCreateArgs>(args: SelectSubset<T, DomainCreateArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Domains.
     * @param {DomainCreateManyArgs} args - Arguments to create many Domains.
     * @example
     * // Create many Domains
     * const domain = await prisma.domain.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DomainCreateManyArgs>(args?: SelectSubset<T, DomainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Domains and returns the data saved in the database.
     * @param {DomainCreateManyAndReturnArgs} args - Arguments to create many Domains.
     * @example
     * // Create many Domains
     * const domain = await prisma.domain.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Domains and only return the `id`
     * const domainWithIdOnly = await prisma.domain.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DomainCreateManyAndReturnArgs>(args?: SelectSubset<T, DomainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Domain.
     * @param {DomainDeleteArgs} args - Arguments to delete one Domain.
     * @example
     * // Delete one Domain
     * const Domain = await prisma.domain.delete({
     *   where: {
     *     // ... filter to delete one Domain
     *   }
     * })
     * 
     */
    delete<T extends DomainDeleteArgs>(args: SelectSubset<T, DomainDeleteArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Domain.
     * @param {DomainUpdateArgs} args - Arguments to update one Domain.
     * @example
     * // Update one Domain
     * const domain = await prisma.domain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DomainUpdateArgs>(args: SelectSubset<T, DomainUpdateArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Domains.
     * @param {DomainDeleteManyArgs} args - Arguments to filter Domains to delete.
     * @example
     * // Delete a few Domains
     * const { count } = await prisma.domain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DomainDeleteManyArgs>(args?: SelectSubset<T, DomainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Domains
     * const domain = await prisma.domain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DomainUpdateManyArgs>(args: SelectSubset<T, DomainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Domain.
     * @param {DomainUpsertArgs} args - Arguments to update or create a Domain.
     * @example
     * // Update or create a Domain
     * const domain = await prisma.domain.upsert({
     *   create: {
     *     // ... data to create a Domain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Domain we want to update
     *   }
     * })
     */
    upsert<T extends DomainUpsertArgs>(args: SelectSubset<T, DomainUpsertArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainCountArgs} args - Arguments to filter Domains to count.
     * @example
     * // Count the number of Domains
     * const count = await prisma.domain.count({
     *   where: {
     *     // ... the filter for the Domains we want to count
     *   }
     * })
    **/
    count<T extends DomainCountArgs>(
      args?: Subset<T, DomainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DomainAggregateArgs>(args: Subset<T, DomainAggregateArgs>): Prisma.PrismaPromise<GetDomainAggregateType<T>>

    /**
     * Group by Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DomainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DomainGroupByArgs['orderBy'] }
        : { orderBy?: DomainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DomainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDomainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Domain model
   */
  readonly fields: DomainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Domain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DomainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Domain$userArgs<ExtArgs> = {}>(args?: Subset<T, Domain$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    crawlResults<T extends Domain$crawlResultsArgs<ExtArgs> = {}>(args?: Subset<T, Domain$crawlResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    keywords<T extends Domain$keywordsArgs<ExtArgs> = {}>(args?: Subset<T, Domain$keywordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dashboardAnalyses<T extends Domain$dashboardAnalysesArgs<ExtArgs> = {}>(args?: Subset<T, Domain$dashboardAnalysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    competitorAnalyses<T extends Domain$competitorAnalysesArgs<ExtArgs> = {}>(args?: Subset<T, Domain$competitorAnalysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    suggestedCompetitors<T extends Domain$suggestedCompetitorsArgs<ExtArgs> = {}>(args?: Subset<T, Domain$suggestedCompetitorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    onboardingProgresses<T extends Domain$onboardingProgressesArgs<ExtArgs> = {}>(args?: Subset<T, Domain$onboardingProgressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    versions<T extends Domain$versionsArgs<ExtArgs> = {}>(args?: Subset<T, Domain$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Domain model
   */
  interface DomainFieldRefs {
    readonly id: FieldRef<"Domain", 'Int'>
    readonly url: FieldRef<"Domain", 'String'>
    readonly context: FieldRef<"Domain", 'String'>
    readonly version: FieldRef<"Domain", 'Int'>
    readonly userId: FieldRef<"Domain", 'Int'>
    readonly createdAt: FieldRef<"Domain", 'DateTime'>
    readonly updatedAt: FieldRef<"Domain", 'DateTime'>
    readonly location: FieldRef<"Domain", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Domain findUnique
   */
  export type DomainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain findUniqueOrThrow
   */
  export type DomainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain findFirst
   */
  export type DomainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain findFirstOrThrow
   */
  export type DomainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain findMany
   */
  export type DomainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domains to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain create
   */
  export type DomainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The data needed to create a Domain.
     */
    data: XOR<DomainCreateInput, DomainUncheckedCreateInput>
  }

  /**
   * Domain createMany
   */
  export type DomainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Domains.
     */
    data: DomainCreateManyInput | DomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Domain createManyAndReturn
   */
  export type DomainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * The data used to create many Domains.
     */
    data: DomainCreateManyInput | DomainCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Domain update
   */
  export type DomainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The data needed to update a Domain.
     */
    data: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
    /**
     * Choose, which Domain to update.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain updateMany
   */
  export type DomainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Domains.
     */
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyInput>
    /**
     * Filter which Domains to update
     */
    where?: DomainWhereInput
  }

  /**
   * Domain upsert
   */
  export type DomainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The filter to search for the Domain to update in case it exists.
     */
    where: DomainWhereUniqueInput
    /**
     * In case the Domain found by the `where` argument doesn't exist, create a new Domain with this data.
     */
    create: XOR<DomainCreateInput, DomainUncheckedCreateInput>
    /**
     * In case the Domain was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
  }

  /**
   * Domain delete
   */
  export type DomainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter which Domain to delete.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain deleteMany
   */
  export type DomainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Domains to delete
     */
    where?: DomainWhereInput
  }

  /**
   * Domain.user
   */
  export type Domain$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Domain.crawlResults
   */
  export type Domain$crawlResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    where?: CrawlResultWhereInput
    orderBy?: CrawlResultOrderByWithRelationInput | CrawlResultOrderByWithRelationInput[]
    cursor?: CrawlResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CrawlResultScalarFieldEnum | CrawlResultScalarFieldEnum[]
  }

  /**
   * Domain.keywords
   */
  export type Domain$keywordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    where?: KeywordWhereInput
    orderBy?: KeywordOrderByWithRelationInput | KeywordOrderByWithRelationInput[]
    cursor?: KeywordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KeywordScalarFieldEnum | KeywordScalarFieldEnum[]
  }

  /**
   * Domain.dashboardAnalyses
   */
  export type Domain$dashboardAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    where?: DashboardAnalysisWhereInput
    orderBy?: DashboardAnalysisOrderByWithRelationInput | DashboardAnalysisOrderByWithRelationInput[]
    cursor?: DashboardAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DashboardAnalysisScalarFieldEnum | DashboardAnalysisScalarFieldEnum[]
  }

  /**
   * Domain.competitorAnalyses
   */
  export type Domain$competitorAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    where?: CompetitorAnalysisWhereInput
    orderBy?: CompetitorAnalysisOrderByWithRelationInput | CompetitorAnalysisOrderByWithRelationInput[]
    cursor?: CompetitorAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompetitorAnalysisScalarFieldEnum | CompetitorAnalysisScalarFieldEnum[]
  }

  /**
   * Domain.suggestedCompetitors
   */
  export type Domain$suggestedCompetitorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    where?: SuggestedCompetitorWhereInput
    orderBy?: SuggestedCompetitorOrderByWithRelationInput | SuggestedCompetitorOrderByWithRelationInput[]
    cursor?: SuggestedCompetitorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SuggestedCompetitorScalarFieldEnum | SuggestedCompetitorScalarFieldEnum[]
  }

  /**
   * Domain.onboardingProgresses
   */
  export type Domain$onboardingProgressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    where?: OnboardingProgressWhereInput
    orderBy?: OnboardingProgressOrderByWithRelationInput | OnboardingProgressOrderByWithRelationInput[]
    cursor?: OnboardingProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OnboardingProgressScalarFieldEnum | OnboardingProgressScalarFieldEnum[]
  }

  /**
   * Domain.versions
   */
  export type Domain$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    where?: DomainVersionWhereInput
    orderBy?: DomainVersionOrderByWithRelationInput | DomainVersionOrderByWithRelationInput[]
    cursor?: DomainVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DomainVersionScalarFieldEnum | DomainVersionScalarFieldEnum[]
  }

  /**
   * Domain without action
   */
  export type DomainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
  }


  /**
   * Model DomainVersion
   */

  export type AggregateDomainVersion = {
    _count: DomainVersionCountAggregateOutputType | null
    _avg: DomainVersionAvgAggregateOutputType | null
    _sum: DomainVersionSumAggregateOutputType | null
    _min: DomainVersionMinAggregateOutputType | null
    _max: DomainVersionMaxAggregateOutputType | null
  }

  export type DomainVersionAvgAggregateOutputType = {
    id: number | null
    domainId: number | null
    version: number | null
  }

  export type DomainVersionSumAggregateOutputType = {
    id: number | null
    domainId: number | null
    version: number | null
  }

  export type DomainVersionMinAggregateOutputType = {
    id: number | null
    domainId: number | null
    version: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainVersionMaxAggregateOutputType = {
    id: number | null
    domainId: number | null
    version: number | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainVersionCountAggregateOutputType = {
    id: number
    domainId: number
    version: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DomainVersionAvgAggregateInputType = {
    id?: true
    domainId?: true
    version?: true
  }

  export type DomainVersionSumAggregateInputType = {
    id?: true
    domainId?: true
    version?: true
  }

  export type DomainVersionMinAggregateInputType = {
    id?: true
    domainId?: true
    version?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainVersionMaxAggregateInputType = {
    id?: true
    domainId?: true
    version?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainVersionCountAggregateInputType = {
    id?: true
    domainId?: true
    version?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DomainVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DomainVersion to aggregate.
     */
    where?: DomainVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainVersions to fetch.
     */
    orderBy?: DomainVersionOrderByWithRelationInput | DomainVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DomainVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DomainVersions
    **/
    _count?: true | DomainVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DomainVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DomainVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DomainVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DomainVersionMaxAggregateInputType
  }

  export type GetDomainVersionAggregateType<T extends DomainVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateDomainVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDomainVersion[P]>
      : GetScalarType<T[P], AggregateDomainVersion[P]>
  }




  export type DomainVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainVersionWhereInput
    orderBy?: DomainVersionOrderByWithAggregationInput | DomainVersionOrderByWithAggregationInput[]
    by: DomainVersionScalarFieldEnum[] | DomainVersionScalarFieldEnum
    having?: DomainVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DomainVersionCountAggregateInputType | true
    _avg?: DomainVersionAvgAggregateInputType
    _sum?: DomainVersionSumAggregateInputType
    _min?: DomainVersionMinAggregateInputType
    _max?: DomainVersionMaxAggregateInputType
  }

  export type DomainVersionGroupByOutputType = {
    id: number
    domainId: number
    version: number
    name: string | null
    createdAt: Date
    updatedAt: Date
    _count: DomainVersionCountAggregateOutputType | null
    _avg: DomainVersionAvgAggregateOutputType | null
    _sum: DomainVersionSumAggregateOutputType | null
    _min: DomainVersionMinAggregateOutputType | null
    _max: DomainVersionMaxAggregateOutputType | null
  }

  type GetDomainVersionGroupByPayload<T extends DomainVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DomainVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DomainVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DomainVersionGroupByOutputType[P]>
            : GetScalarType<T[P], DomainVersionGroupByOutputType[P]>
        }
      >
    >


  export type DomainVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    version?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    crawlResults?: boolean | DomainVersion$crawlResultsArgs<ExtArgs>
    keywords?: boolean | DomainVersion$keywordsArgs<ExtArgs>
    dashboardAnalyses?: boolean | DomainVersion$dashboardAnalysesArgs<ExtArgs>
    competitorAnalyses?: boolean | DomainVersion$competitorAnalysesArgs<ExtArgs>
    suggestedCompetitors?: boolean | DomainVersion$suggestedCompetitorsArgs<ExtArgs>
    onboardingProgresses?: boolean | DomainVersion$onboardingProgressesArgs<ExtArgs>
    _count?: boolean | DomainVersionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["domainVersion"]>

  export type DomainVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    version?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["domainVersion"]>


  export type DomainVersionSelectScalar = {
    id?: boolean
    domainId?: boolean
    version?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DomainVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "domainId" | "version" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["domainVersion"]>
  export type DomainVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
    crawlResults?: boolean | DomainVersion$crawlResultsArgs<ExtArgs>
    keywords?: boolean | DomainVersion$keywordsArgs<ExtArgs>
    dashboardAnalyses?: boolean | DomainVersion$dashboardAnalysesArgs<ExtArgs>
    competitorAnalyses?: boolean | DomainVersion$competitorAnalysesArgs<ExtArgs>
    suggestedCompetitors?: boolean | DomainVersion$suggestedCompetitorsArgs<ExtArgs>
    onboardingProgresses?: boolean | DomainVersion$onboardingProgressesArgs<ExtArgs>
    _count?: boolean | DomainVersionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DomainVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DomainDefaultArgs<ExtArgs>
  }

  export type $DomainVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DomainVersion"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs>
      crawlResults: Prisma.$CrawlResultPayload<ExtArgs>[]
      keywords: Prisma.$KeywordPayload<ExtArgs>[]
      dashboardAnalyses: Prisma.$DashboardAnalysisPayload<ExtArgs>[]
      competitorAnalyses: Prisma.$CompetitorAnalysisPayload<ExtArgs>[]
      suggestedCompetitors: Prisma.$SuggestedCompetitorPayload<ExtArgs>[]
      onboardingProgresses: Prisma.$OnboardingProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      domainId: number
      version: number
      name: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["domainVersion"]>
    composites: {}
  }

  type DomainVersionGetPayload<S extends boolean | null | undefined | DomainVersionDefaultArgs> = $Result.GetResult<Prisma.$DomainVersionPayload, S>

  type DomainVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DomainVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DomainVersionCountAggregateInputType | true
    }

  export interface DomainVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DomainVersion'], meta: { name: 'DomainVersion' } }
    /**
     * Find zero or one DomainVersion that matches the filter.
     * @param {DomainVersionFindUniqueArgs} args - Arguments to find a DomainVersion
     * @example
     * // Get one DomainVersion
     * const domainVersion = await prisma.domainVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DomainVersionFindUniqueArgs>(args: SelectSubset<T, DomainVersionFindUniqueArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DomainVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DomainVersionFindUniqueOrThrowArgs} args - Arguments to find a DomainVersion
     * @example
     * // Get one DomainVersion
     * const domainVersion = await prisma.domainVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DomainVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, DomainVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DomainVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainVersionFindFirstArgs} args - Arguments to find a DomainVersion
     * @example
     * // Get one DomainVersion
     * const domainVersion = await prisma.domainVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DomainVersionFindFirstArgs>(args?: SelectSubset<T, DomainVersionFindFirstArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DomainVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainVersionFindFirstOrThrowArgs} args - Arguments to find a DomainVersion
     * @example
     * // Get one DomainVersion
     * const domainVersion = await prisma.domainVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DomainVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, DomainVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DomainVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DomainVersions
     * const domainVersions = await prisma.domainVersion.findMany()
     * 
     * // Get first 10 DomainVersions
     * const domainVersions = await prisma.domainVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const domainVersionWithIdOnly = await prisma.domainVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DomainVersionFindManyArgs>(args?: SelectSubset<T, DomainVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DomainVersion.
     * @param {DomainVersionCreateArgs} args - Arguments to create a DomainVersion.
     * @example
     * // Create one DomainVersion
     * const DomainVersion = await prisma.domainVersion.create({
     *   data: {
     *     // ... data to create a DomainVersion
     *   }
     * })
     * 
     */
    create<T extends DomainVersionCreateArgs>(args: SelectSubset<T, DomainVersionCreateArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DomainVersions.
     * @param {DomainVersionCreateManyArgs} args - Arguments to create many DomainVersions.
     * @example
     * // Create many DomainVersions
     * const domainVersion = await prisma.domainVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DomainVersionCreateManyArgs>(args?: SelectSubset<T, DomainVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DomainVersions and returns the data saved in the database.
     * @param {DomainVersionCreateManyAndReturnArgs} args - Arguments to create many DomainVersions.
     * @example
     * // Create many DomainVersions
     * const domainVersion = await prisma.domainVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DomainVersions and only return the `id`
     * const domainVersionWithIdOnly = await prisma.domainVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DomainVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, DomainVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DomainVersion.
     * @param {DomainVersionDeleteArgs} args - Arguments to delete one DomainVersion.
     * @example
     * // Delete one DomainVersion
     * const DomainVersion = await prisma.domainVersion.delete({
     *   where: {
     *     // ... filter to delete one DomainVersion
     *   }
     * })
     * 
     */
    delete<T extends DomainVersionDeleteArgs>(args: SelectSubset<T, DomainVersionDeleteArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DomainVersion.
     * @param {DomainVersionUpdateArgs} args - Arguments to update one DomainVersion.
     * @example
     * // Update one DomainVersion
     * const domainVersion = await prisma.domainVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DomainVersionUpdateArgs>(args: SelectSubset<T, DomainVersionUpdateArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DomainVersions.
     * @param {DomainVersionDeleteManyArgs} args - Arguments to filter DomainVersions to delete.
     * @example
     * // Delete a few DomainVersions
     * const { count } = await prisma.domainVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DomainVersionDeleteManyArgs>(args?: SelectSubset<T, DomainVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DomainVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DomainVersions
     * const domainVersion = await prisma.domainVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DomainVersionUpdateManyArgs>(args: SelectSubset<T, DomainVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DomainVersion.
     * @param {DomainVersionUpsertArgs} args - Arguments to update or create a DomainVersion.
     * @example
     * // Update or create a DomainVersion
     * const domainVersion = await prisma.domainVersion.upsert({
     *   create: {
     *     // ... data to create a DomainVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DomainVersion we want to update
     *   }
     * })
     */
    upsert<T extends DomainVersionUpsertArgs>(args: SelectSubset<T, DomainVersionUpsertArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DomainVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainVersionCountArgs} args - Arguments to filter DomainVersions to count.
     * @example
     * // Count the number of DomainVersions
     * const count = await prisma.domainVersion.count({
     *   where: {
     *     // ... the filter for the DomainVersions we want to count
     *   }
     * })
    **/
    count<T extends DomainVersionCountArgs>(
      args?: Subset<T, DomainVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DomainVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DomainVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DomainVersionAggregateArgs>(args: Subset<T, DomainVersionAggregateArgs>): Prisma.PrismaPromise<GetDomainVersionAggregateType<T>>

    /**
     * Group by DomainVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainVersionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DomainVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DomainVersionGroupByArgs['orderBy'] }
        : { orderBy?: DomainVersionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DomainVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDomainVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DomainVersion model
   */
  readonly fields: DomainVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DomainVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DomainVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends DomainDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DomainDefaultArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    crawlResults<T extends DomainVersion$crawlResultsArgs<ExtArgs> = {}>(args?: Subset<T, DomainVersion$crawlResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    keywords<T extends DomainVersion$keywordsArgs<ExtArgs> = {}>(args?: Subset<T, DomainVersion$keywordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dashboardAnalyses<T extends DomainVersion$dashboardAnalysesArgs<ExtArgs> = {}>(args?: Subset<T, DomainVersion$dashboardAnalysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    competitorAnalyses<T extends DomainVersion$competitorAnalysesArgs<ExtArgs> = {}>(args?: Subset<T, DomainVersion$competitorAnalysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    suggestedCompetitors<T extends DomainVersion$suggestedCompetitorsArgs<ExtArgs> = {}>(args?: Subset<T, DomainVersion$suggestedCompetitorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    onboardingProgresses<T extends DomainVersion$onboardingProgressesArgs<ExtArgs> = {}>(args?: Subset<T, DomainVersion$onboardingProgressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DomainVersion model
   */
  interface DomainVersionFieldRefs {
    readonly id: FieldRef<"DomainVersion", 'Int'>
    readonly domainId: FieldRef<"DomainVersion", 'Int'>
    readonly version: FieldRef<"DomainVersion", 'Int'>
    readonly name: FieldRef<"DomainVersion", 'String'>
    readonly createdAt: FieldRef<"DomainVersion", 'DateTime'>
    readonly updatedAt: FieldRef<"DomainVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DomainVersion findUnique
   */
  export type DomainVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    /**
     * Filter, which DomainVersion to fetch.
     */
    where: DomainVersionWhereUniqueInput
  }

  /**
   * DomainVersion findUniqueOrThrow
   */
  export type DomainVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    /**
     * Filter, which DomainVersion to fetch.
     */
    where: DomainVersionWhereUniqueInput
  }

  /**
   * DomainVersion findFirst
   */
  export type DomainVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    /**
     * Filter, which DomainVersion to fetch.
     */
    where?: DomainVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainVersions to fetch.
     */
    orderBy?: DomainVersionOrderByWithRelationInput | DomainVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DomainVersions.
     */
    cursor?: DomainVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DomainVersions.
     */
    distinct?: DomainVersionScalarFieldEnum | DomainVersionScalarFieldEnum[]
  }

  /**
   * DomainVersion findFirstOrThrow
   */
  export type DomainVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    /**
     * Filter, which DomainVersion to fetch.
     */
    where?: DomainVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainVersions to fetch.
     */
    orderBy?: DomainVersionOrderByWithRelationInput | DomainVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DomainVersions.
     */
    cursor?: DomainVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DomainVersions.
     */
    distinct?: DomainVersionScalarFieldEnum | DomainVersionScalarFieldEnum[]
  }

  /**
   * DomainVersion findMany
   */
  export type DomainVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    /**
     * Filter, which DomainVersions to fetch.
     */
    where?: DomainVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainVersions to fetch.
     */
    orderBy?: DomainVersionOrderByWithRelationInput | DomainVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DomainVersions.
     */
    cursor?: DomainVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainVersions.
     */
    skip?: number
    distinct?: DomainVersionScalarFieldEnum | DomainVersionScalarFieldEnum[]
  }

  /**
   * DomainVersion create
   */
  export type DomainVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a DomainVersion.
     */
    data: XOR<DomainVersionCreateInput, DomainVersionUncheckedCreateInput>
  }

  /**
   * DomainVersion createMany
   */
  export type DomainVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DomainVersions.
     */
    data: DomainVersionCreateManyInput | DomainVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DomainVersion createManyAndReturn
   */
  export type DomainVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * The data used to create many DomainVersions.
     */
    data: DomainVersionCreateManyInput | DomainVersionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DomainVersion update
   */
  export type DomainVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a DomainVersion.
     */
    data: XOR<DomainVersionUpdateInput, DomainVersionUncheckedUpdateInput>
    /**
     * Choose, which DomainVersion to update.
     */
    where: DomainVersionWhereUniqueInput
  }

  /**
   * DomainVersion updateMany
   */
  export type DomainVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DomainVersions.
     */
    data: XOR<DomainVersionUpdateManyMutationInput, DomainVersionUncheckedUpdateManyInput>
    /**
     * Filter which DomainVersions to update
     */
    where?: DomainVersionWhereInput
  }

  /**
   * DomainVersion upsert
   */
  export type DomainVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the DomainVersion to update in case it exists.
     */
    where: DomainVersionWhereUniqueInput
    /**
     * In case the DomainVersion found by the `where` argument doesn't exist, create a new DomainVersion with this data.
     */
    create: XOR<DomainVersionCreateInput, DomainVersionUncheckedCreateInput>
    /**
     * In case the DomainVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DomainVersionUpdateInput, DomainVersionUncheckedUpdateInput>
  }

  /**
   * DomainVersion delete
   */
  export type DomainVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    /**
     * Filter which DomainVersion to delete.
     */
    where: DomainVersionWhereUniqueInput
  }

  /**
   * DomainVersion deleteMany
   */
  export type DomainVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DomainVersions to delete
     */
    where?: DomainVersionWhereInput
  }

  /**
   * DomainVersion.crawlResults
   */
  export type DomainVersion$crawlResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    where?: CrawlResultWhereInput
    orderBy?: CrawlResultOrderByWithRelationInput | CrawlResultOrderByWithRelationInput[]
    cursor?: CrawlResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CrawlResultScalarFieldEnum | CrawlResultScalarFieldEnum[]
  }

  /**
   * DomainVersion.keywords
   */
  export type DomainVersion$keywordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    where?: KeywordWhereInput
    orderBy?: KeywordOrderByWithRelationInput | KeywordOrderByWithRelationInput[]
    cursor?: KeywordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KeywordScalarFieldEnum | KeywordScalarFieldEnum[]
  }

  /**
   * DomainVersion.dashboardAnalyses
   */
  export type DomainVersion$dashboardAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    where?: DashboardAnalysisWhereInput
    orderBy?: DashboardAnalysisOrderByWithRelationInput | DashboardAnalysisOrderByWithRelationInput[]
    cursor?: DashboardAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DashboardAnalysisScalarFieldEnum | DashboardAnalysisScalarFieldEnum[]
  }

  /**
   * DomainVersion.competitorAnalyses
   */
  export type DomainVersion$competitorAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    where?: CompetitorAnalysisWhereInput
    orderBy?: CompetitorAnalysisOrderByWithRelationInput | CompetitorAnalysisOrderByWithRelationInput[]
    cursor?: CompetitorAnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompetitorAnalysisScalarFieldEnum | CompetitorAnalysisScalarFieldEnum[]
  }

  /**
   * DomainVersion.suggestedCompetitors
   */
  export type DomainVersion$suggestedCompetitorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    where?: SuggestedCompetitorWhereInput
    orderBy?: SuggestedCompetitorOrderByWithRelationInput | SuggestedCompetitorOrderByWithRelationInput[]
    cursor?: SuggestedCompetitorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SuggestedCompetitorScalarFieldEnum | SuggestedCompetitorScalarFieldEnum[]
  }

  /**
   * DomainVersion.onboardingProgresses
   */
  export type DomainVersion$onboardingProgressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    where?: OnboardingProgressWhereInput
    orderBy?: OnboardingProgressOrderByWithRelationInput | OnboardingProgressOrderByWithRelationInput[]
    cursor?: OnboardingProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OnboardingProgressScalarFieldEnum | OnboardingProgressScalarFieldEnum[]
  }

  /**
   * DomainVersion without action
   */
  export type DomainVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
  }


  /**
   * Model CrawlResult
   */

  export type AggregateCrawlResult = {
    _count: CrawlResultCountAggregateOutputType | null
    _avg: CrawlResultAvgAggregateOutputType | null
    _sum: CrawlResultSumAggregateOutputType | null
    _min: CrawlResultMinAggregateOutputType | null
    _max: CrawlResultMaxAggregateOutputType | null
  }

  export type CrawlResultAvgAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    pagesScanned: number | null
    contentBlocks: number | null
    keyEntities: number | null
    confidenceScore: number | null
    tokenUsage: number | null
  }

  export type CrawlResultSumAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    pagesScanned: number | null
    contentBlocks: number | null
    keyEntities: number | null
    confidenceScore: number | null
    tokenUsage: number | null
  }

  export type CrawlResultMinAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    pagesScanned: number | null
    contentBlocks: number | null
    keyEntities: number | null
    confidenceScore: number | null
    extractedContext: string | null
    tokenUsage: number | null
    createdAt: Date | null
  }

  export type CrawlResultMaxAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    pagesScanned: number | null
    contentBlocks: number | null
    keyEntities: number | null
    confidenceScore: number | null
    extractedContext: string | null
    tokenUsage: number | null
    createdAt: Date | null
  }

  export type CrawlResultCountAggregateOutputType = {
    id: number
    domainId: number
    domainVersionId: number
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: number
    tokenUsage: number
    createdAt: number
    _all: number
  }


  export type CrawlResultAvgAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    pagesScanned?: true
    contentBlocks?: true
    keyEntities?: true
    confidenceScore?: true
    tokenUsage?: true
  }

  export type CrawlResultSumAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    pagesScanned?: true
    contentBlocks?: true
    keyEntities?: true
    confidenceScore?: true
    tokenUsage?: true
  }

  export type CrawlResultMinAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    pagesScanned?: true
    contentBlocks?: true
    keyEntities?: true
    confidenceScore?: true
    extractedContext?: true
    tokenUsage?: true
    createdAt?: true
  }

  export type CrawlResultMaxAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    pagesScanned?: true
    contentBlocks?: true
    keyEntities?: true
    confidenceScore?: true
    extractedContext?: true
    tokenUsage?: true
    createdAt?: true
  }

  export type CrawlResultCountAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    pagesScanned?: true
    contentBlocks?: true
    keyEntities?: true
    confidenceScore?: true
    extractedContext?: true
    tokenUsage?: true
    createdAt?: true
    _all?: true
  }

  export type CrawlResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrawlResult to aggregate.
     */
    where?: CrawlResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlResults to fetch.
     */
    orderBy?: CrawlResultOrderByWithRelationInput | CrawlResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CrawlResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CrawlResults
    **/
    _count?: true | CrawlResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CrawlResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CrawlResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CrawlResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CrawlResultMaxAggregateInputType
  }

  export type GetCrawlResultAggregateType<T extends CrawlResultAggregateArgs> = {
        [P in keyof T & keyof AggregateCrawlResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrawlResult[P]>
      : GetScalarType<T[P], AggregateCrawlResult[P]>
  }




  export type CrawlResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrawlResultWhereInput
    orderBy?: CrawlResultOrderByWithAggregationInput | CrawlResultOrderByWithAggregationInput[]
    by: CrawlResultScalarFieldEnum[] | CrawlResultScalarFieldEnum
    having?: CrawlResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CrawlResultCountAggregateInputType | true
    _avg?: CrawlResultAvgAggregateInputType
    _sum?: CrawlResultSumAggregateInputType
    _min?: CrawlResultMinAggregateInputType
    _max?: CrawlResultMaxAggregateInputType
  }

  export type CrawlResultGroupByOutputType = {
    id: number
    domainId: number | null
    domainVersionId: number | null
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: string
    tokenUsage: number | null
    createdAt: Date
    _count: CrawlResultCountAggregateOutputType | null
    _avg: CrawlResultAvgAggregateOutputType | null
    _sum: CrawlResultSumAggregateOutputType | null
    _min: CrawlResultMinAggregateOutputType | null
    _max: CrawlResultMaxAggregateOutputType | null
  }

  type GetCrawlResultGroupByPayload<T extends CrawlResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CrawlResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CrawlResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CrawlResultGroupByOutputType[P]>
            : GetScalarType<T[P], CrawlResultGroupByOutputType[P]>
        }
      >
    >


  export type CrawlResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    pagesScanned?: boolean
    contentBlocks?: boolean
    keyEntities?: boolean
    confidenceScore?: boolean
    extractedContext?: boolean
    tokenUsage?: boolean
    createdAt?: boolean
    domain?: boolean | CrawlResult$domainArgs<ExtArgs>
    domainVersion?: boolean | CrawlResult$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["crawlResult"]>

  export type CrawlResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    pagesScanned?: boolean
    contentBlocks?: boolean
    keyEntities?: boolean
    confidenceScore?: boolean
    extractedContext?: boolean
    tokenUsage?: boolean
    createdAt?: boolean
    domain?: boolean | CrawlResult$domainArgs<ExtArgs>
    domainVersion?: boolean | CrawlResult$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["crawlResult"]>


  export type CrawlResultSelectScalar = {
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    pagesScanned?: boolean
    contentBlocks?: boolean
    keyEntities?: boolean
    confidenceScore?: boolean
    extractedContext?: boolean
    tokenUsage?: boolean
    createdAt?: boolean
  }

  export type CrawlResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "domainId" | "domainVersionId" | "pagesScanned" | "contentBlocks" | "keyEntities" | "confidenceScore" | "extractedContext" | "tokenUsage" | "createdAt", ExtArgs["result"]["crawlResult"]>
  export type CrawlResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | CrawlResult$domainArgs<ExtArgs>
    domainVersion?: boolean | CrawlResult$domainVersionArgs<ExtArgs>
  }
  export type CrawlResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | CrawlResult$domainArgs<ExtArgs>
    domainVersion?: boolean | CrawlResult$domainVersionArgs<ExtArgs>
  }

  export type $CrawlResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CrawlResult"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs> | null
      domainVersion: Prisma.$DomainVersionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      domainId: number | null
      domainVersionId: number | null
      pagesScanned: number
      contentBlocks: number
      keyEntities: number
      confidenceScore: number
      extractedContext: string
      tokenUsage: number | null
      createdAt: Date
    }, ExtArgs["result"]["crawlResult"]>
    composites: {}
  }

  type CrawlResultGetPayload<S extends boolean | null | undefined | CrawlResultDefaultArgs> = $Result.GetResult<Prisma.$CrawlResultPayload, S>

  type CrawlResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CrawlResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CrawlResultCountAggregateInputType | true
    }

  export interface CrawlResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CrawlResult'], meta: { name: 'CrawlResult' } }
    /**
     * Find zero or one CrawlResult that matches the filter.
     * @param {CrawlResultFindUniqueArgs} args - Arguments to find a CrawlResult
     * @example
     * // Get one CrawlResult
     * const crawlResult = await prisma.crawlResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CrawlResultFindUniqueArgs>(args: SelectSubset<T, CrawlResultFindUniqueArgs<ExtArgs>>): Prisma__CrawlResultClient<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CrawlResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CrawlResultFindUniqueOrThrowArgs} args - Arguments to find a CrawlResult
     * @example
     * // Get one CrawlResult
     * const crawlResult = await prisma.crawlResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CrawlResultFindUniqueOrThrowArgs>(args: SelectSubset<T, CrawlResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CrawlResultClient<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CrawlResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlResultFindFirstArgs} args - Arguments to find a CrawlResult
     * @example
     * // Get one CrawlResult
     * const crawlResult = await prisma.crawlResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CrawlResultFindFirstArgs>(args?: SelectSubset<T, CrawlResultFindFirstArgs<ExtArgs>>): Prisma__CrawlResultClient<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CrawlResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlResultFindFirstOrThrowArgs} args - Arguments to find a CrawlResult
     * @example
     * // Get one CrawlResult
     * const crawlResult = await prisma.crawlResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CrawlResultFindFirstOrThrowArgs>(args?: SelectSubset<T, CrawlResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__CrawlResultClient<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CrawlResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CrawlResults
     * const crawlResults = await prisma.crawlResult.findMany()
     * 
     * // Get first 10 CrawlResults
     * const crawlResults = await prisma.crawlResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crawlResultWithIdOnly = await prisma.crawlResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CrawlResultFindManyArgs>(args?: SelectSubset<T, CrawlResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CrawlResult.
     * @param {CrawlResultCreateArgs} args - Arguments to create a CrawlResult.
     * @example
     * // Create one CrawlResult
     * const CrawlResult = await prisma.crawlResult.create({
     *   data: {
     *     // ... data to create a CrawlResult
     *   }
     * })
     * 
     */
    create<T extends CrawlResultCreateArgs>(args: SelectSubset<T, CrawlResultCreateArgs<ExtArgs>>): Prisma__CrawlResultClient<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CrawlResults.
     * @param {CrawlResultCreateManyArgs} args - Arguments to create many CrawlResults.
     * @example
     * // Create many CrawlResults
     * const crawlResult = await prisma.crawlResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CrawlResultCreateManyArgs>(args?: SelectSubset<T, CrawlResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CrawlResults and returns the data saved in the database.
     * @param {CrawlResultCreateManyAndReturnArgs} args - Arguments to create many CrawlResults.
     * @example
     * // Create many CrawlResults
     * const crawlResult = await prisma.crawlResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CrawlResults and only return the `id`
     * const crawlResultWithIdOnly = await prisma.crawlResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CrawlResultCreateManyAndReturnArgs>(args?: SelectSubset<T, CrawlResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CrawlResult.
     * @param {CrawlResultDeleteArgs} args - Arguments to delete one CrawlResult.
     * @example
     * // Delete one CrawlResult
     * const CrawlResult = await prisma.crawlResult.delete({
     *   where: {
     *     // ... filter to delete one CrawlResult
     *   }
     * })
     * 
     */
    delete<T extends CrawlResultDeleteArgs>(args: SelectSubset<T, CrawlResultDeleteArgs<ExtArgs>>): Prisma__CrawlResultClient<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CrawlResult.
     * @param {CrawlResultUpdateArgs} args - Arguments to update one CrawlResult.
     * @example
     * // Update one CrawlResult
     * const crawlResult = await prisma.crawlResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CrawlResultUpdateArgs>(args: SelectSubset<T, CrawlResultUpdateArgs<ExtArgs>>): Prisma__CrawlResultClient<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CrawlResults.
     * @param {CrawlResultDeleteManyArgs} args - Arguments to filter CrawlResults to delete.
     * @example
     * // Delete a few CrawlResults
     * const { count } = await prisma.crawlResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CrawlResultDeleteManyArgs>(args?: SelectSubset<T, CrawlResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CrawlResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CrawlResults
     * const crawlResult = await prisma.crawlResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CrawlResultUpdateManyArgs>(args: SelectSubset<T, CrawlResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CrawlResult.
     * @param {CrawlResultUpsertArgs} args - Arguments to update or create a CrawlResult.
     * @example
     * // Update or create a CrawlResult
     * const crawlResult = await prisma.crawlResult.upsert({
     *   create: {
     *     // ... data to create a CrawlResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CrawlResult we want to update
     *   }
     * })
     */
    upsert<T extends CrawlResultUpsertArgs>(args: SelectSubset<T, CrawlResultUpsertArgs<ExtArgs>>): Prisma__CrawlResultClient<$Result.GetResult<Prisma.$CrawlResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CrawlResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlResultCountArgs} args - Arguments to filter CrawlResults to count.
     * @example
     * // Count the number of CrawlResults
     * const count = await prisma.crawlResult.count({
     *   where: {
     *     // ... the filter for the CrawlResults we want to count
     *   }
     * })
    **/
    count<T extends CrawlResultCountArgs>(
      args?: Subset<T, CrawlResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CrawlResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CrawlResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CrawlResultAggregateArgs>(args: Subset<T, CrawlResultAggregateArgs>): Prisma.PrismaPromise<GetCrawlResultAggregateType<T>>

    /**
     * Group by CrawlResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrawlResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CrawlResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CrawlResultGroupByArgs['orderBy'] }
        : { orderBy?: CrawlResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CrawlResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrawlResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CrawlResult model
   */
  readonly fields: CrawlResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CrawlResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CrawlResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends CrawlResult$domainArgs<ExtArgs> = {}>(args?: Subset<T, CrawlResult$domainArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    domainVersion<T extends CrawlResult$domainVersionArgs<ExtArgs> = {}>(args?: Subset<T, CrawlResult$domainVersionArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CrawlResult model
   */
  interface CrawlResultFieldRefs {
    readonly id: FieldRef<"CrawlResult", 'Int'>
    readonly domainId: FieldRef<"CrawlResult", 'Int'>
    readonly domainVersionId: FieldRef<"CrawlResult", 'Int'>
    readonly pagesScanned: FieldRef<"CrawlResult", 'Int'>
    readonly contentBlocks: FieldRef<"CrawlResult", 'Int'>
    readonly keyEntities: FieldRef<"CrawlResult", 'Int'>
    readonly confidenceScore: FieldRef<"CrawlResult", 'Float'>
    readonly extractedContext: FieldRef<"CrawlResult", 'String'>
    readonly tokenUsage: FieldRef<"CrawlResult", 'Int'>
    readonly createdAt: FieldRef<"CrawlResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CrawlResult findUnique
   */
  export type CrawlResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    /**
     * Filter, which CrawlResult to fetch.
     */
    where: CrawlResultWhereUniqueInput
  }

  /**
   * CrawlResult findUniqueOrThrow
   */
  export type CrawlResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    /**
     * Filter, which CrawlResult to fetch.
     */
    where: CrawlResultWhereUniqueInput
  }

  /**
   * CrawlResult findFirst
   */
  export type CrawlResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    /**
     * Filter, which CrawlResult to fetch.
     */
    where?: CrawlResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlResults to fetch.
     */
    orderBy?: CrawlResultOrderByWithRelationInput | CrawlResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrawlResults.
     */
    cursor?: CrawlResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrawlResults.
     */
    distinct?: CrawlResultScalarFieldEnum | CrawlResultScalarFieldEnum[]
  }

  /**
   * CrawlResult findFirstOrThrow
   */
  export type CrawlResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    /**
     * Filter, which CrawlResult to fetch.
     */
    where?: CrawlResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlResults to fetch.
     */
    orderBy?: CrawlResultOrderByWithRelationInput | CrawlResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrawlResults.
     */
    cursor?: CrawlResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrawlResults.
     */
    distinct?: CrawlResultScalarFieldEnum | CrawlResultScalarFieldEnum[]
  }

  /**
   * CrawlResult findMany
   */
  export type CrawlResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    /**
     * Filter, which CrawlResults to fetch.
     */
    where?: CrawlResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrawlResults to fetch.
     */
    orderBy?: CrawlResultOrderByWithRelationInput | CrawlResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CrawlResults.
     */
    cursor?: CrawlResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrawlResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrawlResults.
     */
    skip?: number
    distinct?: CrawlResultScalarFieldEnum | CrawlResultScalarFieldEnum[]
  }

  /**
   * CrawlResult create
   */
  export type CrawlResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    /**
     * The data needed to create a CrawlResult.
     */
    data: XOR<CrawlResultCreateInput, CrawlResultUncheckedCreateInput>
  }

  /**
   * CrawlResult createMany
   */
  export type CrawlResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CrawlResults.
     */
    data: CrawlResultCreateManyInput | CrawlResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CrawlResult createManyAndReturn
   */
  export type CrawlResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * The data used to create many CrawlResults.
     */
    data: CrawlResultCreateManyInput | CrawlResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CrawlResult update
   */
  export type CrawlResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    /**
     * The data needed to update a CrawlResult.
     */
    data: XOR<CrawlResultUpdateInput, CrawlResultUncheckedUpdateInput>
    /**
     * Choose, which CrawlResult to update.
     */
    where: CrawlResultWhereUniqueInput
  }

  /**
   * CrawlResult updateMany
   */
  export type CrawlResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CrawlResults.
     */
    data: XOR<CrawlResultUpdateManyMutationInput, CrawlResultUncheckedUpdateManyInput>
    /**
     * Filter which CrawlResults to update
     */
    where?: CrawlResultWhereInput
  }

  /**
   * CrawlResult upsert
   */
  export type CrawlResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    /**
     * The filter to search for the CrawlResult to update in case it exists.
     */
    where: CrawlResultWhereUniqueInput
    /**
     * In case the CrawlResult found by the `where` argument doesn't exist, create a new CrawlResult with this data.
     */
    create: XOR<CrawlResultCreateInput, CrawlResultUncheckedCreateInput>
    /**
     * In case the CrawlResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CrawlResultUpdateInput, CrawlResultUncheckedUpdateInput>
  }

  /**
   * CrawlResult delete
   */
  export type CrawlResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
    /**
     * Filter which CrawlResult to delete.
     */
    where: CrawlResultWhereUniqueInput
  }

  /**
   * CrawlResult deleteMany
   */
  export type CrawlResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrawlResults to delete
     */
    where?: CrawlResultWhereInput
  }

  /**
   * CrawlResult.domain
   */
  export type CrawlResult$domainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    where?: DomainWhereInput
  }

  /**
   * CrawlResult.domainVersion
   */
  export type CrawlResult$domainVersionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    where?: DomainVersionWhereInput
  }

  /**
   * CrawlResult without action
   */
  export type CrawlResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrawlResult
     */
    select?: CrawlResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrawlResult
     */
    omit?: CrawlResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrawlResultInclude<ExtArgs> | null
  }


  /**
   * Model Keyword
   */

  export type AggregateKeyword = {
    _count: KeywordCountAggregateOutputType | null
    _avg: KeywordAvgAggregateOutputType | null
    _sum: KeywordSumAggregateOutputType | null
    _min: KeywordMinAggregateOutputType | null
    _max: KeywordMaxAggregateOutputType | null
  }

  export type KeywordAvgAggregateOutputType = {
    id: number | null
    volume: number | null
    cpc: number | null
    domainId: number | null
    domainVersionId: number | null
  }

  export type KeywordSumAggregateOutputType = {
    id: number | null
    volume: number | null
    cpc: number | null
    domainId: number | null
    domainVersionId: number | null
  }

  export type KeywordMinAggregateOutputType = {
    id: number | null
    term: string | null
    volume: number | null
    difficulty: string | null
    cpc: number | null
    domainId: number | null
    domainVersionId: number | null
    isSelected: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KeywordMaxAggregateOutputType = {
    id: number | null
    term: string | null
    volume: number | null
    difficulty: string | null
    cpc: number | null
    domainId: number | null
    domainVersionId: number | null
    isSelected: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KeywordCountAggregateOutputType = {
    id: number
    term: number
    volume: number
    difficulty: number
    cpc: number
    domainId: number
    domainVersionId: number
    isSelected: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KeywordAvgAggregateInputType = {
    id?: true
    volume?: true
    cpc?: true
    domainId?: true
    domainVersionId?: true
  }

  export type KeywordSumAggregateInputType = {
    id?: true
    volume?: true
    cpc?: true
    domainId?: true
    domainVersionId?: true
  }

  export type KeywordMinAggregateInputType = {
    id?: true
    term?: true
    volume?: true
    difficulty?: true
    cpc?: true
    domainId?: true
    domainVersionId?: true
    isSelected?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KeywordMaxAggregateInputType = {
    id?: true
    term?: true
    volume?: true
    difficulty?: true
    cpc?: true
    domainId?: true
    domainVersionId?: true
    isSelected?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KeywordCountAggregateInputType = {
    id?: true
    term?: true
    volume?: true
    difficulty?: true
    cpc?: true
    domainId?: true
    domainVersionId?: true
    isSelected?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KeywordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Keyword to aggregate.
     */
    where?: KeywordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Keywords to fetch.
     */
    orderBy?: KeywordOrderByWithRelationInput | KeywordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KeywordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Keywords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Keywords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Keywords
    **/
    _count?: true | KeywordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KeywordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KeywordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KeywordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KeywordMaxAggregateInputType
  }

  export type GetKeywordAggregateType<T extends KeywordAggregateArgs> = {
        [P in keyof T & keyof AggregateKeyword]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKeyword[P]>
      : GetScalarType<T[P], AggregateKeyword[P]>
  }




  export type KeywordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KeywordWhereInput
    orderBy?: KeywordOrderByWithAggregationInput | KeywordOrderByWithAggregationInput[]
    by: KeywordScalarFieldEnum[] | KeywordScalarFieldEnum
    having?: KeywordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KeywordCountAggregateInputType | true
    _avg?: KeywordAvgAggregateInputType
    _sum?: KeywordSumAggregateInputType
    _min?: KeywordMinAggregateInputType
    _max?: KeywordMaxAggregateInputType
  }

  export type KeywordGroupByOutputType = {
    id: number
    term: string
    volume: number
    difficulty: string
    cpc: number
    domainId: number | null
    domainVersionId: number | null
    isSelected: boolean
    createdAt: Date
    updatedAt: Date
    _count: KeywordCountAggregateOutputType | null
    _avg: KeywordAvgAggregateOutputType | null
    _sum: KeywordSumAggregateOutputType | null
    _min: KeywordMinAggregateOutputType | null
    _max: KeywordMaxAggregateOutputType | null
  }

  type GetKeywordGroupByPayload<T extends KeywordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KeywordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KeywordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KeywordGroupByOutputType[P]>
            : GetScalarType<T[P], KeywordGroupByOutputType[P]>
        }
      >
    >


  export type KeywordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term?: boolean
    volume?: boolean
    difficulty?: boolean
    cpc?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    isSelected?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | Keyword$domainArgs<ExtArgs>
    domainVersion?: boolean | Keyword$domainVersionArgs<ExtArgs>
    phrases?: boolean | Keyword$phrasesArgs<ExtArgs>
    _count?: boolean | KeywordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["keyword"]>

  export type KeywordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    term?: boolean
    volume?: boolean
    difficulty?: boolean
    cpc?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    isSelected?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | Keyword$domainArgs<ExtArgs>
    domainVersion?: boolean | Keyword$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["keyword"]>


  export type KeywordSelectScalar = {
    id?: boolean
    term?: boolean
    volume?: boolean
    difficulty?: boolean
    cpc?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    isSelected?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KeywordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "term" | "volume" | "difficulty" | "cpc" | "domainId" | "domainVersionId" | "isSelected" | "createdAt" | "updatedAt", ExtArgs["result"]["keyword"]>
  export type KeywordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | Keyword$domainArgs<ExtArgs>
    domainVersion?: boolean | Keyword$domainVersionArgs<ExtArgs>
    phrases?: boolean | Keyword$phrasesArgs<ExtArgs>
    _count?: boolean | KeywordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KeywordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | Keyword$domainArgs<ExtArgs>
    domainVersion?: boolean | Keyword$domainVersionArgs<ExtArgs>
  }

  export type $KeywordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Keyword"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs> | null
      domainVersion: Prisma.$DomainVersionPayload<ExtArgs> | null
      phrases: Prisma.$PhrasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      term: string
      volume: number
      difficulty: string
      cpc: number
      domainId: number | null
      domainVersionId: number | null
      isSelected: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["keyword"]>
    composites: {}
  }

  type KeywordGetPayload<S extends boolean | null | undefined | KeywordDefaultArgs> = $Result.GetResult<Prisma.$KeywordPayload, S>

  type KeywordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KeywordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KeywordCountAggregateInputType | true
    }

  export interface KeywordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Keyword'], meta: { name: 'Keyword' } }
    /**
     * Find zero or one Keyword that matches the filter.
     * @param {KeywordFindUniqueArgs} args - Arguments to find a Keyword
     * @example
     * // Get one Keyword
     * const keyword = await prisma.keyword.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KeywordFindUniqueArgs>(args: SelectSubset<T, KeywordFindUniqueArgs<ExtArgs>>): Prisma__KeywordClient<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Keyword that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KeywordFindUniqueOrThrowArgs} args - Arguments to find a Keyword
     * @example
     * // Get one Keyword
     * const keyword = await prisma.keyword.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KeywordFindUniqueOrThrowArgs>(args: SelectSubset<T, KeywordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KeywordClient<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Keyword that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordFindFirstArgs} args - Arguments to find a Keyword
     * @example
     * // Get one Keyword
     * const keyword = await prisma.keyword.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KeywordFindFirstArgs>(args?: SelectSubset<T, KeywordFindFirstArgs<ExtArgs>>): Prisma__KeywordClient<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Keyword that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordFindFirstOrThrowArgs} args - Arguments to find a Keyword
     * @example
     * // Get one Keyword
     * const keyword = await prisma.keyword.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KeywordFindFirstOrThrowArgs>(args?: SelectSubset<T, KeywordFindFirstOrThrowArgs<ExtArgs>>): Prisma__KeywordClient<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Keywords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Keywords
     * const keywords = await prisma.keyword.findMany()
     * 
     * // Get first 10 Keywords
     * const keywords = await prisma.keyword.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const keywordWithIdOnly = await prisma.keyword.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KeywordFindManyArgs>(args?: SelectSubset<T, KeywordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Keyword.
     * @param {KeywordCreateArgs} args - Arguments to create a Keyword.
     * @example
     * // Create one Keyword
     * const Keyword = await prisma.keyword.create({
     *   data: {
     *     // ... data to create a Keyword
     *   }
     * })
     * 
     */
    create<T extends KeywordCreateArgs>(args: SelectSubset<T, KeywordCreateArgs<ExtArgs>>): Prisma__KeywordClient<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Keywords.
     * @param {KeywordCreateManyArgs} args - Arguments to create many Keywords.
     * @example
     * // Create many Keywords
     * const keyword = await prisma.keyword.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KeywordCreateManyArgs>(args?: SelectSubset<T, KeywordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Keywords and returns the data saved in the database.
     * @param {KeywordCreateManyAndReturnArgs} args - Arguments to create many Keywords.
     * @example
     * // Create many Keywords
     * const keyword = await prisma.keyword.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Keywords and only return the `id`
     * const keywordWithIdOnly = await prisma.keyword.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KeywordCreateManyAndReturnArgs>(args?: SelectSubset<T, KeywordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Keyword.
     * @param {KeywordDeleteArgs} args - Arguments to delete one Keyword.
     * @example
     * // Delete one Keyword
     * const Keyword = await prisma.keyword.delete({
     *   where: {
     *     // ... filter to delete one Keyword
     *   }
     * })
     * 
     */
    delete<T extends KeywordDeleteArgs>(args: SelectSubset<T, KeywordDeleteArgs<ExtArgs>>): Prisma__KeywordClient<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Keyword.
     * @param {KeywordUpdateArgs} args - Arguments to update one Keyword.
     * @example
     * // Update one Keyword
     * const keyword = await prisma.keyword.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KeywordUpdateArgs>(args: SelectSubset<T, KeywordUpdateArgs<ExtArgs>>): Prisma__KeywordClient<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Keywords.
     * @param {KeywordDeleteManyArgs} args - Arguments to filter Keywords to delete.
     * @example
     * // Delete a few Keywords
     * const { count } = await prisma.keyword.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KeywordDeleteManyArgs>(args?: SelectSubset<T, KeywordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Keywords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Keywords
     * const keyword = await prisma.keyword.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KeywordUpdateManyArgs>(args: SelectSubset<T, KeywordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Keyword.
     * @param {KeywordUpsertArgs} args - Arguments to update or create a Keyword.
     * @example
     * // Update or create a Keyword
     * const keyword = await prisma.keyword.upsert({
     *   create: {
     *     // ... data to create a Keyword
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Keyword we want to update
     *   }
     * })
     */
    upsert<T extends KeywordUpsertArgs>(args: SelectSubset<T, KeywordUpsertArgs<ExtArgs>>): Prisma__KeywordClient<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Keywords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordCountArgs} args - Arguments to filter Keywords to count.
     * @example
     * // Count the number of Keywords
     * const count = await prisma.keyword.count({
     *   where: {
     *     // ... the filter for the Keywords we want to count
     *   }
     * })
    **/
    count<T extends KeywordCountArgs>(
      args?: Subset<T, KeywordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KeywordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Keyword.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KeywordAggregateArgs>(args: Subset<T, KeywordAggregateArgs>): Prisma.PrismaPromise<GetKeywordAggregateType<T>>

    /**
     * Group by Keyword.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeywordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KeywordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KeywordGroupByArgs['orderBy'] }
        : { orderBy?: KeywordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KeywordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKeywordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Keyword model
   */
  readonly fields: KeywordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Keyword.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KeywordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends Keyword$domainArgs<ExtArgs> = {}>(args?: Subset<T, Keyword$domainArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    domainVersion<T extends Keyword$domainVersionArgs<ExtArgs> = {}>(args?: Subset<T, Keyword$domainVersionArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    phrases<T extends Keyword$phrasesArgs<ExtArgs> = {}>(args?: Subset<T, Keyword$phrasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Keyword model
   */
  interface KeywordFieldRefs {
    readonly id: FieldRef<"Keyword", 'Int'>
    readonly term: FieldRef<"Keyword", 'String'>
    readonly volume: FieldRef<"Keyword", 'Int'>
    readonly difficulty: FieldRef<"Keyword", 'String'>
    readonly cpc: FieldRef<"Keyword", 'Float'>
    readonly domainId: FieldRef<"Keyword", 'Int'>
    readonly domainVersionId: FieldRef<"Keyword", 'Int'>
    readonly isSelected: FieldRef<"Keyword", 'Boolean'>
    readonly createdAt: FieldRef<"Keyword", 'DateTime'>
    readonly updatedAt: FieldRef<"Keyword", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Keyword findUnique
   */
  export type KeywordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    /**
     * Filter, which Keyword to fetch.
     */
    where: KeywordWhereUniqueInput
  }

  /**
   * Keyword findUniqueOrThrow
   */
  export type KeywordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    /**
     * Filter, which Keyword to fetch.
     */
    where: KeywordWhereUniqueInput
  }

  /**
   * Keyword findFirst
   */
  export type KeywordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    /**
     * Filter, which Keyword to fetch.
     */
    where?: KeywordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Keywords to fetch.
     */
    orderBy?: KeywordOrderByWithRelationInput | KeywordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Keywords.
     */
    cursor?: KeywordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Keywords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Keywords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Keywords.
     */
    distinct?: KeywordScalarFieldEnum | KeywordScalarFieldEnum[]
  }

  /**
   * Keyword findFirstOrThrow
   */
  export type KeywordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    /**
     * Filter, which Keyword to fetch.
     */
    where?: KeywordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Keywords to fetch.
     */
    orderBy?: KeywordOrderByWithRelationInput | KeywordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Keywords.
     */
    cursor?: KeywordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Keywords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Keywords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Keywords.
     */
    distinct?: KeywordScalarFieldEnum | KeywordScalarFieldEnum[]
  }

  /**
   * Keyword findMany
   */
  export type KeywordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    /**
     * Filter, which Keywords to fetch.
     */
    where?: KeywordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Keywords to fetch.
     */
    orderBy?: KeywordOrderByWithRelationInput | KeywordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Keywords.
     */
    cursor?: KeywordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Keywords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Keywords.
     */
    skip?: number
    distinct?: KeywordScalarFieldEnum | KeywordScalarFieldEnum[]
  }

  /**
   * Keyword create
   */
  export type KeywordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    /**
     * The data needed to create a Keyword.
     */
    data: XOR<KeywordCreateInput, KeywordUncheckedCreateInput>
  }

  /**
   * Keyword createMany
   */
  export type KeywordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Keywords.
     */
    data: KeywordCreateManyInput | KeywordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Keyword createManyAndReturn
   */
  export type KeywordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * The data used to create many Keywords.
     */
    data: KeywordCreateManyInput | KeywordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Keyword update
   */
  export type KeywordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    /**
     * The data needed to update a Keyword.
     */
    data: XOR<KeywordUpdateInput, KeywordUncheckedUpdateInput>
    /**
     * Choose, which Keyword to update.
     */
    where: KeywordWhereUniqueInput
  }

  /**
   * Keyword updateMany
   */
  export type KeywordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Keywords.
     */
    data: XOR<KeywordUpdateManyMutationInput, KeywordUncheckedUpdateManyInput>
    /**
     * Filter which Keywords to update
     */
    where?: KeywordWhereInput
  }

  /**
   * Keyword upsert
   */
  export type KeywordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    /**
     * The filter to search for the Keyword to update in case it exists.
     */
    where: KeywordWhereUniqueInput
    /**
     * In case the Keyword found by the `where` argument doesn't exist, create a new Keyword with this data.
     */
    create: XOR<KeywordCreateInput, KeywordUncheckedCreateInput>
    /**
     * In case the Keyword was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KeywordUpdateInput, KeywordUncheckedUpdateInput>
  }

  /**
   * Keyword delete
   */
  export type KeywordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
    /**
     * Filter which Keyword to delete.
     */
    where: KeywordWhereUniqueInput
  }

  /**
   * Keyword deleteMany
   */
  export type KeywordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Keywords to delete
     */
    where?: KeywordWhereInput
  }

  /**
   * Keyword.domain
   */
  export type Keyword$domainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    where?: DomainWhereInput
  }

  /**
   * Keyword.domainVersion
   */
  export type Keyword$domainVersionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    where?: DomainVersionWhereInput
  }

  /**
   * Keyword.phrases
   */
  export type Keyword$phrasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
    where?: PhraseWhereInput
    orderBy?: PhraseOrderByWithRelationInput | PhraseOrderByWithRelationInput[]
    cursor?: PhraseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PhraseScalarFieldEnum | PhraseScalarFieldEnum[]
  }

  /**
   * Keyword without action
   */
  export type KeywordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Keyword
     */
    select?: KeywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Keyword
     */
    omit?: KeywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeywordInclude<ExtArgs> | null
  }


  /**
   * Model Phrase
   */

  export type AggregatePhrase = {
    _count: PhraseCountAggregateOutputType | null
    _avg: PhraseAvgAggregateOutputType | null
    _sum: PhraseSumAggregateOutputType | null
    _min: PhraseMinAggregateOutputType | null
    _max: PhraseMaxAggregateOutputType | null
  }

  export type PhraseAvgAggregateOutputType = {
    id: number | null
    keywordId: number | null
  }

  export type PhraseSumAggregateOutputType = {
    id: number | null
    keywordId: number | null
  }

  export type PhraseMinAggregateOutputType = {
    id: number | null
    text: string | null
    keywordId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PhraseMaxAggregateOutputType = {
    id: number | null
    text: string | null
    keywordId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PhraseCountAggregateOutputType = {
    id: number
    text: number
    keywordId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PhraseAvgAggregateInputType = {
    id?: true
    keywordId?: true
  }

  export type PhraseSumAggregateInputType = {
    id?: true
    keywordId?: true
  }

  export type PhraseMinAggregateInputType = {
    id?: true
    text?: true
    keywordId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PhraseMaxAggregateInputType = {
    id?: true
    text?: true
    keywordId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PhraseCountAggregateInputType = {
    id?: true
    text?: true
    keywordId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PhraseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Phrase to aggregate.
     */
    where?: PhraseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phrases to fetch.
     */
    orderBy?: PhraseOrderByWithRelationInput | PhraseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhraseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phrases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phrases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Phrases
    **/
    _count?: true | PhraseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PhraseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PhraseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhraseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhraseMaxAggregateInputType
  }

  export type GetPhraseAggregateType<T extends PhraseAggregateArgs> = {
        [P in keyof T & keyof AggregatePhrase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhrase[P]>
      : GetScalarType<T[P], AggregatePhrase[P]>
  }




  export type PhraseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhraseWhereInput
    orderBy?: PhraseOrderByWithAggregationInput | PhraseOrderByWithAggregationInput[]
    by: PhraseScalarFieldEnum[] | PhraseScalarFieldEnum
    having?: PhraseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhraseCountAggregateInputType | true
    _avg?: PhraseAvgAggregateInputType
    _sum?: PhraseSumAggregateInputType
    _min?: PhraseMinAggregateInputType
    _max?: PhraseMaxAggregateInputType
  }

  export type PhraseGroupByOutputType = {
    id: number
    text: string
    keywordId: number
    createdAt: Date
    updatedAt: Date
    _count: PhraseCountAggregateOutputType | null
    _avg: PhraseAvgAggregateOutputType | null
    _sum: PhraseSumAggregateOutputType | null
    _min: PhraseMinAggregateOutputType | null
    _max: PhraseMaxAggregateOutputType | null
  }

  type GetPhraseGroupByPayload<T extends PhraseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhraseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhraseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhraseGroupByOutputType[P]>
            : GetScalarType<T[P], PhraseGroupByOutputType[P]>
        }
      >
    >


  export type PhraseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    keywordId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    keyword?: boolean | KeywordDefaultArgs<ExtArgs>
    aiQueryResults?: boolean | Phrase$aiQueryResultsArgs<ExtArgs>
    _count?: boolean | PhraseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["phrase"]>

  export type PhraseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    keywordId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    keyword?: boolean | KeywordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["phrase"]>


  export type PhraseSelectScalar = {
    id?: boolean
    text?: boolean
    keywordId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PhraseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "keywordId" | "createdAt" | "updatedAt", ExtArgs["result"]["phrase"]>
  export type PhraseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    keyword?: boolean | KeywordDefaultArgs<ExtArgs>
    aiQueryResults?: boolean | Phrase$aiQueryResultsArgs<ExtArgs>
    _count?: boolean | PhraseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PhraseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    keyword?: boolean | KeywordDefaultArgs<ExtArgs>
  }

  export type $PhrasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Phrase"
    objects: {
      keyword: Prisma.$KeywordPayload<ExtArgs>
      aiQueryResults: Prisma.$AIQueryResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      text: string
      keywordId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["phrase"]>
    composites: {}
  }

  type PhraseGetPayload<S extends boolean | null | undefined | PhraseDefaultArgs> = $Result.GetResult<Prisma.$PhrasePayload, S>

  type PhraseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhraseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhraseCountAggregateInputType | true
    }

  export interface PhraseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Phrase'], meta: { name: 'Phrase' } }
    /**
     * Find zero or one Phrase that matches the filter.
     * @param {PhraseFindUniqueArgs} args - Arguments to find a Phrase
     * @example
     * // Get one Phrase
     * const phrase = await prisma.phrase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhraseFindUniqueArgs>(args: SelectSubset<T, PhraseFindUniqueArgs<ExtArgs>>): Prisma__PhraseClient<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Phrase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhraseFindUniqueOrThrowArgs} args - Arguments to find a Phrase
     * @example
     * // Get one Phrase
     * const phrase = await prisma.phrase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhraseFindUniqueOrThrowArgs>(args: SelectSubset<T, PhraseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhraseClient<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Phrase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseFindFirstArgs} args - Arguments to find a Phrase
     * @example
     * // Get one Phrase
     * const phrase = await prisma.phrase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhraseFindFirstArgs>(args?: SelectSubset<T, PhraseFindFirstArgs<ExtArgs>>): Prisma__PhraseClient<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Phrase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseFindFirstOrThrowArgs} args - Arguments to find a Phrase
     * @example
     * // Get one Phrase
     * const phrase = await prisma.phrase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhraseFindFirstOrThrowArgs>(args?: SelectSubset<T, PhraseFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhraseClient<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Phrases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Phrases
     * const phrases = await prisma.phrase.findMany()
     * 
     * // Get first 10 Phrases
     * const phrases = await prisma.phrase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const phraseWithIdOnly = await prisma.phrase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhraseFindManyArgs>(args?: SelectSubset<T, PhraseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Phrase.
     * @param {PhraseCreateArgs} args - Arguments to create a Phrase.
     * @example
     * // Create one Phrase
     * const Phrase = await prisma.phrase.create({
     *   data: {
     *     // ... data to create a Phrase
     *   }
     * })
     * 
     */
    create<T extends PhraseCreateArgs>(args: SelectSubset<T, PhraseCreateArgs<ExtArgs>>): Prisma__PhraseClient<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Phrases.
     * @param {PhraseCreateManyArgs} args - Arguments to create many Phrases.
     * @example
     * // Create many Phrases
     * const phrase = await prisma.phrase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhraseCreateManyArgs>(args?: SelectSubset<T, PhraseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Phrases and returns the data saved in the database.
     * @param {PhraseCreateManyAndReturnArgs} args - Arguments to create many Phrases.
     * @example
     * // Create many Phrases
     * const phrase = await prisma.phrase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Phrases and only return the `id`
     * const phraseWithIdOnly = await prisma.phrase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhraseCreateManyAndReturnArgs>(args?: SelectSubset<T, PhraseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Phrase.
     * @param {PhraseDeleteArgs} args - Arguments to delete one Phrase.
     * @example
     * // Delete one Phrase
     * const Phrase = await prisma.phrase.delete({
     *   where: {
     *     // ... filter to delete one Phrase
     *   }
     * })
     * 
     */
    delete<T extends PhraseDeleteArgs>(args: SelectSubset<T, PhraseDeleteArgs<ExtArgs>>): Prisma__PhraseClient<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Phrase.
     * @param {PhraseUpdateArgs} args - Arguments to update one Phrase.
     * @example
     * // Update one Phrase
     * const phrase = await prisma.phrase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhraseUpdateArgs>(args: SelectSubset<T, PhraseUpdateArgs<ExtArgs>>): Prisma__PhraseClient<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Phrases.
     * @param {PhraseDeleteManyArgs} args - Arguments to filter Phrases to delete.
     * @example
     * // Delete a few Phrases
     * const { count } = await prisma.phrase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhraseDeleteManyArgs>(args?: SelectSubset<T, PhraseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Phrases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Phrases
     * const phrase = await prisma.phrase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhraseUpdateManyArgs>(args: SelectSubset<T, PhraseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Phrase.
     * @param {PhraseUpsertArgs} args - Arguments to update or create a Phrase.
     * @example
     * // Update or create a Phrase
     * const phrase = await prisma.phrase.upsert({
     *   create: {
     *     // ... data to create a Phrase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Phrase we want to update
     *   }
     * })
     */
    upsert<T extends PhraseUpsertArgs>(args: SelectSubset<T, PhraseUpsertArgs<ExtArgs>>): Prisma__PhraseClient<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Phrases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseCountArgs} args - Arguments to filter Phrases to count.
     * @example
     * // Count the number of Phrases
     * const count = await prisma.phrase.count({
     *   where: {
     *     // ... the filter for the Phrases we want to count
     *   }
     * })
    **/
    count<T extends PhraseCountArgs>(
      args?: Subset<T, PhraseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhraseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Phrase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PhraseAggregateArgs>(args: Subset<T, PhraseAggregateArgs>): Prisma.PrismaPromise<GetPhraseAggregateType<T>>

    /**
     * Group by Phrase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhraseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PhraseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhraseGroupByArgs['orderBy'] }
        : { orderBy?: PhraseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PhraseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhraseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Phrase model
   */
  readonly fields: PhraseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Phrase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhraseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    keyword<T extends KeywordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KeywordDefaultArgs<ExtArgs>>): Prisma__KeywordClient<$Result.GetResult<Prisma.$KeywordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    aiQueryResults<T extends Phrase$aiQueryResultsArgs<ExtArgs> = {}>(args?: Subset<T, Phrase$aiQueryResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Phrase model
   */
  interface PhraseFieldRefs {
    readonly id: FieldRef<"Phrase", 'Int'>
    readonly text: FieldRef<"Phrase", 'String'>
    readonly keywordId: FieldRef<"Phrase", 'Int'>
    readonly createdAt: FieldRef<"Phrase", 'DateTime'>
    readonly updatedAt: FieldRef<"Phrase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Phrase findUnique
   */
  export type PhraseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter, which Phrase to fetch.
     */
    where: PhraseWhereUniqueInput
  }

  /**
   * Phrase findUniqueOrThrow
   */
  export type PhraseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter, which Phrase to fetch.
     */
    where: PhraseWhereUniqueInput
  }

  /**
   * Phrase findFirst
   */
  export type PhraseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter, which Phrase to fetch.
     */
    where?: PhraseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phrases to fetch.
     */
    orderBy?: PhraseOrderByWithRelationInput | PhraseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phrases.
     */
    cursor?: PhraseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phrases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phrases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phrases.
     */
    distinct?: PhraseScalarFieldEnum | PhraseScalarFieldEnum[]
  }

  /**
   * Phrase findFirstOrThrow
   */
  export type PhraseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter, which Phrase to fetch.
     */
    where?: PhraseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phrases to fetch.
     */
    orderBy?: PhraseOrderByWithRelationInput | PhraseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Phrases.
     */
    cursor?: PhraseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phrases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phrases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Phrases.
     */
    distinct?: PhraseScalarFieldEnum | PhraseScalarFieldEnum[]
  }

  /**
   * Phrase findMany
   */
  export type PhraseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter, which Phrases to fetch.
     */
    where?: PhraseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Phrases to fetch.
     */
    orderBy?: PhraseOrderByWithRelationInput | PhraseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Phrases.
     */
    cursor?: PhraseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Phrases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Phrases.
     */
    skip?: number
    distinct?: PhraseScalarFieldEnum | PhraseScalarFieldEnum[]
  }

  /**
   * Phrase create
   */
  export type PhraseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * The data needed to create a Phrase.
     */
    data: XOR<PhraseCreateInput, PhraseUncheckedCreateInput>
  }

  /**
   * Phrase createMany
   */
  export type PhraseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Phrases.
     */
    data: PhraseCreateManyInput | PhraseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Phrase createManyAndReturn
   */
  export type PhraseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * The data used to create many Phrases.
     */
    data: PhraseCreateManyInput | PhraseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Phrase update
   */
  export type PhraseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * The data needed to update a Phrase.
     */
    data: XOR<PhraseUpdateInput, PhraseUncheckedUpdateInput>
    /**
     * Choose, which Phrase to update.
     */
    where: PhraseWhereUniqueInput
  }

  /**
   * Phrase updateMany
   */
  export type PhraseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Phrases.
     */
    data: XOR<PhraseUpdateManyMutationInput, PhraseUncheckedUpdateManyInput>
    /**
     * Filter which Phrases to update
     */
    where?: PhraseWhereInput
  }

  /**
   * Phrase upsert
   */
  export type PhraseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * The filter to search for the Phrase to update in case it exists.
     */
    where: PhraseWhereUniqueInput
    /**
     * In case the Phrase found by the `where` argument doesn't exist, create a new Phrase with this data.
     */
    create: XOR<PhraseCreateInput, PhraseUncheckedCreateInput>
    /**
     * In case the Phrase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhraseUpdateInput, PhraseUncheckedUpdateInput>
  }

  /**
   * Phrase delete
   */
  export type PhraseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
    /**
     * Filter which Phrase to delete.
     */
    where: PhraseWhereUniqueInput
  }

  /**
   * Phrase deleteMany
   */
  export type PhraseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Phrases to delete
     */
    where?: PhraseWhereInput
  }

  /**
   * Phrase.aiQueryResults
   */
  export type Phrase$aiQueryResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
    where?: AIQueryResultWhereInput
    orderBy?: AIQueryResultOrderByWithRelationInput | AIQueryResultOrderByWithRelationInput[]
    cursor?: AIQueryResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIQueryResultScalarFieldEnum | AIQueryResultScalarFieldEnum[]
  }

  /**
   * Phrase without action
   */
  export type PhraseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Phrase
     */
    select?: PhraseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Phrase
     */
    omit?: PhraseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PhraseInclude<ExtArgs> | null
  }


  /**
   * Model AIQueryResult
   */

  export type AggregateAIQueryResult = {
    _count: AIQueryResultCountAggregateOutputType | null
    _avg: AIQueryResultAvgAggregateOutputType | null
    _sum: AIQueryResultSumAggregateOutputType | null
    _min: AIQueryResultMinAggregateOutputType | null
    _max: AIQueryResultMaxAggregateOutputType | null
  }

  export type AIQueryResultAvgAggregateOutputType = {
    id: number | null
    phraseId: number | null
    latency: number | null
    cost: number | null
    presence: number | null
    relevance: number | null
    accuracy: number | null
    sentiment: number | null
    overall: number | null
  }

  export type AIQueryResultSumAggregateOutputType = {
    id: number | null
    phraseId: number | null
    latency: number | null
    cost: number | null
    presence: number | null
    relevance: number | null
    accuracy: number | null
    sentiment: number | null
    overall: number | null
  }

  export type AIQueryResultMinAggregateOutputType = {
    id: number | null
    phraseId: number | null
    model: string | null
    response: string | null
    latency: number | null
    cost: number | null
    presence: number | null
    relevance: number | null
    accuracy: number | null
    sentiment: number | null
    overall: number | null
    createdAt: Date | null
  }

  export type AIQueryResultMaxAggregateOutputType = {
    id: number | null
    phraseId: number | null
    model: string | null
    response: string | null
    latency: number | null
    cost: number | null
    presence: number | null
    relevance: number | null
    accuracy: number | null
    sentiment: number | null
    overall: number | null
    createdAt: Date | null
  }

  export type AIQueryResultCountAggregateOutputType = {
    id: number
    phraseId: number
    model: number
    response: number
    latency: number
    cost: number
    presence: number
    relevance: number
    accuracy: number
    sentiment: number
    overall: number
    createdAt: number
    _all: number
  }


  export type AIQueryResultAvgAggregateInputType = {
    id?: true
    phraseId?: true
    latency?: true
    cost?: true
    presence?: true
    relevance?: true
    accuracy?: true
    sentiment?: true
    overall?: true
  }

  export type AIQueryResultSumAggregateInputType = {
    id?: true
    phraseId?: true
    latency?: true
    cost?: true
    presence?: true
    relevance?: true
    accuracy?: true
    sentiment?: true
    overall?: true
  }

  export type AIQueryResultMinAggregateInputType = {
    id?: true
    phraseId?: true
    model?: true
    response?: true
    latency?: true
    cost?: true
    presence?: true
    relevance?: true
    accuracy?: true
    sentiment?: true
    overall?: true
    createdAt?: true
  }

  export type AIQueryResultMaxAggregateInputType = {
    id?: true
    phraseId?: true
    model?: true
    response?: true
    latency?: true
    cost?: true
    presence?: true
    relevance?: true
    accuracy?: true
    sentiment?: true
    overall?: true
    createdAt?: true
  }

  export type AIQueryResultCountAggregateInputType = {
    id?: true
    phraseId?: true
    model?: true
    response?: true
    latency?: true
    cost?: true
    presence?: true
    relevance?: true
    accuracy?: true
    sentiment?: true
    overall?: true
    createdAt?: true
    _all?: true
  }

  export type AIQueryResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIQueryResult to aggregate.
     */
    where?: AIQueryResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIQueryResults to fetch.
     */
    orderBy?: AIQueryResultOrderByWithRelationInput | AIQueryResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIQueryResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIQueryResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIQueryResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIQueryResults
    **/
    _count?: true | AIQueryResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIQueryResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIQueryResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIQueryResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIQueryResultMaxAggregateInputType
  }

  export type GetAIQueryResultAggregateType<T extends AIQueryResultAggregateArgs> = {
        [P in keyof T & keyof AggregateAIQueryResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIQueryResult[P]>
      : GetScalarType<T[P], AggregateAIQueryResult[P]>
  }




  export type AIQueryResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIQueryResultWhereInput
    orderBy?: AIQueryResultOrderByWithAggregationInput | AIQueryResultOrderByWithAggregationInput[]
    by: AIQueryResultScalarFieldEnum[] | AIQueryResultScalarFieldEnum
    having?: AIQueryResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIQueryResultCountAggregateInputType | true
    _avg?: AIQueryResultAvgAggregateInputType
    _sum?: AIQueryResultSumAggregateInputType
    _min?: AIQueryResultMinAggregateInputType
    _max?: AIQueryResultMaxAggregateInputType
  }

  export type AIQueryResultGroupByOutputType = {
    id: number
    phraseId: number
    model: string
    response: string
    latency: number
    cost: number
    presence: number
    relevance: number
    accuracy: number
    sentiment: number
    overall: number
    createdAt: Date
    _count: AIQueryResultCountAggregateOutputType | null
    _avg: AIQueryResultAvgAggregateOutputType | null
    _sum: AIQueryResultSumAggregateOutputType | null
    _min: AIQueryResultMinAggregateOutputType | null
    _max: AIQueryResultMaxAggregateOutputType | null
  }

  type GetAIQueryResultGroupByPayload<T extends AIQueryResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIQueryResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIQueryResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIQueryResultGroupByOutputType[P]>
            : GetScalarType<T[P], AIQueryResultGroupByOutputType[P]>
        }
      >
    >


  export type AIQueryResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phraseId?: boolean
    model?: boolean
    response?: boolean
    latency?: boolean
    cost?: boolean
    presence?: boolean
    relevance?: boolean
    accuracy?: boolean
    sentiment?: boolean
    overall?: boolean
    createdAt?: boolean
    phrase?: boolean | PhraseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIQueryResult"]>

  export type AIQueryResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phraseId?: boolean
    model?: boolean
    response?: boolean
    latency?: boolean
    cost?: boolean
    presence?: boolean
    relevance?: boolean
    accuracy?: boolean
    sentiment?: boolean
    overall?: boolean
    createdAt?: boolean
    phrase?: boolean | PhraseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIQueryResult"]>


  export type AIQueryResultSelectScalar = {
    id?: boolean
    phraseId?: boolean
    model?: boolean
    response?: boolean
    latency?: boolean
    cost?: boolean
    presence?: boolean
    relevance?: boolean
    accuracy?: boolean
    sentiment?: boolean
    overall?: boolean
    createdAt?: boolean
  }

  export type AIQueryResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phraseId" | "model" | "response" | "latency" | "cost" | "presence" | "relevance" | "accuracy" | "sentiment" | "overall" | "createdAt", ExtArgs["result"]["aIQueryResult"]>
  export type AIQueryResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    phrase?: boolean | PhraseDefaultArgs<ExtArgs>
  }
  export type AIQueryResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    phrase?: boolean | PhraseDefaultArgs<ExtArgs>
  }

  export type $AIQueryResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIQueryResult"
    objects: {
      phrase: Prisma.$PhrasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      phraseId: number
      model: string
      response: string
      latency: number
      cost: number
      presence: number
      relevance: number
      accuracy: number
      sentiment: number
      overall: number
      createdAt: Date
    }, ExtArgs["result"]["aIQueryResult"]>
    composites: {}
  }

  type AIQueryResultGetPayload<S extends boolean | null | undefined | AIQueryResultDefaultArgs> = $Result.GetResult<Prisma.$AIQueryResultPayload, S>

  type AIQueryResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIQueryResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIQueryResultCountAggregateInputType | true
    }

  export interface AIQueryResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIQueryResult'], meta: { name: 'AIQueryResult' } }
    /**
     * Find zero or one AIQueryResult that matches the filter.
     * @param {AIQueryResultFindUniqueArgs} args - Arguments to find a AIQueryResult
     * @example
     * // Get one AIQueryResult
     * const aIQueryResult = await prisma.aIQueryResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIQueryResultFindUniqueArgs>(args: SelectSubset<T, AIQueryResultFindUniqueArgs<ExtArgs>>): Prisma__AIQueryResultClient<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIQueryResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIQueryResultFindUniqueOrThrowArgs} args - Arguments to find a AIQueryResult
     * @example
     * // Get one AIQueryResult
     * const aIQueryResult = await prisma.aIQueryResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIQueryResultFindUniqueOrThrowArgs>(args: SelectSubset<T, AIQueryResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIQueryResultClient<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIQueryResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIQueryResultFindFirstArgs} args - Arguments to find a AIQueryResult
     * @example
     * // Get one AIQueryResult
     * const aIQueryResult = await prisma.aIQueryResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIQueryResultFindFirstArgs>(args?: SelectSubset<T, AIQueryResultFindFirstArgs<ExtArgs>>): Prisma__AIQueryResultClient<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIQueryResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIQueryResultFindFirstOrThrowArgs} args - Arguments to find a AIQueryResult
     * @example
     * // Get one AIQueryResult
     * const aIQueryResult = await prisma.aIQueryResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIQueryResultFindFirstOrThrowArgs>(args?: SelectSubset<T, AIQueryResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIQueryResultClient<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIQueryResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIQueryResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIQueryResults
     * const aIQueryResults = await prisma.aIQueryResult.findMany()
     * 
     * // Get first 10 AIQueryResults
     * const aIQueryResults = await prisma.aIQueryResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIQueryResultWithIdOnly = await prisma.aIQueryResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIQueryResultFindManyArgs>(args?: SelectSubset<T, AIQueryResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIQueryResult.
     * @param {AIQueryResultCreateArgs} args - Arguments to create a AIQueryResult.
     * @example
     * // Create one AIQueryResult
     * const AIQueryResult = await prisma.aIQueryResult.create({
     *   data: {
     *     // ... data to create a AIQueryResult
     *   }
     * })
     * 
     */
    create<T extends AIQueryResultCreateArgs>(args: SelectSubset<T, AIQueryResultCreateArgs<ExtArgs>>): Prisma__AIQueryResultClient<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIQueryResults.
     * @param {AIQueryResultCreateManyArgs} args - Arguments to create many AIQueryResults.
     * @example
     * // Create many AIQueryResults
     * const aIQueryResult = await prisma.aIQueryResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIQueryResultCreateManyArgs>(args?: SelectSubset<T, AIQueryResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIQueryResults and returns the data saved in the database.
     * @param {AIQueryResultCreateManyAndReturnArgs} args - Arguments to create many AIQueryResults.
     * @example
     * // Create many AIQueryResults
     * const aIQueryResult = await prisma.aIQueryResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIQueryResults and only return the `id`
     * const aIQueryResultWithIdOnly = await prisma.aIQueryResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIQueryResultCreateManyAndReturnArgs>(args?: SelectSubset<T, AIQueryResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIQueryResult.
     * @param {AIQueryResultDeleteArgs} args - Arguments to delete one AIQueryResult.
     * @example
     * // Delete one AIQueryResult
     * const AIQueryResult = await prisma.aIQueryResult.delete({
     *   where: {
     *     // ... filter to delete one AIQueryResult
     *   }
     * })
     * 
     */
    delete<T extends AIQueryResultDeleteArgs>(args: SelectSubset<T, AIQueryResultDeleteArgs<ExtArgs>>): Prisma__AIQueryResultClient<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIQueryResult.
     * @param {AIQueryResultUpdateArgs} args - Arguments to update one AIQueryResult.
     * @example
     * // Update one AIQueryResult
     * const aIQueryResult = await prisma.aIQueryResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIQueryResultUpdateArgs>(args: SelectSubset<T, AIQueryResultUpdateArgs<ExtArgs>>): Prisma__AIQueryResultClient<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIQueryResults.
     * @param {AIQueryResultDeleteManyArgs} args - Arguments to filter AIQueryResults to delete.
     * @example
     * // Delete a few AIQueryResults
     * const { count } = await prisma.aIQueryResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIQueryResultDeleteManyArgs>(args?: SelectSubset<T, AIQueryResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIQueryResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIQueryResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIQueryResults
     * const aIQueryResult = await prisma.aIQueryResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIQueryResultUpdateManyArgs>(args: SelectSubset<T, AIQueryResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AIQueryResult.
     * @param {AIQueryResultUpsertArgs} args - Arguments to update or create a AIQueryResult.
     * @example
     * // Update or create a AIQueryResult
     * const aIQueryResult = await prisma.aIQueryResult.upsert({
     *   create: {
     *     // ... data to create a AIQueryResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIQueryResult we want to update
     *   }
     * })
     */
    upsert<T extends AIQueryResultUpsertArgs>(args: SelectSubset<T, AIQueryResultUpsertArgs<ExtArgs>>): Prisma__AIQueryResultClient<$Result.GetResult<Prisma.$AIQueryResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIQueryResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIQueryResultCountArgs} args - Arguments to filter AIQueryResults to count.
     * @example
     * // Count the number of AIQueryResults
     * const count = await prisma.aIQueryResult.count({
     *   where: {
     *     // ... the filter for the AIQueryResults we want to count
     *   }
     * })
    **/
    count<T extends AIQueryResultCountArgs>(
      args?: Subset<T, AIQueryResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIQueryResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIQueryResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIQueryResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIQueryResultAggregateArgs>(args: Subset<T, AIQueryResultAggregateArgs>): Prisma.PrismaPromise<GetAIQueryResultAggregateType<T>>

    /**
     * Group by AIQueryResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIQueryResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIQueryResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIQueryResultGroupByArgs['orderBy'] }
        : { orderBy?: AIQueryResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIQueryResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIQueryResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIQueryResult model
   */
  readonly fields: AIQueryResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIQueryResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIQueryResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    phrase<T extends PhraseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PhraseDefaultArgs<ExtArgs>>): Prisma__PhraseClient<$Result.GetResult<Prisma.$PhrasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIQueryResult model
   */
  interface AIQueryResultFieldRefs {
    readonly id: FieldRef<"AIQueryResult", 'Int'>
    readonly phraseId: FieldRef<"AIQueryResult", 'Int'>
    readonly model: FieldRef<"AIQueryResult", 'String'>
    readonly response: FieldRef<"AIQueryResult", 'String'>
    readonly latency: FieldRef<"AIQueryResult", 'Float'>
    readonly cost: FieldRef<"AIQueryResult", 'Float'>
    readonly presence: FieldRef<"AIQueryResult", 'Int'>
    readonly relevance: FieldRef<"AIQueryResult", 'Int'>
    readonly accuracy: FieldRef<"AIQueryResult", 'Int'>
    readonly sentiment: FieldRef<"AIQueryResult", 'Int'>
    readonly overall: FieldRef<"AIQueryResult", 'Float'>
    readonly createdAt: FieldRef<"AIQueryResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIQueryResult findUnique
   */
  export type AIQueryResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
    /**
     * Filter, which AIQueryResult to fetch.
     */
    where: AIQueryResultWhereUniqueInput
  }

  /**
   * AIQueryResult findUniqueOrThrow
   */
  export type AIQueryResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
    /**
     * Filter, which AIQueryResult to fetch.
     */
    where: AIQueryResultWhereUniqueInput
  }

  /**
   * AIQueryResult findFirst
   */
  export type AIQueryResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
    /**
     * Filter, which AIQueryResult to fetch.
     */
    where?: AIQueryResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIQueryResults to fetch.
     */
    orderBy?: AIQueryResultOrderByWithRelationInput | AIQueryResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIQueryResults.
     */
    cursor?: AIQueryResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIQueryResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIQueryResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIQueryResults.
     */
    distinct?: AIQueryResultScalarFieldEnum | AIQueryResultScalarFieldEnum[]
  }

  /**
   * AIQueryResult findFirstOrThrow
   */
  export type AIQueryResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
    /**
     * Filter, which AIQueryResult to fetch.
     */
    where?: AIQueryResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIQueryResults to fetch.
     */
    orderBy?: AIQueryResultOrderByWithRelationInput | AIQueryResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIQueryResults.
     */
    cursor?: AIQueryResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIQueryResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIQueryResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIQueryResults.
     */
    distinct?: AIQueryResultScalarFieldEnum | AIQueryResultScalarFieldEnum[]
  }

  /**
   * AIQueryResult findMany
   */
  export type AIQueryResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
    /**
     * Filter, which AIQueryResults to fetch.
     */
    where?: AIQueryResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIQueryResults to fetch.
     */
    orderBy?: AIQueryResultOrderByWithRelationInput | AIQueryResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIQueryResults.
     */
    cursor?: AIQueryResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIQueryResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIQueryResults.
     */
    skip?: number
    distinct?: AIQueryResultScalarFieldEnum | AIQueryResultScalarFieldEnum[]
  }

  /**
   * AIQueryResult create
   */
  export type AIQueryResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
    /**
     * The data needed to create a AIQueryResult.
     */
    data: XOR<AIQueryResultCreateInput, AIQueryResultUncheckedCreateInput>
  }

  /**
   * AIQueryResult createMany
   */
  export type AIQueryResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIQueryResults.
     */
    data: AIQueryResultCreateManyInput | AIQueryResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIQueryResult createManyAndReturn
   */
  export type AIQueryResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * The data used to create many AIQueryResults.
     */
    data: AIQueryResultCreateManyInput | AIQueryResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIQueryResult update
   */
  export type AIQueryResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
    /**
     * The data needed to update a AIQueryResult.
     */
    data: XOR<AIQueryResultUpdateInput, AIQueryResultUncheckedUpdateInput>
    /**
     * Choose, which AIQueryResult to update.
     */
    where: AIQueryResultWhereUniqueInput
  }

  /**
   * AIQueryResult updateMany
   */
  export type AIQueryResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIQueryResults.
     */
    data: XOR<AIQueryResultUpdateManyMutationInput, AIQueryResultUncheckedUpdateManyInput>
    /**
     * Filter which AIQueryResults to update
     */
    where?: AIQueryResultWhereInput
  }

  /**
   * AIQueryResult upsert
   */
  export type AIQueryResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
    /**
     * The filter to search for the AIQueryResult to update in case it exists.
     */
    where: AIQueryResultWhereUniqueInput
    /**
     * In case the AIQueryResult found by the `where` argument doesn't exist, create a new AIQueryResult with this data.
     */
    create: XOR<AIQueryResultCreateInput, AIQueryResultUncheckedCreateInput>
    /**
     * In case the AIQueryResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIQueryResultUpdateInput, AIQueryResultUncheckedUpdateInput>
  }

  /**
   * AIQueryResult delete
   */
  export type AIQueryResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
    /**
     * Filter which AIQueryResult to delete.
     */
    where: AIQueryResultWhereUniqueInput
  }

  /**
   * AIQueryResult deleteMany
   */
  export type AIQueryResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIQueryResults to delete
     */
    where?: AIQueryResultWhereInput
  }

  /**
   * AIQueryResult without action
   */
  export type AIQueryResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIQueryResult
     */
    select?: AIQueryResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIQueryResult
     */
    omit?: AIQueryResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIQueryResultInclude<ExtArgs> | null
  }


  /**
   * Model DashboardAnalysis
   */

  export type AggregateDashboardAnalysis = {
    _count: DashboardAnalysisCountAggregateOutputType | null
    _avg: DashboardAnalysisAvgAggregateOutputType | null
    _sum: DashboardAnalysisSumAggregateOutputType | null
    _min: DashboardAnalysisMinAggregateOutputType | null
    _max: DashboardAnalysisMaxAggregateOutputType | null
  }

  export type DashboardAnalysisAvgAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
  }

  export type DashboardAnalysisSumAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
  }

  export type DashboardAnalysisMinAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DashboardAnalysisMaxAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DashboardAnalysisCountAggregateOutputType = {
    id: number
    domainId: number
    domainVersionId: number
    metrics: number
    insights: number
    industryAnalysis: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DashboardAnalysisAvgAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
  }

  export type DashboardAnalysisSumAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
  }

  export type DashboardAnalysisMinAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DashboardAnalysisMaxAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DashboardAnalysisCountAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    metrics?: true
    insights?: true
    industryAnalysis?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DashboardAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DashboardAnalysis to aggregate.
     */
    where?: DashboardAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardAnalyses to fetch.
     */
    orderBy?: DashboardAnalysisOrderByWithRelationInput | DashboardAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DashboardAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DashboardAnalyses
    **/
    _count?: true | DashboardAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DashboardAnalysisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DashboardAnalysisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DashboardAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DashboardAnalysisMaxAggregateInputType
  }

  export type GetDashboardAnalysisAggregateType<T extends DashboardAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateDashboardAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDashboardAnalysis[P]>
      : GetScalarType<T[P], AggregateDashboardAnalysis[P]>
  }




  export type DashboardAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardAnalysisWhereInput
    orderBy?: DashboardAnalysisOrderByWithAggregationInput | DashboardAnalysisOrderByWithAggregationInput[]
    by: DashboardAnalysisScalarFieldEnum[] | DashboardAnalysisScalarFieldEnum
    having?: DashboardAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DashboardAnalysisCountAggregateInputType | true
    _avg?: DashboardAnalysisAvgAggregateInputType
    _sum?: DashboardAnalysisSumAggregateInputType
    _min?: DashboardAnalysisMinAggregateInputType
    _max?: DashboardAnalysisMaxAggregateInputType
  }

  export type DashboardAnalysisGroupByOutputType = {
    id: number
    domainId: number | null
    domainVersionId: number | null
    metrics: JsonValue
    insights: JsonValue
    industryAnalysis: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: DashboardAnalysisCountAggregateOutputType | null
    _avg: DashboardAnalysisAvgAggregateOutputType | null
    _sum: DashboardAnalysisSumAggregateOutputType | null
    _min: DashboardAnalysisMinAggregateOutputType | null
    _max: DashboardAnalysisMaxAggregateOutputType | null
  }

  type GetDashboardAnalysisGroupByPayload<T extends DashboardAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DashboardAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DashboardAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DashboardAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], DashboardAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type DashboardAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    metrics?: boolean
    insights?: boolean
    industryAnalysis?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DashboardAnalysis$domainArgs<ExtArgs>
    domainVersion?: boolean | DashboardAnalysis$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["dashboardAnalysis"]>

  export type DashboardAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    metrics?: boolean
    insights?: boolean
    industryAnalysis?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | DashboardAnalysis$domainArgs<ExtArgs>
    domainVersion?: boolean | DashboardAnalysis$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["dashboardAnalysis"]>


  export type DashboardAnalysisSelectScalar = {
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    metrics?: boolean
    insights?: boolean
    industryAnalysis?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DashboardAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "domainId" | "domainVersionId" | "metrics" | "insights" | "industryAnalysis" | "createdAt" | "updatedAt", ExtArgs["result"]["dashboardAnalysis"]>
  export type DashboardAnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DashboardAnalysis$domainArgs<ExtArgs>
    domainVersion?: boolean | DashboardAnalysis$domainVersionArgs<ExtArgs>
  }
  export type DashboardAnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | DashboardAnalysis$domainArgs<ExtArgs>
    domainVersion?: boolean | DashboardAnalysis$domainVersionArgs<ExtArgs>
  }

  export type $DashboardAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DashboardAnalysis"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs> | null
      domainVersion: Prisma.$DomainVersionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      domainId: number | null
      domainVersionId: number | null
      metrics: Prisma.JsonValue
      insights: Prisma.JsonValue
      industryAnalysis: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dashboardAnalysis"]>
    composites: {}
  }

  type DashboardAnalysisGetPayload<S extends boolean | null | undefined | DashboardAnalysisDefaultArgs> = $Result.GetResult<Prisma.$DashboardAnalysisPayload, S>

  type DashboardAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DashboardAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DashboardAnalysisCountAggregateInputType | true
    }

  export interface DashboardAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DashboardAnalysis'], meta: { name: 'DashboardAnalysis' } }
    /**
     * Find zero or one DashboardAnalysis that matches the filter.
     * @param {DashboardAnalysisFindUniqueArgs} args - Arguments to find a DashboardAnalysis
     * @example
     * // Get one DashboardAnalysis
     * const dashboardAnalysis = await prisma.dashboardAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DashboardAnalysisFindUniqueArgs>(args: SelectSubset<T, DashboardAnalysisFindUniqueArgs<ExtArgs>>): Prisma__DashboardAnalysisClient<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DashboardAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DashboardAnalysisFindUniqueOrThrowArgs} args - Arguments to find a DashboardAnalysis
     * @example
     * // Get one DashboardAnalysis
     * const dashboardAnalysis = await prisma.dashboardAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DashboardAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, DashboardAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DashboardAnalysisClient<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DashboardAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardAnalysisFindFirstArgs} args - Arguments to find a DashboardAnalysis
     * @example
     * // Get one DashboardAnalysis
     * const dashboardAnalysis = await prisma.dashboardAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DashboardAnalysisFindFirstArgs>(args?: SelectSubset<T, DashboardAnalysisFindFirstArgs<ExtArgs>>): Prisma__DashboardAnalysisClient<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DashboardAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardAnalysisFindFirstOrThrowArgs} args - Arguments to find a DashboardAnalysis
     * @example
     * // Get one DashboardAnalysis
     * const dashboardAnalysis = await prisma.dashboardAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DashboardAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, DashboardAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__DashboardAnalysisClient<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DashboardAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DashboardAnalyses
     * const dashboardAnalyses = await prisma.dashboardAnalysis.findMany()
     * 
     * // Get first 10 DashboardAnalyses
     * const dashboardAnalyses = await prisma.dashboardAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dashboardAnalysisWithIdOnly = await prisma.dashboardAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DashboardAnalysisFindManyArgs>(args?: SelectSubset<T, DashboardAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DashboardAnalysis.
     * @param {DashboardAnalysisCreateArgs} args - Arguments to create a DashboardAnalysis.
     * @example
     * // Create one DashboardAnalysis
     * const DashboardAnalysis = await prisma.dashboardAnalysis.create({
     *   data: {
     *     // ... data to create a DashboardAnalysis
     *   }
     * })
     * 
     */
    create<T extends DashboardAnalysisCreateArgs>(args: SelectSubset<T, DashboardAnalysisCreateArgs<ExtArgs>>): Prisma__DashboardAnalysisClient<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DashboardAnalyses.
     * @param {DashboardAnalysisCreateManyArgs} args - Arguments to create many DashboardAnalyses.
     * @example
     * // Create many DashboardAnalyses
     * const dashboardAnalysis = await prisma.dashboardAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DashboardAnalysisCreateManyArgs>(args?: SelectSubset<T, DashboardAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DashboardAnalyses and returns the data saved in the database.
     * @param {DashboardAnalysisCreateManyAndReturnArgs} args - Arguments to create many DashboardAnalyses.
     * @example
     * // Create many DashboardAnalyses
     * const dashboardAnalysis = await prisma.dashboardAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DashboardAnalyses and only return the `id`
     * const dashboardAnalysisWithIdOnly = await prisma.dashboardAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DashboardAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, DashboardAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DashboardAnalysis.
     * @param {DashboardAnalysisDeleteArgs} args - Arguments to delete one DashboardAnalysis.
     * @example
     * // Delete one DashboardAnalysis
     * const DashboardAnalysis = await prisma.dashboardAnalysis.delete({
     *   where: {
     *     // ... filter to delete one DashboardAnalysis
     *   }
     * })
     * 
     */
    delete<T extends DashboardAnalysisDeleteArgs>(args: SelectSubset<T, DashboardAnalysisDeleteArgs<ExtArgs>>): Prisma__DashboardAnalysisClient<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DashboardAnalysis.
     * @param {DashboardAnalysisUpdateArgs} args - Arguments to update one DashboardAnalysis.
     * @example
     * // Update one DashboardAnalysis
     * const dashboardAnalysis = await prisma.dashboardAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DashboardAnalysisUpdateArgs>(args: SelectSubset<T, DashboardAnalysisUpdateArgs<ExtArgs>>): Prisma__DashboardAnalysisClient<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DashboardAnalyses.
     * @param {DashboardAnalysisDeleteManyArgs} args - Arguments to filter DashboardAnalyses to delete.
     * @example
     * // Delete a few DashboardAnalyses
     * const { count } = await prisma.dashboardAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DashboardAnalysisDeleteManyArgs>(args?: SelectSubset<T, DashboardAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DashboardAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DashboardAnalyses
     * const dashboardAnalysis = await prisma.dashboardAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DashboardAnalysisUpdateManyArgs>(args: SelectSubset<T, DashboardAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DashboardAnalysis.
     * @param {DashboardAnalysisUpsertArgs} args - Arguments to update or create a DashboardAnalysis.
     * @example
     * // Update or create a DashboardAnalysis
     * const dashboardAnalysis = await prisma.dashboardAnalysis.upsert({
     *   create: {
     *     // ... data to create a DashboardAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DashboardAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends DashboardAnalysisUpsertArgs>(args: SelectSubset<T, DashboardAnalysisUpsertArgs<ExtArgs>>): Prisma__DashboardAnalysisClient<$Result.GetResult<Prisma.$DashboardAnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DashboardAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardAnalysisCountArgs} args - Arguments to filter DashboardAnalyses to count.
     * @example
     * // Count the number of DashboardAnalyses
     * const count = await prisma.dashboardAnalysis.count({
     *   where: {
     *     // ... the filter for the DashboardAnalyses we want to count
     *   }
     * })
    **/
    count<T extends DashboardAnalysisCountArgs>(
      args?: Subset<T, DashboardAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DashboardAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DashboardAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DashboardAnalysisAggregateArgs>(args: Subset<T, DashboardAnalysisAggregateArgs>): Prisma.PrismaPromise<GetDashboardAnalysisAggregateType<T>>

    /**
     * Group by DashboardAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DashboardAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DashboardAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: DashboardAnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DashboardAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDashboardAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DashboardAnalysis model
   */
  readonly fields: DashboardAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DashboardAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DashboardAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends DashboardAnalysis$domainArgs<ExtArgs> = {}>(args?: Subset<T, DashboardAnalysis$domainArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    domainVersion<T extends DashboardAnalysis$domainVersionArgs<ExtArgs> = {}>(args?: Subset<T, DashboardAnalysis$domainVersionArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DashboardAnalysis model
   */
  interface DashboardAnalysisFieldRefs {
    readonly id: FieldRef<"DashboardAnalysis", 'Int'>
    readonly domainId: FieldRef<"DashboardAnalysis", 'Int'>
    readonly domainVersionId: FieldRef<"DashboardAnalysis", 'Int'>
    readonly metrics: FieldRef<"DashboardAnalysis", 'Json'>
    readonly insights: FieldRef<"DashboardAnalysis", 'Json'>
    readonly industryAnalysis: FieldRef<"DashboardAnalysis", 'Json'>
    readonly createdAt: FieldRef<"DashboardAnalysis", 'DateTime'>
    readonly updatedAt: FieldRef<"DashboardAnalysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DashboardAnalysis findUnique
   */
  export type DashboardAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which DashboardAnalysis to fetch.
     */
    where: DashboardAnalysisWhereUniqueInput
  }

  /**
   * DashboardAnalysis findUniqueOrThrow
   */
  export type DashboardAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which DashboardAnalysis to fetch.
     */
    where: DashboardAnalysisWhereUniqueInput
  }

  /**
   * DashboardAnalysis findFirst
   */
  export type DashboardAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which DashboardAnalysis to fetch.
     */
    where?: DashboardAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardAnalyses to fetch.
     */
    orderBy?: DashboardAnalysisOrderByWithRelationInput | DashboardAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DashboardAnalyses.
     */
    cursor?: DashboardAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DashboardAnalyses.
     */
    distinct?: DashboardAnalysisScalarFieldEnum | DashboardAnalysisScalarFieldEnum[]
  }

  /**
   * DashboardAnalysis findFirstOrThrow
   */
  export type DashboardAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which DashboardAnalysis to fetch.
     */
    where?: DashboardAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardAnalyses to fetch.
     */
    orderBy?: DashboardAnalysisOrderByWithRelationInput | DashboardAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DashboardAnalyses.
     */
    cursor?: DashboardAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DashboardAnalyses.
     */
    distinct?: DashboardAnalysisScalarFieldEnum | DashboardAnalysisScalarFieldEnum[]
  }

  /**
   * DashboardAnalysis findMany
   */
  export type DashboardAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which DashboardAnalyses to fetch.
     */
    where?: DashboardAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardAnalyses to fetch.
     */
    orderBy?: DashboardAnalysisOrderByWithRelationInput | DashboardAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DashboardAnalyses.
     */
    cursor?: DashboardAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardAnalyses.
     */
    skip?: number
    distinct?: DashboardAnalysisScalarFieldEnum | DashboardAnalysisScalarFieldEnum[]
  }

  /**
   * DashboardAnalysis create
   */
  export type DashboardAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a DashboardAnalysis.
     */
    data: XOR<DashboardAnalysisCreateInput, DashboardAnalysisUncheckedCreateInput>
  }

  /**
   * DashboardAnalysis createMany
   */
  export type DashboardAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DashboardAnalyses.
     */
    data: DashboardAnalysisCreateManyInput | DashboardAnalysisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DashboardAnalysis createManyAndReturn
   */
  export type DashboardAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many DashboardAnalyses.
     */
    data: DashboardAnalysisCreateManyInput | DashboardAnalysisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DashboardAnalysis update
   */
  export type DashboardAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a DashboardAnalysis.
     */
    data: XOR<DashboardAnalysisUpdateInput, DashboardAnalysisUncheckedUpdateInput>
    /**
     * Choose, which DashboardAnalysis to update.
     */
    where: DashboardAnalysisWhereUniqueInput
  }

  /**
   * DashboardAnalysis updateMany
   */
  export type DashboardAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DashboardAnalyses.
     */
    data: XOR<DashboardAnalysisUpdateManyMutationInput, DashboardAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which DashboardAnalyses to update
     */
    where?: DashboardAnalysisWhereInput
  }

  /**
   * DashboardAnalysis upsert
   */
  export type DashboardAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the DashboardAnalysis to update in case it exists.
     */
    where: DashboardAnalysisWhereUniqueInput
    /**
     * In case the DashboardAnalysis found by the `where` argument doesn't exist, create a new DashboardAnalysis with this data.
     */
    create: XOR<DashboardAnalysisCreateInput, DashboardAnalysisUncheckedCreateInput>
    /**
     * In case the DashboardAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DashboardAnalysisUpdateInput, DashboardAnalysisUncheckedUpdateInput>
  }

  /**
   * DashboardAnalysis delete
   */
  export type DashboardAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
    /**
     * Filter which DashboardAnalysis to delete.
     */
    where: DashboardAnalysisWhereUniqueInput
  }

  /**
   * DashboardAnalysis deleteMany
   */
  export type DashboardAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DashboardAnalyses to delete
     */
    where?: DashboardAnalysisWhereInput
  }

  /**
   * DashboardAnalysis.domain
   */
  export type DashboardAnalysis$domainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    where?: DomainWhereInput
  }

  /**
   * DashboardAnalysis.domainVersion
   */
  export type DashboardAnalysis$domainVersionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    where?: DomainVersionWhereInput
  }

  /**
   * DashboardAnalysis without action
   */
  export type DashboardAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardAnalysis
     */
    select?: DashboardAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardAnalysis
     */
    omit?: DashboardAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardAnalysisInclude<ExtArgs> | null
  }


  /**
   * Model CompetitorAnalysis
   */

  export type AggregateCompetitorAnalysis = {
    _count: CompetitorAnalysisCountAggregateOutputType | null
    _avg: CompetitorAnalysisAvgAggregateOutputType | null
    _sum: CompetitorAnalysisSumAggregateOutputType | null
    _min: CompetitorAnalysisMinAggregateOutputType | null
    _max: CompetitorAnalysisMaxAggregateOutputType | null
  }

  export type CompetitorAnalysisAvgAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
  }

  export type CompetitorAnalysisSumAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
  }

  export type CompetitorAnalysisMinAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    competitorList: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompetitorAnalysisMaxAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    competitorList: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompetitorAnalysisCountAggregateOutputType = {
    id: number
    domainId: number
    domainVersionId: number
    competitors: number
    marketInsights: number
    strategicRecommendations: number
    competitiveAnalysis: number
    competitorList: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompetitorAnalysisAvgAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
  }

  export type CompetitorAnalysisSumAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
  }

  export type CompetitorAnalysisMinAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    competitorList?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompetitorAnalysisMaxAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    competitorList?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompetitorAnalysisCountAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    competitors?: true
    marketInsights?: true
    strategicRecommendations?: true
    competitiveAnalysis?: true
    competitorList?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompetitorAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompetitorAnalysis to aggregate.
     */
    where?: CompetitorAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompetitorAnalyses to fetch.
     */
    orderBy?: CompetitorAnalysisOrderByWithRelationInput | CompetitorAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompetitorAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompetitorAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompetitorAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompetitorAnalyses
    **/
    _count?: true | CompetitorAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompetitorAnalysisAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompetitorAnalysisSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompetitorAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompetitorAnalysisMaxAggregateInputType
  }

  export type GetCompetitorAnalysisAggregateType<T extends CompetitorAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateCompetitorAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompetitorAnalysis[P]>
      : GetScalarType<T[P], AggregateCompetitorAnalysis[P]>
  }




  export type CompetitorAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompetitorAnalysisWhereInput
    orderBy?: CompetitorAnalysisOrderByWithAggregationInput | CompetitorAnalysisOrderByWithAggregationInput[]
    by: CompetitorAnalysisScalarFieldEnum[] | CompetitorAnalysisScalarFieldEnum
    having?: CompetitorAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompetitorAnalysisCountAggregateInputType | true
    _avg?: CompetitorAnalysisAvgAggregateInputType
    _sum?: CompetitorAnalysisSumAggregateInputType
    _min?: CompetitorAnalysisMinAggregateInputType
    _max?: CompetitorAnalysisMaxAggregateInputType
  }

  export type CompetitorAnalysisGroupByOutputType = {
    id: number
    domainId: number | null
    domainVersionId: number | null
    competitors: JsonValue
    marketInsights: JsonValue
    strategicRecommendations: JsonValue
    competitiveAnalysis: JsonValue
    competitorList: string
    createdAt: Date
    updatedAt: Date
    _count: CompetitorAnalysisCountAggregateOutputType | null
    _avg: CompetitorAnalysisAvgAggregateOutputType | null
    _sum: CompetitorAnalysisSumAggregateOutputType | null
    _min: CompetitorAnalysisMinAggregateOutputType | null
    _max: CompetitorAnalysisMaxAggregateOutputType | null
  }

  type GetCompetitorAnalysisGroupByPayload<T extends CompetitorAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompetitorAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompetitorAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompetitorAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], CompetitorAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type CompetitorAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    competitors?: boolean
    marketInsights?: boolean
    strategicRecommendations?: boolean
    competitiveAnalysis?: boolean
    competitorList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | CompetitorAnalysis$domainArgs<ExtArgs>
    domainVersion?: boolean | CompetitorAnalysis$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["competitorAnalysis"]>

  export type CompetitorAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    competitors?: boolean
    marketInsights?: boolean
    strategicRecommendations?: boolean
    competitiveAnalysis?: boolean
    competitorList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | CompetitorAnalysis$domainArgs<ExtArgs>
    domainVersion?: boolean | CompetitorAnalysis$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["competitorAnalysis"]>


  export type CompetitorAnalysisSelectScalar = {
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    competitors?: boolean
    marketInsights?: boolean
    strategicRecommendations?: boolean
    competitiveAnalysis?: boolean
    competitorList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompetitorAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "domainId" | "domainVersionId" | "competitors" | "marketInsights" | "strategicRecommendations" | "competitiveAnalysis" | "competitorList" | "createdAt" | "updatedAt", ExtArgs["result"]["competitorAnalysis"]>
  export type CompetitorAnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | CompetitorAnalysis$domainArgs<ExtArgs>
    domainVersion?: boolean | CompetitorAnalysis$domainVersionArgs<ExtArgs>
  }
  export type CompetitorAnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | CompetitorAnalysis$domainArgs<ExtArgs>
    domainVersion?: boolean | CompetitorAnalysis$domainVersionArgs<ExtArgs>
  }

  export type $CompetitorAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompetitorAnalysis"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs> | null
      domainVersion: Prisma.$DomainVersionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      domainId: number | null
      domainVersionId: number | null
      competitors: Prisma.JsonValue
      marketInsights: Prisma.JsonValue
      strategicRecommendations: Prisma.JsonValue
      competitiveAnalysis: Prisma.JsonValue
      competitorList: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["competitorAnalysis"]>
    composites: {}
  }

  type CompetitorAnalysisGetPayload<S extends boolean | null | undefined | CompetitorAnalysisDefaultArgs> = $Result.GetResult<Prisma.$CompetitorAnalysisPayload, S>

  type CompetitorAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompetitorAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompetitorAnalysisCountAggregateInputType | true
    }

  export interface CompetitorAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompetitorAnalysis'], meta: { name: 'CompetitorAnalysis' } }
    /**
     * Find zero or one CompetitorAnalysis that matches the filter.
     * @param {CompetitorAnalysisFindUniqueArgs} args - Arguments to find a CompetitorAnalysis
     * @example
     * // Get one CompetitorAnalysis
     * const competitorAnalysis = await prisma.competitorAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompetitorAnalysisFindUniqueArgs>(args: SelectSubset<T, CompetitorAnalysisFindUniqueArgs<ExtArgs>>): Prisma__CompetitorAnalysisClient<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompetitorAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompetitorAnalysisFindUniqueOrThrowArgs} args - Arguments to find a CompetitorAnalysis
     * @example
     * // Get one CompetitorAnalysis
     * const competitorAnalysis = await prisma.competitorAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompetitorAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, CompetitorAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompetitorAnalysisClient<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompetitorAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitorAnalysisFindFirstArgs} args - Arguments to find a CompetitorAnalysis
     * @example
     * // Get one CompetitorAnalysis
     * const competitorAnalysis = await prisma.competitorAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompetitorAnalysisFindFirstArgs>(args?: SelectSubset<T, CompetitorAnalysisFindFirstArgs<ExtArgs>>): Prisma__CompetitorAnalysisClient<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompetitorAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitorAnalysisFindFirstOrThrowArgs} args - Arguments to find a CompetitorAnalysis
     * @example
     * // Get one CompetitorAnalysis
     * const competitorAnalysis = await prisma.competitorAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompetitorAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, CompetitorAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompetitorAnalysisClient<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompetitorAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitorAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompetitorAnalyses
     * const competitorAnalyses = await prisma.competitorAnalysis.findMany()
     * 
     * // Get first 10 CompetitorAnalyses
     * const competitorAnalyses = await prisma.competitorAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const competitorAnalysisWithIdOnly = await prisma.competitorAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompetitorAnalysisFindManyArgs>(args?: SelectSubset<T, CompetitorAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompetitorAnalysis.
     * @param {CompetitorAnalysisCreateArgs} args - Arguments to create a CompetitorAnalysis.
     * @example
     * // Create one CompetitorAnalysis
     * const CompetitorAnalysis = await prisma.competitorAnalysis.create({
     *   data: {
     *     // ... data to create a CompetitorAnalysis
     *   }
     * })
     * 
     */
    create<T extends CompetitorAnalysisCreateArgs>(args: SelectSubset<T, CompetitorAnalysisCreateArgs<ExtArgs>>): Prisma__CompetitorAnalysisClient<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompetitorAnalyses.
     * @param {CompetitorAnalysisCreateManyArgs} args - Arguments to create many CompetitorAnalyses.
     * @example
     * // Create many CompetitorAnalyses
     * const competitorAnalysis = await prisma.competitorAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompetitorAnalysisCreateManyArgs>(args?: SelectSubset<T, CompetitorAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CompetitorAnalyses and returns the data saved in the database.
     * @param {CompetitorAnalysisCreateManyAndReturnArgs} args - Arguments to create many CompetitorAnalyses.
     * @example
     * // Create many CompetitorAnalyses
     * const competitorAnalysis = await prisma.competitorAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CompetitorAnalyses and only return the `id`
     * const competitorAnalysisWithIdOnly = await prisma.competitorAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompetitorAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, CompetitorAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CompetitorAnalysis.
     * @param {CompetitorAnalysisDeleteArgs} args - Arguments to delete one CompetitorAnalysis.
     * @example
     * // Delete one CompetitorAnalysis
     * const CompetitorAnalysis = await prisma.competitorAnalysis.delete({
     *   where: {
     *     // ... filter to delete one CompetitorAnalysis
     *   }
     * })
     * 
     */
    delete<T extends CompetitorAnalysisDeleteArgs>(args: SelectSubset<T, CompetitorAnalysisDeleteArgs<ExtArgs>>): Prisma__CompetitorAnalysisClient<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompetitorAnalysis.
     * @param {CompetitorAnalysisUpdateArgs} args - Arguments to update one CompetitorAnalysis.
     * @example
     * // Update one CompetitorAnalysis
     * const competitorAnalysis = await prisma.competitorAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompetitorAnalysisUpdateArgs>(args: SelectSubset<T, CompetitorAnalysisUpdateArgs<ExtArgs>>): Prisma__CompetitorAnalysisClient<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompetitorAnalyses.
     * @param {CompetitorAnalysisDeleteManyArgs} args - Arguments to filter CompetitorAnalyses to delete.
     * @example
     * // Delete a few CompetitorAnalyses
     * const { count } = await prisma.competitorAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompetitorAnalysisDeleteManyArgs>(args?: SelectSubset<T, CompetitorAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompetitorAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitorAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompetitorAnalyses
     * const competitorAnalysis = await prisma.competitorAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompetitorAnalysisUpdateManyArgs>(args: SelectSubset<T, CompetitorAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompetitorAnalysis.
     * @param {CompetitorAnalysisUpsertArgs} args - Arguments to update or create a CompetitorAnalysis.
     * @example
     * // Update or create a CompetitorAnalysis
     * const competitorAnalysis = await prisma.competitorAnalysis.upsert({
     *   create: {
     *     // ... data to create a CompetitorAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompetitorAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends CompetitorAnalysisUpsertArgs>(args: SelectSubset<T, CompetitorAnalysisUpsertArgs<ExtArgs>>): Prisma__CompetitorAnalysisClient<$Result.GetResult<Prisma.$CompetitorAnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompetitorAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitorAnalysisCountArgs} args - Arguments to filter CompetitorAnalyses to count.
     * @example
     * // Count the number of CompetitorAnalyses
     * const count = await prisma.competitorAnalysis.count({
     *   where: {
     *     // ... the filter for the CompetitorAnalyses we want to count
     *   }
     * })
    **/
    count<T extends CompetitorAnalysisCountArgs>(
      args?: Subset<T, CompetitorAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompetitorAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompetitorAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitorAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompetitorAnalysisAggregateArgs>(args: Subset<T, CompetitorAnalysisAggregateArgs>): Prisma.PrismaPromise<GetCompetitorAnalysisAggregateType<T>>

    /**
     * Group by CompetitorAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompetitorAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompetitorAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompetitorAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: CompetitorAnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompetitorAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompetitorAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompetitorAnalysis model
   */
  readonly fields: CompetitorAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompetitorAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompetitorAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends CompetitorAnalysis$domainArgs<ExtArgs> = {}>(args?: Subset<T, CompetitorAnalysis$domainArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    domainVersion<T extends CompetitorAnalysis$domainVersionArgs<ExtArgs> = {}>(args?: Subset<T, CompetitorAnalysis$domainVersionArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompetitorAnalysis model
   */
  interface CompetitorAnalysisFieldRefs {
    readonly id: FieldRef<"CompetitorAnalysis", 'Int'>
    readonly domainId: FieldRef<"CompetitorAnalysis", 'Int'>
    readonly domainVersionId: FieldRef<"CompetitorAnalysis", 'Int'>
    readonly competitors: FieldRef<"CompetitorAnalysis", 'Json'>
    readonly marketInsights: FieldRef<"CompetitorAnalysis", 'Json'>
    readonly strategicRecommendations: FieldRef<"CompetitorAnalysis", 'Json'>
    readonly competitiveAnalysis: FieldRef<"CompetitorAnalysis", 'Json'>
    readonly competitorList: FieldRef<"CompetitorAnalysis", 'String'>
    readonly createdAt: FieldRef<"CompetitorAnalysis", 'DateTime'>
    readonly updatedAt: FieldRef<"CompetitorAnalysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompetitorAnalysis findUnique
   */
  export type CompetitorAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which CompetitorAnalysis to fetch.
     */
    where: CompetitorAnalysisWhereUniqueInput
  }

  /**
   * CompetitorAnalysis findUniqueOrThrow
   */
  export type CompetitorAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which CompetitorAnalysis to fetch.
     */
    where: CompetitorAnalysisWhereUniqueInput
  }

  /**
   * CompetitorAnalysis findFirst
   */
  export type CompetitorAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which CompetitorAnalysis to fetch.
     */
    where?: CompetitorAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompetitorAnalyses to fetch.
     */
    orderBy?: CompetitorAnalysisOrderByWithRelationInput | CompetitorAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompetitorAnalyses.
     */
    cursor?: CompetitorAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompetitorAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompetitorAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompetitorAnalyses.
     */
    distinct?: CompetitorAnalysisScalarFieldEnum | CompetitorAnalysisScalarFieldEnum[]
  }

  /**
   * CompetitorAnalysis findFirstOrThrow
   */
  export type CompetitorAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which CompetitorAnalysis to fetch.
     */
    where?: CompetitorAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompetitorAnalyses to fetch.
     */
    orderBy?: CompetitorAnalysisOrderByWithRelationInput | CompetitorAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompetitorAnalyses.
     */
    cursor?: CompetitorAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompetitorAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompetitorAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompetitorAnalyses.
     */
    distinct?: CompetitorAnalysisScalarFieldEnum | CompetitorAnalysisScalarFieldEnum[]
  }

  /**
   * CompetitorAnalysis findMany
   */
  export type CompetitorAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    /**
     * Filter, which CompetitorAnalyses to fetch.
     */
    where?: CompetitorAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompetitorAnalyses to fetch.
     */
    orderBy?: CompetitorAnalysisOrderByWithRelationInput | CompetitorAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompetitorAnalyses.
     */
    cursor?: CompetitorAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompetitorAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompetitorAnalyses.
     */
    skip?: number
    distinct?: CompetitorAnalysisScalarFieldEnum | CompetitorAnalysisScalarFieldEnum[]
  }

  /**
   * CompetitorAnalysis create
   */
  export type CompetitorAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a CompetitorAnalysis.
     */
    data: XOR<CompetitorAnalysisCreateInput, CompetitorAnalysisUncheckedCreateInput>
  }

  /**
   * CompetitorAnalysis createMany
   */
  export type CompetitorAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompetitorAnalyses.
     */
    data: CompetitorAnalysisCreateManyInput | CompetitorAnalysisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompetitorAnalysis createManyAndReturn
   */
  export type CompetitorAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many CompetitorAnalyses.
     */
    data: CompetitorAnalysisCreateManyInput | CompetitorAnalysisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CompetitorAnalysis update
   */
  export type CompetitorAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a CompetitorAnalysis.
     */
    data: XOR<CompetitorAnalysisUpdateInput, CompetitorAnalysisUncheckedUpdateInput>
    /**
     * Choose, which CompetitorAnalysis to update.
     */
    where: CompetitorAnalysisWhereUniqueInput
  }

  /**
   * CompetitorAnalysis updateMany
   */
  export type CompetitorAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompetitorAnalyses.
     */
    data: XOR<CompetitorAnalysisUpdateManyMutationInput, CompetitorAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which CompetitorAnalyses to update
     */
    where?: CompetitorAnalysisWhereInput
  }

  /**
   * CompetitorAnalysis upsert
   */
  export type CompetitorAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the CompetitorAnalysis to update in case it exists.
     */
    where: CompetitorAnalysisWhereUniqueInput
    /**
     * In case the CompetitorAnalysis found by the `where` argument doesn't exist, create a new CompetitorAnalysis with this data.
     */
    create: XOR<CompetitorAnalysisCreateInput, CompetitorAnalysisUncheckedCreateInput>
    /**
     * In case the CompetitorAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompetitorAnalysisUpdateInput, CompetitorAnalysisUncheckedUpdateInput>
  }

  /**
   * CompetitorAnalysis delete
   */
  export type CompetitorAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
    /**
     * Filter which CompetitorAnalysis to delete.
     */
    where: CompetitorAnalysisWhereUniqueInput
  }

  /**
   * CompetitorAnalysis deleteMany
   */
  export type CompetitorAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompetitorAnalyses to delete
     */
    where?: CompetitorAnalysisWhereInput
  }

  /**
   * CompetitorAnalysis.domain
   */
  export type CompetitorAnalysis$domainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    where?: DomainWhereInput
  }

  /**
   * CompetitorAnalysis.domainVersion
   */
  export type CompetitorAnalysis$domainVersionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    where?: DomainVersionWhereInput
  }

  /**
   * CompetitorAnalysis without action
   */
  export type CompetitorAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompetitorAnalysis
     */
    select?: CompetitorAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompetitorAnalysis
     */
    omit?: CompetitorAnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompetitorAnalysisInclude<ExtArgs> | null
  }


  /**
   * Model SuggestedCompetitor
   */

  export type AggregateSuggestedCompetitor = {
    _count: SuggestedCompetitorCountAggregateOutputType | null
    _avg: SuggestedCompetitorAvgAggregateOutputType | null
    _sum: SuggestedCompetitorSumAggregateOutputType | null
    _min: SuggestedCompetitorMinAggregateOutputType | null
    _max: SuggestedCompetitorMaxAggregateOutputType | null
  }

  export type SuggestedCompetitorAvgAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
  }

  export type SuggestedCompetitorSumAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
  }

  export type SuggestedCompetitorMinAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    name: string | null
    competitorDomain: string | null
    reason: string | null
    type: string | null
    createdAt: Date | null
  }

  export type SuggestedCompetitorMaxAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    name: string | null
    competitorDomain: string | null
    reason: string | null
    type: string | null
    createdAt: Date | null
  }

  export type SuggestedCompetitorCountAggregateOutputType = {
    id: number
    domainId: number
    domainVersionId: number
    name: number
    competitorDomain: number
    reason: number
    type: number
    createdAt: number
    _all: number
  }


  export type SuggestedCompetitorAvgAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
  }

  export type SuggestedCompetitorSumAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
  }

  export type SuggestedCompetitorMinAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    name?: true
    competitorDomain?: true
    reason?: true
    type?: true
    createdAt?: true
  }

  export type SuggestedCompetitorMaxAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    name?: true
    competitorDomain?: true
    reason?: true
    type?: true
    createdAt?: true
  }

  export type SuggestedCompetitorCountAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    name?: true
    competitorDomain?: true
    reason?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type SuggestedCompetitorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SuggestedCompetitor to aggregate.
     */
    where?: SuggestedCompetitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuggestedCompetitors to fetch.
     */
    orderBy?: SuggestedCompetitorOrderByWithRelationInput | SuggestedCompetitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SuggestedCompetitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuggestedCompetitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuggestedCompetitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SuggestedCompetitors
    **/
    _count?: true | SuggestedCompetitorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SuggestedCompetitorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SuggestedCompetitorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuggestedCompetitorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuggestedCompetitorMaxAggregateInputType
  }

  export type GetSuggestedCompetitorAggregateType<T extends SuggestedCompetitorAggregateArgs> = {
        [P in keyof T & keyof AggregateSuggestedCompetitor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuggestedCompetitor[P]>
      : GetScalarType<T[P], AggregateSuggestedCompetitor[P]>
  }




  export type SuggestedCompetitorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuggestedCompetitorWhereInput
    orderBy?: SuggestedCompetitorOrderByWithAggregationInput | SuggestedCompetitorOrderByWithAggregationInput[]
    by: SuggestedCompetitorScalarFieldEnum[] | SuggestedCompetitorScalarFieldEnum
    having?: SuggestedCompetitorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuggestedCompetitorCountAggregateInputType | true
    _avg?: SuggestedCompetitorAvgAggregateInputType
    _sum?: SuggestedCompetitorSumAggregateInputType
    _min?: SuggestedCompetitorMinAggregateInputType
    _max?: SuggestedCompetitorMaxAggregateInputType
  }

  export type SuggestedCompetitorGroupByOutputType = {
    id: number
    domainId: number | null
    domainVersionId: number | null
    name: string
    competitorDomain: string
    reason: string
    type: string
    createdAt: Date
    _count: SuggestedCompetitorCountAggregateOutputType | null
    _avg: SuggestedCompetitorAvgAggregateOutputType | null
    _sum: SuggestedCompetitorSumAggregateOutputType | null
    _min: SuggestedCompetitorMinAggregateOutputType | null
    _max: SuggestedCompetitorMaxAggregateOutputType | null
  }

  type GetSuggestedCompetitorGroupByPayload<T extends SuggestedCompetitorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuggestedCompetitorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuggestedCompetitorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuggestedCompetitorGroupByOutputType[P]>
            : GetScalarType<T[P], SuggestedCompetitorGroupByOutputType[P]>
        }
      >
    >


  export type SuggestedCompetitorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    name?: boolean
    competitorDomain?: boolean
    reason?: boolean
    type?: boolean
    createdAt?: boolean
    domain?: boolean | SuggestedCompetitor$domainArgs<ExtArgs>
    domainVersion?: boolean | SuggestedCompetitor$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["suggestedCompetitor"]>

  export type SuggestedCompetitorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    name?: boolean
    competitorDomain?: boolean
    reason?: boolean
    type?: boolean
    createdAt?: boolean
    domain?: boolean | SuggestedCompetitor$domainArgs<ExtArgs>
    domainVersion?: boolean | SuggestedCompetitor$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["suggestedCompetitor"]>


  export type SuggestedCompetitorSelectScalar = {
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    name?: boolean
    competitorDomain?: boolean
    reason?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type SuggestedCompetitorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "domainId" | "domainVersionId" | "name" | "competitorDomain" | "reason" | "type" | "createdAt", ExtArgs["result"]["suggestedCompetitor"]>
  export type SuggestedCompetitorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | SuggestedCompetitor$domainArgs<ExtArgs>
    domainVersion?: boolean | SuggestedCompetitor$domainVersionArgs<ExtArgs>
  }
  export type SuggestedCompetitorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | SuggestedCompetitor$domainArgs<ExtArgs>
    domainVersion?: boolean | SuggestedCompetitor$domainVersionArgs<ExtArgs>
  }

  export type $SuggestedCompetitorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SuggestedCompetitor"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs> | null
      domainVersion: Prisma.$DomainVersionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      domainId: number | null
      domainVersionId: number | null
      name: string
      competitorDomain: string
      reason: string
      type: string
      createdAt: Date
    }, ExtArgs["result"]["suggestedCompetitor"]>
    composites: {}
  }

  type SuggestedCompetitorGetPayload<S extends boolean | null | undefined | SuggestedCompetitorDefaultArgs> = $Result.GetResult<Prisma.$SuggestedCompetitorPayload, S>

  type SuggestedCompetitorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SuggestedCompetitorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SuggestedCompetitorCountAggregateInputType | true
    }

  export interface SuggestedCompetitorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SuggestedCompetitor'], meta: { name: 'SuggestedCompetitor' } }
    /**
     * Find zero or one SuggestedCompetitor that matches the filter.
     * @param {SuggestedCompetitorFindUniqueArgs} args - Arguments to find a SuggestedCompetitor
     * @example
     * // Get one SuggestedCompetitor
     * const suggestedCompetitor = await prisma.suggestedCompetitor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuggestedCompetitorFindUniqueArgs>(args: SelectSubset<T, SuggestedCompetitorFindUniqueArgs<ExtArgs>>): Prisma__SuggestedCompetitorClient<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SuggestedCompetitor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SuggestedCompetitorFindUniqueOrThrowArgs} args - Arguments to find a SuggestedCompetitor
     * @example
     * // Get one SuggestedCompetitor
     * const suggestedCompetitor = await prisma.suggestedCompetitor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuggestedCompetitorFindUniqueOrThrowArgs>(args: SelectSubset<T, SuggestedCompetitorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SuggestedCompetitorClient<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SuggestedCompetitor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestedCompetitorFindFirstArgs} args - Arguments to find a SuggestedCompetitor
     * @example
     * // Get one SuggestedCompetitor
     * const suggestedCompetitor = await prisma.suggestedCompetitor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuggestedCompetitorFindFirstArgs>(args?: SelectSubset<T, SuggestedCompetitorFindFirstArgs<ExtArgs>>): Prisma__SuggestedCompetitorClient<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SuggestedCompetitor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestedCompetitorFindFirstOrThrowArgs} args - Arguments to find a SuggestedCompetitor
     * @example
     * // Get one SuggestedCompetitor
     * const suggestedCompetitor = await prisma.suggestedCompetitor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuggestedCompetitorFindFirstOrThrowArgs>(args?: SelectSubset<T, SuggestedCompetitorFindFirstOrThrowArgs<ExtArgs>>): Prisma__SuggestedCompetitorClient<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SuggestedCompetitors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestedCompetitorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SuggestedCompetitors
     * const suggestedCompetitors = await prisma.suggestedCompetitor.findMany()
     * 
     * // Get first 10 SuggestedCompetitors
     * const suggestedCompetitors = await prisma.suggestedCompetitor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const suggestedCompetitorWithIdOnly = await prisma.suggestedCompetitor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SuggestedCompetitorFindManyArgs>(args?: SelectSubset<T, SuggestedCompetitorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SuggestedCompetitor.
     * @param {SuggestedCompetitorCreateArgs} args - Arguments to create a SuggestedCompetitor.
     * @example
     * // Create one SuggestedCompetitor
     * const SuggestedCompetitor = await prisma.suggestedCompetitor.create({
     *   data: {
     *     // ... data to create a SuggestedCompetitor
     *   }
     * })
     * 
     */
    create<T extends SuggestedCompetitorCreateArgs>(args: SelectSubset<T, SuggestedCompetitorCreateArgs<ExtArgs>>): Prisma__SuggestedCompetitorClient<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SuggestedCompetitors.
     * @param {SuggestedCompetitorCreateManyArgs} args - Arguments to create many SuggestedCompetitors.
     * @example
     * // Create many SuggestedCompetitors
     * const suggestedCompetitor = await prisma.suggestedCompetitor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SuggestedCompetitorCreateManyArgs>(args?: SelectSubset<T, SuggestedCompetitorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SuggestedCompetitors and returns the data saved in the database.
     * @param {SuggestedCompetitorCreateManyAndReturnArgs} args - Arguments to create many SuggestedCompetitors.
     * @example
     * // Create many SuggestedCompetitors
     * const suggestedCompetitor = await prisma.suggestedCompetitor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SuggestedCompetitors and only return the `id`
     * const suggestedCompetitorWithIdOnly = await prisma.suggestedCompetitor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SuggestedCompetitorCreateManyAndReturnArgs>(args?: SelectSubset<T, SuggestedCompetitorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SuggestedCompetitor.
     * @param {SuggestedCompetitorDeleteArgs} args - Arguments to delete one SuggestedCompetitor.
     * @example
     * // Delete one SuggestedCompetitor
     * const SuggestedCompetitor = await prisma.suggestedCompetitor.delete({
     *   where: {
     *     // ... filter to delete one SuggestedCompetitor
     *   }
     * })
     * 
     */
    delete<T extends SuggestedCompetitorDeleteArgs>(args: SelectSubset<T, SuggestedCompetitorDeleteArgs<ExtArgs>>): Prisma__SuggestedCompetitorClient<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SuggestedCompetitor.
     * @param {SuggestedCompetitorUpdateArgs} args - Arguments to update one SuggestedCompetitor.
     * @example
     * // Update one SuggestedCompetitor
     * const suggestedCompetitor = await prisma.suggestedCompetitor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SuggestedCompetitorUpdateArgs>(args: SelectSubset<T, SuggestedCompetitorUpdateArgs<ExtArgs>>): Prisma__SuggestedCompetitorClient<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SuggestedCompetitors.
     * @param {SuggestedCompetitorDeleteManyArgs} args - Arguments to filter SuggestedCompetitors to delete.
     * @example
     * // Delete a few SuggestedCompetitors
     * const { count } = await prisma.suggestedCompetitor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SuggestedCompetitorDeleteManyArgs>(args?: SelectSubset<T, SuggestedCompetitorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SuggestedCompetitors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestedCompetitorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SuggestedCompetitors
     * const suggestedCompetitor = await prisma.suggestedCompetitor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SuggestedCompetitorUpdateManyArgs>(args: SelectSubset<T, SuggestedCompetitorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SuggestedCompetitor.
     * @param {SuggestedCompetitorUpsertArgs} args - Arguments to update or create a SuggestedCompetitor.
     * @example
     * // Update or create a SuggestedCompetitor
     * const suggestedCompetitor = await prisma.suggestedCompetitor.upsert({
     *   create: {
     *     // ... data to create a SuggestedCompetitor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SuggestedCompetitor we want to update
     *   }
     * })
     */
    upsert<T extends SuggestedCompetitorUpsertArgs>(args: SelectSubset<T, SuggestedCompetitorUpsertArgs<ExtArgs>>): Prisma__SuggestedCompetitorClient<$Result.GetResult<Prisma.$SuggestedCompetitorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SuggestedCompetitors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestedCompetitorCountArgs} args - Arguments to filter SuggestedCompetitors to count.
     * @example
     * // Count the number of SuggestedCompetitors
     * const count = await prisma.suggestedCompetitor.count({
     *   where: {
     *     // ... the filter for the SuggestedCompetitors we want to count
     *   }
     * })
    **/
    count<T extends SuggestedCompetitorCountArgs>(
      args?: Subset<T, SuggestedCompetitorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuggestedCompetitorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SuggestedCompetitor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestedCompetitorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SuggestedCompetitorAggregateArgs>(args: Subset<T, SuggestedCompetitorAggregateArgs>): Prisma.PrismaPromise<GetSuggestedCompetitorAggregateType<T>>

    /**
     * Group by SuggestedCompetitor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestedCompetitorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SuggestedCompetitorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuggestedCompetitorGroupByArgs['orderBy'] }
        : { orderBy?: SuggestedCompetitorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SuggestedCompetitorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuggestedCompetitorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SuggestedCompetitor model
   */
  readonly fields: SuggestedCompetitorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SuggestedCompetitor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuggestedCompetitorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends SuggestedCompetitor$domainArgs<ExtArgs> = {}>(args?: Subset<T, SuggestedCompetitor$domainArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    domainVersion<T extends SuggestedCompetitor$domainVersionArgs<ExtArgs> = {}>(args?: Subset<T, SuggestedCompetitor$domainVersionArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SuggestedCompetitor model
   */
  interface SuggestedCompetitorFieldRefs {
    readonly id: FieldRef<"SuggestedCompetitor", 'Int'>
    readonly domainId: FieldRef<"SuggestedCompetitor", 'Int'>
    readonly domainVersionId: FieldRef<"SuggestedCompetitor", 'Int'>
    readonly name: FieldRef<"SuggestedCompetitor", 'String'>
    readonly competitorDomain: FieldRef<"SuggestedCompetitor", 'String'>
    readonly reason: FieldRef<"SuggestedCompetitor", 'String'>
    readonly type: FieldRef<"SuggestedCompetitor", 'String'>
    readonly createdAt: FieldRef<"SuggestedCompetitor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SuggestedCompetitor findUnique
   */
  export type SuggestedCompetitorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    /**
     * Filter, which SuggestedCompetitor to fetch.
     */
    where: SuggestedCompetitorWhereUniqueInput
  }

  /**
   * SuggestedCompetitor findUniqueOrThrow
   */
  export type SuggestedCompetitorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    /**
     * Filter, which SuggestedCompetitor to fetch.
     */
    where: SuggestedCompetitorWhereUniqueInput
  }

  /**
   * SuggestedCompetitor findFirst
   */
  export type SuggestedCompetitorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    /**
     * Filter, which SuggestedCompetitor to fetch.
     */
    where?: SuggestedCompetitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuggestedCompetitors to fetch.
     */
    orderBy?: SuggestedCompetitorOrderByWithRelationInput | SuggestedCompetitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SuggestedCompetitors.
     */
    cursor?: SuggestedCompetitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuggestedCompetitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuggestedCompetitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuggestedCompetitors.
     */
    distinct?: SuggestedCompetitorScalarFieldEnum | SuggestedCompetitorScalarFieldEnum[]
  }

  /**
   * SuggestedCompetitor findFirstOrThrow
   */
  export type SuggestedCompetitorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    /**
     * Filter, which SuggestedCompetitor to fetch.
     */
    where?: SuggestedCompetitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuggestedCompetitors to fetch.
     */
    orderBy?: SuggestedCompetitorOrderByWithRelationInput | SuggestedCompetitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SuggestedCompetitors.
     */
    cursor?: SuggestedCompetitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuggestedCompetitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuggestedCompetitors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuggestedCompetitors.
     */
    distinct?: SuggestedCompetitorScalarFieldEnum | SuggestedCompetitorScalarFieldEnum[]
  }

  /**
   * SuggestedCompetitor findMany
   */
  export type SuggestedCompetitorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    /**
     * Filter, which SuggestedCompetitors to fetch.
     */
    where?: SuggestedCompetitorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuggestedCompetitors to fetch.
     */
    orderBy?: SuggestedCompetitorOrderByWithRelationInput | SuggestedCompetitorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SuggestedCompetitors.
     */
    cursor?: SuggestedCompetitorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuggestedCompetitors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuggestedCompetitors.
     */
    skip?: number
    distinct?: SuggestedCompetitorScalarFieldEnum | SuggestedCompetitorScalarFieldEnum[]
  }

  /**
   * SuggestedCompetitor create
   */
  export type SuggestedCompetitorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    /**
     * The data needed to create a SuggestedCompetitor.
     */
    data: XOR<SuggestedCompetitorCreateInput, SuggestedCompetitorUncheckedCreateInput>
  }

  /**
   * SuggestedCompetitor createMany
   */
  export type SuggestedCompetitorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SuggestedCompetitors.
     */
    data: SuggestedCompetitorCreateManyInput | SuggestedCompetitorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SuggestedCompetitor createManyAndReturn
   */
  export type SuggestedCompetitorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * The data used to create many SuggestedCompetitors.
     */
    data: SuggestedCompetitorCreateManyInput | SuggestedCompetitorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SuggestedCompetitor update
   */
  export type SuggestedCompetitorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    /**
     * The data needed to update a SuggestedCompetitor.
     */
    data: XOR<SuggestedCompetitorUpdateInput, SuggestedCompetitorUncheckedUpdateInput>
    /**
     * Choose, which SuggestedCompetitor to update.
     */
    where: SuggestedCompetitorWhereUniqueInput
  }

  /**
   * SuggestedCompetitor updateMany
   */
  export type SuggestedCompetitorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SuggestedCompetitors.
     */
    data: XOR<SuggestedCompetitorUpdateManyMutationInput, SuggestedCompetitorUncheckedUpdateManyInput>
    /**
     * Filter which SuggestedCompetitors to update
     */
    where?: SuggestedCompetitorWhereInput
  }

  /**
   * SuggestedCompetitor upsert
   */
  export type SuggestedCompetitorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    /**
     * The filter to search for the SuggestedCompetitor to update in case it exists.
     */
    where: SuggestedCompetitorWhereUniqueInput
    /**
     * In case the SuggestedCompetitor found by the `where` argument doesn't exist, create a new SuggestedCompetitor with this data.
     */
    create: XOR<SuggestedCompetitorCreateInput, SuggestedCompetitorUncheckedCreateInput>
    /**
     * In case the SuggestedCompetitor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuggestedCompetitorUpdateInput, SuggestedCompetitorUncheckedUpdateInput>
  }

  /**
   * SuggestedCompetitor delete
   */
  export type SuggestedCompetitorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
    /**
     * Filter which SuggestedCompetitor to delete.
     */
    where: SuggestedCompetitorWhereUniqueInput
  }

  /**
   * SuggestedCompetitor deleteMany
   */
  export type SuggestedCompetitorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SuggestedCompetitors to delete
     */
    where?: SuggestedCompetitorWhereInput
  }

  /**
   * SuggestedCompetitor.domain
   */
  export type SuggestedCompetitor$domainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    where?: DomainWhereInput
  }

  /**
   * SuggestedCompetitor.domainVersion
   */
  export type SuggestedCompetitor$domainVersionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    where?: DomainVersionWhereInput
  }

  /**
   * SuggestedCompetitor without action
   */
  export type SuggestedCompetitorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuggestedCompetitor
     */
    select?: SuggestedCompetitorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuggestedCompetitor
     */
    omit?: SuggestedCompetitorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestedCompetitorInclude<ExtArgs> | null
  }


  /**
   * Model OnboardingProgress
   */

  export type AggregateOnboardingProgress = {
    _count: OnboardingProgressCountAggregateOutputType | null
    _avg: OnboardingProgressAvgAggregateOutputType | null
    _sum: OnboardingProgressSumAggregateOutputType | null
    _min: OnboardingProgressMinAggregateOutputType | null
    _max: OnboardingProgressMaxAggregateOutputType | null
  }

  export type OnboardingProgressAvgAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    currentStep: number | null
  }

  export type OnboardingProgressSumAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    currentStep: number | null
  }

  export type OnboardingProgressMinAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    currentStep: number | null
    isCompleted: boolean | null
    lastActivity: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OnboardingProgressMaxAggregateOutputType = {
    id: number | null
    domainId: number | null
    domainVersionId: number | null
    currentStep: number | null
    isCompleted: boolean | null
    lastActivity: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OnboardingProgressCountAggregateOutputType = {
    id: number
    domainId: number
    domainVersionId: number
    currentStep: number
    isCompleted: number
    stepData: number
    lastActivity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OnboardingProgressAvgAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    currentStep?: true
  }

  export type OnboardingProgressSumAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    currentStep?: true
  }

  export type OnboardingProgressMinAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    currentStep?: true
    isCompleted?: true
    lastActivity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OnboardingProgressMaxAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    currentStep?: true
    isCompleted?: true
    lastActivity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OnboardingProgressCountAggregateInputType = {
    id?: true
    domainId?: true
    domainVersionId?: true
    currentStep?: true
    isCompleted?: true
    stepData?: true
    lastActivity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OnboardingProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OnboardingProgress to aggregate.
     */
    where?: OnboardingProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingProgresses to fetch.
     */
    orderBy?: OnboardingProgressOrderByWithRelationInput | OnboardingProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OnboardingProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OnboardingProgresses
    **/
    _count?: true | OnboardingProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OnboardingProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OnboardingProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OnboardingProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OnboardingProgressMaxAggregateInputType
  }

  export type GetOnboardingProgressAggregateType<T extends OnboardingProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateOnboardingProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOnboardingProgress[P]>
      : GetScalarType<T[P], AggregateOnboardingProgress[P]>
  }




  export type OnboardingProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OnboardingProgressWhereInput
    orderBy?: OnboardingProgressOrderByWithAggregationInput | OnboardingProgressOrderByWithAggregationInput[]
    by: OnboardingProgressScalarFieldEnum[] | OnboardingProgressScalarFieldEnum
    having?: OnboardingProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OnboardingProgressCountAggregateInputType | true
    _avg?: OnboardingProgressAvgAggregateInputType
    _sum?: OnboardingProgressSumAggregateInputType
    _min?: OnboardingProgressMinAggregateInputType
    _max?: OnboardingProgressMaxAggregateInputType
  }

  export type OnboardingProgressGroupByOutputType = {
    id: number
    domainId: number | null
    domainVersionId: number | null
    currentStep: number
    isCompleted: boolean
    stepData: JsonValue | null
    lastActivity: Date
    createdAt: Date
    updatedAt: Date
    _count: OnboardingProgressCountAggregateOutputType | null
    _avg: OnboardingProgressAvgAggregateOutputType | null
    _sum: OnboardingProgressSumAggregateOutputType | null
    _min: OnboardingProgressMinAggregateOutputType | null
    _max: OnboardingProgressMaxAggregateOutputType | null
  }

  type GetOnboardingProgressGroupByPayload<T extends OnboardingProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OnboardingProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OnboardingProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OnboardingProgressGroupByOutputType[P]>
            : GetScalarType<T[P], OnboardingProgressGroupByOutputType[P]>
        }
      >
    >


  export type OnboardingProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    stepData?: boolean
    lastActivity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | OnboardingProgress$domainArgs<ExtArgs>
    domainVersion?: boolean | OnboardingProgress$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["onboardingProgress"]>

  export type OnboardingProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    stepData?: boolean
    lastActivity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    domain?: boolean | OnboardingProgress$domainArgs<ExtArgs>
    domainVersion?: boolean | OnboardingProgress$domainVersionArgs<ExtArgs>
  }, ExtArgs["result"]["onboardingProgress"]>


  export type OnboardingProgressSelectScalar = {
    id?: boolean
    domainId?: boolean
    domainVersionId?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    stepData?: boolean
    lastActivity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OnboardingProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "domainId" | "domainVersionId" | "currentStep" | "isCompleted" | "stepData" | "lastActivity" | "createdAt" | "updatedAt", ExtArgs["result"]["onboardingProgress"]>
  export type OnboardingProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | OnboardingProgress$domainArgs<ExtArgs>
    domainVersion?: boolean | OnboardingProgress$domainVersionArgs<ExtArgs>
  }
  export type OnboardingProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domain?: boolean | OnboardingProgress$domainArgs<ExtArgs>
    domainVersion?: boolean | OnboardingProgress$domainVersionArgs<ExtArgs>
  }

  export type $OnboardingProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OnboardingProgress"
    objects: {
      domain: Prisma.$DomainPayload<ExtArgs> | null
      domainVersion: Prisma.$DomainVersionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      domainId: number | null
      domainVersionId: number | null
      currentStep: number
      isCompleted: boolean
      stepData: Prisma.JsonValue | null
      lastActivity: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["onboardingProgress"]>
    composites: {}
  }

  type OnboardingProgressGetPayload<S extends boolean | null | undefined | OnboardingProgressDefaultArgs> = $Result.GetResult<Prisma.$OnboardingProgressPayload, S>

  type OnboardingProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OnboardingProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OnboardingProgressCountAggregateInputType | true
    }

  export interface OnboardingProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OnboardingProgress'], meta: { name: 'OnboardingProgress' } }
    /**
     * Find zero or one OnboardingProgress that matches the filter.
     * @param {OnboardingProgressFindUniqueArgs} args - Arguments to find a OnboardingProgress
     * @example
     * // Get one OnboardingProgress
     * const onboardingProgress = await prisma.onboardingProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OnboardingProgressFindUniqueArgs>(args: SelectSubset<T, OnboardingProgressFindUniqueArgs<ExtArgs>>): Prisma__OnboardingProgressClient<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OnboardingProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OnboardingProgressFindUniqueOrThrowArgs} args - Arguments to find a OnboardingProgress
     * @example
     * // Get one OnboardingProgress
     * const onboardingProgress = await prisma.onboardingProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OnboardingProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, OnboardingProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OnboardingProgressClient<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OnboardingProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingProgressFindFirstArgs} args - Arguments to find a OnboardingProgress
     * @example
     * // Get one OnboardingProgress
     * const onboardingProgress = await prisma.onboardingProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OnboardingProgressFindFirstArgs>(args?: SelectSubset<T, OnboardingProgressFindFirstArgs<ExtArgs>>): Prisma__OnboardingProgressClient<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OnboardingProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingProgressFindFirstOrThrowArgs} args - Arguments to find a OnboardingProgress
     * @example
     * // Get one OnboardingProgress
     * const onboardingProgress = await prisma.onboardingProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OnboardingProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, OnboardingProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__OnboardingProgressClient<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OnboardingProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OnboardingProgresses
     * const onboardingProgresses = await prisma.onboardingProgress.findMany()
     * 
     * // Get first 10 OnboardingProgresses
     * const onboardingProgresses = await prisma.onboardingProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const onboardingProgressWithIdOnly = await prisma.onboardingProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OnboardingProgressFindManyArgs>(args?: SelectSubset<T, OnboardingProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OnboardingProgress.
     * @param {OnboardingProgressCreateArgs} args - Arguments to create a OnboardingProgress.
     * @example
     * // Create one OnboardingProgress
     * const OnboardingProgress = await prisma.onboardingProgress.create({
     *   data: {
     *     // ... data to create a OnboardingProgress
     *   }
     * })
     * 
     */
    create<T extends OnboardingProgressCreateArgs>(args: SelectSubset<T, OnboardingProgressCreateArgs<ExtArgs>>): Prisma__OnboardingProgressClient<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OnboardingProgresses.
     * @param {OnboardingProgressCreateManyArgs} args - Arguments to create many OnboardingProgresses.
     * @example
     * // Create many OnboardingProgresses
     * const onboardingProgress = await prisma.onboardingProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OnboardingProgressCreateManyArgs>(args?: SelectSubset<T, OnboardingProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OnboardingProgresses and returns the data saved in the database.
     * @param {OnboardingProgressCreateManyAndReturnArgs} args - Arguments to create many OnboardingProgresses.
     * @example
     * // Create many OnboardingProgresses
     * const onboardingProgress = await prisma.onboardingProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OnboardingProgresses and only return the `id`
     * const onboardingProgressWithIdOnly = await prisma.onboardingProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OnboardingProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, OnboardingProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OnboardingProgress.
     * @param {OnboardingProgressDeleteArgs} args - Arguments to delete one OnboardingProgress.
     * @example
     * // Delete one OnboardingProgress
     * const OnboardingProgress = await prisma.onboardingProgress.delete({
     *   where: {
     *     // ... filter to delete one OnboardingProgress
     *   }
     * })
     * 
     */
    delete<T extends OnboardingProgressDeleteArgs>(args: SelectSubset<T, OnboardingProgressDeleteArgs<ExtArgs>>): Prisma__OnboardingProgressClient<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OnboardingProgress.
     * @param {OnboardingProgressUpdateArgs} args - Arguments to update one OnboardingProgress.
     * @example
     * // Update one OnboardingProgress
     * const onboardingProgress = await prisma.onboardingProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OnboardingProgressUpdateArgs>(args: SelectSubset<T, OnboardingProgressUpdateArgs<ExtArgs>>): Prisma__OnboardingProgressClient<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OnboardingProgresses.
     * @param {OnboardingProgressDeleteManyArgs} args - Arguments to filter OnboardingProgresses to delete.
     * @example
     * // Delete a few OnboardingProgresses
     * const { count } = await prisma.onboardingProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OnboardingProgressDeleteManyArgs>(args?: SelectSubset<T, OnboardingProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OnboardingProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OnboardingProgresses
     * const onboardingProgress = await prisma.onboardingProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OnboardingProgressUpdateManyArgs>(args: SelectSubset<T, OnboardingProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OnboardingProgress.
     * @param {OnboardingProgressUpsertArgs} args - Arguments to update or create a OnboardingProgress.
     * @example
     * // Update or create a OnboardingProgress
     * const onboardingProgress = await prisma.onboardingProgress.upsert({
     *   create: {
     *     // ... data to create a OnboardingProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OnboardingProgress we want to update
     *   }
     * })
     */
    upsert<T extends OnboardingProgressUpsertArgs>(args: SelectSubset<T, OnboardingProgressUpsertArgs<ExtArgs>>): Prisma__OnboardingProgressClient<$Result.GetResult<Prisma.$OnboardingProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OnboardingProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingProgressCountArgs} args - Arguments to filter OnboardingProgresses to count.
     * @example
     * // Count the number of OnboardingProgresses
     * const count = await prisma.onboardingProgress.count({
     *   where: {
     *     // ... the filter for the OnboardingProgresses we want to count
     *   }
     * })
    **/
    count<T extends OnboardingProgressCountArgs>(
      args?: Subset<T, OnboardingProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OnboardingProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OnboardingProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OnboardingProgressAggregateArgs>(args: Subset<T, OnboardingProgressAggregateArgs>): Prisma.PrismaPromise<GetOnboardingProgressAggregateType<T>>

    /**
     * Group by OnboardingProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OnboardingProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OnboardingProgressGroupByArgs['orderBy'] }
        : { orderBy?: OnboardingProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OnboardingProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOnboardingProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OnboardingProgress model
   */
  readonly fields: OnboardingProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OnboardingProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OnboardingProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domain<T extends OnboardingProgress$domainArgs<ExtArgs> = {}>(args?: Subset<T, OnboardingProgress$domainArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    domainVersion<T extends OnboardingProgress$domainVersionArgs<ExtArgs> = {}>(args?: Subset<T, OnboardingProgress$domainVersionArgs<ExtArgs>>): Prisma__DomainVersionClient<$Result.GetResult<Prisma.$DomainVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OnboardingProgress model
   */
  interface OnboardingProgressFieldRefs {
    readonly id: FieldRef<"OnboardingProgress", 'Int'>
    readonly domainId: FieldRef<"OnboardingProgress", 'Int'>
    readonly domainVersionId: FieldRef<"OnboardingProgress", 'Int'>
    readonly currentStep: FieldRef<"OnboardingProgress", 'Int'>
    readonly isCompleted: FieldRef<"OnboardingProgress", 'Boolean'>
    readonly stepData: FieldRef<"OnboardingProgress", 'Json'>
    readonly lastActivity: FieldRef<"OnboardingProgress", 'DateTime'>
    readonly createdAt: FieldRef<"OnboardingProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"OnboardingProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OnboardingProgress findUnique
   */
  export type OnboardingProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingProgress to fetch.
     */
    where: OnboardingProgressWhereUniqueInput
  }

  /**
   * OnboardingProgress findUniqueOrThrow
   */
  export type OnboardingProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingProgress to fetch.
     */
    where: OnboardingProgressWhereUniqueInput
  }

  /**
   * OnboardingProgress findFirst
   */
  export type OnboardingProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingProgress to fetch.
     */
    where?: OnboardingProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingProgresses to fetch.
     */
    orderBy?: OnboardingProgressOrderByWithRelationInput | OnboardingProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OnboardingProgresses.
     */
    cursor?: OnboardingProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OnboardingProgresses.
     */
    distinct?: OnboardingProgressScalarFieldEnum | OnboardingProgressScalarFieldEnum[]
  }

  /**
   * OnboardingProgress findFirstOrThrow
   */
  export type OnboardingProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingProgress to fetch.
     */
    where?: OnboardingProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingProgresses to fetch.
     */
    orderBy?: OnboardingProgressOrderByWithRelationInput | OnboardingProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OnboardingProgresses.
     */
    cursor?: OnboardingProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OnboardingProgresses.
     */
    distinct?: OnboardingProgressScalarFieldEnum | OnboardingProgressScalarFieldEnum[]
  }

  /**
   * OnboardingProgress findMany
   */
  export type OnboardingProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter, which OnboardingProgresses to fetch.
     */
    where?: OnboardingProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OnboardingProgresses to fetch.
     */
    orderBy?: OnboardingProgressOrderByWithRelationInput | OnboardingProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OnboardingProgresses.
     */
    cursor?: OnboardingProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OnboardingProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OnboardingProgresses.
     */
    skip?: number
    distinct?: OnboardingProgressScalarFieldEnum | OnboardingProgressScalarFieldEnum[]
  }

  /**
   * OnboardingProgress create
   */
  export type OnboardingProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a OnboardingProgress.
     */
    data: XOR<OnboardingProgressCreateInput, OnboardingProgressUncheckedCreateInput>
  }

  /**
   * OnboardingProgress createMany
   */
  export type OnboardingProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OnboardingProgresses.
     */
    data: OnboardingProgressCreateManyInput | OnboardingProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OnboardingProgress createManyAndReturn
   */
  export type OnboardingProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * The data used to create many OnboardingProgresses.
     */
    data: OnboardingProgressCreateManyInput | OnboardingProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OnboardingProgress update
   */
  export type OnboardingProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a OnboardingProgress.
     */
    data: XOR<OnboardingProgressUpdateInput, OnboardingProgressUncheckedUpdateInput>
    /**
     * Choose, which OnboardingProgress to update.
     */
    where: OnboardingProgressWhereUniqueInput
  }

  /**
   * OnboardingProgress updateMany
   */
  export type OnboardingProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OnboardingProgresses.
     */
    data: XOR<OnboardingProgressUpdateManyMutationInput, OnboardingProgressUncheckedUpdateManyInput>
    /**
     * Filter which OnboardingProgresses to update
     */
    where?: OnboardingProgressWhereInput
  }

  /**
   * OnboardingProgress upsert
   */
  export type OnboardingProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the OnboardingProgress to update in case it exists.
     */
    where: OnboardingProgressWhereUniqueInput
    /**
     * In case the OnboardingProgress found by the `where` argument doesn't exist, create a new OnboardingProgress with this data.
     */
    create: XOR<OnboardingProgressCreateInput, OnboardingProgressUncheckedCreateInput>
    /**
     * In case the OnboardingProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OnboardingProgressUpdateInput, OnboardingProgressUncheckedUpdateInput>
  }

  /**
   * OnboardingProgress delete
   */
  export type OnboardingProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter which OnboardingProgress to delete.
     */
    where: OnboardingProgressWhereUniqueInput
  }

  /**
   * OnboardingProgress deleteMany
   */
  export type OnboardingProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OnboardingProgresses to delete
     */
    where?: OnboardingProgressWhereInput
  }

  /**
   * OnboardingProgress.domain
   */
  export type OnboardingProgress$domainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    where?: DomainWhereInput
  }

  /**
   * OnboardingProgress.domainVersion
   */
  export type OnboardingProgress$domainVersionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainVersion
     */
    select?: DomainVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainVersion
     */
    omit?: DomainVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainVersionInclude<ExtArgs> | null
    where?: DomainVersionWhereInput
  }

  /**
   * OnboardingProgress without action
   */
  export type OnboardingProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OnboardingProgress
     */
    select?: OnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OnboardingProgress
     */
    omit?: OnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingProgressInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DomainScalarFieldEnum: {
    id: 'id',
    url: 'url',
    context: 'context',
    version: 'version',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    location: 'location'
  };

  export type DomainScalarFieldEnum = (typeof DomainScalarFieldEnum)[keyof typeof DomainScalarFieldEnum]


  export const DomainVersionScalarFieldEnum: {
    id: 'id',
    domainId: 'domainId',
    version: 'version',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DomainVersionScalarFieldEnum = (typeof DomainVersionScalarFieldEnum)[keyof typeof DomainVersionScalarFieldEnum]


  export const CrawlResultScalarFieldEnum: {
    id: 'id',
    domainId: 'domainId',
    domainVersionId: 'domainVersionId',
    pagesScanned: 'pagesScanned',
    contentBlocks: 'contentBlocks',
    keyEntities: 'keyEntities',
    confidenceScore: 'confidenceScore',
    extractedContext: 'extractedContext',
    tokenUsage: 'tokenUsage',
    createdAt: 'createdAt'
  };

  export type CrawlResultScalarFieldEnum = (typeof CrawlResultScalarFieldEnum)[keyof typeof CrawlResultScalarFieldEnum]


  export const KeywordScalarFieldEnum: {
    id: 'id',
    term: 'term',
    volume: 'volume',
    difficulty: 'difficulty',
    cpc: 'cpc',
    domainId: 'domainId',
    domainVersionId: 'domainVersionId',
    isSelected: 'isSelected',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type KeywordScalarFieldEnum = (typeof KeywordScalarFieldEnum)[keyof typeof KeywordScalarFieldEnum]


  export const PhraseScalarFieldEnum: {
    id: 'id',
    text: 'text',
    keywordId: 'keywordId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PhraseScalarFieldEnum = (typeof PhraseScalarFieldEnum)[keyof typeof PhraseScalarFieldEnum]


  export const AIQueryResultScalarFieldEnum: {
    id: 'id',
    phraseId: 'phraseId',
    model: 'model',
    response: 'response',
    latency: 'latency',
    cost: 'cost',
    presence: 'presence',
    relevance: 'relevance',
    accuracy: 'accuracy',
    sentiment: 'sentiment',
    overall: 'overall',
    createdAt: 'createdAt'
  };

  export type AIQueryResultScalarFieldEnum = (typeof AIQueryResultScalarFieldEnum)[keyof typeof AIQueryResultScalarFieldEnum]


  export const DashboardAnalysisScalarFieldEnum: {
    id: 'id',
    domainId: 'domainId',
    domainVersionId: 'domainVersionId',
    metrics: 'metrics',
    insights: 'insights',
    industryAnalysis: 'industryAnalysis',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DashboardAnalysisScalarFieldEnum = (typeof DashboardAnalysisScalarFieldEnum)[keyof typeof DashboardAnalysisScalarFieldEnum]


  export const CompetitorAnalysisScalarFieldEnum: {
    id: 'id',
    domainId: 'domainId',
    domainVersionId: 'domainVersionId',
    competitors: 'competitors',
    marketInsights: 'marketInsights',
    strategicRecommendations: 'strategicRecommendations',
    competitiveAnalysis: 'competitiveAnalysis',
    competitorList: 'competitorList',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompetitorAnalysisScalarFieldEnum = (typeof CompetitorAnalysisScalarFieldEnum)[keyof typeof CompetitorAnalysisScalarFieldEnum]


  export const SuggestedCompetitorScalarFieldEnum: {
    id: 'id',
    domainId: 'domainId',
    domainVersionId: 'domainVersionId',
    name: 'name',
    competitorDomain: 'competitorDomain',
    reason: 'reason',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type SuggestedCompetitorScalarFieldEnum = (typeof SuggestedCompetitorScalarFieldEnum)[keyof typeof SuggestedCompetitorScalarFieldEnum]


  export const OnboardingProgressScalarFieldEnum: {
    id: 'id',
    domainId: 'domainId',
    domainVersionId: 'domainVersionId',
    currentStep: 'currentStep',
    isCompleted: 'isCompleted',
    stepData: 'stepData',
    lastActivity: 'lastActivity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OnboardingProgressScalarFieldEnum = (typeof OnboardingProgressScalarFieldEnum)[keyof typeof OnboardingProgressScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    domains?: DomainListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domains?: DomainOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    domains?: DomainListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DomainWhereInput = {
    AND?: DomainWhereInput | DomainWhereInput[]
    OR?: DomainWhereInput[]
    NOT?: DomainWhereInput | DomainWhereInput[]
    id?: IntFilter<"Domain"> | number
    url?: StringFilter<"Domain"> | string
    context?: StringNullableFilter<"Domain"> | string | null
    version?: IntFilter<"Domain"> | number
    userId?: IntNullableFilter<"Domain"> | number | null
    createdAt?: DateTimeFilter<"Domain"> | Date | string
    updatedAt?: DateTimeFilter<"Domain"> | Date | string
    location?: StringNullableFilter<"Domain"> | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    crawlResults?: CrawlResultListRelationFilter
    keywords?: KeywordListRelationFilter
    dashboardAnalyses?: DashboardAnalysisListRelationFilter
    competitorAnalyses?: CompetitorAnalysisListRelationFilter
    suggestedCompetitors?: SuggestedCompetitorListRelationFilter
    onboardingProgresses?: OnboardingProgressListRelationFilter
    versions?: DomainVersionListRelationFilter
  }

  export type DomainOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    context?: SortOrderInput | SortOrder
    version?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    crawlResults?: CrawlResultOrderByRelationAggregateInput
    keywords?: KeywordOrderByRelationAggregateInput
    dashboardAnalyses?: DashboardAnalysisOrderByRelationAggregateInput
    competitorAnalyses?: CompetitorAnalysisOrderByRelationAggregateInput
    suggestedCompetitors?: SuggestedCompetitorOrderByRelationAggregateInput
    onboardingProgresses?: OnboardingProgressOrderByRelationAggregateInput
    versions?: DomainVersionOrderByRelationAggregateInput
  }

  export type DomainWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    url?: string
    AND?: DomainWhereInput | DomainWhereInput[]
    OR?: DomainWhereInput[]
    NOT?: DomainWhereInput | DomainWhereInput[]
    context?: StringNullableFilter<"Domain"> | string | null
    version?: IntFilter<"Domain"> | number
    userId?: IntNullableFilter<"Domain"> | number | null
    createdAt?: DateTimeFilter<"Domain"> | Date | string
    updatedAt?: DateTimeFilter<"Domain"> | Date | string
    location?: StringNullableFilter<"Domain"> | string | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    crawlResults?: CrawlResultListRelationFilter
    keywords?: KeywordListRelationFilter
    dashboardAnalyses?: DashboardAnalysisListRelationFilter
    competitorAnalyses?: CompetitorAnalysisListRelationFilter
    suggestedCompetitors?: SuggestedCompetitorListRelationFilter
    onboardingProgresses?: OnboardingProgressListRelationFilter
    versions?: DomainVersionListRelationFilter
  }, "id" | "url">

  export type DomainOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    context?: SortOrderInput | SortOrder
    version?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: SortOrderInput | SortOrder
    _count?: DomainCountOrderByAggregateInput
    _avg?: DomainAvgOrderByAggregateInput
    _max?: DomainMaxOrderByAggregateInput
    _min?: DomainMinOrderByAggregateInput
    _sum?: DomainSumOrderByAggregateInput
  }

  export type DomainScalarWhereWithAggregatesInput = {
    AND?: DomainScalarWhereWithAggregatesInput | DomainScalarWhereWithAggregatesInput[]
    OR?: DomainScalarWhereWithAggregatesInput[]
    NOT?: DomainScalarWhereWithAggregatesInput | DomainScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Domain"> | number
    url?: StringWithAggregatesFilter<"Domain"> | string
    context?: StringNullableWithAggregatesFilter<"Domain"> | string | null
    version?: IntWithAggregatesFilter<"Domain"> | number
    userId?: IntNullableWithAggregatesFilter<"Domain"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Domain"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Domain"> | Date | string
    location?: StringNullableWithAggregatesFilter<"Domain"> | string | null
  }

  export type DomainVersionWhereInput = {
    AND?: DomainVersionWhereInput | DomainVersionWhereInput[]
    OR?: DomainVersionWhereInput[]
    NOT?: DomainVersionWhereInput | DomainVersionWhereInput[]
    id?: IntFilter<"DomainVersion"> | number
    domainId?: IntFilter<"DomainVersion"> | number
    version?: IntFilter<"DomainVersion"> | number
    name?: StringNullableFilter<"DomainVersion"> | string | null
    createdAt?: DateTimeFilter<"DomainVersion"> | Date | string
    updatedAt?: DateTimeFilter<"DomainVersion"> | Date | string
    domain?: XOR<DomainRelationFilter, DomainWhereInput>
    crawlResults?: CrawlResultListRelationFilter
    keywords?: KeywordListRelationFilter
    dashboardAnalyses?: DashboardAnalysisListRelationFilter
    competitorAnalyses?: CompetitorAnalysisListRelationFilter
    suggestedCompetitors?: SuggestedCompetitorListRelationFilter
    onboardingProgresses?: OnboardingProgressListRelationFilter
  }

  export type DomainVersionOrderByWithRelationInput = {
    id?: SortOrder
    domainId?: SortOrder
    version?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
    crawlResults?: CrawlResultOrderByRelationAggregateInput
    keywords?: KeywordOrderByRelationAggregateInput
    dashboardAnalyses?: DashboardAnalysisOrderByRelationAggregateInput
    competitorAnalyses?: CompetitorAnalysisOrderByRelationAggregateInput
    suggestedCompetitors?: SuggestedCompetitorOrderByRelationAggregateInput
    onboardingProgresses?: OnboardingProgressOrderByRelationAggregateInput
  }

  export type DomainVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    domainId_version?: DomainVersionDomainIdVersionCompoundUniqueInput
    AND?: DomainVersionWhereInput | DomainVersionWhereInput[]
    OR?: DomainVersionWhereInput[]
    NOT?: DomainVersionWhereInput | DomainVersionWhereInput[]
    domainId?: IntFilter<"DomainVersion"> | number
    version?: IntFilter<"DomainVersion"> | number
    name?: StringNullableFilter<"DomainVersion"> | string | null
    createdAt?: DateTimeFilter<"DomainVersion"> | Date | string
    updatedAt?: DateTimeFilter<"DomainVersion"> | Date | string
    domain?: XOR<DomainRelationFilter, DomainWhereInput>
    crawlResults?: CrawlResultListRelationFilter
    keywords?: KeywordListRelationFilter
    dashboardAnalyses?: DashboardAnalysisListRelationFilter
    competitorAnalyses?: CompetitorAnalysisListRelationFilter
    suggestedCompetitors?: SuggestedCompetitorListRelationFilter
    onboardingProgresses?: OnboardingProgressListRelationFilter
  }, "id" | "domainId_version">

  export type DomainVersionOrderByWithAggregationInput = {
    id?: SortOrder
    domainId?: SortOrder
    version?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DomainVersionCountOrderByAggregateInput
    _avg?: DomainVersionAvgOrderByAggregateInput
    _max?: DomainVersionMaxOrderByAggregateInput
    _min?: DomainVersionMinOrderByAggregateInput
    _sum?: DomainVersionSumOrderByAggregateInput
  }

  export type DomainVersionScalarWhereWithAggregatesInput = {
    AND?: DomainVersionScalarWhereWithAggregatesInput | DomainVersionScalarWhereWithAggregatesInput[]
    OR?: DomainVersionScalarWhereWithAggregatesInput[]
    NOT?: DomainVersionScalarWhereWithAggregatesInput | DomainVersionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DomainVersion"> | number
    domainId?: IntWithAggregatesFilter<"DomainVersion"> | number
    version?: IntWithAggregatesFilter<"DomainVersion"> | number
    name?: StringNullableWithAggregatesFilter<"DomainVersion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DomainVersion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DomainVersion"> | Date | string
  }

  export type CrawlResultWhereInput = {
    AND?: CrawlResultWhereInput | CrawlResultWhereInput[]
    OR?: CrawlResultWhereInput[]
    NOT?: CrawlResultWhereInput | CrawlResultWhereInput[]
    id?: IntFilter<"CrawlResult"> | number
    domainId?: IntNullableFilter<"CrawlResult"> | number | null
    domainVersionId?: IntNullableFilter<"CrawlResult"> | number | null
    pagesScanned?: IntFilter<"CrawlResult"> | number
    contentBlocks?: IntFilter<"CrawlResult"> | number
    keyEntities?: IntFilter<"CrawlResult"> | number
    confidenceScore?: FloatFilter<"CrawlResult"> | number
    extractedContext?: StringFilter<"CrawlResult"> | string
    tokenUsage?: IntNullableFilter<"CrawlResult"> | number | null
    createdAt?: DateTimeFilter<"CrawlResult"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
  }

  export type CrawlResultOrderByWithRelationInput = {
    id?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    pagesScanned?: SortOrder
    contentBlocks?: SortOrder
    keyEntities?: SortOrder
    confidenceScore?: SortOrder
    extractedContext?: SortOrder
    tokenUsage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
    domainVersion?: DomainVersionOrderByWithRelationInput
  }

  export type CrawlResultWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CrawlResultWhereInput | CrawlResultWhereInput[]
    OR?: CrawlResultWhereInput[]
    NOT?: CrawlResultWhereInput | CrawlResultWhereInput[]
    domainId?: IntNullableFilter<"CrawlResult"> | number | null
    domainVersionId?: IntNullableFilter<"CrawlResult"> | number | null
    pagesScanned?: IntFilter<"CrawlResult"> | number
    contentBlocks?: IntFilter<"CrawlResult"> | number
    keyEntities?: IntFilter<"CrawlResult"> | number
    confidenceScore?: FloatFilter<"CrawlResult"> | number
    extractedContext?: StringFilter<"CrawlResult"> | string
    tokenUsage?: IntNullableFilter<"CrawlResult"> | number | null
    createdAt?: DateTimeFilter<"CrawlResult"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
  }, "id">

  export type CrawlResultOrderByWithAggregationInput = {
    id?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    pagesScanned?: SortOrder
    contentBlocks?: SortOrder
    keyEntities?: SortOrder
    confidenceScore?: SortOrder
    extractedContext?: SortOrder
    tokenUsage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CrawlResultCountOrderByAggregateInput
    _avg?: CrawlResultAvgOrderByAggregateInput
    _max?: CrawlResultMaxOrderByAggregateInput
    _min?: CrawlResultMinOrderByAggregateInput
    _sum?: CrawlResultSumOrderByAggregateInput
  }

  export type CrawlResultScalarWhereWithAggregatesInput = {
    AND?: CrawlResultScalarWhereWithAggregatesInput | CrawlResultScalarWhereWithAggregatesInput[]
    OR?: CrawlResultScalarWhereWithAggregatesInput[]
    NOT?: CrawlResultScalarWhereWithAggregatesInput | CrawlResultScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CrawlResult"> | number
    domainId?: IntNullableWithAggregatesFilter<"CrawlResult"> | number | null
    domainVersionId?: IntNullableWithAggregatesFilter<"CrawlResult"> | number | null
    pagesScanned?: IntWithAggregatesFilter<"CrawlResult"> | number
    contentBlocks?: IntWithAggregatesFilter<"CrawlResult"> | number
    keyEntities?: IntWithAggregatesFilter<"CrawlResult"> | number
    confidenceScore?: FloatWithAggregatesFilter<"CrawlResult"> | number
    extractedContext?: StringWithAggregatesFilter<"CrawlResult"> | string
    tokenUsage?: IntNullableWithAggregatesFilter<"CrawlResult"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CrawlResult"> | Date | string
  }

  export type KeywordWhereInput = {
    AND?: KeywordWhereInput | KeywordWhereInput[]
    OR?: KeywordWhereInput[]
    NOT?: KeywordWhereInput | KeywordWhereInput[]
    id?: IntFilter<"Keyword"> | number
    term?: StringFilter<"Keyword"> | string
    volume?: IntFilter<"Keyword"> | number
    difficulty?: StringFilter<"Keyword"> | string
    cpc?: FloatFilter<"Keyword"> | number
    domainId?: IntNullableFilter<"Keyword"> | number | null
    domainVersionId?: IntNullableFilter<"Keyword"> | number | null
    isSelected?: BoolFilter<"Keyword"> | boolean
    createdAt?: DateTimeFilter<"Keyword"> | Date | string
    updatedAt?: DateTimeFilter<"Keyword"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
    phrases?: PhraseListRelationFilter
  }

  export type KeywordOrderByWithRelationInput = {
    id?: SortOrder
    term?: SortOrder
    volume?: SortOrder
    difficulty?: SortOrder
    cpc?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    isSelected?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
    domainVersion?: DomainVersionOrderByWithRelationInput
    phrases?: PhraseOrderByRelationAggregateInput
  }

  export type KeywordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    term_domainId_domainVersionId?: KeywordTermDomainIdDomainVersionIdCompoundUniqueInput
    AND?: KeywordWhereInput | KeywordWhereInput[]
    OR?: KeywordWhereInput[]
    NOT?: KeywordWhereInput | KeywordWhereInput[]
    term?: StringFilter<"Keyword"> | string
    volume?: IntFilter<"Keyword"> | number
    difficulty?: StringFilter<"Keyword"> | string
    cpc?: FloatFilter<"Keyword"> | number
    domainId?: IntNullableFilter<"Keyword"> | number | null
    domainVersionId?: IntNullableFilter<"Keyword"> | number | null
    isSelected?: BoolFilter<"Keyword"> | boolean
    createdAt?: DateTimeFilter<"Keyword"> | Date | string
    updatedAt?: DateTimeFilter<"Keyword"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
    phrases?: PhraseListRelationFilter
  }, "id" | "term_domainId_domainVersionId">

  export type KeywordOrderByWithAggregationInput = {
    id?: SortOrder
    term?: SortOrder
    volume?: SortOrder
    difficulty?: SortOrder
    cpc?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    isSelected?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KeywordCountOrderByAggregateInput
    _avg?: KeywordAvgOrderByAggregateInput
    _max?: KeywordMaxOrderByAggregateInput
    _min?: KeywordMinOrderByAggregateInput
    _sum?: KeywordSumOrderByAggregateInput
  }

  export type KeywordScalarWhereWithAggregatesInput = {
    AND?: KeywordScalarWhereWithAggregatesInput | KeywordScalarWhereWithAggregatesInput[]
    OR?: KeywordScalarWhereWithAggregatesInput[]
    NOT?: KeywordScalarWhereWithAggregatesInput | KeywordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Keyword"> | number
    term?: StringWithAggregatesFilter<"Keyword"> | string
    volume?: IntWithAggregatesFilter<"Keyword"> | number
    difficulty?: StringWithAggregatesFilter<"Keyword"> | string
    cpc?: FloatWithAggregatesFilter<"Keyword"> | number
    domainId?: IntNullableWithAggregatesFilter<"Keyword"> | number | null
    domainVersionId?: IntNullableWithAggregatesFilter<"Keyword"> | number | null
    isSelected?: BoolWithAggregatesFilter<"Keyword"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Keyword"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Keyword"> | Date | string
  }

  export type PhraseWhereInput = {
    AND?: PhraseWhereInput | PhraseWhereInput[]
    OR?: PhraseWhereInput[]
    NOT?: PhraseWhereInput | PhraseWhereInput[]
    id?: IntFilter<"Phrase"> | number
    text?: StringFilter<"Phrase"> | string
    keywordId?: IntFilter<"Phrase"> | number
    createdAt?: DateTimeFilter<"Phrase"> | Date | string
    updatedAt?: DateTimeFilter<"Phrase"> | Date | string
    keyword?: XOR<KeywordRelationFilter, KeywordWhereInput>
    aiQueryResults?: AIQueryResultListRelationFilter
  }

  export type PhraseOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    keywordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    keyword?: KeywordOrderByWithRelationInput
    aiQueryResults?: AIQueryResultOrderByRelationAggregateInput
  }

  export type PhraseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PhraseWhereInput | PhraseWhereInput[]
    OR?: PhraseWhereInput[]
    NOT?: PhraseWhereInput | PhraseWhereInput[]
    text?: StringFilter<"Phrase"> | string
    keywordId?: IntFilter<"Phrase"> | number
    createdAt?: DateTimeFilter<"Phrase"> | Date | string
    updatedAt?: DateTimeFilter<"Phrase"> | Date | string
    keyword?: XOR<KeywordRelationFilter, KeywordWhereInput>
    aiQueryResults?: AIQueryResultListRelationFilter
  }, "id">

  export type PhraseOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    keywordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PhraseCountOrderByAggregateInput
    _avg?: PhraseAvgOrderByAggregateInput
    _max?: PhraseMaxOrderByAggregateInput
    _min?: PhraseMinOrderByAggregateInput
    _sum?: PhraseSumOrderByAggregateInput
  }

  export type PhraseScalarWhereWithAggregatesInput = {
    AND?: PhraseScalarWhereWithAggregatesInput | PhraseScalarWhereWithAggregatesInput[]
    OR?: PhraseScalarWhereWithAggregatesInput[]
    NOT?: PhraseScalarWhereWithAggregatesInput | PhraseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Phrase"> | number
    text?: StringWithAggregatesFilter<"Phrase"> | string
    keywordId?: IntWithAggregatesFilter<"Phrase"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Phrase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Phrase"> | Date | string
  }

  export type AIQueryResultWhereInput = {
    AND?: AIQueryResultWhereInput | AIQueryResultWhereInput[]
    OR?: AIQueryResultWhereInput[]
    NOT?: AIQueryResultWhereInput | AIQueryResultWhereInput[]
    id?: IntFilter<"AIQueryResult"> | number
    phraseId?: IntFilter<"AIQueryResult"> | number
    model?: StringFilter<"AIQueryResult"> | string
    response?: StringFilter<"AIQueryResult"> | string
    latency?: FloatFilter<"AIQueryResult"> | number
    cost?: FloatFilter<"AIQueryResult"> | number
    presence?: IntFilter<"AIQueryResult"> | number
    relevance?: IntFilter<"AIQueryResult"> | number
    accuracy?: IntFilter<"AIQueryResult"> | number
    sentiment?: IntFilter<"AIQueryResult"> | number
    overall?: FloatFilter<"AIQueryResult"> | number
    createdAt?: DateTimeFilter<"AIQueryResult"> | Date | string
    phrase?: XOR<PhraseRelationFilter, PhraseWhereInput>
  }

  export type AIQueryResultOrderByWithRelationInput = {
    id?: SortOrder
    phraseId?: SortOrder
    model?: SortOrder
    response?: SortOrder
    latency?: SortOrder
    cost?: SortOrder
    presence?: SortOrder
    relevance?: SortOrder
    accuracy?: SortOrder
    sentiment?: SortOrder
    overall?: SortOrder
    createdAt?: SortOrder
    phrase?: PhraseOrderByWithRelationInput
  }

  export type AIQueryResultWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AIQueryResultWhereInput | AIQueryResultWhereInput[]
    OR?: AIQueryResultWhereInput[]
    NOT?: AIQueryResultWhereInput | AIQueryResultWhereInput[]
    phraseId?: IntFilter<"AIQueryResult"> | number
    model?: StringFilter<"AIQueryResult"> | string
    response?: StringFilter<"AIQueryResult"> | string
    latency?: FloatFilter<"AIQueryResult"> | number
    cost?: FloatFilter<"AIQueryResult"> | number
    presence?: IntFilter<"AIQueryResult"> | number
    relevance?: IntFilter<"AIQueryResult"> | number
    accuracy?: IntFilter<"AIQueryResult"> | number
    sentiment?: IntFilter<"AIQueryResult"> | number
    overall?: FloatFilter<"AIQueryResult"> | number
    createdAt?: DateTimeFilter<"AIQueryResult"> | Date | string
    phrase?: XOR<PhraseRelationFilter, PhraseWhereInput>
  }, "id">

  export type AIQueryResultOrderByWithAggregationInput = {
    id?: SortOrder
    phraseId?: SortOrder
    model?: SortOrder
    response?: SortOrder
    latency?: SortOrder
    cost?: SortOrder
    presence?: SortOrder
    relevance?: SortOrder
    accuracy?: SortOrder
    sentiment?: SortOrder
    overall?: SortOrder
    createdAt?: SortOrder
    _count?: AIQueryResultCountOrderByAggregateInput
    _avg?: AIQueryResultAvgOrderByAggregateInput
    _max?: AIQueryResultMaxOrderByAggregateInput
    _min?: AIQueryResultMinOrderByAggregateInput
    _sum?: AIQueryResultSumOrderByAggregateInput
  }

  export type AIQueryResultScalarWhereWithAggregatesInput = {
    AND?: AIQueryResultScalarWhereWithAggregatesInput | AIQueryResultScalarWhereWithAggregatesInput[]
    OR?: AIQueryResultScalarWhereWithAggregatesInput[]
    NOT?: AIQueryResultScalarWhereWithAggregatesInput | AIQueryResultScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AIQueryResult"> | number
    phraseId?: IntWithAggregatesFilter<"AIQueryResult"> | number
    model?: StringWithAggregatesFilter<"AIQueryResult"> | string
    response?: StringWithAggregatesFilter<"AIQueryResult"> | string
    latency?: FloatWithAggregatesFilter<"AIQueryResult"> | number
    cost?: FloatWithAggregatesFilter<"AIQueryResult"> | number
    presence?: IntWithAggregatesFilter<"AIQueryResult"> | number
    relevance?: IntWithAggregatesFilter<"AIQueryResult"> | number
    accuracy?: IntWithAggregatesFilter<"AIQueryResult"> | number
    sentiment?: IntWithAggregatesFilter<"AIQueryResult"> | number
    overall?: FloatWithAggregatesFilter<"AIQueryResult"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AIQueryResult"> | Date | string
  }

  export type DashboardAnalysisWhereInput = {
    AND?: DashboardAnalysisWhereInput | DashboardAnalysisWhereInput[]
    OR?: DashboardAnalysisWhereInput[]
    NOT?: DashboardAnalysisWhereInput | DashboardAnalysisWhereInput[]
    id?: IntFilter<"DashboardAnalysis"> | number
    domainId?: IntNullableFilter<"DashboardAnalysis"> | number | null
    domainVersionId?: IntNullableFilter<"DashboardAnalysis"> | number | null
    metrics?: JsonFilter<"DashboardAnalysis">
    insights?: JsonFilter<"DashboardAnalysis">
    industryAnalysis?: JsonFilter<"DashboardAnalysis">
    createdAt?: DateTimeFilter<"DashboardAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"DashboardAnalysis"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
  }

  export type DashboardAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    metrics?: SortOrder
    insights?: SortOrder
    industryAnalysis?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
    domainVersion?: DomainVersionOrderByWithRelationInput
  }

  export type DashboardAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DashboardAnalysisWhereInput | DashboardAnalysisWhereInput[]
    OR?: DashboardAnalysisWhereInput[]
    NOT?: DashboardAnalysisWhereInput | DashboardAnalysisWhereInput[]
    domainId?: IntNullableFilter<"DashboardAnalysis"> | number | null
    domainVersionId?: IntNullableFilter<"DashboardAnalysis"> | number | null
    metrics?: JsonFilter<"DashboardAnalysis">
    insights?: JsonFilter<"DashboardAnalysis">
    industryAnalysis?: JsonFilter<"DashboardAnalysis">
    createdAt?: DateTimeFilter<"DashboardAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"DashboardAnalysis"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
  }, "id">

  export type DashboardAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    metrics?: SortOrder
    insights?: SortOrder
    industryAnalysis?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DashboardAnalysisCountOrderByAggregateInput
    _avg?: DashboardAnalysisAvgOrderByAggregateInput
    _max?: DashboardAnalysisMaxOrderByAggregateInput
    _min?: DashboardAnalysisMinOrderByAggregateInput
    _sum?: DashboardAnalysisSumOrderByAggregateInput
  }

  export type DashboardAnalysisScalarWhereWithAggregatesInput = {
    AND?: DashboardAnalysisScalarWhereWithAggregatesInput | DashboardAnalysisScalarWhereWithAggregatesInput[]
    OR?: DashboardAnalysisScalarWhereWithAggregatesInput[]
    NOT?: DashboardAnalysisScalarWhereWithAggregatesInput | DashboardAnalysisScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DashboardAnalysis"> | number
    domainId?: IntNullableWithAggregatesFilter<"DashboardAnalysis"> | number | null
    domainVersionId?: IntNullableWithAggregatesFilter<"DashboardAnalysis"> | number | null
    metrics?: JsonWithAggregatesFilter<"DashboardAnalysis">
    insights?: JsonWithAggregatesFilter<"DashboardAnalysis">
    industryAnalysis?: JsonWithAggregatesFilter<"DashboardAnalysis">
    createdAt?: DateTimeWithAggregatesFilter<"DashboardAnalysis"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DashboardAnalysis"> | Date | string
  }

  export type CompetitorAnalysisWhereInput = {
    AND?: CompetitorAnalysisWhereInput | CompetitorAnalysisWhereInput[]
    OR?: CompetitorAnalysisWhereInput[]
    NOT?: CompetitorAnalysisWhereInput | CompetitorAnalysisWhereInput[]
    id?: IntFilter<"CompetitorAnalysis"> | number
    domainId?: IntNullableFilter<"CompetitorAnalysis"> | number | null
    domainVersionId?: IntNullableFilter<"CompetitorAnalysis"> | number | null
    competitors?: JsonFilter<"CompetitorAnalysis">
    marketInsights?: JsonFilter<"CompetitorAnalysis">
    strategicRecommendations?: JsonFilter<"CompetitorAnalysis">
    competitiveAnalysis?: JsonFilter<"CompetitorAnalysis">
    competitorList?: StringFilter<"CompetitorAnalysis"> | string
    createdAt?: DateTimeFilter<"CompetitorAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"CompetitorAnalysis"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
  }

  export type CompetitorAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    competitors?: SortOrder
    marketInsights?: SortOrder
    strategicRecommendations?: SortOrder
    competitiveAnalysis?: SortOrder
    competitorList?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
    domainVersion?: DomainVersionOrderByWithRelationInput
  }

  export type CompetitorAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CompetitorAnalysisWhereInput | CompetitorAnalysisWhereInput[]
    OR?: CompetitorAnalysisWhereInput[]
    NOT?: CompetitorAnalysisWhereInput | CompetitorAnalysisWhereInput[]
    domainId?: IntNullableFilter<"CompetitorAnalysis"> | number | null
    domainVersionId?: IntNullableFilter<"CompetitorAnalysis"> | number | null
    competitors?: JsonFilter<"CompetitorAnalysis">
    marketInsights?: JsonFilter<"CompetitorAnalysis">
    strategicRecommendations?: JsonFilter<"CompetitorAnalysis">
    competitiveAnalysis?: JsonFilter<"CompetitorAnalysis">
    competitorList?: StringFilter<"CompetitorAnalysis"> | string
    createdAt?: DateTimeFilter<"CompetitorAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"CompetitorAnalysis"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
  }, "id">

  export type CompetitorAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    competitors?: SortOrder
    marketInsights?: SortOrder
    strategicRecommendations?: SortOrder
    competitiveAnalysis?: SortOrder
    competitorList?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompetitorAnalysisCountOrderByAggregateInput
    _avg?: CompetitorAnalysisAvgOrderByAggregateInput
    _max?: CompetitorAnalysisMaxOrderByAggregateInput
    _min?: CompetitorAnalysisMinOrderByAggregateInput
    _sum?: CompetitorAnalysisSumOrderByAggregateInput
  }

  export type CompetitorAnalysisScalarWhereWithAggregatesInput = {
    AND?: CompetitorAnalysisScalarWhereWithAggregatesInput | CompetitorAnalysisScalarWhereWithAggregatesInput[]
    OR?: CompetitorAnalysisScalarWhereWithAggregatesInput[]
    NOT?: CompetitorAnalysisScalarWhereWithAggregatesInput | CompetitorAnalysisScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CompetitorAnalysis"> | number
    domainId?: IntNullableWithAggregatesFilter<"CompetitorAnalysis"> | number | null
    domainVersionId?: IntNullableWithAggregatesFilter<"CompetitorAnalysis"> | number | null
    competitors?: JsonWithAggregatesFilter<"CompetitorAnalysis">
    marketInsights?: JsonWithAggregatesFilter<"CompetitorAnalysis">
    strategicRecommendations?: JsonWithAggregatesFilter<"CompetitorAnalysis">
    competitiveAnalysis?: JsonWithAggregatesFilter<"CompetitorAnalysis">
    competitorList?: StringWithAggregatesFilter<"CompetitorAnalysis"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CompetitorAnalysis"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CompetitorAnalysis"> | Date | string
  }

  export type SuggestedCompetitorWhereInput = {
    AND?: SuggestedCompetitorWhereInput | SuggestedCompetitorWhereInput[]
    OR?: SuggestedCompetitorWhereInput[]
    NOT?: SuggestedCompetitorWhereInput | SuggestedCompetitorWhereInput[]
    id?: IntFilter<"SuggestedCompetitor"> | number
    domainId?: IntNullableFilter<"SuggestedCompetitor"> | number | null
    domainVersionId?: IntNullableFilter<"SuggestedCompetitor"> | number | null
    name?: StringFilter<"SuggestedCompetitor"> | string
    competitorDomain?: StringFilter<"SuggestedCompetitor"> | string
    reason?: StringFilter<"SuggestedCompetitor"> | string
    type?: StringFilter<"SuggestedCompetitor"> | string
    createdAt?: DateTimeFilter<"SuggestedCompetitor"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
  }

  export type SuggestedCompetitorOrderByWithRelationInput = {
    id?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    name?: SortOrder
    competitorDomain?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
    domainVersion?: DomainVersionOrderByWithRelationInput
  }

  export type SuggestedCompetitorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SuggestedCompetitorWhereInput | SuggestedCompetitorWhereInput[]
    OR?: SuggestedCompetitorWhereInput[]
    NOT?: SuggestedCompetitorWhereInput | SuggestedCompetitorWhereInput[]
    domainId?: IntNullableFilter<"SuggestedCompetitor"> | number | null
    domainVersionId?: IntNullableFilter<"SuggestedCompetitor"> | number | null
    name?: StringFilter<"SuggestedCompetitor"> | string
    competitorDomain?: StringFilter<"SuggestedCompetitor"> | string
    reason?: StringFilter<"SuggestedCompetitor"> | string
    type?: StringFilter<"SuggestedCompetitor"> | string
    createdAt?: DateTimeFilter<"SuggestedCompetitor"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
  }, "id">

  export type SuggestedCompetitorOrderByWithAggregationInput = {
    id?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    name?: SortOrder
    competitorDomain?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: SuggestedCompetitorCountOrderByAggregateInput
    _avg?: SuggestedCompetitorAvgOrderByAggregateInput
    _max?: SuggestedCompetitorMaxOrderByAggregateInput
    _min?: SuggestedCompetitorMinOrderByAggregateInput
    _sum?: SuggestedCompetitorSumOrderByAggregateInput
  }

  export type SuggestedCompetitorScalarWhereWithAggregatesInput = {
    AND?: SuggestedCompetitorScalarWhereWithAggregatesInput | SuggestedCompetitorScalarWhereWithAggregatesInput[]
    OR?: SuggestedCompetitorScalarWhereWithAggregatesInput[]
    NOT?: SuggestedCompetitorScalarWhereWithAggregatesInput | SuggestedCompetitorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SuggestedCompetitor"> | number
    domainId?: IntNullableWithAggregatesFilter<"SuggestedCompetitor"> | number | null
    domainVersionId?: IntNullableWithAggregatesFilter<"SuggestedCompetitor"> | number | null
    name?: StringWithAggregatesFilter<"SuggestedCompetitor"> | string
    competitorDomain?: StringWithAggregatesFilter<"SuggestedCompetitor"> | string
    reason?: StringWithAggregatesFilter<"SuggestedCompetitor"> | string
    type?: StringWithAggregatesFilter<"SuggestedCompetitor"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SuggestedCompetitor"> | Date | string
  }

  export type OnboardingProgressWhereInput = {
    AND?: OnboardingProgressWhereInput | OnboardingProgressWhereInput[]
    OR?: OnboardingProgressWhereInput[]
    NOT?: OnboardingProgressWhereInput | OnboardingProgressWhereInput[]
    id?: IntFilter<"OnboardingProgress"> | number
    domainId?: IntNullableFilter<"OnboardingProgress"> | number | null
    domainVersionId?: IntNullableFilter<"OnboardingProgress"> | number | null
    currentStep?: IntFilter<"OnboardingProgress"> | number
    isCompleted?: BoolFilter<"OnboardingProgress"> | boolean
    stepData?: JsonNullableFilter<"OnboardingProgress">
    lastActivity?: DateTimeFilter<"OnboardingProgress"> | Date | string
    createdAt?: DateTimeFilter<"OnboardingProgress"> | Date | string
    updatedAt?: DateTimeFilter<"OnboardingProgress"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
  }

  export type OnboardingProgressOrderByWithRelationInput = {
    id?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    stepData?: SortOrderInput | SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    domain?: DomainOrderByWithRelationInput
    domainVersion?: DomainVersionOrderByWithRelationInput
  }

  export type OnboardingProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    domainId_domainVersionId?: OnboardingProgressDomainIdDomainVersionIdCompoundUniqueInput
    AND?: OnboardingProgressWhereInput | OnboardingProgressWhereInput[]
    OR?: OnboardingProgressWhereInput[]
    NOT?: OnboardingProgressWhereInput | OnboardingProgressWhereInput[]
    domainId?: IntNullableFilter<"OnboardingProgress"> | number | null
    domainVersionId?: IntNullableFilter<"OnboardingProgress"> | number | null
    currentStep?: IntFilter<"OnboardingProgress"> | number
    isCompleted?: BoolFilter<"OnboardingProgress"> | boolean
    stepData?: JsonNullableFilter<"OnboardingProgress">
    lastActivity?: DateTimeFilter<"OnboardingProgress"> | Date | string
    createdAt?: DateTimeFilter<"OnboardingProgress"> | Date | string
    updatedAt?: DateTimeFilter<"OnboardingProgress"> | Date | string
    domain?: XOR<DomainNullableRelationFilter, DomainWhereInput> | null
    domainVersion?: XOR<DomainVersionNullableRelationFilter, DomainVersionWhereInput> | null
  }, "id" | "domainId_domainVersionId">

  export type OnboardingProgressOrderByWithAggregationInput = {
    id?: SortOrder
    domainId?: SortOrderInput | SortOrder
    domainVersionId?: SortOrderInput | SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    stepData?: SortOrderInput | SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OnboardingProgressCountOrderByAggregateInput
    _avg?: OnboardingProgressAvgOrderByAggregateInput
    _max?: OnboardingProgressMaxOrderByAggregateInput
    _min?: OnboardingProgressMinOrderByAggregateInput
    _sum?: OnboardingProgressSumOrderByAggregateInput
  }

  export type OnboardingProgressScalarWhereWithAggregatesInput = {
    AND?: OnboardingProgressScalarWhereWithAggregatesInput | OnboardingProgressScalarWhereWithAggregatesInput[]
    OR?: OnboardingProgressScalarWhereWithAggregatesInput[]
    NOT?: OnboardingProgressScalarWhereWithAggregatesInput | OnboardingProgressScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OnboardingProgress"> | number
    domainId?: IntNullableWithAggregatesFilter<"OnboardingProgress"> | number | null
    domainVersionId?: IntNullableWithAggregatesFilter<"OnboardingProgress"> | number | null
    currentStep?: IntWithAggregatesFilter<"OnboardingProgress"> | number
    isCompleted?: BoolWithAggregatesFilter<"OnboardingProgress"> | boolean
    stepData?: JsonNullableWithAggregatesFilter<"OnboardingProgress">
    lastActivity?: DateTimeWithAggregatesFilter<"OnboardingProgress"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"OnboardingProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OnboardingProgress"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domains?: DomainCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domains?: DomainUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domains?: DomainUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domains?: DomainUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainCreateInput = {
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    user?: UserCreateNestedOneWithoutDomainsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainInput
    keywords?: KeywordCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainInput
    versions?: DomainVersionCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    userId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainInput
    versions?: DomainVersionUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutDomainsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainCreateManyInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    userId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
  }

  export type DomainUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DomainUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DomainVersionCreateInput = {
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutVersionsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionUncheckedCreateInput = {
    id?: number
    domainId: number
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionUpdateInput = {
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutVersionsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainVersionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainVersionCreateManyInput = {
    id?: number
    domainId: number
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DomainVersionUpdateManyMutationInput = {
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainVersionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlResultCreateInput = {
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: string
    tokenUsage?: number | null
    createdAt?: Date | string
    domain?: DomainCreateNestedOneWithoutCrawlResultsInput
    domainVersion?: DomainVersionCreateNestedOneWithoutCrawlResultsInput
  }

  export type CrawlResultUncheckedCreateInput = {
    id?: number
    domainId?: number | null
    domainVersionId?: number | null
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: string
    tokenUsage?: number | null
    createdAt?: Date | string
  }

  export type CrawlResultUpdateInput = {
    pagesScanned?: IntFieldUpdateOperationsInput | number
    contentBlocks?: IntFieldUpdateOperationsInput | number
    keyEntities?: IntFieldUpdateOperationsInput | number
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    extractedContext?: StringFieldUpdateOperationsInput | string
    tokenUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutCrawlResultsNestedInput
    domainVersion?: DomainVersionUpdateOneWithoutCrawlResultsNestedInput
  }

  export type CrawlResultUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    pagesScanned?: IntFieldUpdateOperationsInput | number
    contentBlocks?: IntFieldUpdateOperationsInput | number
    keyEntities?: IntFieldUpdateOperationsInput | number
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    extractedContext?: StringFieldUpdateOperationsInput | string
    tokenUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlResultCreateManyInput = {
    id?: number
    domainId?: number | null
    domainVersionId?: number | null
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: string
    tokenUsage?: number | null
    createdAt?: Date | string
  }

  export type CrawlResultUpdateManyMutationInput = {
    pagesScanned?: IntFieldUpdateOperationsInput | number
    contentBlocks?: IntFieldUpdateOperationsInput | number
    keyEntities?: IntFieldUpdateOperationsInput | number
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    extractedContext?: StringFieldUpdateOperationsInput | string
    tokenUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlResultUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    pagesScanned?: IntFieldUpdateOperationsInput | number
    contentBlocks?: IntFieldUpdateOperationsInput | number
    keyEntities?: IntFieldUpdateOperationsInput | number
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    extractedContext?: StringFieldUpdateOperationsInput | string
    tokenUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeywordCreateInput = {
    term: string
    volume: number
    difficulty: string
    cpc: number
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    domain?: DomainCreateNestedOneWithoutKeywordsInput
    domainVersion?: DomainVersionCreateNestedOneWithoutKeywordsInput
    phrases?: PhraseCreateNestedManyWithoutKeywordInput
  }

  export type KeywordUncheckedCreateInput = {
    id?: number
    term: string
    volume: number
    difficulty: string
    cpc: number
    domainId?: number | null
    domainVersionId?: number | null
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    phrases?: PhraseUncheckedCreateNestedManyWithoutKeywordInput
  }

  export type KeywordUpdateInput = {
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutKeywordsNestedInput
    domainVersion?: DomainVersionUpdateOneWithoutKeywordsNestedInput
    phrases?: PhraseUpdateManyWithoutKeywordNestedInput
  }

  export type KeywordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phrases?: PhraseUncheckedUpdateManyWithoutKeywordNestedInput
  }

  export type KeywordCreateManyInput = {
    id?: number
    term: string
    volume: number
    difficulty: string
    cpc: number
    domainId?: number | null
    domainVersionId?: number | null
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KeywordUpdateManyMutationInput = {
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeywordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhraseCreateInput = {
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    keyword: KeywordCreateNestedOneWithoutPhrasesInput
    aiQueryResults?: AIQueryResultCreateNestedManyWithoutPhraseInput
  }

  export type PhraseUncheckedCreateInput = {
    id?: number
    text: string
    keywordId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    aiQueryResults?: AIQueryResultUncheckedCreateNestedManyWithoutPhraseInput
  }

  export type PhraseUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keyword?: KeywordUpdateOneRequiredWithoutPhrasesNestedInput
    aiQueryResults?: AIQueryResultUpdateManyWithoutPhraseNestedInput
  }

  export type PhraseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    keywordId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiQueryResults?: AIQueryResultUncheckedUpdateManyWithoutPhraseNestedInput
  }

  export type PhraseCreateManyInput = {
    id?: number
    text: string
    keywordId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PhraseUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhraseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    keywordId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIQueryResultCreateInput = {
    model: string
    response: string
    latency: number
    cost: number
    presence: number
    relevance: number
    accuracy: number
    sentiment: number
    overall: number
    createdAt?: Date | string
    phrase: PhraseCreateNestedOneWithoutAiQueryResultsInput
  }

  export type AIQueryResultUncheckedCreateInput = {
    id?: number
    phraseId: number
    model: string
    response: string
    latency: number
    cost: number
    presence: number
    relevance: number
    accuracy: number
    sentiment: number
    overall: number
    createdAt?: Date | string
  }

  export type AIQueryResultUpdateInput = {
    model?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    latency?: FloatFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    presence?: IntFieldUpdateOperationsInput | number
    relevance?: IntFieldUpdateOperationsInput | number
    accuracy?: IntFieldUpdateOperationsInput | number
    sentiment?: IntFieldUpdateOperationsInput | number
    overall?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phrase?: PhraseUpdateOneRequiredWithoutAiQueryResultsNestedInput
  }

  export type AIQueryResultUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    phraseId?: IntFieldUpdateOperationsInput | number
    model?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    latency?: FloatFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    presence?: IntFieldUpdateOperationsInput | number
    relevance?: IntFieldUpdateOperationsInput | number
    accuracy?: IntFieldUpdateOperationsInput | number
    sentiment?: IntFieldUpdateOperationsInput | number
    overall?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIQueryResultCreateManyInput = {
    id?: number
    phraseId: number
    model: string
    response: string
    latency: number
    cost: number
    presence: number
    relevance: number
    accuracy: number
    sentiment: number
    overall: number
    createdAt?: Date | string
  }

  export type AIQueryResultUpdateManyMutationInput = {
    model?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    latency?: FloatFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    presence?: IntFieldUpdateOperationsInput | number
    relevance?: IntFieldUpdateOperationsInput | number
    accuracy?: IntFieldUpdateOperationsInput | number
    sentiment?: IntFieldUpdateOperationsInput | number
    overall?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIQueryResultUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    phraseId?: IntFieldUpdateOperationsInput | number
    model?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    latency?: FloatFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    presence?: IntFieldUpdateOperationsInput | number
    relevance?: IntFieldUpdateOperationsInput | number
    accuracy?: IntFieldUpdateOperationsInput | number
    sentiment?: IntFieldUpdateOperationsInput | number
    overall?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardAnalysisCreateInput = {
    metrics: JsonNullValueInput | InputJsonValue
    insights: JsonNullValueInput | InputJsonValue
    industryAnalysis: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    domain?: DomainCreateNestedOneWithoutDashboardAnalysesInput
    domainVersion?: DomainVersionCreateNestedOneWithoutDashboardAnalysesInput
  }

  export type DashboardAnalysisUncheckedCreateInput = {
    id?: number
    domainId?: number | null
    domainVersionId?: number | null
    metrics: JsonNullValueInput | InputJsonValue
    insights: JsonNullValueInput | InputJsonValue
    industryAnalysis: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DashboardAnalysisUpdateInput = {
    metrics?: JsonNullValueInput | InputJsonValue
    insights?: JsonNullValueInput | InputJsonValue
    industryAnalysis?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutDashboardAnalysesNestedInput
    domainVersion?: DomainVersionUpdateOneWithoutDashboardAnalysesNestedInput
  }

  export type DashboardAnalysisUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    metrics?: JsonNullValueInput | InputJsonValue
    insights?: JsonNullValueInput | InputJsonValue
    industryAnalysis?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardAnalysisCreateManyInput = {
    id?: number
    domainId?: number | null
    domainVersionId?: number | null
    metrics: JsonNullValueInput | InputJsonValue
    insights: JsonNullValueInput | InputJsonValue
    industryAnalysis: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DashboardAnalysisUpdateManyMutationInput = {
    metrics?: JsonNullValueInput | InputJsonValue
    insights?: JsonNullValueInput | InputJsonValue
    industryAnalysis?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardAnalysisUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    metrics?: JsonNullValueInput | InputJsonValue
    insights?: JsonNullValueInput | InputJsonValue
    industryAnalysis?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetitorAnalysisCreateInput = {
    competitors: JsonNullValueInput | InputJsonValue
    marketInsights: JsonNullValueInput | InputJsonValue
    strategicRecommendations: JsonNullValueInput | InputJsonValue
    competitiveAnalysis: JsonNullValueInput | InputJsonValue
    competitorList: string
    createdAt?: Date | string
    updatedAt?: Date | string
    domain?: DomainCreateNestedOneWithoutCompetitorAnalysesInput
    domainVersion?: DomainVersionCreateNestedOneWithoutCompetitorAnalysesInput
  }

  export type CompetitorAnalysisUncheckedCreateInput = {
    id?: number
    domainId?: number | null
    domainVersionId?: number | null
    competitors: JsonNullValueInput | InputJsonValue
    marketInsights: JsonNullValueInput | InputJsonValue
    strategicRecommendations: JsonNullValueInput | InputJsonValue
    competitiveAnalysis: JsonNullValueInput | InputJsonValue
    competitorList: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompetitorAnalysisUpdateInput = {
    competitors?: JsonNullValueInput | InputJsonValue
    marketInsights?: JsonNullValueInput | InputJsonValue
    strategicRecommendations?: JsonNullValueInput | InputJsonValue
    competitiveAnalysis?: JsonNullValueInput | InputJsonValue
    competitorList?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutCompetitorAnalysesNestedInput
    domainVersion?: DomainVersionUpdateOneWithoutCompetitorAnalysesNestedInput
  }

  export type CompetitorAnalysisUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    competitors?: JsonNullValueInput | InputJsonValue
    marketInsights?: JsonNullValueInput | InputJsonValue
    strategicRecommendations?: JsonNullValueInput | InputJsonValue
    competitiveAnalysis?: JsonNullValueInput | InputJsonValue
    competitorList?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetitorAnalysisCreateManyInput = {
    id?: number
    domainId?: number | null
    domainVersionId?: number | null
    competitors: JsonNullValueInput | InputJsonValue
    marketInsights: JsonNullValueInput | InputJsonValue
    strategicRecommendations: JsonNullValueInput | InputJsonValue
    competitiveAnalysis: JsonNullValueInput | InputJsonValue
    competitorList: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompetitorAnalysisUpdateManyMutationInput = {
    competitors?: JsonNullValueInput | InputJsonValue
    marketInsights?: JsonNullValueInput | InputJsonValue
    strategicRecommendations?: JsonNullValueInput | InputJsonValue
    competitiveAnalysis?: JsonNullValueInput | InputJsonValue
    competitorList?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetitorAnalysisUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    competitors?: JsonNullValueInput | InputJsonValue
    marketInsights?: JsonNullValueInput | InputJsonValue
    strategicRecommendations?: JsonNullValueInput | InputJsonValue
    competitiveAnalysis?: JsonNullValueInput | InputJsonValue
    competitorList?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestedCompetitorCreateInput = {
    name: string
    competitorDomain: string
    reason: string
    type: string
    createdAt?: Date | string
    domain?: DomainCreateNestedOneWithoutSuggestedCompetitorsInput
    domainVersion?: DomainVersionCreateNestedOneWithoutSuggestedCompetitorsInput
  }

  export type SuggestedCompetitorUncheckedCreateInput = {
    id?: number
    domainId?: number | null
    domainVersionId?: number | null
    name: string
    competitorDomain: string
    reason: string
    type: string
    createdAt?: Date | string
  }

  export type SuggestedCompetitorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    competitorDomain?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutSuggestedCompetitorsNestedInput
    domainVersion?: DomainVersionUpdateOneWithoutSuggestedCompetitorsNestedInput
  }

  export type SuggestedCompetitorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    competitorDomain?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestedCompetitorCreateManyInput = {
    id?: number
    domainId?: number | null
    domainVersionId?: number | null
    name: string
    competitorDomain: string
    reason: string
    type: string
    createdAt?: Date | string
  }

  export type SuggestedCompetitorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    competitorDomain?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestedCompetitorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    competitorDomain?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingProgressCreateInput = {
    currentStep?: number
    isCompleted?: boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    domain?: DomainCreateNestedOneWithoutOnboardingProgressesInput
    domainVersion?: DomainVersionCreateNestedOneWithoutOnboardingProgressesInput
  }

  export type OnboardingProgressUncheckedCreateInput = {
    id?: number
    domainId?: number | null
    domainVersionId?: number | null
    currentStep?: number
    isCompleted?: boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OnboardingProgressUpdateInput = {
    currentStep?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutOnboardingProgressesNestedInput
    domainVersion?: DomainVersionUpdateOneWithoutOnboardingProgressesNestedInput
  }

  export type OnboardingProgressUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    currentStep?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingProgressCreateManyInput = {
    id?: number
    domainId?: number | null
    domainVersionId?: number | null
    currentStep?: number
    isCompleted?: boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OnboardingProgressUpdateManyMutationInput = {
    currentStep?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingProgressUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    currentStep?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DomainListRelationFilter = {
    every?: DomainWhereInput
    some?: DomainWhereInput
    none?: DomainWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DomainOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CrawlResultListRelationFilter = {
    every?: CrawlResultWhereInput
    some?: CrawlResultWhereInput
    none?: CrawlResultWhereInput
  }

  export type KeywordListRelationFilter = {
    every?: KeywordWhereInput
    some?: KeywordWhereInput
    none?: KeywordWhereInput
  }

  export type DashboardAnalysisListRelationFilter = {
    every?: DashboardAnalysisWhereInput
    some?: DashboardAnalysisWhereInput
    none?: DashboardAnalysisWhereInput
  }

  export type CompetitorAnalysisListRelationFilter = {
    every?: CompetitorAnalysisWhereInput
    some?: CompetitorAnalysisWhereInput
    none?: CompetitorAnalysisWhereInput
  }

  export type SuggestedCompetitorListRelationFilter = {
    every?: SuggestedCompetitorWhereInput
    some?: SuggestedCompetitorWhereInput
    none?: SuggestedCompetitorWhereInput
  }

  export type OnboardingProgressListRelationFilter = {
    every?: OnboardingProgressWhereInput
    some?: OnboardingProgressWhereInput
    none?: OnboardingProgressWhereInput
  }

  export type DomainVersionListRelationFilter = {
    every?: DomainVersionWhereInput
    some?: DomainVersionWhereInput
    none?: DomainVersionWhereInput
  }

  export type CrawlResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KeywordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DashboardAnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompetitorAnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SuggestedCompetitorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OnboardingProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DomainVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DomainCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    context?: SortOrder
    version?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: SortOrder
  }

  export type DomainAvgOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    userId?: SortOrder
  }

  export type DomainMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    context?: SortOrder
    version?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: SortOrder
  }

  export type DomainMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    context?: SortOrder
    version?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    location?: SortOrder
  }

  export type DomainSumOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
    userId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DomainRelationFilter = {
    is?: DomainWhereInput
    isNot?: DomainWhereInput
  }

  export type DomainVersionDomainIdVersionCompoundUniqueInput = {
    domainId: number
    version: number
  }

  export type DomainVersionCountOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    version?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainVersionAvgOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    version?: SortOrder
  }

  export type DomainVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    version?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainVersionMinOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    version?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainVersionSumOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    version?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DomainNullableRelationFilter = {
    is?: DomainWhereInput | null
    isNot?: DomainWhereInput | null
  }

  export type DomainVersionNullableRelationFilter = {
    is?: DomainVersionWhereInput | null
    isNot?: DomainVersionWhereInput | null
  }

  export type CrawlResultCountOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    pagesScanned?: SortOrder
    contentBlocks?: SortOrder
    keyEntities?: SortOrder
    confidenceScore?: SortOrder
    extractedContext?: SortOrder
    tokenUsage?: SortOrder
    createdAt?: SortOrder
  }

  export type CrawlResultAvgOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    pagesScanned?: SortOrder
    contentBlocks?: SortOrder
    keyEntities?: SortOrder
    confidenceScore?: SortOrder
    tokenUsage?: SortOrder
  }

  export type CrawlResultMaxOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    pagesScanned?: SortOrder
    contentBlocks?: SortOrder
    keyEntities?: SortOrder
    confidenceScore?: SortOrder
    extractedContext?: SortOrder
    tokenUsage?: SortOrder
    createdAt?: SortOrder
  }

  export type CrawlResultMinOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    pagesScanned?: SortOrder
    contentBlocks?: SortOrder
    keyEntities?: SortOrder
    confidenceScore?: SortOrder
    extractedContext?: SortOrder
    tokenUsage?: SortOrder
    createdAt?: SortOrder
  }

  export type CrawlResultSumOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    pagesScanned?: SortOrder
    contentBlocks?: SortOrder
    keyEntities?: SortOrder
    confidenceScore?: SortOrder
    tokenUsage?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PhraseListRelationFilter = {
    every?: PhraseWhereInput
    some?: PhraseWhereInput
    none?: PhraseWhereInput
  }

  export type PhraseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KeywordTermDomainIdDomainVersionIdCompoundUniqueInput = {
    term: string
    domainId: number
    domainVersionId: number
  }

  export type KeywordCountOrderByAggregateInput = {
    id?: SortOrder
    term?: SortOrder
    volume?: SortOrder
    difficulty?: SortOrder
    cpc?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    isSelected?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KeywordAvgOrderByAggregateInput = {
    id?: SortOrder
    volume?: SortOrder
    cpc?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
  }

  export type KeywordMaxOrderByAggregateInput = {
    id?: SortOrder
    term?: SortOrder
    volume?: SortOrder
    difficulty?: SortOrder
    cpc?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    isSelected?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KeywordMinOrderByAggregateInput = {
    id?: SortOrder
    term?: SortOrder
    volume?: SortOrder
    difficulty?: SortOrder
    cpc?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    isSelected?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KeywordSumOrderByAggregateInput = {
    id?: SortOrder
    volume?: SortOrder
    cpc?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type KeywordRelationFilter = {
    is?: KeywordWhereInput
    isNot?: KeywordWhereInput
  }

  export type AIQueryResultListRelationFilter = {
    every?: AIQueryResultWhereInput
    some?: AIQueryResultWhereInput
    none?: AIQueryResultWhereInput
  }

  export type AIQueryResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PhraseCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    keywordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhraseAvgOrderByAggregateInput = {
    id?: SortOrder
    keywordId?: SortOrder
  }

  export type PhraseMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    keywordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhraseMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    keywordId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhraseSumOrderByAggregateInput = {
    id?: SortOrder
    keywordId?: SortOrder
  }

  export type PhraseRelationFilter = {
    is?: PhraseWhereInput
    isNot?: PhraseWhereInput
  }

  export type AIQueryResultCountOrderByAggregateInput = {
    id?: SortOrder
    phraseId?: SortOrder
    model?: SortOrder
    response?: SortOrder
    latency?: SortOrder
    cost?: SortOrder
    presence?: SortOrder
    relevance?: SortOrder
    accuracy?: SortOrder
    sentiment?: SortOrder
    overall?: SortOrder
    createdAt?: SortOrder
  }

  export type AIQueryResultAvgOrderByAggregateInput = {
    id?: SortOrder
    phraseId?: SortOrder
    latency?: SortOrder
    cost?: SortOrder
    presence?: SortOrder
    relevance?: SortOrder
    accuracy?: SortOrder
    sentiment?: SortOrder
    overall?: SortOrder
  }

  export type AIQueryResultMaxOrderByAggregateInput = {
    id?: SortOrder
    phraseId?: SortOrder
    model?: SortOrder
    response?: SortOrder
    latency?: SortOrder
    cost?: SortOrder
    presence?: SortOrder
    relevance?: SortOrder
    accuracy?: SortOrder
    sentiment?: SortOrder
    overall?: SortOrder
    createdAt?: SortOrder
  }

  export type AIQueryResultMinOrderByAggregateInput = {
    id?: SortOrder
    phraseId?: SortOrder
    model?: SortOrder
    response?: SortOrder
    latency?: SortOrder
    cost?: SortOrder
    presence?: SortOrder
    relevance?: SortOrder
    accuracy?: SortOrder
    sentiment?: SortOrder
    overall?: SortOrder
    createdAt?: SortOrder
  }

  export type AIQueryResultSumOrderByAggregateInput = {
    id?: SortOrder
    phraseId?: SortOrder
    latency?: SortOrder
    cost?: SortOrder
    presence?: SortOrder
    relevance?: SortOrder
    accuracy?: SortOrder
    sentiment?: SortOrder
    overall?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DashboardAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    metrics?: SortOrder
    insights?: SortOrder
    industryAnalysis?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DashboardAnalysisAvgOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
  }

  export type DashboardAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DashboardAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DashboardAnalysisSumOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type CompetitorAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    competitors?: SortOrder
    marketInsights?: SortOrder
    strategicRecommendations?: SortOrder
    competitiveAnalysis?: SortOrder
    competitorList?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompetitorAnalysisAvgOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
  }

  export type CompetitorAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    competitorList?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompetitorAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    competitorList?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompetitorAnalysisSumOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
  }

  export type SuggestedCompetitorCountOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    name?: SortOrder
    competitorDomain?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type SuggestedCompetitorAvgOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
  }

  export type SuggestedCompetitorMaxOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    name?: SortOrder
    competitorDomain?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type SuggestedCompetitorMinOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    name?: SortOrder
    competitorDomain?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type SuggestedCompetitorSumOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type OnboardingProgressDomainIdDomainVersionIdCompoundUniqueInput = {
    domainId: number
    domainVersionId: number
  }

  export type OnboardingProgressCountOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    stepData?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OnboardingProgressAvgOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    currentStep?: SortOrder
  }

  export type OnboardingProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OnboardingProgressMinOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OnboardingProgressSumOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    domainVersionId?: SortOrder
    currentStep?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DomainCreateNestedManyWithoutUserInput = {
    create?: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput> | DomainCreateWithoutUserInput[] | DomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutUserInput | DomainCreateOrConnectWithoutUserInput[]
    createMany?: DomainCreateManyUserInputEnvelope
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
  }

  export type DomainUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput> | DomainCreateWithoutUserInput[] | DomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutUserInput | DomainCreateOrConnectWithoutUserInput[]
    createMany?: DomainCreateManyUserInputEnvelope
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DomainUpdateManyWithoutUserNestedInput = {
    create?: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput> | DomainCreateWithoutUserInput[] | DomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutUserInput | DomainCreateOrConnectWithoutUserInput[]
    upsert?: DomainUpsertWithWhereUniqueWithoutUserInput | DomainUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DomainCreateManyUserInputEnvelope
    set?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    disconnect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    delete?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    update?: DomainUpdateWithWhereUniqueWithoutUserInput | DomainUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DomainUpdateManyWithWhereWithoutUserInput | DomainUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DomainScalarWhereInput | DomainScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DomainUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput> | DomainCreateWithoutUserInput[] | DomainUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutUserInput | DomainCreateOrConnectWithoutUserInput[]
    upsert?: DomainUpsertWithWhereUniqueWithoutUserInput | DomainUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DomainCreateManyUserInputEnvelope
    set?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    disconnect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    delete?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    update?: DomainUpdateWithWhereUniqueWithoutUserInput | DomainUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DomainUpdateManyWithWhereWithoutUserInput | DomainUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DomainScalarWhereInput | DomainScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDomainsInput = {
    create?: XOR<UserCreateWithoutDomainsInput, UserUncheckedCreateWithoutDomainsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDomainsInput
    connect?: UserWhereUniqueInput
  }

  export type CrawlResultCreateNestedManyWithoutDomainInput = {
    create?: XOR<CrawlResultCreateWithoutDomainInput, CrawlResultUncheckedCreateWithoutDomainInput> | CrawlResultCreateWithoutDomainInput[] | CrawlResultUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CrawlResultCreateOrConnectWithoutDomainInput | CrawlResultCreateOrConnectWithoutDomainInput[]
    createMany?: CrawlResultCreateManyDomainInputEnvelope
    connect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
  }

  export type KeywordCreateNestedManyWithoutDomainInput = {
    create?: XOR<KeywordCreateWithoutDomainInput, KeywordUncheckedCreateWithoutDomainInput> | KeywordCreateWithoutDomainInput[] | KeywordUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: KeywordCreateOrConnectWithoutDomainInput | KeywordCreateOrConnectWithoutDomainInput[]
    createMany?: KeywordCreateManyDomainInputEnvelope
    connect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
  }

  export type DashboardAnalysisCreateNestedManyWithoutDomainInput = {
    create?: XOR<DashboardAnalysisCreateWithoutDomainInput, DashboardAnalysisUncheckedCreateWithoutDomainInput> | DashboardAnalysisCreateWithoutDomainInput[] | DashboardAnalysisUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: DashboardAnalysisCreateOrConnectWithoutDomainInput | DashboardAnalysisCreateOrConnectWithoutDomainInput[]
    createMany?: DashboardAnalysisCreateManyDomainInputEnvelope
    connect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
  }

  export type CompetitorAnalysisCreateNestedManyWithoutDomainInput = {
    create?: XOR<CompetitorAnalysisCreateWithoutDomainInput, CompetitorAnalysisUncheckedCreateWithoutDomainInput> | CompetitorAnalysisCreateWithoutDomainInput[] | CompetitorAnalysisUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CompetitorAnalysisCreateOrConnectWithoutDomainInput | CompetitorAnalysisCreateOrConnectWithoutDomainInput[]
    createMany?: CompetitorAnalysisCreateManyDomainInputEnvelope
    connect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
  }

  export type SuggestedCompetitorCreateNestedManyWithoutDomainInput = {
    create?: XOR<SuggestedCompetitorCreateWithoutDomainInput, SuggestedCompetitorUncheckedCreateWithoutDomainInput> | SuggestedCompetitorCreateWithoutDomainInput[] | SuggestedCompetitorUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: SuggestedCompetitorCreateOrConnectWithoutDomainInput | SuggestedCompetitorCreateOrConnectWithoutDomainInput[]
    createMany?: SuggestedCompetitorCreateManyDomainInputEnvelope
    connect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
  }

  export type OnboardingProgressCreateNestedManyWithoutDomainInput = {
    create?: XOR<OnboardingProgressCreateWithoutDomainInput, OnboardingProgressUncheckedCreateWithoutDomainInput> | OnboardingProgressCreateWithoutDomainInput[] | OnboardingProgressUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: OnboardingProgressCreateOrConnectWithoutDomainInput | OnboardingProgressCreateOrConnectWithoutDomainInput[]
    createMany?: OnboardingProgressCreateManyDomainInputEnvelope
    connect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
  }

  export type DomainVersionCreateNestedManyWithoutDomainInput = {
    create?: XOR<DomainVersionCreateWithoutDomainInput, DomainVersionUncheckedCreateWithoutDomainInput> | DomainVersionCreateWithoutDomainInput[] | DomainVersionUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: DomainVersionCreateOrConnectWithoutDomainInput | DomainVersionCreateOrConnectWithoutDomainInput[]
    createMany?: DomainVersionCreateManyDomainInputEnvelope
    connect?: DomainVersionWhereUniqueInput | DomainVersionWhereUniqueInput[]
  }

  export type CrawlResultUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<CrawlResultCreateWithoutDomainInput, CrawlResultUncheckedCreateWithoutDomainInput> | CrawlResultCreateWithoutDomainInput[] | CrawlResultUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CrawlResultCreateOrConnectWithoutDomainInput | CrawlResultCreateOrConnectWithoutDomainInput[]
    createMany?: CrawlResultCreateManyDomainInputEnvelope
    connect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
  }

  export type KeywordUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<KeywordCreateWithoutDomainInput, KeywordUncheckedCreateWithoutDomainInput> | KeywordCreateWithoutDomainInput[] | KeywordUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: KeywordCreateOrConnectWithoutDomainInput | KeywordCreateOrConnectWithoutDomainInput[]
    createMany?: KeywordCreateManyDomainInputEnvelope
    connect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
  }

  export type DashboardAnalysisUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<DashboardAnalysisCreateWithoutDomainInput, DashboardAnalysisUncheckedCreateWithoutDomainInput> | DashboardAnalysisCreateWithoutDomainInput[] | DashboardAnalysisUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: DashboardAnalysisCreateOrConnectWithoutDomainInput | DashboardAnalysisCreateOrConnectWithoutDomainInput[]
    createMany?: DashboardAnalysisCreateManyDomainInputEnvelope
    connect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
  }

  export type CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<CompetitorAnalysisCreateWithoutDomainInput, CompetitorAnalysisUncheckedCreateWithoutDomainInput> | CompetitorAnalysisCreateWithoutDomainInput[] | CompetitorAnalysisUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CompetitorAnalysisCreateOrConnectWithoutDomainInput | CompetitorAnalysisCreateOrConnectWithoutDomainInput[]
    createMany?: CompetitorAnalysisCreateManyDomainInputEnvelope
    connect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
  }

  export type SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<SuggestedCompetitorCreateWithoutDomainInput, SuggestedCompetitorUncheckedCreateWithoutDomainInput> | SuggestedCompetitorCreateWithoutDomainInput[] | SuggestedCompetitorUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: SuggestedCompetitorCreateOrConnectWithoutDomainInput | SuggestedCompetitorCreateOrConnectWithoutDomainInput[]
    createMany?: SuggestedCompetitorCreateManyDomainInputEnvelope
    connect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
  }

  export type OnboardingProgressUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<OnboardingProgressCreateWithoutDomainInput, OnboardingProgressUncheckedCreateWithoutDomainInput> | OnboardingProgressCreateWithoutDomainInput[] | OnboardingProgressUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: OnboardingProgressCreateOrConnectWithoutDomainInput | OnboardingProgressCreateOrConnectWithoutDomainInput[]
    createMany?: OnboardingProgressCreateManyDomainInputEnvelope
    connect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
  }

  export type DomainVersionUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<DomainVersionCreateWithoutDomainInput, DomainVersionUncheckedCreateWithoutDomainInput> | DomainVersionCreateWithoutDomainInput[] | DomainVersionUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: DomainVersionCreateOrConnectWithoutDomainInput | DomainVersionCreateOrConnectWithoutDomainInput[]
    createMany?: DomainVersionCreateManyDomainInputEnvelope
    connect?: DomainVersionWhereUniqueInput | DomainVersionWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutDomainsNestedInput = {
    create?: XOR<UserCreateWithoutDomainsInput, UserUncheckedCreateWithoutDomainsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDomainsInput
    upsert?: UserUpsertWithoutDomainsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDomainsInput, UserUpdateWithoutDomainsInput>, UserUncheckedUpdateWithoutDomainsInput>
  }

  export type CrawlResultUpdateManyWithoutDomainNestedInput = {
    create?: XOR<CrawlResultCreateWithoutDomainInput, CrawlResultUncheckedCreateWithoutDomainInput> | CrawlResultCreateWithoutDomainInput[] | CrawlResultUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CrawlResultCreateOrConnectWithoutDomainInput | CrawlResultCreateOrConnectWithoutDomainInput[]
    upsert?: CrawlResultUpsertWithWhereUniqueWithoutDomainInput | CrawlResultUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: CrawlResultCreateManyDomainInputEnvelope
    set?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    disconnect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    delete?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    connect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    update?: CrawlResultUpdateWithWhereUniqueWithoutDomainInput | CrawlResultUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: CrawlResultUpdateManyWithWhereWithoutDomainInput | CrawlResultUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: CrawlResultScalarWhereInput | CrawlResultScalarWhereInput[]
  }

  export type KeywordUpdateManyWithoutDomainNestedInput = {
    create?: XOR<KeywordCreateWithoutDomainInput, KeywordUncheckedCreateWithoutDomainInput> | KeywordCreateWithoutDomainInput[] | KeywordUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: KeywordCreateOrConnectWithoutDomainInput | KeywordCreateOrConnectWithoutDomainInput[]
    upsert?: KeywordUpsertWithWhereUniqueWithoutDomainInput | KeywordUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: KeywordCreateManyDomainInputEnvelope
    set?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    disconnect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    delete?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    connect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    update?: KeywordUpdateWithWhereUniqueWithoutDomainInput | KeywordUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: KeywordUpdateManyWithWhereWithoutDomainInput | KeywordUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: KeywordScalarWhereInput | KeywordScalarWhereInput[]
  }

  export type DashboardAnalysisUpdateManyWithoutDomainNestedInput = {
    create?: XOR<DashboardAnalysisCreateWithoutDomainInput, DashboardAnalysisUncheckedCreateWithoutDomainInput> | DashboardAnalysisCreateWithoutDomainInput[] | DashboardAnalysisUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: DashboardAnalysisCreateOrConnectWithoutDomainInput | DashboardAnalysisCreateOrConnectWithoutDomainInput[]
    upsert?: DashboardAnalysisUpsertWithWhereUniqueWithoutDomainInput | DashboardAnalysisUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: DashboardAnalysisCreateManyDomainInputEnvelope
    set?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    disconnect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    delete?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    connect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    update?: DashboardAnalysisUpdateWithWhereUniqueWithoutDomainInput | DashboardAnalysisUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: DashboardAnalysisUpdateManyWithWhereWithoutDomainInput | DashboardAnalysisUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: DashboardAnalysisScalarWhereInput | DashboardAnalysisScalarWhereInput[]
  }

  export type CompetitorAnalysisUpdateManyWithoutDomainNestedInput = {
    create?: XOR<CompetitorAnalysisCreateWithoutDomainInput, CompetitorAnalysisUncheckedCreateWithoutDomainInput> | CompetitorAnalysisCreateWithoutDomainInput[] | CompetitorAnalysisUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CompetitorAnalysisCreateOrConnectWithoutDomainInput | CompetitorAnalysisCreateOrConnectWithoutDomainInput[]
    upsert?: CompetitorAnalysisUpsertWithWhereUniqueWithoutDomainInput | CompetitorAnalysisUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: CompetitorAnalysisCreateManyDomainInputEnvelope
    set?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    disconnect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    delete?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    connect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    update?: CompetitorAnalysisUpdateWithWhereUniqueWithoutDomainInput | CompetitorAnalysisUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: CompetitorAnalysisUpdateManyWithWhereWithoutDomainInput | CompetitorAnalysisUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: CompetitorAnalysisScalarWhereInput | CompetitorAnalysisScalarWhereInput[]
  }

  export type SuggestedCompetitorUpdateManyWithoutDomainNestedInput = {
    create?: XOR<SuggestedCompetitorCreateWithoutDomainInput, SuggestedCompetitorUncheckedCreateWithoutDomainInput> | SuggestedCompetitorCreateWithoutDomainInput[] | SuggestedCompetitorUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: SuggestedCompetitorCreateOrConnectWithoutDomainInput | SuggestedCompetitorCreateOrConnectWithoutDomainInput[]
    upsert?: SuggestedCompetitorUpsertWithWhereUniqueWithoutDomainInput | SuggestedCompetitorUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: SuggestedCompetitorCreateManyDomainInputEnvelope
    set?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    disconnect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    delete?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    connect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    update?: SuggestedCompetitorUpdateWithWhereUniqueWithoutDomainInput | SuggestedCompetitorUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: SuggestedCompetitorUpdateManyWithWhereWithoutDomainInput | SuggestedCompetitorUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: SuggestedCompetitorScalarWhereInput | SuggestedCompetitorScalarWhereInput[]
  }

  export type OnboardingProgressUpdateManyWithoutDomainNestedInput = {
    create?: XOR<OnboardingProgressCreateWithoutDomainInput, OnboardingProgressUncheckedCreateWithoutDomainInput> | OnboardingProgressCreateWithoutDomainInput[] | OnboardingProgressUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: OnboardingProgressCreateOrConnectWithoutDomainInput | OnboardingProgressCreateOrConnectWithoutDomainInput[]
    upsert?: OnboardingProgressUpsertWithWhereUniqueWithoutDomainInput | OnboardingProgressUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: OnboardingProgressCreateManyDomainInputEnvelope
    set?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    disconnect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    delete?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    connect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    update?: OnboardingProgressUpdateWithWhereUniqueWithoutDomainInput | OnboardingProgressUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: OnboardingProgressUpdateManyWithWhereWithoutDomainInput | OnboardingProgressUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: OnboardingProgressScalarWhereInput | OnboardingProgressScalarWhereInput[]
  }

  export type DomainVersionUpdateManyWithoutDomainNestedInput = {
    create?: XOR<DomainVersionCreateWithoutDomainInput, DomainVersionUncheckedCreateWithoutDomainInput> | DomainVersionCreateWithoutDomainInput[] | DomainVersionUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: DomainVersionCreateOrConnectWithoutDomainInput | DomainVersionCreateOrConnectWithoutDomainInput[]
    upsert?: DomainVersionUpsertWithWhereUniqueWithoutDomainInput | DomainVersionUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: DomainVersionCreateManyDomainInputEnvelope
    set?: DomainVersionWhereUniqueInput | DomainVersionWhereUniqueInput[]
    disconnect?: DomainVersionWhereUniqueInput | DomainVersionWhereUniqueInput[]
    delete?: DomainVersionWhereUniqueInput | DomainVersionWhereUniqueInput[]
    connect?: DomainVersionWhereUniqueInput | DomainVersionWhereUniqueInput[]
    update?: DomainVersionUpdateWithWhereUniqueWithoutDomainInput | DomainVersionUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: DomainVersionUpdateManyWithWhereWithoutDomainInput | DomainVersionUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: DomainVersionScalarWhereInput | DomainVersionScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CrawlResultUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<CrawlResultCreateWithoutDomainInput, CrawlResultUncheckedCreateWithoutDomainInput> | CrawlResultCreateWithoutDomainInput[] | CrawlResultUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CrawlResultCreateOrConnectWithoutDomainInput | CrawlResultCreateOrConnectWithoutDomainInput[]
    upsert?: CrawlResultUpsertWithWhereUniqueWithoutDomainInput | CrawlResultUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: CrawlResultCreateManyDomainInputEnvelope
    set?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    disconnect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    delete?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    connect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    update?: CrawlResultUpdateWithWhereUniqueWithoutDomainInput | CrawlResultUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: CrawlResultUpdateManyWithWhereWithoutDomainInput | CrawlResultUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: CrawlResultScalarWhereInput | CrawlResultScalarWhereInput[]
  }

  export type KeywordUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<KeywordCreateWithoutDomainInput, KeywordUncheckedCreateWithoutDomainInput> | KeywordCreateWithoutDomainInput[] | KeywordUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: KeywordCreateOrConnectWithoutDomainInput | KeywordCreateOrConnectWithoutDomainInput[]
    upsert?: KeywordUpsertWithWhereUniqueWithoutDomainInput | KeywordUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: KeywordCreateManyDomainInputEnvelope
    set?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    disconnect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    delete?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    connect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    update?: KeywordUpdateWithWhereUniqueWithoutDomainInput | KeywordUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: KeywordUpdateManyWithWhereWithoutDomainInput | KeywordUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: KeywordScalarWhereInput | KeywordScalarWhereInput[]
  }

  export type DashboardAnalysisUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<DashboardAnalysisCreateWithoutDomainInput, DashboardAnalysisUncheckedCreateWithoutDomainInput> | DashboardAnalysisCreateWithoutDomainInput[] | DashboardAnalysisUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: DashboardAnalysisCreateOrConnectWithoutDomainInput | DashboardAnalysisCreateOrConnectWithoutDomainInput[]
    upsert?: DashboardAnalysisUpsertWithWhereUniqueWithoutDomainInput | DashboardAnalysisUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: DashboardAnalysisCreateManyDomainInputEnvelope
    set?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    disconnect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    delete?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    connect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    update?: DashboardAnalysisUpdateWithWhereUniqueWithoutDomainInput | DashboardAnalysisUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: DashboardAnalysisUpdateManyWithWhereWithoutDomainInput | DashboardAnalysisUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: DashboardAnalysisScalarWhereInput | DashboardAnalysisScalarWhereInput[]
  }

  export type CompetitorAnalysisUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<CompetitorAnalysisCreateWithoutDomainInput, CompetitorAnalysisUncheckedCreateWithoutDomainInput> | CompetitorAnalysisCreateWithoutDomainInput[] | CompetitorAnalysisUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: CompetitorAnalysisCreateOrConnectWithoutDomainInput | CompetitorAnalysisCreateOrConnectWithoutDomainInput[]
    upsert?: CompetitorAnalysisUpsertWithWhereUniqueWithoutDomainInput | CompetitorAnalysisUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: CompetitorAnalysisCreateManyDomainInputEnvelope
    set?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    disconnect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    delete?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    connect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    update?: CompetitorAnalysisUpdateWithWhereUniqueWithoutDomainInput | CompetitorAnalysisUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: CompetitorAnalysisUpdateManyWithWhereWithoutDomainInput | CompetitorAnalysisUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: CompetitorAnalysisScalarWhereInput | CompetitorAnalysisScalarWhereInput[]
  }

  export type SuggestedCompetitorUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<SuggestedCompetitorCreateWithoutDomainInput, SuggestedCompetitorUncheckedCreateWithoutDomainInput> | SuggestedCompetitorCreateWithoutDomainInput[] | SuggestedCompetitorUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: SuggestedCompetitorCreateOrConnectWithoutDomainInput | SuggestedCompetitorCreateOrConnectWithoutDomainInput[]
    upsert?: SuggestedCompetitorUpsertWithWhereUniqueWithoutDomainInput | SuggestedCompetitorUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: SuggestedCompetitorCreateManyDomainInputEnvelope
    set?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    disconnect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    delete?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    connect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    update?: SuggestedCompetitorUpdateWithWhereUniqueWithoutDomainInput | SuggestedCompetitorUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: SuggestedCompetitorUpdateManyWithWhereWithoutDomainInput | SuggestedCompetitorUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: SuggestedCompetitorScalarWhereInput | SuggestedCompetitorScalarWhereInput[]
  }

  export type OnboardingProgressUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<OnboardingProgressCreateWithoutDomainInput, OnboardingProgressUncheckedCreateWithoutDomainInput> | OnboardingProgressCreateWithoutDomainInput[] | OnboardingProgressUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: OnboardingProgressCreateOrConnectWithoutDomainInput | OnboardingProgressCreateOrConnectWithoutDomainInput[]
    upsert?: OnboardingProgressUpsertWithWhereUniqueWithoutDomainInput | OnboardingProgressUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: OnboardingProgressCreateManyDomainInputEnvelope
    set?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    disconnect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    delete?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    connect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    update?: OnboardingProgressUpdateWithWhereUniqueWithoutDomainInput | OnboardingProgressUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: OnboardingProgressUpdateManyWithWhereWithoutDomainInput | OnboardingProgressUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: OnboardingProgressScalarWhereInput | OnboardingProgressScalarWhereInput[]
  }

  export type DomainVersionUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: XOR<DomainVersionCreateWithoutDomainInput, DomainVersionUncheckedCreateWithoutDomainInput> | DomainVersionCreateWithoutDomainInput[] | DomainVersionUncheckedCreateWithoutDomainInput[]
    connectOrCreate?: DomainVersionCreateOrConnectWithoutDomainInput | DomainVersionCreateOrConnectWithoutDomainInput[]
    upsert?: DomainVersionUpsertWithWhereUniqueWithoutDomainInput | DomainVersionUpsertWithWhereUniqueWithoutDomainInput[]
    createMany?: DomainVersionCreateManyDomainInputEnvelope
    set?: DomainVersionWhereUniqueInput | DomainVersionWhereUniqueInput[]
    disconnect?: DomainVersionWhereUniqueInput | DomainVersionWhereUniqueInput[]
    delete?: DomainVersionWhereUniqueInput | DomainVersionWhereUniqueInput[]
    connect?: DomainVersionWhereUniqueInput | DomainVersionWhereUniqueInput[]
    update?: DomainVersionUpdateWithWhereUniqueWithoutDomainInput | DomainVersionUpdateWithWhereUniqueWithoutDomainInput[]
    updateMany?: DomainVersionUpdateManyWithWhereWithoutDomainInput | DomainVersionUpdateManyWithWhereWithoutDomainInput[]
    deleteMany?: DomainVersionScalarWhereInput | DomainVersionScalarWhereInput[]
  }

  export type DomainCreateNestedOneWithoutVersionsInput = {
    create?: XOR<DomainCreateWithoutVersionsInput, DomainUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutVersionsInput
    connect?: DomainWhereUniqueInput
  }

  export type CrawlResultCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<CrawlResultCreateWithoutDomainVersionInput, CrawlResultUncheckedCreateWithoutDomainVersionInput> | CrawlResultCreateWithoutDomainVersionInput[] | CrawlResultUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: CrawlResultCreateOrConnectWithoutDomainVersionInput | CrawlResultCreateOrConnectWithoutDomainVersionInput[]
    createMany?: CrawlResultCreateManyDomainVersionInputEnvelope
    connect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
  }

  export type KeywordCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<KeywordCreateWithoutDomainVersionInput, KeywordUncheckedCreateWithoutDomainVersionInput> | KeywordCreateWithoutDomainVersionInput[] | KeywordUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: KeywordCreateOrConnectWithoutDomainVersionInput | KeywordCreateOrConnectWithoutDomainVersionInput[]
    createMany?: KeywordCreateManyDomainVersionInputEnvelope
    connect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
  }

  export type DashboardAnalysisCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<DashboardAnalysisCreateWithoutDomainVersionInput, DashboardAnalysisUncheckedCreateWithoutDomainVersionInput> | DashboardAnalysisCreateWithoutDomainVersionInput[] | DashboardAnalysisUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: DashboardAnalysisCreateOrConnectWithoutDomainVersionInput | DashboardAnalysisCreateOrConnectWithoutDomainVersionInput[]
    createMany?: DashboardAnalysisCreateManyDomainVersionInputEnvelope
    connect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
  }

  export type CompetitorAnalysisCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<CompetitorAnalysisCreateWithoutDomainVersionInput, CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput> | CompetitorAnalysisCreateWithoutDomainVersionInput[] | CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: CompetitorAnalysisCreateOrConnectWithoutDomainVersionInput | CompetitorAnalysisCreateOrConnectWithoutDomainVersionInput[]
    createMany?: CompetitorAnalysisCreateManyDomainVersionInputEnvelope
    connect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
  }

  export type SuggestedCompetitorCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<SuggestedCompetitorCreateWithoutDomainVersionInput, SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput> | SuggestedCompetitorCreateWithoutDomainVersionInput[] | SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: SuggestedCompetitorCreateOrConnectWithoutDomainVersionInput | SuggestedCompetitorCreateOrConnectWithoutDomainVersionInput[]
    createMany?: SuggestedCompetitorCreateManyDomainVersionInputEnvelope
    connect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
  }

  export type OnboardingProgressCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<OnboardingProgressCreateWithoutDomainVersionInput, OnboardingProgressUncheckedCreateWithoutDomainVersionInput> | OnboardingProgressCreateWithoutDomainVersionInput[] | OnboardingProgressUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: OnboardingProgressCreateOrConnectWithoutDomainVersionInput | OnboardingProgressCreateOrConnectWithoutDomainVersionInput[]
    createMany?: OnboardingProgressCreateManyDomainVersionInputEnvelope
    connect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
  }

  export type CrawlResultUncheckedCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<CrawlResultCreateWithoutDomainVersionInput, CrawlResultUncheckedCreateWithoutDomainVersionInput> | CrawlResultCreateWithoutDomainVersionInput[] | CrawlResultUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: CrawlResultCreateOrConnectWithoutDomainVersionInput | CrawlResultCreateOrConnectWithoutDomainVersionInput[]
    createMany?: CrawlResultCreateManyDomainVersionInputEnvelope
    connect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
  }

  export type KeywordUncheckedCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<KeywordCreateWithoutDomainVersionInput, KeywordUncheckedCreateWithoutDomainVersionInput> | KeywordCreateWithoutDomainVersionInput[] | KeywordUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: KeywordCreateOrConnectWithoutDomainVersionInput | KeywordCreateOrConnectWithoutDomainVersionInput[]
    createMany?: KeywordCreateManyDomainVersionInputEnvelope
    connect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
  }

  export type DashboardAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<DashboardAnalysisCreateWithoutDomainVersionInput, DashboardAnalysisUncheckedCreateWithoutDomainVersionInput> | DashboardAnalysisCreateWithoutDomainVersionInput[] | DashboardAnalysisUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: DashboardAnalysisCreateOrConnectWithoutDomainVersionInput | DashboardAnalysisCreateOrConnectWithoutDomainVersionInput[]
    createMany?: DashboardAnalysisCreateManyDomainVersionInputEnvelope
    connect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
  }

  export type CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<CompetitorAnalysisCreateWithoutDomainVersionInput, CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput> | CompetitorAnalysisCreateWithoutDomainVersionInput[] | CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: CompetitorAnalysisCreateOrConnectWithoutDomainVersionInput | CompetitorAnalysisCreateOrConnectWithoutDomainVersionInput[]
    createMany?: CompetitorAnalysisCreateManyDomainVersionInputEnvelope
    connect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
  }

  export type SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<SuggestedCompetitorCreateWithoutDomainVersionInput, SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput> | SuggestedCompetitorCreateWithoutDomainVersionInput[] | SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: SuggestedCompetitorCreateOrConnectWithoutDomainVersionInput | SuggestedCompetitorCreateOrConnectWithoutDomainVersionInput[]
    createMany?: SuggestedCompetitorCreateManyDomainVersionInputEnvelope
    connect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
  }

  export type OnboardingProgressUncheckedCreateNestedManyWithoutDomainVersionInput = {
    create?: XOR<OnboardingProgressCreateWithoutDomainVersionInput, OnboardingProgressUncheckedCreateWithoutDomainVersionInput> | OnboardingProgressCreateWithoutDomainVersionInput[] | OnboardingProgressUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: OnboardingProgressCreateOrConnectWithoutDomainVersionInput | OnboardingProgressCreateOrConnectWithoutDomainVersionInput[]
    createMany?: OnboardingProgressCreateManyDomainVersionInputEnvelope
    connect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
  }

  export type DomainUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<DomainCreateWithoutVersionsInput, DomainUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutVersionsInput
    upsert?: DomainUpsertWithoutVersionsInput
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutVersionsInput, DomainUpdateWithoutVersionsInput>, DomainUncheckedUpdateWithoutVersionsInput>
  }

  export type CrawlResultUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<CrawlResultCreateWithoutDomainVersionInput, CrawlResultUncheckedCreateWithoutDomainVersionInput> | CrawlResultCreateWithoutDomainVersionInput[] | CrawlResultUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: CrawlResultCreateOrConnectWithoutDomainVersionInput | CrawlResultCreateOrConnectWithoutDomainVersionInput[]
    upsert?: CrawlResultUpsertWithWhereUniqueWithoutDomainVersionInput | CrawlResultUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: CrawlResultCreateManyDomainVersionInputEnvelope
    set?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    disconnect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    delete?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    connect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    update?: CrawlResultUpdateWithWhereUniqueWithoutDomainVersionInput | CrawlResultUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: CrawlResultUpdateManyWithWhereWithoutDomainVersionInput | CrawlResultUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: CrawlResultScalarWhereInput | CrawlResultScalarWhereInput[]
  }

  export type KeywordUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<KeywordCreateWithoutDomainVersionInput, KeywordUncheckedCreateWithoutDomainVersionInput> | KeywordCreateWithoutDomainVersionInput[] | KeywordUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: KeywordCreateOrConnectWithoutDomainVersionInput | KeywordCreateOrConnectWithoutDomainVersionInput[]
    upsert?: KeywordUpsertWithWhereUniqueWithoutDomainVersionInput | KeywordUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: KeywordCreateManyDomainVersionInputEnvelope
    set?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    disconnect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    delete?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    connect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    update?: KeywordUpdateWithWhereUniqueWithoutDomainVersionInput | KeywordUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: KeywordUpdateManyWithWhereWithoutDomainVersionInput | KeywordUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: KeywordScalarWhereInput | KeywordScalarWhereInput[]
  }

  export type DashboardAnalysisUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<DashboardAnalysisCreateWithoutDomainVersionInput, DashboardAnalysisUncheckedCreateWithoutDomainVersionInput> | DashboardAnalysisCreateWithoutDomainVersionInput[] | DashboardAnalysisUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: DashboardAnalysisCreateOrConnectWithoutDomainVersionInput | DashboardAnalysisCreateOrConnectWithoutDomainVersionInput[]
    upsert?: DashboardAnalysisUpsertWithWhereUniqueWithoutDomainVersionInput | DashboardAnalysisUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: DashboardAnalysisCreateManyDomainVersionInputEnvelope
    set?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    disconnect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    delete?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    connect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    update?: DashboardAnalysisUpdateWithWhereUniqueWithoutDomainVersionInput | DashboardAnalysisUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: DashboardAnalysisUpdateManyWithWhereWithoutDomainVersionInput | DashboardAnalysisUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: DashboardAnalysisScalarWhereInput | DashboardAnalysisScalarWhereInput[]
  }

  export type CompetitorAnalysisUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<CompetitorAnalysisCreateWithoutDomainVersionInput, CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput> | CompetitorAnalysisCreateWithoutDomainVersionInput[] | CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: CompetitorAnalysisCreateOrConnectWithoutDomainVersionInput | CompetitorAnalysisCreateOrConnectWithoutDomainVersionInput[]
    upsert?: CompetitorAnalysisUpsertWithWhereUniqueWithoutDomainVersionInput | CompetitorAnalysisUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: CompetitorAnalysisCreateManyDomainVersionInputEnvelope
    set?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    disconnect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    delete?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    connect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    update?: CompetitorAnalysisUpdateWithWhereUniqueWithoutDomainVersionInput | CompetitorAnalysisUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: CompetitorAnalysisUpdateManyWithWhereWithoutDomainVersionInput | CompetitorAnalysisUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: CompetitorAnalysisScalarWhereInput | CompetitorAnalysisScalarWhereInput[]
  }

  export type SuggestedCompetitorUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<SuggestedCompetitorCreateWithoutDomainVersionInput, SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput> | SuggestedCompetitorCreateWithoutDomainVersionInput[] | SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: SuggestedCompetitorCreateOrConnectWithoutDomainVersionInput | SuggestedCompetitorCreateOrConnectWithoutDomainVersionInput[]
    upsert?: SuggestedCompetitorUpsertWithWhereUniqueWithoutDomainVersionInput | SuggestedCompetitorUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: SuggestedCompetitorCreateManyDomainVersionInputEnvelope
    set?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    disconnect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    delete?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    connect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    update?: SuggestedCompetitorUpdateWithWhereUniqueWithoutDomainVersionInput | SuggestedCompetitorUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: SuggestedCompetitorUpdateManyWithWhereWithoutDomainVersionInput | SuggestedCompetitorUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: SuggestedCompetitorScalarWhereInput | SuggestedCompetitorScalarWhereInput[]
  }

  export type OnboardingProgressUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<OnboardingProgressCreateWithoutDomainVersionInput, OnboardingProgressUncheckedCreateWithoutDomainVersionInput> | OnboardingProgressCreateWithoutDomainVersionInput[] | OnboardingProgressUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: OnboardingProgressCreateOrConnectWithoutDomainVersionInput | OnboardingProgressCreateOrConnectWithoutDomainVersionInput[]
    upsert?: OnboardingProgressUpsertWithWhereUniqueWithoutDomainVersionInput | OnboardingProgressUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: OnboardingProgressCreateManyDomainVersionInputEnvelope
    set?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    disconnect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    delete?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    connect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    update?: OnboardingProgressUpdateWithWhereUniqueWithoutDomainVersionInput | OnboardingProgressUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: OnboardingProgressUpdateManyWithWhereWithoutDomainVersionInput | OnboardingProgressUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: OnboardingProgressScalarWhereInput | OnboardingProgressScalarWhereInput[]
  }

  export type CrawlResultUncheckedUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<CrawlResultCreateWithoutDomainVersionInput, CrawlResultUncheckedCreateWithoutDomainVersionInput> | CrawlResultCreateWithoutDomainVersionInput[] | CrawlResultUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: CrawlResultCreateOrConnectWithoutDomainVersionInput | CrawlResultCreateOrConnectWithoutDomainVersionInput[]
    upsert?: CrawlResultUpsertWithWhereUniqueWithoutDomainVersionInput | CrawlResultUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: CrawlResultCreateManyDomainVersionInputEnvelope
    set?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    disconnect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    delete?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    connect?: CrawlResultWhereUniqueInput | CrawlResultWhereUniqueInput[]
    update?: CrawlResultUpdateWithWhereUniqueWithoutDomainVersionInput | CrawlResultUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: CrawlResultUpdateManyWithWhereWithoutDomainVersionInput | CrawlResultUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: CrawlResultScalarWhereInput | CrawlResultScalarWhereInput[]
  }

  export type KeywordUncheckedUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<KeywordCreateWithoutDomainVersionInput, KeywordUncheckedCreateWithoutDomainVersionInput> | KeywordCreateWithoutDomainVersionInput[] | KeywordUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: KeywordCreateOrConnectWithoutDomainVersionInput | KeywordCreateOrConnectWithoutDomainVersionInput[]
    upsert?: KeywordUpsertWithWhereUniqueWithoutDomainVersionInput | KeywordUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: KeywordCreateManyDomainVersionInputEnvelope
    set?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    disconnect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    delete?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    connect?: KeywordWhereUniqueInput | KeywordWhereUniqueInput[]
    update?: KeywordUpdateWithWhereUniqueWithoutDomainVersionInput | KeywordUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: KeywordUpdateManyWithWhereWithoutDomainVersionInput | KeywordUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: KeywordScalarWhereInput | KeywordScalarWhereInput[]
  }

  export type DashboardAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<DashboardAnalysisCreateWithoutDomainVersionInput, DashboardAnalysisUncheckedCreateWithoutDomainVersionInput> | DashboardAnalysisCreateWithoutDomainVersionInput[] | DashboardAnalysisUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: DashboardAnalysisCreateOrConnectWithoutDomainVersionInput | DashboardAnalysisCreateOrConnectWithoutDomainVersionInput[]
    upsert?: DashboardAnalysisUpsertWithWhereUniqueWithoutDomainVersionInput | DashboardAnalysisUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: DashboardAnalysisCreateManyDomainVersionInputEnvelope
    set?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    disconnect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    delete?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    connect?: DashboardAnalysisWhereUniqueInput | DashboardAnalysisWhereUniqueInput[]
    update?: DashboardAnalysisUpdateWithWhereUniqueWithoutDomainVersionInput | DashboardAnalysisUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: DashboardAnalysisUpdateManyWithWhereWithoutDomainVersionInput | DashboardAnalysisUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: DashboardAnalysisScalarWhereInput | DashboardAnalysisScalarWhereInput[]
  }

  export type CompetitorAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<CompetitorAnalysisCreateWithoutDomainVersionInput, CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput> | CompetitorAnalysisCreateWithoutDomainVersionInput[] | CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: CompetitorAnalysisCreateOrConnectWithoutDomainVersionInput | CompetitorAnalysisCreateOrConnectWithoutDomainVersionInput[]
    upsert?: CompetitorAnalysisUpsertWithWhereUniqueWithoutDomainVersionInput | CompetitorAnalysisUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: CompetitorAnalysisCreateManyDomainVersionInputEnvelope
    set?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    disconnect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    delete?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    connect?: CompetitorAnalysisWhereUniqueInput | CompetitorAnalysisWhereUniqueInput[]
    update?: CompetitorAnalysisUpdateWithWhereUniqueWithoutDomainVersionInput | CompetitorAnalysisUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: CompetitorAnalysisUpdateManyWithWhereWithoutDomainVersionInput | CompetitorAnalysisUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: CompetitorAnalysisScalarWhereInput | CompetitorAnalysisScalarWhereInput[]
  }

  export type SuggestedCompetitorUncheckedUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<SuggestedCompetitorCreateWithoutDomainVersionInput, SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput> | SuggestedCompetitorCreateWithoutDomainVersionInput[] | SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: SuggestedCompetitorCreateOrConnectWithoutDomainVersionInput | SuggestedCompetitorCreateOrConnectWithoutDomainVersionInput[]
    upsert?: SuggestedCompetitorUpsertWithWhereUniqueWithoutDomainVersionInput | SuggestedCompetitorUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: SuggestedCompetitorCreateManyDomainVersionInputEnvelope
    set?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    disconnect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    delete?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    connect?: SuggestedCompetitorWhereUniqueInput | SuggestedCompetitorWhereUniqueInput[]
    update?: SuggestedCompetitorUpdateWithWhereUniqueWithoutDomainVersionInput | SuggestedCompetitorUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: SuggestedCompetitorUpdateManyWithWhereWithoutDomainVersionInput | SuggestedCompetitorUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: SuggestedCompetitorScalarWhereInput | SuggestedCompetitorScalarWhereInput[]
  }

  export type OnboardingProgressUncheckedUpdateManyWithoutDomainVersionNestedInput = {
    create?: XOR<OnboardingProgressCreateWithoutDomainVersionInput, OnboardingProgressUncheckedCreateWithoutDomainVersionInput> | OnboardingProgressCreateWithoutDomainVersionInput[] | OnboardingProgressUncheckedCreateWithoutDomainVersionInput[]
    connectOrCreate?: OnboardingProgressCreateOrConnectWithoutDomainVersionInput | OnboardingProgressCreateOrConnectWithoutDomainVersionInput[]
    upsert?: OnboardingProgressUpsertWithWhereUniqueWithoutDomainVersionInput | OnboardingProgressUpsertWithWhereUniqueWithoutDomainVersionInput[]
    createMany?: OnboardingProgressCreateManyDomainVersionInputEnvelope
    set?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    disconnect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    delete?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    connect?: OnboardingProgressWhereUniqueInput | OnboardingProgressWhereUniqueInput[]
    update?: OnboardingProgressUpdateWithWhereUniqueWithoutDomainVersionInput | OnboardingProgressUpdateWithWhereUniqueWithoutDomainVersionInput[]
    updateMany?: OnboardingProgressUpdateManyWithWhereWithoutDomainVersionInput | OnboardingProgressUpdateManyWithWhereWithoutDomainVersionInput[]
    deleteMany?: OnboardingProgressScalarWhereInput | OnboardingProgressScalarWhereInput[]
  }

  export type DomainCreateNestedOneWithoutCrawlResultsInput = {
    create?: XOR<DomainCreateWithoutCrawlResultsInput, DomainUncheckedCreateWithoutCrawlResultsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutCrawlResultsInput
    connect?: DomainWhereUniqueInput
  }

  export type DomainVersionCreateNestedOneWithoutCrawlResultsInput = {
    create?: XOR<DomainVersionCreateWithoutCrawlResultsInput, DomainVersionUncheckedCreateWithoutCrawlResultsInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutCrawlResultsInput
    connect?: DomainVersionWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DomainUpdateOneWithoutCrawlResultsNestedInput = {
    create?: XOR<DomainCreateWithoutCrawlResultsInput, DomainUncheckedCreateWithoutCrawlResultsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutCrawlResultsInput
    upsert?: DomainUpsertWithoutCrawlResultsInput
    disconnect?: DomainWhereInput | boolean
    delete?: DomainWhereInput | boolean
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutCrawlResultsInput, DomainUpdateWithoutCrawlResultsInput>, DomainUncheckedUpdateWithoutCrawlResultsInput>
  }

  export type DomainVersionUpdateOneWithoutCrawlResultsNestedInput = {
    create?: XOR<DomainVersionCreateWithoutCrawlResultsInput, DomainVersionUncheckedCreateWithoutCrawlResultsInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutCrawlResultsInput
    upsert?: DomainVersionUpsertWithoutCrawlResultsInput
    disconnect?: DomainVersionWhereInput | boolean
    delete?: DomainVersionWhereInput | boolean
    connect?: DomainVersionWhereUniqueInput
    update?: XOR<XOR<DomainVersionUpdateToOneWithWhereWithoutCrawlResultsInput, DomainVersionUpdateWithoutCrawlResultsInput>, DomainVersionUncheckedUpdateWithoutCrawlResultsInput>
  }

  export type DomainCreateNestedOneWithoutKeywordsInput = {
    create?: XOR<DomainCreateWithoutKeywordsInput, DomainUncheckedCreateWithoutKeywordsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutKeywordsInput
    connect?: DomainWhereUniqueInput
  }

  export type DomainVersionCreateNestedOneWithoutKeywordsInput = {
    create?: XOR<DomainVersionCreateWithoutKeywordsInput, DomainVersionUncheckedCreateWithoutKeywordsInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutKeywordsInput
    connect?: DomainVersionWhereUniqueInput
  }

  export type PhraseCreateNestedManyWithoutKeywordInput = {
    create?: XOR<PhraseCreateWithoutKeywordInput, PhraseUncheckedCreateWithoutKeywordInput> | PhraseCreateWithoutKeywordInput[] | PhraseUncheckedCreateWithoutKeywordInput[]
    connectOrCreate?: PhraseCreateOrConnectWithoutKeywordInput | PhraseCreateOrConnectWithoutKeywordInput[]
    createMany?: PhraseCreateManyKeywordInputEnvelope
    connect?: PhraseWhereUniqueInput | PhraseWhereUniqueInput[]
  }

  export type PhraseUncheckedCreateNestedManyWithoutKeywordInput = {
    create?: XOR<PhraseCreateWithoutKeywordInput, PhraseUncheckedCreateWithoutKeywordInput> | PhraseCreateWithoutKeywordInput[] | PhraseUncheckedCreateWithoutKeywordInput[]
    connectOrCreate?: PhraseCreateOrConnectWithoutKeywordInput | PhraseCreateOrConnectWithoutKeywordInput[]
    createMany?: PhraseCreateManyKeywordInputEnvelope
    connect?: PhraseWhereUniqueInput | PhraseWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DomainUpdateOneWithoutKeywordsNestedInput = {
    create?: XOR<DomainCreateWithoutKeywordsInput, DomainUncheckedCreateWithoutKeywordsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutKeywordsInput
    upsert?: DomainUpsertWithoutKeywordsInput
    disconnect?: DomainWhereInput | boolean
    delete?: DomainWhereInput | boolean
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutKeywordsInput, DomainUpdateWithoutKeywordsInput>, DomainUncheckedUpdateWithoutKeywordsInput>
  }

  export type DomainVersionUpdateOneWithoutKeywordsNestedInput = {
    create?: XOR<DomainVersionCreateWithoutKeywordsInput, DomainVersionUncheckedCreateWithoutKeywordsInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutKeywordsInput
    upsert?: DomainVersionUpsertWithoutKeywordsInput
    disconnect?: DomainVersionWhereInput | boolean
    delete?: DomainVersionWhereInput | boolean
    connect?: DomainVersionWhereUniqueInput
    update?: XOR<XOR<DomainVersionUpdateToOneWithWhereWithoutKeywordsInput, DomainVersionUpdateWithoutKeywordsInput>, DomainVersionUncheckedUpdateWithoutKeywordsInput>
  }

  export type PhraseUpdateManyWithoutKeywordNestedInput = {
    create?: XOR<PhraseCreateWithoutKeywordInput, PhraseUncheckedCreateWithoutKeywordInput> | PhraseCreateWithoutKeywordInput[] | PhraseUncheckedCreateWithoutKeywordInput[]
    connectOrCreate?: PhraseCreateOrConnectWithoutKeywordInput | PhraseCreateOrConnectWithoutKeywordInput[]
    upsert?: PhraseUpsertWithWhereUniqueWithoutKeywordInput | PhraseUpsertWithWhereUniqueWithoutKeywordInput[]
    createMany?: PhraseCreateManyKeywordInputEnvelope
    set?: PhraseWhereUniqueInput | PhraseWhereUniqueInput[]
    disconnect?: PhraseWhereUniqueInput | PhraseWhereUniqueInput[]
    delete?: PhraseWhereUniqueInput | PhraseWhereUniqueInput[]
    connect?: PhraseWhereUniqueInput | PhraseWhereUniqueInput[]
    update?: PhraseUpdateWithWhereUniqueWithoutKeywordInput | PhraseUpdateWithWhereUniqueWithoutKeywordInput[]
    updateMany?: PhraseUpdateManyWithWhereWithoutKeywordInput | PhraseUpdateManyWithWhereWithoutKeywordInput[]
    deleteMany?: PhraseScalarWhereInput | PhraseScalarWhereInput[]
  }

  export type PhraseUncheckedUpdateManyWithoutKeywordNestedInput = {
    create?: XOR<PhraseCreateWithoutKeywordInput, PhraseUncheckedCreateWithoutKeywordInput> | PhraseCreateWithoutKeywordInput[] | PhraseUncheckedCreateWithoutKeywordInput[]
    connectOrCreate?: PhraseCreateOrConnectWithoutKeywordInput | PhraseCreateOrConnectWithoutKeywordInput[]
    upsert?: PhraseUpsertWithWhereUniqueWithoutKeywordInput | PhraseUpsertWithWhereUniqueWithoutKeywordInput[]
    createMany?: PhraseCreateManyKeywordInputEnvelope
    set?: PhraseWhereUniqueInput | PhraseWhereUniqueInput[]
    disconnect?: PhraseWhereUniqueInput | PhraseWhereUniqueInput[]
    delete?: PhraseWhereUniqueInput | PhraseWhereUniqueInput[]
    connect?: PhraseWhereUniqueInput | PhraseWhereUniqueInput[]
    update?: PhraseUpdateWithWhereUniqueWithoutKeywordInput | PhraseUpdateWithWhereUniqueWithoutKeywordInput[]
    updateMany?: PhraseUpdateManyWithWhereWithoutKeywordInput | PhraseUpdateManyWithWhereWithoutKeywordInput[]
    deleteMany?: PhraseScalarWhereInput | PhraseScalarWhereInput[]
  }

  export type KeywordCreateNestedOneWithoutPhrasesInput = {
    create?: XOR<KeywordCreateWithoutPhrasesInput, KeywordUncheckedCreateWithoutPhrasesInput>
    connectOrCreate?: KeywordCreateOrConnectWithoutPhrasesInput
    connect?: KeywordWhereUniqueInput
  }

  export type AIQueryResultCreateNestedManyWithoutPhraseInput = {
    create?: XOR<AIQueryResultCreateWithoutPhraseInput, AIQueryResultUncheckedCreateWithoutPhraseInput> | AIQueryResultCreateWithoutPhraseInput[] | AIQueryResultUncheckedCreateWithoutPhraseInput[]
    connectOrCreate?: AIQueryResultCreateOrConnectWithoutPhraseInput | AIQueryResultCreateOrConnectWithoutPhraseInput[]
    createMany?: AIQueryResultCreateManyPhraseInputEnvelope
    connect?: AIQueryResultWhereUniqueInput | AIQueryResultWhereUniqueInput[]
  }

  export type AIQueryResultUncheckedCreateNestedManyWithoutPhraseInput = {
    create?: XOR<AIQueryResultCreateWithoutPhraseInput, AIQueryResultUncheckedCreateWithoutPhraseInput> | AIQueryResultCreateWithoutPhraseInput[] | AIQueryResultUncheckedCreateWithoutPhraseInput[]
    connectOrCreate?: AIQueryResultCreateOrConnectWithoutPhraseInput | AIQueryResultCreateOrConnectWithoutPhraseInput[]
    createMany?: AIQueryResultCreateManyPhraseInputEnvelope
    connect?: AIQueryResultWhereUniqueInput | AIQueryResultWhereUniqueInput[]
  }

  export type KeywordUpdateOneRequiredWithoutPhrasesNestedInput = {
    create?: XOR<KeywordCreateWithoutPhrasesInput, KeywordUncheckedCreateWithoutPhrasesInput>
    connectOrCreate?: KeywordCreateOrConnectWithoutPhrasesInput
    upsert?: KeywordUpsertWithoutPhrasesInput
    connect?: KeywordWhereUniqueInput
    update?: XOR<XOR<KeywordUpdateToOneWithWhereWithoutPhrasesInput, KeywordUpdateWithoutPhrasesInput>, KeywordUncheckedUpdateWithoutPhrasesInput>
  }

  export type AIQueryResultUpdateManyWithoutPhraseNestedInput = {
    create?: XOR<AIQueryResultCreateWithoutPhraseInput, AIQueryResultUncheckedCreateWithoutPhraseInput> | AIQueryResultCreateWithoutPhraseInput[] | AIQueryResultUncheckedCreateWithoutPhraseInput[]
    connectOrCreate?: AIQueryResultCreateOrConnectWithoutPhraseInput | AIQueryResultCreateOrConnectWithoutPhraseInput[]
    upsert?: AIQueryResultUpsertWithWhereUniqueWithoutPhraseInput | AIQueryResultUpsertWithWhereUniqueWithoutPhraseInput[]
    createMany?: AIQueryResultCreateManyPhraseInputEnvelope
    set?: AIQueryResultWhereUniqueInput | AIQueryResultWhereUniqueInput[]
    disconnect?: AIQueryResultWhereUniqueInput | AIQueryResultWhereUniqueInput[]
    delete?: AIQueryResultWhereUniqueInput | AIQueryResultWhereUniqueInput[]
    connect?: AIQueryResultWhereUniqueInput | AIQueryResultWhereUniqueInput[]
    update?: AIQueryResultUpdateWithWhereUniqueWithoutPhraseInput | AIQueryResultUpdateWithWhereUniqueWithoutPhraseInput[]
    updateMany?: AIQueryResultUpdateManyWithWhereWithoutPhraseInput | AIQueryResultUpdateManyWithWhereWithoutPhraseInput[]
    deleteMany?: AIQueryResultScalarWhereInput | AIQueryResultScalarWhereInput[]
  }

  export type AIQueryResultUncheckedUpdateManyWithoutPhraseNestedInput = {
    create?: XOR<AIQueryResultCreateWithoutPhraseInput, AIQueryResultUncheckedCreateWithoutPhraseInput> | AIQueryResultCreateWithoutPhraseInput[] | AIQueryResultUncheckedCreateWithoutPhraseInput[]
    connectOrCreate?: AIQueryResultCreateOrConnectWithoutPhraseInput | AIQueryResultCreateOrConnectWithoutPhraseInput[]
    upsert?: AIQueryResultUpsertWithWhereUniqueWithoutPhraseInput | AIQueryResultUpsertWithWhereUniqueWithoutPhraseInput[]
    createMany?: AIQueryResultCreateManyPhraseInputEnvelope
    set?: AIQueryResultWhereUniqueInput | AIQueryResultWhereUniqueInput[]
    disconnect?: AIQueryResultWhereUniqueInput | AIQueryResultWhereUniqueInput[]
    delete?: AIQueryResultWhereUniqueInput | AIQueryResultWhereUniqueInput[]
    connect?: AIQueryResultWhereUniqueInput | AIQueryResultWhereUniqueInput[]
    update?: AIQueryResultUpdateWithWhereUniqueWithoutPhraseInput | AIQueryResultUpdateWithWhereUniqueWithoutPhraseInput[]
    updateMany?: AIQueryResultUpdateManyWithWhereWithoutPhraseInput | AIQueryResultUpdateManyWithWhereWithoutPhraseInput[]
    deleteMany?: AIQueryResultScalarWhereInput | AIQueryResultScalarWhereInput[]
  }

  export type PhraseCreateNestedOneWithoutAiQueryResultsInput = {
    create?: XOR<PhraseCreateWithoutAiQueryResultsInput, PhraseUncheckedCreateWithoutAiQueryResultsInput>
    connectOrCreate?: PhraseCreateOrConnectWithoutAiQueryResultsInput
    connect?: PhraseWhereUniqueInput
  }

  export type PhraseUpdateOneRequiredWithoutAiQueryResultsNestedInput = {
    create?: XOR<PhraseCreateWithoutAiQueryResultsInput, PhraseUncheckedCreateWithoutAiQueryResultsInput>
    connectOrCreate?: PhraseCreateOrConnectWithoutAiQueryResultsInput
    upsert?: PhraseUpsertWithoutAiQueryResultsInput
    connect?: PhraseWhereUniqueInput
    update?: XOR<XOR<PhraseUpdateToOneWithWhereWithoutAiQueryResultsInput, PhraseUpdateWithoutAiQueryResultsInput>, PhraseUncheckedUpdateWithoutAiQueryResultsInput>
  }

  export type DomainCreateNestedOneWithoutDashboardAnalysesInput = {
    create?: XOR<DomainCreateWithoutDashboardAnalysesInput, DomainUncheckedCreateWithoutDashboardAnalysesInput>
    connectOrCreate?: DomainCreateOrConnectWithoutDashboardAnalysesInput
    connect?: DomainWhereUniqueInput
  }

  export type DomainVersionCreateNestedOneWithoutDashboardAnalysesInput = {
    create?: XOR<DomainVersionCreateWithoutDashboardAnalysesInput, DomainVersionUncheckedCreateWithoutDashboardAnalysesInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutDashboardAnalysesInput
    connect?: DomainVersionWhereUniqueInput
  }

  export type DomainUpdateOneWithoutDashboardAnalysesNestedInput = {
    create?: XOR<DomainCreateWithoutDashboardAnalysesInput, DomainUncheckedCreateWithoutDashboardAnalysesInput>
    connectOrCreate?: DomainCreateOrConnectWithoutDashboardAnalysesInput
    upsert?: DomainUpsertWithoutDashboardAnalysesInput
    disconnect?: DomainWhereInput | boolean
    delete?: DomainWhereInput | boolean
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutDashboardAnalysesInput, DomainUpdateWithoutDashboardAnalysesInput>, DomainUncheckedUpdateWithoutDashboardAnalysesInput>
  }

  export type DomainVersionUpdateOneWithoutDashboardAnalysesNestedInput = {
    create?: XOR<DomainVersionCreateWithoutDashboardAnalysesInput, DomainVersionUncheckedCreateWithoutDashboardAnalysesInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutDashboardAnalysesInput
    upsert?: DomainVersionUpsertWithoutDashboardAnalysesInput
    disconnect?: DomainVersionWhereInput | boolean
    delete?: DomainVersionWhereInput | boolean
    connect?: DomainVersionWhereUniqueInput
    update?: XOR<XOR<DomainVersionUpdateToOneWithWhereWithoutDashboardAnalysesInput, DomainVersionUpdateWithoutDashboardAnalysesInput>, DomainVersionUncheckedUpdateWithoutDashboardAnalysesInput>
  }

  export type DomainCreateNestedOneWithoutCompetitorAnalysesInput = {
    create?: XOR<DomainCreateWithoutCompetitorAnalysesInput, DomainUncheckedCreateWithoutCompetitorAnalysesInput>
    connectOrCreate?: DomainCreateOrConnectWithoutCompetitorAnalysesInput
    connect?: DomainWhereUniqueInput
  }

  export type DomainVersionCreateNestedOneWithoutCompetitorAnalysesInput = {
    create?: XOR<DomainVersionCreateWithoutCompetitorAnalysesInput, DomainVersionUncheckedCreateWithoutCompetitorAnalysesInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutCompetitorAnalysesInput
    connect?: DomainVersionWhereUniqueInput
  }

  export type DomainUpdateOneWithoutCompetitorAnalysesNestedInput = {
    create?: XOR<DomainCreateWithoutCompetitorAnalysesInput, DomainUncheckedCreateWithoutCompetitorAnalysesInput>
    connectOrCreate?: DomainCreateOrConnectWithoutCompetitorAnalysesInput
    upsert?: DomainUpsertWithoutCompetitorAnalysesInput
    disconnect?: DomainWhereInput | boolean
    delete?: DomainWhereInput | boolean
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutCompetitorAnalysesInput, DomainUpdateWithoutCompetitorAnalysesInput>, DomainUncheckedUpdateWithoutCompetitorAnalysesInput>
  }

  export type DomainVersionUpdateOneWithoutCompetitorAnalysesNestedInput = {
    create?: XOR<DomainVersionCreateWithoutCompetitorAnalysesInput, DomainVersionUncheckedCreateWithoutCompetitorAnalysesInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutCompetitorAnalysesInput
    upsert?: DomainVersionUpsertWithoutCompetitorAnalysesInput
    disconnect?: DomainVersionWhereInput | boolean
    delete?: DomainVersionWhereInput | boolean
    connect?: DomainVersionWhereUniqueInput
    update?: XOR<XOR<DomainVersionUpdateToOneWithWhereWithoutCompetitorAnalysesInput, DomainVersionUpdateWithoutCompetitorAnalysesInput>, DomainVersionUncheckedUpdateWithoutCompetitorAnalysesInput>
  }

  export type DomainCreateNestedOneWithoutSuggestedCompetitorsInput = {
    create?: XOR<DomainCreateWithoutSuggestedCompetitorsInput, DomainUncheckedCreateWithoutSuggestedCompetitorsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutSuggestedCompetitorsInput
    connect?: DomainWhereUniqueInput
  }

  export type DomainVersionCreateNestedOneWithoutSuggestedCompetitorsInput = {
    create?: XOR<DomainVersionCreateWithoutSuggestedCompetitorsInput, DomainVersionUncheckedCreateWithoutSuggestedCompetitorsInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutSuggestedCompetitorsInput
    connect?: DomainVersionWhereUniqueInput
  }

  export type DomainUpdateOneWithoutSuggestedCompetitorsNestedInput = {
    create?: XOR<DomainCreateWithoutSuggestedCompetitorsInput, DomainUncheckedCreateWithoutSuggestedCompetitorsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutSuggestedCompetitorsInput
    upsert?: DomainUpsertWithoutSuggestedCompetitorsInput
    disconnect?: DomainWhereInput | boolean
    delete?: DomainWhereInput | boolean
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutSuggestedCompetitorsInput, DomainUpdateWithoutSuggestedCompetitorsInput>, DomainUncheckedUpdateWithoutSuggestedCompetitorsInput>
  }

  export type DomainVersionUpdateOneWithoutSuggestedCompetitorsNestedInput = {
    create?: XOR<DomainVersionCreateWithoutSuggestedCompetitorsInput, DomainVersionUncheckedCreateWithoutSuggestedCompetitorsInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutSuggestedCompetitorsInput
    upsert?: DomainVersionUpsertWithoutSuggestedCompetitorsInput
    disconnect?: DomainVersionWhereInput | boolean
    delete?: DomainVersionWhereInput | boolean
    connect?: DomainVersionWhereUniqueInput
    update?: XOR<XOR<DomainVersionUpdateToOneWithWhereWithoutSuggestedCompetitorsInput, DomainVersionUpdateWithoutSuggestedCompetitorsInput>, DomainVersionUncheckedUpdateWithoutSuggestedCompetitorsInput>
  }

  export type DomainCreateNestedOneWithoutOnboardingProgressesInput = {
    create?: XOR<DomainCreateWithoutOnboardingProgressesInput, DomainUncheckedCreateWithoutOnboardingProgressesInput>
    connectOrCreate?: DomainCreateOrConnectWithoutOnboardingProgressesInput
    connect?: DomainWhereUniqueInput
  }

  export type DomainVersionCreateNestedOneWithoutOnboardingProgressesInput = {
    create?: XOR<DomainVersionCreateWithoutOnboardingProgressesInput, DomainVersionUncheckedCreateWithoutOnboardingProgressesInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutOnboardingProgressesInput
    connect?: DomainVersionWhereUniqueInput
  }

  export type DomainUpdateOneWithoutOnboardingProgressesNestedInput = {
    create?: XOR<DomainCreateWithoutOnboardingProgressesInput, DomainUncheckedCreateWithoutOnboardingProgressesInput>
    connectOrCreate?: DomainCreateOrConnectWithoutOnboardingProgressesInput
    upsert?: DomainUpsertWithoutOnboardingProgressesInput
    disconnect?: DomainWhereInput | boolean
    delete?: DomainWhereInput | boolean
    connect?: DomainWhereUniqueInput
    update?: XOR<XOR<DomainUpdateToOneWithWhereWithoutOnboardingProgressesInput, DomainUpdateWithoutOnboardingProgressesInput>, DomainUncheckedUpdateWithoutOnboardingProgressesInput>
  }

  export type DomainVersionUpdateOneWithoutOnboardingProgressesNestedInput = {
    create?: XOR<DomainVersionCreateWithoutOnboardingProgressesInput, DomainVersionUncheckedCreateWithoutOnboardingProgressesInput>
    connectOrCreate?: DomainVersionCreateOrConnectWithoutOnboardingProgressesInput
    upsert?: DomainVersionUpsertWithoutOnboardingProgressesInput
    disconnect?: DomainVersionWhereInput | boolean
    delete?: DomainVersionWhereInput | boolean
    connect?: DomainVersionWhereUniqueInput
    update?: XOR<XOR<DomainVersionUpdateToOneWithWhereWithoutOnboardingProgressesInput, DomainVersionUpdateWithoutOnboardingProgressesInput>, DomainVersionUncheckedUpdateWithoutOnboardingProgressesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DomainCreateWithoutUserInput = {
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainInput
    keywords?: KeywordCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainInput
    versions?: DomainVersionCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutUserInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainInput
    versions?: DomainVersionUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutUserInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput>
  }

  export type DomainCreateManyUserInputEnvelope = {
    data: DomainCreateManyUserInput | DomainCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DomainUpsertWithWhereUniqueWithoutUserInput = {
    where: DomainWhereUniqueInput
    update: XOR<DomainUpdateWithoutUserInput, DomainUncheckedUpdateWithoutUserInput>
    create: XOR<DomainCreateWithoutUserInput, DomainUncheckedCreateWithoutUserInput>
  }

  export type DomainUpdateWithWhereUniqueWithoutUserInput = {
    where: DomainWhereUniqueInput
    data: XOR<DomainUpdateWithoutUserInput, DomainUncheckedUpdateWithoutUserInput>
  }

  export type DomainUpdateManyWithWhereWithoutUserInput = {
    where: DomainScalarWhereInput
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyWithoutUserInput>
  }

  export type DomainScalarWhereInput = {
    AND?: DomainScalarWhereInput | DomainScalarWhereInput[]
    OR?: DomainScalarWhereInput[]
    NOT?: DomainScalarWhereInput | DomainScalarWhereInput[]
    id?: IntFilter<"Domain"> | number
    url?: StringFilter<"Domain"> | string
    context?: StringNullableFilter<"Domain"> | string | null
    version?: IntFilter<"Domain"> | number
    userId?: IntNullableFilter<"Domain"> | number | null
    createdAt?: DateTimeFilter<"Domain"> | Date | string
    updatedAt?: DateTimeFilter<"Domain"> | Date | string
    location?: StringNullableFilter<"Domain"> | string | null
  }

  export type UserCreateWithoutDomainsInput = {
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutDomainsInput = {
    id?: number
    email: string
    password: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutDomainsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDomainsInput, UserUncheckedCreateWithoutDomainsInput>
  }

  export type CrawlResultCreateWithoutDomainInput = {
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: string
    tokenUsage?: number | null
    createdAt?: Date | string
    domainVersion?: DomainVersionCreateNestedOneWithoutCrawlResultsInput
  }

  export type CrawlResultUncheckedCreateWithoutDomainInput = {
    id?: number
    domainVersionId?: number | null
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: string
    tokenUsage?: number | null
    createdAt?: Date | string
  }

  export type CrawlResultCreateOrConnectWithoutDomainInput = {
    where: CrawlResultWhereUniqueInput
    create: XOR<CrawlResultCreateWithoutDomainInput, CrawlResultUncheckedCreateWithoutDomainInput>
  }

  export type CrawlResultCreateManyDomainInputEnvelope = {
    data: CrawlResultCreateManyDomainInput | CrawlResultCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type KeywordCreateWithoutDomainInput = {
    term: string
    volume: number
    difficulty: string
    cpc: number
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    domainVersion?: DomainVersionCreateNestedOneWithoutKeywordsInput
    phrases?: PhraseCreateNestedManyWithoutKeywordInput
  }

  export type KeywordUncheckedCreateWithoutDomainInput = {
    id?: number
    term: string
    volume: number
    difficulty: string
    cpc: number
    domainVersionId?: number | null
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    phrases?: PhraseUncheckedCreateNestedManyWithoutKeywordInput
  }

  export type KeywordCreateOrConnectWithoutDomainInput = {
    where: KeywordWhereUniqueInput
    create: XOR<KeywordCreateWithoutDomainInput, KeywordUncheckedCreateWithoutDomainInput>
  }

  export type KeywordCreateManyDomainInputEnvelope = {
    data: KeywordCreateManyDomainInput | KeywordCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type DashboardAnalysisCreateWithoutDomainInput = {
    metrics: JsonNullValueInput | InputJsonValue
    insights: JsonNullValueInput | InputJsonValue
    industryAnalysis: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    domainVersion?: DomainVersionCreateNestedOneWithoutDashboardAnalysesInput
  }

  export type DashboardAnalysisUncheckedCreateWithoutDomainInput = {
    id?: number
    domainVersionId?: number | null
    metrics: JsonNullValueInput | InputJsonValue
    insights: JsonNullValueInput | InputJsonValue
    industryAnalysis: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DashboardAnalysisCreateOrConnectWithoutDomainInput = {
    where: DashboardAnalysisWhereUniqueInput
    create: XOR<DashboardAnalysisCreateWithoutDomainInput, DashboardAnalysisUncheckedCreateWithoutDomainInput>
  }

  export type DashboardAnalysisCreateManyDomainInputEnvelope = {
    data: DashboardAnalysisCreateManyDomainInput | DashboardAnalysisCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type CompetitorAnalysisCreateWithoutDomainInput = {
    competitors: JsonNullValueInput | InputJsonValue
    marketInsights: JsonNullValueInput | InputJsonValue
    strategicRecommendations: JsonNullValueInput | InputJsonValue
    competitiveAnalysis: JsonNullValueInput | InputJsonValue
    competitorList: string
    createdAt?: Date | string
    updatedAt?: Date | string
    domainVersion?: DomainVersionCreateNestedOneWithoutCompetitorAnalysesInput
  }

  export type CompetitorAnalysisUncheckedCreateWithoutDomainInput = {
    id?: number
    domainVersionId?: number | null
    competitors: JsonNullValueInput | InputJsonValue
    marketInsights: JsonNullValueInput | InputJsonValue
    strategicRecommendations: JsonNullValueInput | InputJsonValue
    competitiveAnalysis: JsonNullValueInput | InputJsonValue
    competitorList: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompetitorAnalysisCreateOrConnectWithoutDomainInput = {
    where: CompetitorAnalysisWhereUniqueInput
    create: XOR<CompetitorAnalysisCreateWithoutDomainInput, CompetitorAnalysisUncheckedCreateWithoutDomainInput>
  }

  export type CompetitorAnalysisCreateManyDomainInputEnvelope = {
    data: CompetitorAnalysisCreateManyDomainInput | CompetitorAnalysisCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type SuggestedCompetitorCreateWithoutDomainInput = {
    name: string
    competitorDomain: string
    reason: string
    type: string
    createdAt?: Date | string
    domainVersion?: DomainVersionCreateNestedOneWithoutSuggestedCompetitorsInput
  }

  export type SuggestedCompetitorUncheckedCreateWithoutDomainInput = {
    id?: number
    domainVersionId?: number | null
    name: string
    competitorDomain: string
    reason: string
    type: string
    createdAt?: Date | string
  }

  export type SuggestedCompetitorCreateOrConnectWithoutDomainInput = {
    where: SuggestedCompetitorWhereUniqueInput
    create: XOR<SuggestedCompetitorCreateWithoutDomainInput, SuggestedCompetitorUncheckedCreateWithoutDomainInput>
  }

  export type SuggestedCompetitorCreateManyDomainInputEnvelope = {
    data: SuggestedCompetitorCreateManyDomainInput | SuggestedCompetitorCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type OnboardingProgressCreateWithoutDomainInput = {
    currentStep?: number
    isCompleted?: boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    domainVersion?: DomainVersionCreateNestedOneWithoutOnboardingProgressesInput
  }

  export type OnboardingProgressUncheckedCreateWithoutDomainInput = {
    id?: number
    domainVersionId?: number | null
    currentStep?: number
    isCompleted?: boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OnboardingProgressCreateOrConnectWithoutDomainInput = {
    where: OnboardingProgressWhereUniqueInput
    create: XOR<OnboardingProgressCreateWithoutDomainInput, OnboardingProgressUncheckedCreateWithoutDomainInput>
  }

  export type OnboardingProgressCreateManyDomainInputEnvelope = {
    data: OnboardingProgressCreateManyDomainInput | OnboardingProgressCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type DomainVersionCreateWithoutDomainInput = {
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionUncheckedCreateWithoutDomainInput = {
    id?: number
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionCreateOrConnectWithoutDomainInput = {
    where: DomainVersionWhereUniqueInput
    create: XOR<DomainVersionCreateWithoutDomainInput, DomainVersionUncheckedCreateWithoutDomainInput>
  }

  export type DomainVersionCreateManyDomainInputEnvelope = {
    data: DomainVersionCreateManyDomainInput | DomainVersionCreateManyDomainInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDomainsInput = {
    update: XOR<UserUpdateWithoutDomainsInput, UserUncheckedUpdateWithoutDomainsInput>
    create: XOR<UserCreateWithoutDomainsInput, UserUncheckedCreateWithoutDomainsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDomainsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDomainsInput, UserUncheckedUpdateWithoutDomainsInput>
  }

  export type UserUpdateWithoutDomainsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutDomainsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlResultUpsertWithWhereUniqueWithoutDomainInput = {
    where: CrawlResultWhereUniqueInput
    update: XOR<CrawlResultUpdateWithoutDomainInput, CrawlResultUncheckedUpdateWithoutDomainInput>
    create: XOR<CrawlResultCreateWithoutDomainInput, CrawlResultUncheckedCreateWithoutDomainInput>
  }

  export type CrawlResultUpdateWithWhereUniqueWithoutDomainInput = {
    where: CrawlResultWhereUniqueInput
    data: XOR<CrawlResultUpdateWithoutDomainInput, CrawlResultUncheckedUpdateWithoutDomainInput>
  }

  export type CrawlResultUpdateManyWithWhereWithoutDomainInput = {
    where: CrawlResultScalarWhereInput
    data: XOR<CrawlResultUpdateManyMutationInput, CrawlResultUncheckedUpdateManyWithoutDomainInput>
  }

  export type CrawlResultScalarWhereInput = {
    AND?: CrawlResultScalarWhereInput | CrawlResultScalarWhereInput[]
    OR?: CrawlResultScalarWhereInput[]
    NOT?: CrawlResultScalarWhereInput | CrawlResultScalarWhereInput[]
    id?: IntFilter<"CrawlResult"> | number
    domainId?: IntNullableFilter<"CrawlResult"> | number | null
    domainVersionId?: IntNullableFilter<"CrawlResult"> | number | null
    pagesScanned?: IntFilter<"CrawlResult"> | number
    contentBlocks?: IntFilter<"CrawlResult"> | number
    keyEntities?: IntFilter<"CrawlResult"> | number
    confidenceScore?: FloatFilter<"CrawlResult"> | number
    extractedContext?: StringFilter<"CrawlResult"> | string
    tokenUsage?: IntNullableFilter<"CrawlResult"> | number | null
    createdAt?: DateTimeFilter<"CrawlResult"> | Date | string
  }

  export type KeywordUpsertWithWhereUniqueWithoutDomainInput = {
    where: KeywordWhereUniqueInput
    update: XOR<KeywordUpdateWithoutDomainInput, KeywordUncheckedUpdateWithoutDomainInput>
    create: XOR<KeywordCreateWithoutDomainInput, KeywordUncheckedCreateWithoutDomainInput>
  }

  export type KeywordUpdateWithWhereUniqueWithoutDomainInput = {
    where: KeywordWhereUniqueInput
    data: XOR<KeywordUpdateWithoutDomainInput, KeywordUncheckedUpdateWithoutDomainInput>
  }

  export type KeywordUpdateManyWithWhereWithoutDomainInput = {
    where: KeywordScalarWhereInput
    data: XOR<KeywordUpdateManyMutationInput, KeywordUncheckedUpdateManyWithoutDomainInput>
  }

  export type KeywordScalarWhereInput = {
    AND?: KeywordScalarWhereInput | KeywordScalarWhereInput[]
    OR?: KeywordScalarWhereInput[]
    NOT?: KeywordScalarWhereInput | KeywordScalarWhereInput[]
    id?: IntFilter<"Keyword"> | number
    term?: StringFilter<"Keyword"> | string
    volume?: IntFilter<"Keyword"> | number
    difficulty?: StringFilter<"Keyword"> | string
    cpc?: FloatFilter<"Keyword"> | number
    domainId?: IntNullableFilter<"Keyword"> | number | null
    domainVersionId?: IntNullableFilter<"Keyword"> | number | null
    isSelected?: BoolFilter<"Keyword"> | boolean
    createdAt?: DateTimeFilter<"Keyword"> | Date | string
    updatedAt?: DateTimeFilter<"Keyword"> | Date | string
  }

  export type DashboardAnalysisUpsertWithWhereUniqueWithoutDomainInput = {
    where: DashboardAnalysisWhereUniqueInput
    update: XOR<DashboardAnalysisUpdateWithoutDomainInput, DashboardAnalysisUncheckedUpdateWithoutDomainInput>
    create: XOR<DashboardAnalysisCreateWithoutDomainInput, DashboardAnalysisUncheckedCreateWithoutDomainInput>
  }

  export type DashboardAnalysisUpdateWithWhereUniqueWithoutDomainInput = {
    where: DashboardAnalysisWhereUniqueInput
    data: XOR<DashboardAnalysisUpdateWithoutDomainInput, DashboardAnalysisUncheckedUpdateWithoutDomainInput>
  }

  export type DashboardAnalysisUpdateManyWithWhereWithoutDomainInput = {
    where: DashboardAnalysisScalarWhereInput
    data: XOR<DashboardAnalysisUpdateManyMutationInput, DashboardAnalysisUncheckedUpdateManyWithoutDomainInput>
  }

  export type DashboardAnalysisScalarWhereInput = {
    AND?: DashboardAnalysisScalarWhereInput | DashboardAnalysisScalarWhereInput[]
    OR?: DashboardAnalysisScalarWhereInput[]
    NOT?: DashboardAnalysisScalarWhereInput | DashboardAnalysisScalarWhereInput[]
    id?: IntFilter<"DashboardAnalysis"> | number
    domainId?: IntNullableFilter<"DashboardAnalysis"> | number | null
    domainVersionId?: IntNullableFilter<"DashboardAnalysis"> | number | null
    metrics?: JsonFilter<"DashboardAnalysis">
    insights?: JsonFilter<"DashboardAnalysis">
    industryAnalysis?: JsonFilter<"DashboardAnalysis">
    createdAt?: DateTimeFilter<"DashboardAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"DashboardAnalysis"> | Date | string
  }

  export type CompetitorAnalysisUpsertWithWhereUniqueWithoutDomainInput = {
    where: CompetitorAnalysisWhereUniqueInput
    update: XOR<CompetitorAnalysisUpdateWithoutDomainInput, CompetitorAnalysisUncheckedUpdateWithoutDomainInput>
    create: XOR<CompetitorAnalysisCreateWithoutDomainInput, CompetitorAnalysisUncheckedCreateWithoutDomainInput>
  }

  export type CompetitorAnalysisUpdateWithWhereUniqueWithoutDomainInput = {
    where: CompetitorAnalysisWhereUniqueInput
    data: XOR<CompetitorAnalysisUpdateWithoutDomainInput, CompetitorAnalysisUncheckedUpdateWithoutDomainInput>
  }

  export type CompetitorAnalysisUpdateManyWithWhereWithoutDomainInput = {
    where: CompetitorAnalysisScalarWhereInput
    data: XOR<CompetitorAnalysisUpdateManyMutationInput, CompetitorAnalysisUncheckedUpdateManyWithoutDomainInput>
  }

  export type CompetitorAnalysisScalarWhereInput = {
    AND?: CompetitorAnalysisScalarWhereInput | CompetitorAnalysisScalarWhereInput[]
    OR?: CompetitorAnalysisScalarWhereInput[]
    NOT?: CompetitorAnalysisScalarWhereInput | CompetitorAnalysisScalarWhereInput[]
    id?: IntFilter<"CompetitorAnalysis"> | number
    domainId?: IntNullableFilter<"CompetitorAnalysis"> | number | null
    domainVersionId?: IntNullableFilter<"CompetitorAnalysis"> | number | null
    competitors?: JsonFilter<"CompetitorAnalysis">
    marketInsights?: JsonFilter<"CompetitorAnalysis">
    strategicRecommendations?: JsonFilter<"CompetitorAnalysis">
    competitiveAnalysis?: JsonFilter<"CompetitorAnalysis">
    competitorList?: StringFilter<"CompetitorAnalysis"> | string
    createdAt?: DateTimeFilter<"CompetitorAnalysis"> | Date | string
    updatedAt?: DateTimeFilter<"CompetitorAnalysis"> | Date | string
  }

  export type SuggestedCompetitorUpsertWithWhereUniqueWithoutDomainInput = {
    where: SuggestedCompetitorWhereUniqueInput
    update: XOR<SuggestedCompetitorUpdateWithoutDomainInput, SuggestedCompetitorUncheckedUpdateWithoutDomainInput>
    create: XOR<SuggestedCompetitorCreateWithoutDomainInput, SuggestedCompetitorUncheckedCreateWithoutDomainInput>
  }

  export type SuggestedCompetitorUpdateWithWhereUniqueWithoutDomainInput = {
    where: SuggestedCompetitorWhereUniqueInput
    data: XOR<SuggestedCompetitorUpdateWithoutDomainInput, SuggestedCompetitorUncheckedUpdateWithoutDomainInput>
  }

  export type SuggestedCompetitorUpdateManyWithWhereWithoutDomainInput = {
    where: SuggestedCompetitorScalarWhereInput
    data: XOR<SuggestedCompetitorUpdateManyMutationInput, SuggestedCompetitorUncheckedUpdateManyWithoutDomainInput>
  }

  export type SuggestedCompetitorScalarWhereInput = {
    AND?: SuggestedCompetitorScalarWhereInput | SuggestedCompetitorScalarWhereInput[]
    OR?: SuggestedCompetitorScalarWhereInput[]
    NOT?: SuggestedCompetitorScalarWhereInput | SuggestedCompetitorScalarWhereInput[]
    id?: IntFilter<"SuggestedCompetitor"> | number
    domainId?: IntNullableFilter<"SuggestedCompetitor"> | number | null
    domainVersionId?: IntNullableFilter<"SuggestedCompetitor"> | number | null
    name?: StringFilter<"SuggestedCompetitor"> | string
    competitorDomain?: StringFilter<"SuggestedCompetitor"> | string
    reason?: StringFilter<"SuggestedCompetitor"> | string
    type?: StringFilter<"SuggestedCompetitor"> | string
    createdAt?: DateTimeFilter<"SuggestedCompetitor"> | Date | string
  }

  export type OnboardingProgressUpsertWithWhereUniqueWithoutDomainInput = {
    where: OnboardingProgressWhereUniqueInput
    update: XOR<OnboardingProgressUpdateWithoutDomainInput, OnboardingProgressUncheckedUpdateWithoutDomainInput>
    create: XOR<OnboardingProgressCreateWithoutDomainInput, OnboardingProgressUncheckedCreateWithoutDomainInput>
  }

  export type OnboardingProgressUpdateWithWhereUniqueWithoutDomainInput = {
    where: OnboardingProgressWhereUniqueInput
    data: XOR<OnboardingProgressUpdateWithoutDomainInput, OnboardingProgressUncheckedUpdateWithoutDomainInput>
  }

  export type OnboardingProgressUpdateManyWithWhereWithoutDomainInput = {
    where: OnboardingProgressScalarWhereInput
    data: XOR<OnboardingProgressUpdateManyMutationInput, OnboardingProgressUncheckedUpdateManyWithoutDomainInput>
  }

  export type OnboardingProgressScalarWhereInput = {
    AND?: OnboardingProgressScalarWhereInput | OnboardingProgressScalarWhereInput[]
    OR?: OnboardingProgressScalarWhereInput[]
    NOT?: OnboardingProgressScalarWhereInput | OnboardingProgressScalarWhereInput[]
    id?: IntFilter<"OnboardingProgress"> | number
    domainId?: IntNullableFilter<"OnboardingProgress"> | number | null
    domainVersionId?: IntNullableFilter<"OnboardingProgress"> | number | null
    currentStep?: IntFilter<"OnboardingProgress"> | number
    isCompleted?: BoolFilter<"OnboardingProgress"> | boolean
    stepData?: JsonNullableFilter<"OnboardingProgress">
    lastActivity?: DateTimeFilter<"OnboardingProgress"> | Date | string
    createdAt?: DateTimeFilter<"OnboardingProgress"> | Date | string
    updatedAt?: DateTimeFilter<"OnboardingProgress"> | Date | string
  }

  export type DomainVersionUpsertWithWhereUniqueWithoutDomainInput = {
    where: DomainVersionWhereUniqueInput
    update: XOR<DomainVersionUpdateWithoutDomainInput, DomainVersionUncheckedUpdateWithoutDomainInput>
    create: XOR<DomainVersionCreateWithoutDomainInput, DomainVersionUncheckedCreateWithoutDomainInput>
  }

  export type DomainVersionUpdateWithWhereUniqueWithoutDomainInput = {
    where: DomainVersionWhereUniqueInput
    data: XOR<DomainVersionUpdateWithoutDomainInput, DomainVersionUncheckedUpdateWithoutDomainInput>
  }

  export type DomainVersionUpdateManyWithWhereWithoutDomainInput = {
    where: DomainVersionScalarWhereInput
    data: XOR<DomainVersionUpdateManyMutationInput, DomainVersionUncheckedUpdateManyWithoutDomainInput>
  }

  export type DomainVersionScalarWhereInput = {
    AND?: DomainVersionScalarWhereInput | DomainVersionScalarWhereInput[]
    OR?: DomainVersionScalarWhereInput[]
    NOT?: DomainVersionScalarWhereInput | DomainVersionScalarWhereInput[]
    id?: IntFilter<"DomainVersion"> | number
    domainId?: IntFilter<"DomainVersion"> | number
    version?: IntFilter<"DomainVersion"> | number
    name?: StringNullableFilter<"DomainVersion"> | string | null
    createdAt?: DateTimeFilter<"DomainVersion"> | Date | string
    updatedAt?: DateTimeFilter<"DomainVersion"> | Date | string
  }

  export type DomainCreateWithoutVersionsInput = {
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    user?: UserCreateNestedOneWithoutDomainsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainInput
    keywords?: KeywordCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutVersionsInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    userId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutVersionsInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutVersionsInput, DomainUncheckedCreateWithoutVersionsInput>
  }

  export type CrawlResultCreateWithoutDomainVersionInput = {
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: string
    tokenUsage?: number | null
    createdAt?: Date | string
    domain?: DomainCreateNestedOneWithoutCrawlResultsInput
  }

  export type CrawlResultUncheckedCreateWithoutDomainVersionInput = {
    id?: number
    domainId?: number | null
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: string
    tokenUsage?: number | null
    createdAt?: Date | string
  }

  export type CrawlResultCreateOrConnectWithoutDomainVersionInput = {
    where: CrawlResultWhereUniqueInput
    create: XOR<CrawlResultCreateWithoutDomainVersionInput, CrawlResultUncheckedCreateWithoutDomainVersionInput>
  }

  export type CrawlResultCreateManyDomainVersionInputEnvelope = {
    data: CrawlResultCreateManyDomainVersionInput | CrawlResultCreateManyDomainVersionInput[]
    skipDuplicates?: boolean
  }

  export type KeywordCreateWithoutDomainVersionInput = {
    term: string
    volume: number
    difficulty: string
    cpc: number
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    domain?: DomainCreateNestedOneWithoutKeywordsInput
    phrases?: PhraseCreateNestedManyWithoutKeywordInput
  }

  export type KeywordUncheckedCreateWithoutDomainVersionInput = {
    id?: number
    term: string
    volume: number
    difficulty: string
    cpc: number
    domainId?: number | null
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    phrases?: PhraseUncheckedCreateNestedManyWithoutKeywordInput
  }

  export type KeywordCreateOrConnectWithoutDomainVersionInput = {
    where: KeywordWhereUniqueInput
    create: XOR<KeywordCreateWithoutDomainVersionInput, KeywordUncheckedCreateWithoutDomainVersionInput>
  }

  export type KeywordCreateManyDomainVersionInputEnvelope = {
    data: KeywordCreateManyDomainVersionInput | KeywordCreateManyDomainVersionInput[]
    skipDuplicates?: boolean
  }

  export type DashboardAnalysisCreateWithoutDomainVersionInput = {
    metrics: JsonNullValueInput | InputJsonValue
    insights: JsonNullValueInput | InputJsonValue
    industryAnalysis: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    domain?: DomainCreateNestedOneWithoutDashboardAnalysesInput
  }

  export type DashboardAnalysisUncheckedCreateWithoutDomainVersionInput = {
    id?: number
    domainId?: number | null
    metrics: JsonNullValueInput | InputJsonValue
    insights: JsonNullValueInput | InputJsonValue
    industryAnalysis: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DashboardAnalysisCreateOrConnectWithoutDomainVersionInput = {
    where: DashboardAnalysisWhereUniqueInput
    create: XOR<DashboardAnalysisCreateWithoutDomainVersionInput, DashboardAnalysisUncheckedCreateWithoutDomainVersionInput>
  }

  export type DashboardAnalysisCreateManyDomainVersionInputEnvelope = {
    data: DashboardAnalysisCreateManyDomainVersionInput | DashboardAnalysisCreateManyDomainVersionInput[]
    skipDuplicates?: boolean
  }

  export type CompetitorAnalysisCreateWithoutDomainVersionInput = {
    competitors: JsonNullValueInput | InputJsonValue
    marketInsights: JsonNullValueInput | InputJsonValue
    strategicRecommendations: JsonNullValueInput | InputJsonValue
    competitiveAnalysis: JsonNullValueInput | InputJsonValue
    competitorList: string
    createdAt?: Date | string
    updatedAt?: Date | string
    domain?: DomainCreateNestedOneWithoutCompetitorAnalysesInput
  }

  export type CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput = {
    id?: number
    domainId?: number | null
    competitors: JsonNullValueInput | InputJsonValue
    marketInsights: JsonNullValueInput | InputJsonValue
    strategicRecommendations: JsonNullValueInput | InputJsonValue
    competitiveAnalysis: JsonNullValueInput | InputJsonValue
    competitorList: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompetitorAnalysisCreateOrConnectWithoutDomainVersionInput = {
    where: CompetitorAnalysisWhereUniqueInput
    create: XOR<CompetitorAnalysisCreateWithoutDomainVersionInput, CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput>
  }

  export type CompetitorAnalysisCreateManyDomainVersionInputEnvelope = {
    data: CompetitorAnalysisCreateManyDomainVersionInput | CompetitorAnalysisCreateManyDomainVersionInput[]
    skipDuplicates?: boolean
  }

  export type SuggestedCompetitorCreateWithoutDomainVersionInput = {
    name: string
    competitorDomain: string
    reason: string
    type: string
    createdAt?: Date | string
    domain?: DomainCreateNestedOneWithoutSuggestedCompetitorsInput
  }

  export type SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput = {
    id?: number
    domainId?: number | null
    name: string
    competitorDomain: string
    reason: string
    type: string
    createdAt?: Date | string
  }

  export type SuggestedCompetitorCreateOrConnectWithoutDomainVersionInput = {
    where: SuggestedCompetitorWhereUniqueInput
    create: XOR<SuggestedCompetitorCreateWithoutDomainVersionInput, SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput>
  }

  export type SuggestedCompetitorCreateManyDomainVersionInputEnvelope = {
    data: SuggestedCompetitorCreateManyDomainVersionInput | SuggestedCompetitorCreateManyDomainVersionInput[]
    skipDuplicates?: boolean
  }

  export type OnboardingProgressCreateWithoutDomainVersionInput = {
    currentStep?: number
    isCompleted?: boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    domain?: DomainCreateNestedOneWithoutOnboardingProgressesInput
  }

  export type OnboardingProgressUncheckedCreateWithoutDomainVersionInput = {
    id?: number
    domainId?: number | null
    currentStep?: number
    isCompleted?: boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OnboardingProgressCreateOrConnectWithoutDomainVersionInput = {
    where: OnboardingProgressWhereUniqueInput
    create: XOR<OnboardingProgressCreateWithoutDomainVersionInput, OnboardingProgressUncheckedCreateWithoutDomainVersionInput>
  }

  export type OnboardingProgressCreateManyDomainVersionInputEnvelope = {
    data: OnboardingProgressCreateManyDomainVersionInput | OnboardingProgressCreateManyDomainVersionInput[]
    skipDuplicates?: boolean
  }

  export type DomainUpsertWithoutVersionsInput = {
    update: XOR<DomainUpdateWithoutVersionsInput, DomainUncheckedUpdateWithoutVersionsInput>
    create: XOR<DomainCreateWithoutVersionsInput, DomainUncheckedCreateWithoutVersionsInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutVersionsInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutVersionsInput, DomainUncheckedUpdateWithoutVersionsInput>
  }

  export type DomainUpdateWithoutVersionsInput = {
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutDomainsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutVersionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type CrawlResultUpsertWithWhereUniqueWithoutDomainVersionInput = {
    where: CrawlResultWhereUniqueInput
    update: XOR<CrawlResultUpdateWithoutDomainVersionInput, CrawlResultUncheckedUpdateWithoutDomainVersionInput>
    create: XOR<CrawlResultCreateWithoutDomainVersionInput, CrawlResultUncheckedCreateWithoutDomainVersionInput>
  }

  export type CrawlResultUpdateWithWhereUniqueWithoutDomainVersionInput = {
    where: CrawlResultWhereUniqueInput
    data: XOR<CrawlResultUpdateWithoutDomainVersionInput, CrawlResultUncheckedUpdateWithoutDomainVersionInput>
  }

  export type CrawlResultUpdateManyWithWhereWithoutDomainVersionInput = {
    where: CrawlResultScalarWhereInput
    data: XOR<CrawlResultUpdateManyMutationInput, CrawlResultUncheckedUpdateManyWithoutDomainVersionInput>
  }

  export type KeywordUpsertWithWhereUniqueWithoutDomainVersionInput = {
    where: KeywordWhereUniqueInput
    update: XOR<KeywordUpdateWithoutDomainVersionInput, KeywordUncheckedUpdateWithoutDomainVersionInput>
    create: XOR<KeywordCreateWithoutDomainVersionInput, KeywordUncheckedCreateWithoutDomainVersionInput>
  }

  export type KeywordUpdateWithWhereUniqueWithoutDomainVersionInput = {
    where: KeywordWhereUniqueInput
    data: XOR<KeywordUpdateWithoutDomainVersionInput, KeywordUncheckedUpdateWithoutDomainVersionInput>
  }

  export type KeywordUpdateManyWithWhereWithoutDomainVersionInput = {
    where: KeywordScalarWhereInput
    data: XOR<KeywordUpdateManyMutationInput, KeywordUncheckedUpdateManyWithoutDomainVersionInput>
  }

  export type DashboardAnalysisUpsertWithWhereUniqueWithoutDomainVersionInput = {
    where: DashboardAnalysisWhereUniqueInput
    update: XOR<DashboardAnalysisUpdateWithoutDomainVersionInput, DashboardAnalysisUncheckedUpdateWithoutDomainVersionInput>
    create: XOR<DashboardAnalysisCreateWithoutDomainVersionInput, DashboardAnalysisUncheckedCreateWithoutDomainVersionInput>
  }

  export type DashboardAnalysisUpdateWithWhereUniqueWithoutDomainVersionInput = {
    where: DashboardAnalysisWhereUniqueInput
    data: XOR<DashboardAnalysisUpdateWithoutDomainVersionInput, DashboardAnalysisUncheckedUpdateWithoutDomainVersionInput>
  }

  export type DashboardAnalysisUpdateManyWithWhereWithoutDomainVersionInput = {
    where: DashboardAnalysisScalarWhereInput
    data: XOR<DashboardAnalysisUpdateManyMutationInput, DashboardAnalysisUncheckedUpdateManyWithoutDomainVersionInput>
  }

  export type CompetitorAnalysisUpsertWithWhereUniqueWithoutDomainVersionInput = {
    where: CompetitorAnalysisWhereUniqueInput
    update: XOR<CompetitorAnalysisUpdateWithoutDomainVersionInput, CompetitorAnalysisUncheckedUpdateWithoutDomainVersionInput>
    create: XOR<CompetitorAnalysisCreateWithoutDomainVersionInput, CompetitorAnalysisUncheckedCreateWithoutDomainVersionInput>
  }

  export type CompetitorAnalysisUpdateWithWhereUniqueWithoutDomainVersionInput = {
    where: CompetitorAnalysisWhereUniqueInput
    data: XOR<CompetitorAnalysisUpdateWithoutDomainVersionInput, CompetitorAnalysisUncheckedUpdateWithoutDomainVersionInput>
  }

  export type CompetitorAnalysisUpdateManyWithWhereWithoutDomainVersionInput = {
    where: CompetitorAnalysisScalarWhereInput
    data: XOR<CompetitorAnalysisUpdateManyMutationInput, CompetitorAnalysisUncheckedUpdateManyWithoutDomainVersionInput>
  }

  export type SuggestedCompetitorUpsertWithWhereUniqueWithoutDomainVersionInput = {
    where: SuggestedCompetitorWhereUniqueInput
    update: XOR<SuggestedCompetitorUpdateWithoutDomainVersionInput, SuggestedCompetitorUncheckedUpdateWithoutDomainVersionInput>
    create: XOR<SuggestedCompetitorCreateWithoutDomainVersionInput, SuggestedCompetitorUncheckedCreateWithoutDomainVersionInput>
  }

  export type SuggestedCompetitorUpdateWithWhereUniqueWithoutDomainVersionInput = {
    where: SuggestedCompetitorWhereUniqueInput
    data: XOR<SuggestedCompetitorUpdateWithoutDomainVersionInput, SuggestedCompetitorUncheckedUpdateWithoutDomainVersionInput>
  }

  export type SuggestedCompetitorUpdateManyWithWhereWithoutDomainVersionInput = {
    where: SuggestedCompetitorScalarWhereInput
    data: XOR<SuggestedCompetitorUpdateManyMutationInput, SuggestedCompetitorUncheckedUpdateManyWithoutDomainVersionInput>
  }

  export type OnboardingProgressUpsertWithWhereUniqueWithoutDomainVersionInput = {
    where: OnboardingProgressWhereUniqueInput
    update: XOR<OnboardingProgressUpdateWithoutDomainVersionInput, OnboardingProgressUncheckedUpdateWithoutDomainVersionInput>
    create: XOR<OnboardingProgressCreateWithoutDomainVersionInput, OnboardingProgressUncheckedCreateWithoutDomainVersionInput>
  }

  export type OnboardingProgressUpdateWithWhereUniqueWithoutDomainVersionInput = {
    where: OnboardingProgressWhereUniqueInput
    data: XOR<OnboardingProgressUpdateWithoutDomainVersionInput, OnboardingProgressUncheckedUpdateWithoutDomainVersionInput>
  }

  export type OnboardingProgressUpdateManyWithWhereWithoutDomainVersionInput = {
    where: OnboardingProgressScalarWhereInput
    data: XOR<OnboardingProgressUpdateManyMutationInput, OnboardingProgressUncheckedUpdateManyWithoutDomainVersionInput>
  }

  export type DomainCreateWithoutCrawlResultsInput = {
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    user?: UserCreateNestedOneWithoutDomainsInput
    keywords?: KeywordCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainInput
    versions?: DomainVersionCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutCrawlResultsInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    userId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainInput
    versions?: DomainVersionUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutCrawlResultsInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutCrawlResultsInput, DomainUncheckedCreateWithoutCrawlResultsInput>
  }

  export type DomainVersionCreateWithoutCrawlResultsInput = {
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutVersionsInput
    keywords?: KeywordCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionUncheckedCreateWithoutCrawlResultsInput = {
    id?: number
    domainId: number
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionCreateOrConnectWithoutCrawlResultsInput = {
    where: DomainVersionWhereUniqueInput
    create: XOR<DomainVersionCreateWithoutCrawlResultsInput, DomainVersionUncheckedCreateWithoutCrawlResultsInput>
  }

  export type DomainUpsertWithoutCrawlResultsInput = {
    update: XOR<DomainUpdateWithoutCrawlResultsInput, DomainUncheckedUpdateWithoutCrawlResultsInput>
    create: XOR<DomainCreateWithoutCrawlResultsInput, DomainUncheckedCreateWithoutCrawlResultsInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutCrawlResultsInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutCrawlResultsInput, DomainUncheckedUpdateWithoutCrawlResultsInput>
  }

  export type DomainUpdateWithoutCrawlResultsInput = {
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutDomainsNestedInput
    keywords?: KeywordUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutCrawlResultsInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: KeywordUncheckedUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainVersionUpsertWithoutCrawlResultsInput = {
    update: XOR<DomainVersionUpdateWithoutCrawlResultsInput, DomainVersionUncheckedUpdateWithoutCrawlResultsInput>
    create: XOR<DomainVersionCreateWithoutCrawlResultsInput, DomainVersionUncheckedCreateWithoutCrawlResultsInput>
    where?: DomainVersionWhereInput
  }

  export type DomainVersionUpdateToOneWithWhereWithoutCrawlResultsInput = {
    where?: DomainVersionWhereInput
    data: XOR<DomainVersionUpdateWithoutCrawlResultsInput, DomainVersionUncheckedUpdateWithoutCrawlResultsInput>
  }

  export type DomainVersionUpdateWithoutCrawlResultsInput = {
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutVersionsNestedInput
    keywords?: KeywordUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainVersionUncheckedUpdateWithoutCrawlResultsInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keywords?: KeywordUncheckedUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainCreateWithoutKeywordsInput = {
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    user?: UserCreateNestedOneWithoutDomainsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainInput
    versions?: DomainVersionCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutKeywordsInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    userId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainInput
    versions?: DomainVersionUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutKeywordsInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutKeywordsInput, DomainUncheckedCreateWithoutKeywordsInput>
  }

  export type DomainVersionCreateWithoutKeywordsInput = {
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutVersionsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionUncheckedCreateWithoutKeywordsInput = {
    id?: number
    domainId: number
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionCreateOrConnectWithoutKeywordsInput = {
    where: DomainVersionWhereUniqueInput
    create: XOR<DomainVersionCreateWithoutKeywordsInput, DomainVersionUncheckedCreateWithoutKeywordsInput>
  }

  export type PhraseCreateWithoutKeywordInput = {
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiQueryResults?: AIQueryResultCreateNestedManyWithoutPhraseInput
  }

  export type PhraseUncheckedCreateWithoutKeywordInput = {
    id?: number
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiQueryResults?: AIQueryResultUncheckedCreateNestedManyWithoutPhraseInput
  }

  export type PhraseCreateOrConnectWithoutKeywordInput = {
    where: PhraseWhereUniqueInput
    create: XOR<PhraseCreateWithoutKeywordInput, PhraseUncheckedCreateWithoutKeywordInput>
  }

  export type PhraseCreateManyKeywordInputEnvelope = {
    data: PhraseCreateManyKeywordInput | PhraseCreateManyKeywordInput[]
    skipDuplicates?: boolean
  }

  export type DomainUpsertWithoutKeywordsInput = {
    update: XOR<DomainUpdateWithoutKeywordsInput, DomainUncheckedUpdateWithoutKeywordsInput>
    create: XOR<DomainCreateWithoutKeywordsInput, DomainUncheckedCreateWithoutKeywordsInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutKeywordsInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutKeywordsInput, DomainUncheckedUpdateWithoutKeywordsInput>
  }

  export type DomainUpdateWithoutKeywordsInput = {
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutDomainsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutKeywordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainVersionUpsertWithoutKeywordsInput = {
    update: XOR<DomainVersionUpdateWithoutKeywordsInput, DomainVersionUncheckedUpdateWithoutKeywordsInput>
    create: XOR<DomainVersionCreateWithoutKeywordsInput, DomainVersionUncheckedCreateWithoutKeywordsInput>
    where?: DomainVersionWhereInput
  }

  export type DomainVersionUpdateToOneWithWhereWithoutKeywordsInput = {
    where?: DomainVersionWhereInput
    data: XOR<DomainVersionUpdateWithoutKeywordsInput, DomainVersionUncheckedUpdateWithoutKeywordsInput>
  }

  export type DomainVersionUpdateWithoutKeywordsInput = {
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutVersionsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainVersionUncheckedUpdateWithoutKeywordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainVersionNestedInput
  }

  export type PhraseUpsertWithWhereUniqueWithoutKeywordInput = {
    where: PhraseWhereUniqueInput
    update: XOR<PhraseUpdateWithoutKeywordInput, PhraseUncheckedUpdateWithoutKeywordInput>
    create: XOR<PhraseCreateWithoutKeywordInput, PhraseUncheckedCreateWithoutKeywordInput>
  }

  export type PhraseUpdateWithWhereUniqueWithoutKeywordInput = {
    where: PhraseWhereUniqueInput
    data: XOR<PhraseUpdateWithoutKeywordInput, PhraseUncheckedUpdateWithoutKeywordInput>
  }

  export type PhraseUpdateManyWithWhereWithoutKeywordInput = {
    where: PhraseScalarWhereInput
    data: XOR<PhraseUpdateManyMutationInput, PhraseUncheckedUpdateManyWithoutKeywordInput>
  }

  export type PhraseScalarWhereInput = {
    AND?: PhraseScalarWhereInput | PhraseScalarWhereInput[]
    OR?: PhraseScalarWhereInput[]
    NOT?: PhraseScalarWhereInput | PhraseScalarWhereInput[]
    id?: IntFilter<"Phrase"> | number
    text?: StringFilter<"Phrase"> | string
    keywordId?: IntFilter<"Phrase"> | number
    createdAt?: DateTimeFilter<"Phrase"> | Date | string
    updatedAt?: DateTimeFilter<"Phrase"> | Date | string
  }

  export type KeywordCreateWithoutPhrasesInput = {
    term: string
    volume: number
    difficulty: string
    cpc: number
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    domain?: DomainCreateNestedOneWithoutKeywordsInput
    domainVersion?: DomainVersionCreateNestedOneWithoutKeywordsInput
  }

  export type KeywordUncheckedCreateWithoutPhrasesInput = {
    id?: number
    term: string
    volume: number
    difficulty: string
    cpc: number
    domainId?: number | null
    domainVersionId?: number | null
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KeywordCreateOrConnectWithoutPhrasesInput = {
    where: KeywordWhereUniqueInput
    create: XOR<KeywordCreateWithoutPhrasesInput, KeywordUncheckedCreateWithoutPhrasesInput>
  }

  export type AIQueryResultCreateWithoutPhraseInput = {
    model: string
    response: string
    latency: number
    cost: number
    presence: number
    relevance: number
    accuracy: number
    sentiment: number
    overall: number
    createdAt?: Date | string
  }

  export type AIQueryResultUncheckedCreateWithoutPhraseInput = {
    id?: number
    model: string
    response: string
    latency: number
    cost: number
    presence: number
    relevance: number
    accuracy: number
    sentiment: number
    overall: number
    createdAt?: Date | string
  }

  export type AIQueryResultCreateOrConnectWithoutPhraseInput = {
    where: AIQueryResultWhereUniqueInput
    create: XOR<AIQueryResultCreateWithoutPhraseInput, AIQueryResultUncheckedCreateWithoutPhraseInput>
  }

  export type AIQueryResultCreateManyPhraseInputEnvelope = {
    data: AIQueryResultCreateManyPhraseInput | AIQueryResultCreateManyPhraseInput[]
    skipDuplicates?: boolean
  }

  export type KeywordUpsertWithoutPhrasesInput = {
    update: XOR<KeywordUpdateWithoutPhrasesInput, KeywordUncheckedUpdateWithoutPhrasesInput>
    create: XOR<KeywordCreateWithoutPhrasesInput, KeywordUncheckedCreateWithoutPhrasesInput>
    where?: KeywordWhereInput
  }

  export type KeywordUpdateToOneWithWhereWithoutPhrasesInput = {
    where?: KeywordWhereInput
    data: XOR<KeywordUpdateWithoutPhrasesInput, KeywordUncheckedUpdateWithoutPhrasesInput>
  }

  export type KeywordUpdateWithoutPhrasesInput = {
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutKeywordsNestedInput
    domainVersion?: DomainVersionUpdateOneWithoutKeywordsNestedInput
  }

  export type KeywordUncheckedUpdateWithoutPhrasesInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIQueryResultUpsertWithWhereUniqueWithoutPhraseInput = {
    where: AIQueryResultWhereUniqueInput
    update: XOR<AIQueryResultUpdateWithoutPhraseInput, AIQueryResultUncheckedUpdateWithoutPhraseInput>
    create: XOR<AIQueryResultCreateWithoutPhraseInput, AIQueryResultUncheckedCreateWithoutPhraseInput>
  }

  export type AIQueryResultUpdateWithWhereUniqueWithoutPhraseInput = {
    where: AIQueryResultWhereUniqueInput
    data: XOR<AIQueryResultUpdateWithoutPhraseInput, AIQueryResultUncheckedUpdateWithoutPhraseInput>
  }

  export type AIQueryResultUpdateManyWithWhereWithoutPhraseInput = {
    where: AIQueryResultScalarWhereInput
    data: XOR<AIQueryResultUpdateManyMutationInput, AIQueryResultUncheckedUpdateManyWithoutPhraseInput>
  }

  export type AIQueryResultScalarWhereInput = {
    AND?: AIQueryResultScalarWhereInput | AIQueryResultScalarWhereInput[]
    OR?: AIQueryResultScalarWhereInput[]
    NOT?: AIQueryResultScalarWhereInput | AIQueryResultScalarWhereInput[]
    id?: IntFilter<"AIQueryResult"> | number
    phraseId?: IntFilter<"AIQueryResult"> | number
    model?: StringFilter<"AIQueryResult"> | string
    response?: StringFilter<"AIQueryResult"> | string
    latency?: FloatFilter<"AIQueryResult"> | number
    cost?: FloatFilter<"AIQueryResult"> | number
    presence?: IntFilter<"AIQueryResult"> | number
    relevance?: IntFilter<"AIQueryResult"> | number
    accuracy?: IntFilter<"AIQueryResult"> | number
    sentiment?: IntFilter<"AIQueryResult"> | number
    overall?: FloatFilter<"AIQueryResult"> | number
    createdAt?: DateTimeFilter<"AIQueryResult"> | Date | string
  }

  export type PhraseCreateWithoutAiQueryResultsInput = {
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
    keyword: KeywordCreateNestedOneWithoutPhrasesInput
  }

  export type PhraseUncheckedCreateWithoutAiQueryResultsInput = {
    id?: number
    text: string
    keywordId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PhraseCreateOrConnectWithoutAiQueryResultsInput = {
    where: PhraseWhereUniqueInput
    create: XOR<PhraseCreateWithoutAiQueryResultsInput, PhraseUncheckedCreateWithoutAiQueryResultsInput>
  }

  export type PhraseUpsertWithoutAiQueryResultsInput = {
    update: XOR<PhraseUpdateWithoutAiQueryResultsInput, PhraseUncheckedUpdateWithoutAiQueryResultsInput>
    create: XOR<PhraseCreateWithoutAiQueryResultsInput, PhraseUncheckedCreateWithoutAiQueryResultsInput>
    where?: PhraseWhereInput
  }

  export type PhraseUpdateToOneWithWhereWithoutAiQueryResultsInput = {
    where?: PhraseWhereInput
    data: XOR<PhraseUpdateWithoutAiQueryResultsInput, PhraseUncheckedUpdateWithoutAiQueryResultsInput>
  }

  export type PhraseUpdateWithoutAiQueryResultsInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    keyword?: KeywordUpdateOneRequiredWithoutPhrasesNestedInput
  }

  export type PhraseUncheckedUpdateWithoutAiQueryResultsInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    keywordId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainCreateWithoutDashboardAnalysesInput = {
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    user?: UserCreateNestedOneWithoutDomainsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainInput
    keywords?: KeywordCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainInput
    versions?: DomainVersionCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutDashboardAnalysesInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    userId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainInput
    versions?: DomainVersionUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutDashboardAnalysesInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutDashboardAnalysesInput, DomainUncheckedCreateWithoutDashboardAnalysesInput>
  }

  export type DomainVersionCreateWithoutDashboardAnalysesInput = {
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutVersionsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionUncheckedCreateWithoutDashboardAnalysesInput = {
    id?: number
    domainId: number
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionCreateOrConnectWithoutDashboardAnalysesInput = {
    where: DomainVersionWhereUniqueInput
    create: XOR<DomainVersionCreateWithoutDashboardAnalysesInput, DomainVersionUncheckedCreateWithoutDashboardAnalysesInput>
  }

  export type DomainUpsertWithoutDashboardAnalysesInput = {
    update: XOR<DomainUpdateWithoutDashboardAnalysesInput, DomainUncheckedUpdateWithoutDashboardAnalysesInput>
    create: XOR<DomainCreateWithoutDashboardAnalysesInput, DomainUncheckedCreateWithoutDashboardAnalysesInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutDashboardAnalysesInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutDashboardAnalysesInput, DomainUncheckedUpdateWithoutDashboardAnalysesInput>
  }

  export type DomainUpdateWithoutDashboardAnalysesInput = {
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutDomainsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutDashboardAnalysesInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainVersionUpsertWithoutDashboardAnalysesInput = {
    update: XOR<DomainVersionUpdateWithoutDashboardAnalysesInput, DomainVersionUncheckedUpdateWithoutDashboardAnalysesInput>
    create: XOR<DomainVersionCreateWithoutDashboardAnalysesInput, DomainVersionUncheckedCreateWithoutDashboardAnalysesInput>
    where?: DomainVersionWhereInput
  }

  export type DomainVersionUpdateToOneWithWhereWithoutDashboardAnalysesInput = {
    where?: DomainVersionWhereInput
    data: XOR<DomainVersionUpdateWithoutDashboardAnalysesInput, DomainVersionUncheckedUpdateWithoutDashboardAnalysesInput>
  }

  export type DomainVersionUpdateWithoutDashboardAnalysesInput = {
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutVersionsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainVersionUncheckedUpdateWithoutDashboardAnalysesInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainCreateWithoutCompetitorAnalysesInput = {
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    user?: UserCreateNestedOneWithoutDomainsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainInput
    keywords?: KeywordCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainInput
    versions?: DomainVersionCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutCompetitorAnalysesInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    userId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainInput
    versions?: DomainVersionUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutCompetitorAnalysesInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutCompetitorAnalysesInput, DomainUncheckedCreateWithoutCompetitorAnalysesInput>
  }

  export type DomainVersionCreateWithoutCompetitorAnalysesInput = {
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutVersionsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionUncheckedCreateWithoutCompetitorAnalysesInput = {
    id?: number
    domainId: number
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionCreateOrConnectWithoutCompetitorAnalysesInput = {
    where: DomainVersionWhereUniqueInput
    create: XOR<DomainVersionCreateWithoutCompetitorAnalysesInput, DomainVersionUncheckedCreateWithoutCompetitorAnalysesInput>
  }

  export type DomainUpsertWithoutCompetitorAnalysesInput = {
    update: XOR<DomainUpdateWithoutCompetitorAnalysesInput, DomainUncheckedUpdateWithoutCompetitorAnalysesInput>
    create: XOR<DomainCreateWithoutCompetitorAnalysesInput, DomainUncheckedCreateWithoutCompetitorAnalysesInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutCompetitorAnalysesInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutCompetitorAnalysesInput, DomainUncheckedUpdateWithoutCompetitorAnalysesInput>
  }

  export type DomainUpdateWithoutCompetitorAnalysesInput = {
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutDomainsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutCompetitorAnalysesInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainVersionUpsertWithoutCompetitorAnalysesInput = {
    update: XOR<DomainVersionUpdateWithoutCompetitorAnalysesInput, DomainVersionUncheckedUpdateWithoutCompetitorAnalysesInput>
    create: XOR<DomainVersionCreateWithoutCompetitorAnalysesInput, DomainVersionUncheckedCreateWithoutCompetitorAnalysesInput>
    where?: DomainVersionWhereInput
  }

  export type DomainVersionUpdateToOneWithWhereWithoutCompetitorAnalysesInput = {
    where?: DomainVersionWhereInput
    data: XOR<DomainVersionUpdateWithoutCompetitorAnalysesInput, DomainVersionUncheckedUpdateWithoutCompetitorAnalysesInput>
  }

  export type DomainVersionUpdateWithoutCompetitorAnalysesInput = {
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutVersionsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainVersionUncheckedUpdateWithoutCompetitorAnalysesInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainCreateWithoutSuggestedCompetitorsInput = {
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    user?: UserCreateNestedOneWithoutDomainsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainInput
    keywords?: KeywordCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainInput
    versions?: DomainVersionCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutSuggestedCompetitorsInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    userId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainInput
    versions?: DomainVersionUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutSuggestedCompetitorsInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutSuggestedCompetitorsInput, DomainUncheckedCreateWithoutSuggestedCompetitorsInput>
  }

  export type DomainVersionCreateWithoutSuggestedCompetitorsInput = {
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutVersionsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionUncheckedCreateWithoutSuggestedCompetitorsInput = {
    id?: number
    domainId: number
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    onboardingProgresses?: OnboardingProgressUncheckedCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionCreateOrConnectWithoutSuggestedCompetitorsInput = {
    where: DomainVersionWhereUniqueInput
    create: XOR<DomainVersionCreateWithoutSuggestedCompetitorsInput, DomainVersionUncheckedCreateWithoutSuggestedCompetitorsInput>
  }

  export type DomainUpsertWithoutSuggestedCompetitorsInput = {
    update: XOR<DomainUpdateWithoutSuggestedCompetitorsInput, DomainUncheckedUpdateWithoutSuggestedCompetitorsInput>
    create: XOR<DomainCreateWithoutSuggestedCompetitorsInput, DomainUncheckedCreateWithoutSuggestedCompetitorsInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutSuggestedCompetitorsInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutSuggestedCompetitorsInput, DomainUncheckedUpdateWithoutSuggestedCompetitorsInput>
  }

  export type DomainUpdateWithoutSuggestedCompetitorsInput = {
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutDomainsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutSuggestedCompetitorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainVersionUpsertWithoutSuggestedCompetitorsInput = {
    update: XOR<DomainVersionUpdateWithoutSuggestedCompetitorsInput, DomainVersionUncheckedUpdateWithoutSuggestedCompetitorsInput>
    create: XOR<DomainVersionCreateWithoutSuggestedCompetitorsInput, DomainVersionUncheckedCreateWithoutSuggestedCompetitorsInput>
    where?: DomainVersionWhereInput
  }

  export type DomainVersionUpdateToOneWithWhereWithoutSuggestedCompetitorsInput = {
    where?: DomainVersionWhereInput
    data: XOR<DomainVersionUpdateWithoutSuggestedCompetitorsInput, DomainVersionUncheckedUpdateWithoutSuggestedCompetitorsInput>
  }

  export type DomainVersionUpdateWithoutSuggestedCompetitorsInput = {
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutVersionsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainVersionUncheckedUpdateWithoutSuggestedCompetitorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainCreateWithoutOnboardingProgressesInput = {
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    user?: UserCreateNestedOneWithoutDomainsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainInput
    keywords?: KeywordCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainInput
    versions?: DomainVersionCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutOnboardingProgressesInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    userId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainInput
    versions?: DomainVersionUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutOnboardingProgressesInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutOnboardingProgressesInput, DomainUncheckedCreateWithoutOnboardingProgressesInput>
  }

  export type DomainVersionCreateWithoutOnboardingProgressesInput = {
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    domain: DomainCreateNestedOneWithoutVersionsInput
    crawlResults?: CrawlResultCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionUncheckedCreateWithoutOnboardingProgressesInput = {
    id?: number
    domainId: number
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    crawlResults?: CrawlResultUncheckedCreateNestedManyWithoutDomainVersionInput
    keywords?: KeywordUncheckedCreateNestedManyWithoutDomainVersionInput
    dashboardAnalyses?: DashboardAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    competitorAnalyses?: CompetitorAnalysisUncheckedCreateNestedManyWithoutDomainVersionInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedCreateNestedManyWithoutDomainVersionInput
  }

  export type DomainVersionCreateOrConnectWithoutOnboardingProgressesInput = {
    where: DomainVersionWhereUniqueInput
    create: XOR<DomainVersionCreateWithoutOnboardingProgressesInput, DomainVersionUncheckedCreateWithoutOnboardingProgressesInput>
  }

  export type DomainUpsertWithoutOnboardingProgressesInput = {
    update: XOR<DomainUpdateWithoutOnboardingProgressesInput, DomainUncheckedUpdateWithoutOnboardingProgressesInput>
    create: XOR<DomainCreateWithoutOnboardingProgressesInput, DomainUncheckedCreateWithoutOnboardingProgressesInput>
    where?: DomainWhereInput
  }

  export type DomainUpdateToOneWithWhereWithoutOnboardingProgressesInput = {
    where?: DomainWhereInput
    data: XOR<DomainUpdateWithoutOnboardingProgressesInput, DomainUncheckedUpdateWithoutOnboardingProgressesInput>
  }

  export type DomainUpdateWithoutOnboardingProgressesInput = {
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutDomainsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutOnboardingProgressesInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainVersionUpsertWithoutOnboardingProgressesInput = {
    update: XOR<DomainVersionUpdateWithoutOnboardingProgressesInput, DomainVersionUncheckedUpdateWithoutOnboardingProgressesInput>
    create: XOR<DomainVersionCreateWithoutOnboardingProgressesInput, DomainVersionUncheckedCreateWithoutOnboardingProgressesInput>
    where?: DomainVersionWhereInput
  }

  export type DomainVersionUpdateToOneWithWhereWithoutOnboardingProgressesInput = {
    where?: DomainVersionWhereInput
    data: XOR<DomainVersionUpdateWithoutOnboardingProgressesInput, DomainVersionUncheckedUpdateWithoutOnboardingProgressesInput>
  }

  export type DomainVersionUpdateWithoutOnboardingProgressesInput = {
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneRequiredWithoutVersionsNestedInput
    crawlResults?: CrawlResultUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainVersionUncheckedUpdateWithoutOnboardingProgressesInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainCreateManyUserInput = {
    id?: number
    url: string
    context?: string | null
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    location?: string | null
  }

  export type DomainUpdateWithoutUserInput = {
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    crawlResults?: CrawlResultUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainNestedInput
    versions?: DomainVersionUncheckedUpdateManyWithoutDomainNestedInput
  }

  export type DomainUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CrawlResultCreateManyDomainInput = {
    id?: number
    domainVersionId?: number | null
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: string
    tokenUsage?: number | null
    createdAt?: Date | string
  }

  export type KeywordCreateManyDomainInput = {
    id?: number
    term: string
    volume: number
    difficulty: string
    cpc: number
    domainVersionId?: number | null
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DashboardAnalysisCreateManyDomainInput = {
    id?: number
    domainVersionId?: number | null
    metrics: JsonNullValueInput | InputJsonValue
    insights: JsonNullValueInput | InputJsonValue
    industryAnalysis: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompetitorAnalysisCreateManyDomainInput = {
    id?: number
    domainVersionId?: number | null
    competitors: JsonNullValueInput | InputJsonValue
    marketInsights: JsonNullValueInput | InputJsonValue
    strategicRecommendations: JsonNullValueInput | InputJsonValue
    competitiveAnalysis: JsonNullValueInput | InputJsonValue
    competitorList: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuggestedCompetitorCreateManyDomainInput = {
    id?: number
    domainVersionId?: number | null
    name: string
    competitorDomain: string
    reason: string
    type: string
    createdAt?: Date | string
  }

  export type OnboardingProgressCreateManyDomainInput = {
    id?: number
    domainVersionId?: number | null
    currentStep?: number
    isCompleted?: boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DomainVersionCreateManyDomainInput = {
    id?: number
    version: number
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CrawlResultUpdateWithoutDomainInput = {
    pagesScanned?: IntFieldUpdateOperationsInput | number
    contentBlocks?: IntFieldUpdateOperationsInput | number
    keyEntities?: IntFieldUpdateOperationsInput | number
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    extractedContext?: StringFieldUpdateOperationsInput | string
    tokenUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainVersion?: DomainVersionUpdateOneWithoutCrawlResultsNestedInput
  }

  export type CrawlResultUncheckedUpdateWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    pagesScanned?: IntFieldUpdateOperationsInput | number
    contentBlocks?: IntFieldUpdateOperationsInput | number
    keyEntities?: IntFieldUpdateOperationsInput | number
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    extractedContext?: StringFieldUpdateOperationsInput | string
    tokenUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlResultUncheckedUpdateManyWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    pagesScanned?: IntFieldUpdateOperationsInput | number
    contentBlocks?: IntFieldUpdateOperationsInput | number
    keyEntities?: IntFieldUpdateOperationsInput | number
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    extractedContext?: StringFieldUpdateOperationsInput | string
    tokenUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeywordUpdateWithoutDomainInput = {
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainVersion?: DomainVersionUpdateOneWithoutKeywordsNestedInput
    phrases?: PhraseUpdateManyWithoutKeywordNestedInput
  }

  export type KeywordUncheckedUpdateWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phrases?: PhraseUncheckedUpdateManyWithoutKeywordNestedInput
  }

  export type KeywordUncheckedUpdateManyWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardAnalysisUpdateWithoutDomainInput = {
    metrics?: JsonNullValueInput | InputJsonValue
    insights?: JsonNullValueInput | InputJsonValue
    industryAnalysis?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainVersion?: DomainVersionUpdateOneWithoutDashboardAnalysesNestedInput
  }

  export type DashboardAnalysisUncheckedUpdateWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    metrics?: JsonNullValueInput | InputJsonValue
    insights?: JsonNullValueInput | InputJsonValue
    industryAnalysis?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardAnalysisUncheckedUpdateManyWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    metrics?: JsonNullValueInput | InputJsonValue
    insights?: JsonNullValueInput | InputJsonValue
    industryAnalysis?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetitorAnalysisUpdateWithoutDomainInput = {
    competitors?: JsonNullValueInput | InputJsonValue
    marketInsights?: JsonNullValueInput | InputJsonValue
    strategicRecommendations?: JsonNullValueInput | InputJsonValue
    competitiveAnalysis?: JsonNullValueInput | InputJsonValue
    competitorList?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainVersion?: DomainVersionUpdateOneWithoutCompetitorAnalysesNestedInput
  }

  export type CompetitorAnalysisUncheckedUpdateWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    competitors?: JsonNullValueInput | InputJsonValue
    marketInsights?: JsonNullValueInput | InputJsonValue
    strategicRecommendations?: JsonNullValueInput | InputJsonValue
    competitiveAnalysis?: JsonNullValueInput | InputJsonValue
    competitorList?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetitorAnalysisUncheckedUpdateManyWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    competitors?: JsonNullValueInput | InputJsonValue
    marketInsights?: JsonNullValueInput | InputJsonValue
    strategicRecommendations?: JsonNullValueInput | InputJsonValue
    competitiveAnalysis?: JsonNullValueInput | InputJsonValue
    competitorList?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestedCompetitorUpdateWithoutDomainInput = {
    name?: StringFieldUpdateOperationsInput | string
    competitorDomain?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainVersion?: DomainVersionUpdateOneWithoutSuggestedCompetitorsNestedInput
  }

  export type SuggestedCompetitorUncheckedUpdateWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    competitorDomain?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestedCompetitorUncheckedUpdateManyWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    competitorDomain?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingProgressUpdateWithoutDomainInput = {
    currentStep?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domainVersion?: DomainVersionUpdateOneWithoutOnboardingProgressesNestedInput
  }

  export type OnboardingProgressUncheckedUpdateWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    currentStep?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingProgressUncheckedUpdateManyWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainVersionId?: NullableIntFieldUpdateOperationsInput | number | null
    currentStep?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainVersionUpdateWithoutDomainInput = {
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    crawlResults?: CrawlResultUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainVersionUncheckedUpdateWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    crawlResults?: CrawlResultUncheckedUpdateManyWithoutDomainVersionNestedInput
    keywords?: KeywordUncheckedUpdateManyWithoutDomainVersionNestedInput
    dashboardAnalyses?: DashboardAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    competitorAnalyses?: CompetitorAnalysisUncheckedUpdateManyWithoutDomainVersionNestedInput
    suggestedCompetitors?: SuggestedCompetitorUncheckedUpdateManyWithoutDomainVersionNestedInput
    onboardingProgresses?: OnboardingProgressUncheckedUpdateManyWithoutDomainVersionNestedInput
  }

  export type DomainVersionUncheckedUpdateManyWithoutDomainInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlResultCreateManyDomainVersionInput = {
    id?: number
    domainId?: number | null
    pagesScanned: number
    contentBlocks: number
    keyEntities: number
    confidenceScore: number
    extractedContext: string
    tokenUsage?: number | null
    createdAt?: Date | string
  }

  export type KeywordCreateManyDomainVersionInput = {
    id?: number
    term: string
    volume: number
    difficulty: string
    cpc: number
    domainId?: number | null
    isSelected?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DashboardAnalysisCreateManyDomainVersionInput = {
    id?: number
    domainId?: number | null
    metrics: JsonNullValueInput | InputJsonValue
    insights: JsonNullValueInput | InputJsonValue
    industryAnalysis: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompetitorAnalysisCreateManyDomainVersionInput = {
    id?: number
    domainId?: number | null
    competitors: JsonNullValueInput | InputJsonValue
    marketInsights: JsonNullValueInput | InputJsonValue
    strategicRecommendations: JsonNullValueInput | InputJsonValue
    competitiveAnalysis: JsonNullValueInput | InputJsonValue
    competitorList: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuggestedCompetitorCreateManyDomainVersionInput = {
    id?: number
    domainId?: number | null
    name: string
    competitorDomain: string
    reason: string
    type: string
    createdAt?: Date | string
  }

  export type OnboardingProgressCreateManyDomainVersionInput = {
    id?: number
    domainId?: number | null
    currentStep?: number
    isCompleted?: boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CrawlResultUpdateWithoutDomainVersionInput = {
    pagesScanned?: IntFieldUpdateOperationsInput | number
    contentBlocks?: IntFieldUpdateOperationsInput | number
    keyEntities?: IntFieldUpdateOperationsInput | number
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    extractedContext?: StringFieldUpdateOperationsInput | string
    tokenUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutCrawlResultsNestedInput
  }

  export type CrawlResultUncheckedUpdateWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    pagesScanned?: IntFieldUpdateOperationsInput | number
    contentBlocks?: IntFieldUpdateOperationsInput | number
    keyEntities?: IntFieldUpdateOperationsInput | number
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    extractedContext?: StringFieldUpdateOperationsInput | string
    tokenUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrawlResultUncheckedUpdateManyWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    pagesScanned?: IntFieldUpdateOperationsInput | number
    contentBlocks?: IntFieldUpdateOperationsInput | number
    keyEntities?: IntFieldUpdateOperationsInput | number
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    extractedContext?: StringFieldUpdateOperationsInput | string
    tokenUsage?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeywordUpdateWithoutDomainVersionInput = {
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutKeywordsNestedInput
    phrases?: PhraseUpdateManyWithoutKeywordNestedInput
  }

  export type KeywordUncheckedUpdateWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phrases?: PhraseUncheckedUpdateManyWithoutKeywordNestedInput
  }

  export type KeywordUncheckedUpdateManyWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    term?: StringFieldUpdateOperationsInput | string
    volume?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    cpc?: FloatFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    isSelected?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardAnalysisUpdateWithoutDomainVersionInput = {
    metrics?: JsonNullValueInput | InputJsonValue
    insights?: JsonNullValueInput | InputJsonValue
    industryAnalysis?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutDashboardAnalysesNestedInput
  }

  export type DashboardAnalysisUncheckedUpdateWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    metrics?: JsonNullValueInput | InputJsonValue
    insights?: JsonNullValueInput | InputJsonValue
    industryAnalysis?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DashboardAnalysisUncheckedUpdateManyWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    metrics?: JsonNullValueInput | InputJsonValue
    insights?: JsonNullValueInput | InputJsonValue
    industryAnalysis?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetitorAnalysisUpdateWithoutDomainVersionInput = {
    competitors?: JsonNullValueInput | InputJsonValue
    marketInsights?: JsonNullValueInput | InputJsonValue
    strategicRecommendations?: JsonNullValueInput | InputJsonValue
    competitiveAnalysis?: JsonNullValueInput | InputJsonValue
    competitorList?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutCompetitorAnalysesNestedInput
  }

  export type CompetitorAnalysisUncheckedUpdateWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    competitors?: JsonNullValueInput | InputJsonValue
    marketInsights?: JsonNullValueInput | InputJsonValue
    strategicRecommendations?: JsonNullValueInput | InputJsonValue
    competitiveAnalysis?: JsonNullValueInput | InputJsonValue
    competitorList?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompetitorAnalysisUncheckedUpdateManyWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    competitors?: JsonNullValueInput | InputJsonValue
    marketInsights?: JsonNullValueInput | InputJsonValue
    strategicRecommendations?: JsonNullValueInput | InputJsonValue
    competitiveAnalysis?: JsonNullValueInput | InputJsonValue
    competitorList?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestedCompetitorUpdateWithoutDomainVersionInput = {
    name?: StringFieldUpdateOperationsInput | string
    competitorDomain?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutSuggestedCompetitorsNestedInput
  }

  export type SuggestedCompetitorUncheckedUpdateWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    competitorDomain?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestedCompetitorUncheckedUpdateManyWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    competitorDomain?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingProgressUpdateWithoutDomainVersionInput = {
    currentStep?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domain?: DomainUpdateOneWithoutOnboardingProgressesNestedInput
  }

  export type OnboardingProgressUncheckedUpdateWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    currentStep?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingProgressUncheckedUpdateManyWithoutDomainVersionInput = {
    id?: IntFieldUpdateOperationsInput | number
    domainId?: NullableIntFieldUpdateOperationsInput | number | null
    currentStep?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    stepData?: NullableJsonNullValueInput | InputJsonValue
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhraseCreateManyKeywordInput = {
    id?: number
    text: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PhraseUpdateWithoutKeywordInput = {
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiQueryResults?: AIQueryResultUpdateManyWithoutPhraseNestedInput
  }

  export type PhraseUncheckedUpdateWithoutKeywordInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiQueryResults?: AIQueryResultUncheckedUpdateManyWithoutPhraseNestedInput
  }

  export type PhraseUncheckedUpdateManyWithoutKeywordInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIQueryResultCreateManyPhraseInput = {
    id?: number
    model: string
    response: string
    latency: number
    cost: number
    presence: number
    relevance: number
    accuracy: number
    sentiment: number
    overall: number
    createdAt?: Date | string
  }

  export type AIQueryResultUpdateWithoutPhraseInput = {
    model?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    latency?: FloatFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    presence?: IntFieldUpdateOperationsInput | number
    relevance?: IntFieldUpdateOperationsInput | number
    accuracy?: IntFieldUpdateOperationsInput | number
    sentiment?: IntFieldUpdateOperationsInput | number
    overall?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIQueryResultUncheckedUpdateWithoutPhraseInput = {
    id?: IntFieldUpdateOperationsInput | number
    model?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    latency?: FloatFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    presence?: IntFieldUpdateOperationsInput | number
    relevance?: IntFieldUpdateOperationsInput | number
    accuracy?: IntFieldUpdateOperationsInput | number
    sentiment?: IntFieldUpdateOperationsInput | number
    overall?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIQueryResultUncheckedUpdateManyWithoutPhraseInput = {
    id?: IntFieldUpdateOperationsInput | number
    model?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    latency?: FloatFieldUpdateOperationsInput | number
    cost?: FloatFieldUpdateOperationsInput | number
    presence?: IntFieldUpdateOperationsInput | number
    relevance?: IntFieldUpdateOperationsInput | number
    accuracy?: IntFieldUpdateOperationsInput | number
    sentiment?: IntFieldUpdateOperationsInput | number
    overall?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}