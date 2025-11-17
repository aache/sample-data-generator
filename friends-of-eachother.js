//friends-of-eachother.js
const loadEvents = require("./load-events.js");

const events = loadEvents();

const friendsOfEachOther = new Set();

// Inefficient nested loop approach

let iterationCount = 0;
for (const ev1 of events) {
    for (const ev2 of events) {
        iterationCount++;
        if (ev1.Sender && ev1.Receiver &&
            ev2.Sender && ev2.Receiver &&
            ev1.Sender === ev2.Receiver &&
            ev1.Receiver === ev2.Sender) {
            friendsOfEachOther.add(`${ev1.Sender} <-> ${ev1.Receiver}`);
        }
    }
}

console.log(`Total pairs of friends of each other: ${friendsOfEachOther.size/2}`);
console.log(`Total iterations: ${iterationCount}`); // to show the inefficiency of the nested loop approach

// Optimized approach using a Set
// Create a string Sender:Receiver for all events 
const senderReceiverSet = new Set();

// iterationCountOptimized to show efficiency
let iterationCountOptimized = 0;
for (const ev of events) {
    iterationCountOptimized++;
    if (ev.Sender && ev.Receiver) {
        senderReceiverSet.add(`${ev.Sender}:${ev.Receiver}`);
    }
}
// Now check for each pair if the reverse exists
const friendsOfEachOtherOptimized = new Set();
for (const pair of senderReceiverSet) {
    iterationCountOptimized++;
    const [sender, receiver] = pair.split(':');
    const reversePair = `${receiver}:${sender}`;
    if (senderReceiverSet.has(reversePair)) {
        // To avoid duplicates, store in a consistent order
        const sortedPair = [sender, receiver].sort().join(' <-> ');
        friendsOfEachOtherOptimized.add(sortedPair);
    }
}

console.log(`Total pairs of friends of each other (optimized): ${friendsOfEachOtherOptimized.size}`);
console.log(`Total iterations (optimized): ${iterationCountOptimized}`); // to show the efficiency of the optimized approach

console.log("Pairs of friends of each other (optimized):");
for (const pair of friendsOfEachOtherOptimized) {
    console.log(pair);
}   
