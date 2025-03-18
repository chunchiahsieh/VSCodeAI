CREATE TABLE FieldPermissions (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    SystemName VARCHAR(50),  -- 🔥 新增：區分系統
    RoleId INT,
    FOREIGN KEY (RoleId) REFERENCES Roles(Id),
    Resource VARCHAR(50),  
    Field VARCHAR(50),  
    CanView BIT,
    CanEdit BIT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    ModifiedBy INT NULL,
    FOREIGN KEY (CreatedBy) REFERENCES Users(Id),
    FOREIGN KEY (ModifiedBy) REFERENCES Users(Id)
);

CREATE TABLE MenuPermissions (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    SystemName VARCHAR(50),  -- 🔥 新增：區分系統
    RoleId INT,
    FOREIGN KEY (RoleId) REFERENCES Roles(Id),
    MenuKey VARCHAR(50),  
    CanAccess BIT,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    ModifiedBy INT NULL,
    FOREIGN KEY (CreatedBy) REFERENCES Users(Id),
    FOREIGN KEY (ModifiedBy) REFERENCES Users(Id)
);

CREATE TABLE APIPermissions (
    Id INT PRIMARY KEY,
    SystemName VARCHAR(50),  -- 🔥 新增：區分系統
    RoleId INT,
    FOREIGN KEY (RoleId) REFERENCES Roles(Id),
    Resource VARCHAR(50),
    Action VARCHAR(50),
    Condition VARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy INT NULL,
    UpdatedAt DATETIME DEFAULT GETDATE(),
    ModifiedBy INT NULL,
    FOREIGN KEY (CreatedBy) REFERENCES Users(Id),
    FOREIGN KEY (ModifiedBy) REFERENCES Users(Id)
);
