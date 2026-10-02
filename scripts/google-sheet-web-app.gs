function doPost(e) {
  if (!e || !e.postData) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, message: "Deploy as Web App, then submit from the website." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVP")
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet("RSVP");
  const data = JSON.parse(e.postData.contents || "{}");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Thời gian", "Tên", "Tham dự", "Số người", "Lời nhắn", "Link"]);
  }

  sheet.appendRow([
    new Date(),
    data.guestName || "",
    data.attendance || "",
    data.guestCount || "",
    data.message || "",
    data.pageUrl || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVP");
  const values = sheet ? sheet.getDataRange().getValues() : [];
  const rows = values.slice(1).map(function(row) {
    return {
      time: row[0],
      guestName: row[1],
      attendance: row[2],
      guestCount: row[3],
      message: row[4],
      pageUrl: row[5]
    };
  });

  return ContentService
    .createTextOutput(JSON.stringify({ rows: rows }))
    .setMimeType(ContentService.MimeType.JSON);
}
