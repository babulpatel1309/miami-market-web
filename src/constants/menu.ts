// Menu content for Miami Market.
import type { Meat, AddOn, HotSandwich, ScheduleRow } from "@/types/menu.types";

// Deli sandwiches, priced by the meat (listed high to low).
export const meats: Meat[] = [
  { name: "Roast Beef", price: 7.5 },
  { name: "Pastrami", price: 7.5 },
  { name: "Honey Maple Ham", price: 7.5 },
  { name: "Cajun Turkey", price: 7.5 },
  { name: "Ovengold Turkey", price: 7.5 },
  { name: "Maple Honey Turkey", price: 7.5 },
  { name: "Salsalito Turkey", price: 7.5 },
  { name: "Everroast Chicken", price: 7.5 },
  { name: "Blazing Buffalo Chicken", price: 7.5 },
  { name: "Corned Beef", price: 7.5 },
  { name: "Cranberry Walnut Chicken Salad", price: 7.0 },
  { name: "Roast Turkey", price: 7.0 },
  { name: "Smoked Turkey", price: 7.0 },
  { name: "Ham", price: 7.0 },
  { name: "Pepperoni", price: 7.0 },
  { name: "Salami", price: 7.0 },
  { name: "Cappicola Ham", price: 7.0 },
  { name: "Original Chicken Salad", price: 6.5 },
  { name: "Pepper Loaf", price: 6.5 },
  { name: "Egg Salad", price: 6.5 },
  { name: "Tuna Salad", price: 6.5 },
  { name: "BLT", price: 6.5 },
  { name: "Bologna", price: 6.0 },
  { name: "Braunschweiger", price: 6.0 },
  { name: "Pickle Loaf", price: 6.0 },
  { name: "Ham Salad", price: 6.0 },
];

export const breads = [
  "White",
  "Wheat",
  "Rye",
  "Croissant",
  "Pretzel",
  "Hoagie Bun",
];

export const cheeses = [
  "American",
  "Swiss",
  "Colby",
  "Colby Jack",
  "Pepper Jack",
  "Superhot American",
  "Cheddar",
  "Provolone",
  "Havarti",
  "Baby Swiss",
  "Munster",
];

export const veggies = [
  "Lettuce",
  "Tomato",
  "Onion",
  "Peppers",
  "Pickles",
  "Mayo",
  "Miracle Whip",
  "Mustard",
  "Dijon",
  "Spicy Mustard",
  "Honey Mustard",
  "Horsey Sauce",
  "Oil",
];

export const veggieAddOns: AddOn[] = [
  { name: "Egg", price: "+$1.00" },
  { name: "Bacon", price: "+$1.25" },
];

export const hotSandwiches: HotSandwich[] = [
  {
    num: "01",
    name: "Reuben",
    price: "$7.75",
    desc: "Corned beef, sauerkraut, 1000 Island sauce, grilled on rye with swiss cheese.",
  },
  {
    num: "02",
    name: "Hot Italian",
    price: "$7.75",
    desc: "Pepperoni, capicola ham, and salami grilled on a hoagie bun with provolone cheese — you pick your toppings.",
  },
  {
    num: "03",
    name: "Miami Rascal",
    price: "$7.75",
    desc: "Pastrami, cole slaw, pickles, brown mustard, havarti cheese on wheat bread and grilled.",
  },
  {
    num: "04",
    name: "Chicken Bacon Ranch",
    price: "$8.25",
    accentPrice: true,
    desc: "Ever-Roast chicken breast, 2 slices of bacon, provolone cheese, ranch dressing, grilled on a hoagie roll.",
  },
];

export const soupSizes = ["8oz $3", "12oz $4", "16oz $5", "32oz $10"];

export const schedule: ScheduleRow[] = [
  { day: "Monday", idx: 1, deli: "10 – 8", drive: "10 – 8", hot: "11 – 8" },
  { day: "Tuesday", idx: 2, deli: "10 – 8", drive: "10 – 8", hot: "11 – 8" },
  { day: "Wednesday", idx: 3, deli: "10 – 8", drive: "10 – 8", hot: "11 – 8" },
  { day: "Thursday", idx: 4, deli: "10 – 8", drive: "10 – 8", hot: "11 – 8" },
  { day: "Friday", idx: 5, deli: "10 – 8", drive: "10 – 8", hot: "11 – 8" },
  { day: "Saturday", idx: 6, deli: "10 – 8", drive: "10 – 8", hot: "—" },
  { day: "Sunday", idx: 0, deli: "Closed", drive: "11 – 5", hot: "—" },
];
