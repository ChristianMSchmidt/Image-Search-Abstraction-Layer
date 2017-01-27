"use strict";
const fill = nr => nr < 10 ? "0" + nr : nr.toString();
const day = nr => {
        nr = fill(nr);
        return nr + (nr === ("01"||"21"||"31") ? "st" :
                     nr === ("02"||"22")       ? "nd" :
                     nr === ("03"||"23")       ? "rd" :
                                                 "th");
    };
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const parseTime = function(value) {
    let date = new Date(value);
    return `${weekday[date.getDay()]} the ${day(date.getDate())} of ${month[date.getMonth()]} ${date.getFullYear()} at ${fill(date.getHours())}:${fill(date.getMinutes())}:${fill(date.getSeconds())} UTC`;
};

module.exports = parseTime;