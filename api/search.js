"use strict";
const api_key = process.env.API_KEY || require("./credentials.js").API_KEY;
const cse_id = process.env.CSE_ID || require("./credentials.js").CSE_ID;
const https = require('https');
const accessDB = require("./accessDB.js");


const search = function(str, options) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${api_key}&cx=${cse_id}&searchType=image&q=${str}&num=${options.offset || 10}`;
    const arr = [];
    
    return new Promise((resolve,reject) => {
        const req = https.get(url, (res) => {
            accessDB.insert(str,res.headers.date);
            res.setEncoding("utf8");
            let compl = "";
            res.on("data", chunk => compl += chunk);
            res.on("end", () => {
                const obj = JSON.parse(compl);
                for(let i = 0; i < obj.items.length; i++) {
                    let item = obj.items[i];
                    arr.push({
                        snippet: item.snippet,
                        imageURL: item.link,
                        siteURL: item.image.contextLink,
                        thumbnail: item.image.thumbnailLink,
                    });
                }
                resolve(arr);
            });
 
        });
        req.on("error", err => {
            reject(err);
        });
        req.end();
    });
};

module.exports = search;