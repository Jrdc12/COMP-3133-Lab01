// Download given input_countries.csv file to read data and perform following task
// 1. Delete canada.txt and usa.txt if already exist using fs module
// 2. Filter data of Canada and write data to canada.txt
// 3. Filter data of USA and write data to usa.txt

const fs = require("fs")
const csv = require("csv-parser")
const countries = []

fs.createReadStream("input_countries.csv")
  .pipe(csv())
  .on("data", (row) => {
    countries.push(row)
  })
  .on("end", () => {
    console.log("CSV file successfully processed")
    const canada = countries.filter((country) => country.country === "Canada")
    const usa = countries.filter((country) => country.country === "United States")
    fs.unlinkSync("canada.txt")
    fs.unlinkSync("usa.txt")
    fs.writeFileSync("canada.txt", JSON.stringify(canada))
    fs.writeFileSync("usa.txt", JSON.stringify(usa))
  })
