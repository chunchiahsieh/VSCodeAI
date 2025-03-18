// Tasks 資料庫結構
const tasksSchema = {
  parent: { database_id: process.env.NOTION_DATABASE_ID },
  properties: {
    '名稱': { title: {} },
    '專案': {
      relation: {
        database_id: process.env.PROJECTS_DATABASE_ID
      }
    },
    '負責人': { people: {} },
    '截止日期': { date: {} },
    '狀態': {
      select: {
        options: [
          { name: '待辦' },
          { name: '進行中' },
          { name: '已完成' }
        ]
      }
    }
  }
};

module.exports = tasksSchema;
