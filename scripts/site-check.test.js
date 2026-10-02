const assert = require("assert");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf8");
const linkPage = fs.readFileSync("tao-link.html", "utf8");
const main = fs.readFileSync("scripts/main.js", "utf8");
const config = fs.readFileSync("scripts/rsvp-config.js", "utf8");
const list = fs.readFileSync("xac-nhan.html", "utf8");
const appsScript = fs.readFileSync("scripts/google-sheet-web-app.gs", "utf8");

assert(index.includes('property="og:title"'));
assert(index.includes('property="og:description"'));
assert(index.includes('property="og:image" content="https://weddingnhunghung.vercel.app/images/zalo-preview.jpg"'));
assert(index.includes('property="og:image:type" content="image/jpeg"'));
assert(index.includes('property="og:image:width" content="1200"'));
assert(index.includes('property="og:image:height" content="630"'));
assert(index.includes('property="og:url" content="https://weddingnhunghung.vercel.app/"'));
assert(index.includes('property="og:site_name"'));
assert(index.includes('property="og:locale" content="vi_VN"'));
assert(index.includes('property="og:type" content="website"'));
assert(index.includes('name="twitter:card" content="summary_large_image"'));
assert(index.includes('id="rsvpForm"'));
assert(index.includes('id="rsvpGuests"'));
assert(index.includes('href="#rsvp"'));

assert(config.includes("window.RSVP_SHEET_URL"));
assert(main.includes("window.RSVP_SHEET_URL"));
assert(main.includes("await fetch(googleSheetUrl"));
assert(main.includes("guestCount: guests"));
assert(main.includes("attendance: attendance"));
assert(!main.includes("zalo.me/"));

assert(list.includes('id="rsvpRows"'));
assert(list.includes("window.RSVP_SHEET_URL"));
assert(list.includes("fetch(sheetUrl"));
assert(linkPage.includes("xac-nhan.html"));

assert(appsScript.includes("function doPost(e)"));
assert(appsScript.includes("if (!e || !e.postData)"));
assert(appsScript.includes("function doGet()"));
assert(appsScript.includes("appendRow"));
assert(appsScript.includes("getValues"));

console.log("site checks passed");
