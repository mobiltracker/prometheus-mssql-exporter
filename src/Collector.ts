import type { Gauge } from "prom-client";

type CollectorGaugesConfigObject = { [key: string]: string };

type CollectorGauges = CollectorGaugesConfigObject | string;

type CollectorMetric<CONFIG extends CollectorGauges> =
  // square bracket to avoid distributivity
  // https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
  [CONFIG] extends [string]
    ? { [key in CONFIG]: Gauge<never> }
    : CONFIG extends CollectorGaugesConfigObject
    ? { [key in keyof CONFIG]: Gauge<CONFIG[key]> }
    : never;

export type Collector<CONFIG extends CollectorGauges> = {
  metrics: CollectorMetric<CONFIG>;
  query: string;
  collect: (rows: any, metrics: CollectorMetric<CONFIG>) => void;
};
