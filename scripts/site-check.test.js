const assert = require("assert");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf8");
const main = fs.readFileSync("scripts/main.js", "utf8");

assert(index.includes('property="og:title" content="Hồng Nhung & Huy Hùng"'));
assert(index.includes('property="og:image" content="https://weddingnhunghung.vercel.app/images/zalo-preview.jpg"'));
assert(index.includes('property="og:url" content="https://weddingnhunghung.vercel.app/"'));
assert(index.includes('id="rsvpForm"'));
assert(index.includes('id="rsvpGuests"'));
assert(index.includes('href="#rsvp"'));
assert(main.includes('const zaloPhone = "0936459577";'));
assert(main.includes('"Số người tham dự: " + guests'));
assert(main.includes("zalo.me/"));

console.log("site checks passed");
