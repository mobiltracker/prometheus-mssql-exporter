import type { Gauge } from "prom-client";

declare module "prom-client" {
  interface Gauge<T extends string> extends metric {
    labelNames: string[];
  }
}
