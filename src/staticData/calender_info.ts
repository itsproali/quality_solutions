export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// years from 2015 to 1970
export const years = [
  ...Array.from({ length: 100 }, (_, i) => i + 1915).reverse(),
];
