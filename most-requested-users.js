// most-requested-users.js
const fs = require("fs");
const path = require("path");

// Path to the CSV file (same folder)
const filePath = path.join(__dirname, "friend_requests.csv");

// How many top users to show
const TOP_N = 10;

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading CSV file:", err);
    process.exit(1);
  }

  const lines = data.split(/\r?\n/);

  if (lines.length <= 1) {
    console.error("CSV seems empty or has only a header.");
    process.exit(1);
  }

  // First line is header: Date,Sender,Receiver,Status
  const header = lines[0].split(",");
  const receiverIndex = header.indexOf("Receiver");

  if (receiverIndex === -1) {
    console.error("Could not find 'Receiver' column in CSV header.");
    process.exit(1);
  }

  const receiverCountMap = new Map();

  // Process each data line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // skip empty lines

    const cols = line.split(",");
    if (cols.length <= receiverIndex) continue; // malformed line

    const receiver = cols[receiverIndex].trim();
    if (!receiver) continue;

    const currentCount = receiverCountMap.get(receiver) || 0;
    receiverCountMap.set(receiver, currentCount + 1);
  }

  // Convert map to array and sort by count desc
  const sorted = Array.from(receiverCountMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  console.log(`Top ${Math.min(TOP_N, sorted.length)} most requested users:\n`);
  sorted.slice(0, TOP_N).forEach(([name, count], idx) => {
    console.log(`${idx + 1}. ${name} — ${count} requests`);
  });
});