-- Users Table
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId NVARCHAR(255) NOT NULL,  -- 用戶唯一識別
    SystemName VARCHAR(50),         -- 用於區分不同系統
    Username NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    ModifiedBy INT NULL,
    IsDeleted BIT DEFAULT 0          -- 標記是否刪除，軟刪除機制
);

-- Roles Table
CREATE TABLE Roles (
    Id INT PRIMARY KEY IDENTITY(1,1),
    SystemName VARCHAR(50),         -- 用於區分不同系統
    RoleName NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    ModifiedBy INT NULL,
    IsDeleted BIT DEFAULT 0          -- 標記是否刪除，軟刪除機制
);

-- UserRoles Table (Many-to-Many between Users and Roles)
CREATE TABLE UserRoles (
    UserId INT NOT NULL,
    RoleId INT NOT NULL,
    SystemName VARCHAR(50),
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    ModifiedBy INT NULL,
    IsDeleted BIT DEFAULT 0,         -- 🔥 新增軟刪除機制
    PRIMARY KEY (UserId, RoleId),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (RoleId) REFERENCES Roles(Id) ON DELETE CASCADE
);


-- RolePermissions Table (Many-to-Many between Roles and Permissions)
CREATE TABLE RolePermissions (
    RoleId INT NOT NULL,
    PermissionId INT NOT NULL,
    SystemName VARCHAR(50),
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    ModifiedBy INT NULL,
    PRIMARY KEY (RoleId, PermissionId),
    FOREIGN KEY (RoleId) REFERENCES Roles(Id),
    FOREIGN KEY (PermissionId) REFERENCES Permissions(Id),
);

CREATE TABLE RolePermissions (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    RoleId INT NOT NULL,
    PermissionKey VARCHAR(100),  -- 例如 "View_Report"
    PermissionType ENUM('Page', 'Menu', 'Field', 'API'),
    CanAccess BIT,  -- 允許存取（1: 是, 0: 否）
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    ModifiedBy INT NULL,
);

CREATE TABLE AttributePermissions (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    SubjectType ENUM('User', 'Role'),  -- 可以是個別 User 或 Role
    SubjectId INT NOT NULL,  -- RoleId 或 UserId
    PermissionKey VARCHAR(100),  -- 例如 "Edit_Report"
    PermissionType ENUM('Page', 'Menu', 'Field', 'API'),

    -- 針對「某筆資料」的權限
    ResourceType VARCHAR(100) NULL,  -- 例如 "Report", "Customer", "Order"
    ResourceId NVARCHAR(255) NULL,  -- 例如 "123", "456", "789"

    -- 其他 ABAC 屬性
    EnvironmentKey VARCHAR(100) NULL,  
    EnvironmentValue NVARCHAR(255) NULL,  

    CanAccess BIT  -- 允許存取（1: 是, 0: 否）

    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    ModifiedBy INT NULL,
);