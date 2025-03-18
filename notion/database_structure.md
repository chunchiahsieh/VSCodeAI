# Notion 資料庫結構說明

## 1. Clients 資料庫
- **名稱** (Title)
- **聯絡資訊** (Text)
- **備註** (Text)

## 2. Projects 資料庫
- **名稱** (Title)
- **客戶** (Relation) → 連結到 Clients 資料庫
- **開始日期** (Date)
- **結束日期** (Date)
- **狀態** (Select) → 選項：
  - 進行中
  - 已完成
  - 暫停

## 3. Tasks 資料庫
- **名稱** (Title)
- **專案** (Relation) → 連結到 Projects 資料庫
- **負責人** (Person)
- **截止日期** (Date)
- **狀態** (Select) → 選項：
  - 待辦
  - 進行中
  - 已完成

## 4. Payments 資料庫
- **金額** (Number) → 格式：美元
- **日期** (Date)
- **專案** (Relation) → 連結到 Projects 資料庫
- **客戶** (Relation) → 連結到 Clients 資料庫
- **付款方式** (Select) → 選項：
  - 現金
  - 信用卡
  - 轉帳
