// Clients 資料庫結構
const clientsSchema = {
  parent: { database_id: process.env.NOTION_DATABASE_ID },
  properties: {
    '名稱': { title: {} },
    '聯絡資訊': { rich_text: {} },
    '備註': { rich_text: {} }
  }
};

module.exports = clientsSchema;
