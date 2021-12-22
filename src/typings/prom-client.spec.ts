import { Gauge } from "prom-client";

// test collector using config
declare let case1: Gauge<never>;
declare let name: string;

exactType(case1.name, name);
