import type { Gauge } from "prom-client";
import type { Collector } from "./Collector";

// test collector using config
declare let case1: Collector<{ foo: "bar"; baz: "boo" | "qix" }>;
declare let gaugeBar: Gauge<"bar">;
declare let gaugeBooQix: Gauge<"boo" | "qix">;

exactType(case1.metrics.foo, gaugeBar);
exactType(case1.metrics.baz, gaugeBooQix);

// test collector using string
declare let case2: Collector<"foo" | "bar">;
declare let gaugeNever: Gauge<never>;

exactType(case2.metrics.foo, gaugeNever);
exactType(case2.metrics.bar, gaugeNever);
