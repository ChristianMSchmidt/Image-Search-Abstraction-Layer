"use strict";
const mongo = require("mongodb").MongoClient;
const db_url = process.env.DB_URL || require("./credentials.js").DB_URL;
const parseTime = require("./parseTime.js");

let database = null;
const open = function () {
     return mongo.connect(db_url)
            .then(db => {
                database = db;
                return db.collection("searches");
            });
};

const insert = function (searchString, date) {
    open().then(coll => {
        coll.insert({
            "term": searchString,
            "UTC_Time": new Date(date).getTime(),
        });
        database.close();
    });
};

const history = function () {
    return  open().then(coll => {
                return coll.find({},{_id: 0}).sort({UTC_Time: -1}).limit(10).toArray();
            })
            .then(arr => {
                const final = [];
                for (let i = 0; i < arr.length; i++) {
                    final.push({
                        "searched for": arr[i].term,
                        "on": parseTime(arr[i].UTC_Time)
                    });
                }
                database.close();
                return final;
            });
};


module.exports = {
    insert: insert,
    history: history,
};