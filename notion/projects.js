// Projects 資料庫結構
const projectsSchema = {
  parent: { database_id: process.env.NOTION_DATABASE_ID },
  properties: {
    '名稱': { title: {} },
    '客戶': { 
      relation: {
        database_id: process.env.CLIENTS_DATABASE_ID
      }
    },
    '開始日期': { date: {} },
    '結束日期': { date: {} },
    '狀態': {
      select: {
        options: [
          { name: '進行中' },
          { name: '已完成' },
          { name: '暫停' }
        ]
      }
    }
  }
};

module.exports = projectsSchema;
