/* global db print */
/* eslint no-restricted-globals: "off" */
db.stuffies.remove({});

initStuffies = [
    {
        "stuffyName": "Rexie", 
        "primaryColor":"Turquois",
        "secondaryColor":"Lime"
    },
    {
        "stuffyName": "Rexina", 
        "primaryColor":"Pink",
        "secondaryColor":"Yellow"
    },
]

for (let i = 0; i < initStuffies.length; i++) {
    const stuffy = initStuffies[i];
    db.stuffies.insertOne(stuffy);
}
