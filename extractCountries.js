const allData = require("./all.json");

const countries = [];

allData.forEach((item) => {
  if (!countries.includes(item.country)) {
    countries.push(item.country);
  }
});

require("fs").writeFileSync(
  "countries.js",
  JSON.stringify(
    countries.map((country) => ({
      label: country,
      value: country,
    }))
  )
);
