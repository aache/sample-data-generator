const fs = require('fs');

// Example: generate 200 unique people and 2000 events
const { faker } = require('@faker-js/faker');
const names = faker.helpers.uniqueArray(faker.person.fullName, 200);
const statuses = ["sent", "accepted", "denied"];
let rows = [];

// CSV header
rows.push("Date,Sender,Receiver,Status");

// Generate 2000 random events
for (let i = 0; i < 2000; i++) {
  // Pick random sender and receiver (ensure they differ)
  const sender = faker.helpers.arrayElement(names);
  let receiver = faker.helpers.arrayElement(names);
  if (receiver === sender) {
    // retry if same person selected (simple approach)
    receiver = faker.helpers.arrayElement(names.filter(n => n !== sender));
  }
  const status = faker.helpers.arrayElement(statuses);
  // Random date between 2020-01-01 and now
  const date = faker.date.between({ from: '2020-01-01', to: Date.now() });
  // Format date as ISO string (or any desired format)
  rows.push(`${date.toISOString()},${sender},${receiver},${status}`);
}

// Write all rows to a CSV file
const csvContent = rows.join("\n");
fs.writeFile('friend_requests.csv', csvContent, 'utf8', (err) => {
  if (err) {
    console.error("Error writing CSV file:", err);
  } else {
    console.log("CSV file saved.");
  }
});