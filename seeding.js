const insertSeeds = 'INSERT INTO HoneyDoList (task_ID,title,createdAt,taskComplete) VALUES ?" ';

let tasks = [
(1, 'Forgive yourself and act with the knowledge you have now', new Date(), false),
(2, 'Find ways to hold yourself accountable, in loving ways', new Date(), false),
(3, 'Forgive others and release the extra weight (karma)', new Date(), false),
(4, 'Be grateful for a chance to breathe again', new Date(), false),
(5, 'Be grateful for ability to smile', new Date(), false)
];

module.exports = insertSeeds;
module.exports = tasks;