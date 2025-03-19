using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SSO.Data;
using SSO.Model; // 🔥 確保導入你的 ApplicationUser
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
// 加入控制器與Swagger服務
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "SSO API",
        Version = "v1",
        Description = "ASP.NET Core Identity + JWT SSO API"
    });

    // 設定 JWT 認證
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "請輸入 `Bearer <你的 JWT Token>`"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// 🔹 設定資料庫連線
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🔹 註冊 Identity（使用 ApplicationUser）
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// 🔹 啟用驗證
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

var app = builder.Build();

// 啟用 Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SSO API v1");
    });
}

// 🔹 加入驗證與授權
app.UseAuthentication();
app.UseAuthorization();

app.Run();
