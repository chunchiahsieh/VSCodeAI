// Payments 資料庫結構
const paymentsSchema = {
  parent: { database_id: process.env.NOTION_DATABASE_ID },
  properties: {
    '金額': { number: { format: 'dollar' } },
    '日期': { date: {} },
    '專案': {
      relation: {
        database_id: process.env.PROJECTS_DATABASE_ID
      }
    },
    '客戶': {
      relation: {
        database_id: process.env.CLIENTS_DATABASE_ID
      }
    },
    '付款方式': {
      select: {
        options: [
          { name: '現金' },
          { name: '信用卡' },
          { name: '轉帳' }
        ]
      }
    }
  }
};

module.exports = paymentsSchema;
