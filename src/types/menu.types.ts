// Domain types for the Miami Market menu content.

export type Meat = { name: string; price: number };

export type AddOn = { name: string; price: string };

export type HotSandwich = {
  num: string;
  name: string;
  price: string;
  accentPrice?: boolean;
  desc: string;
};

export type ScheduleRow = {
  day: string;
  idx: number;
  deli: string;
  drive: string;
  hot: string;
};
