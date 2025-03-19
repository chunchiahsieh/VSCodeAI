using Microsoft.AspNetCore.Identity;

namespace SSO.Model // ⚠️ 這裡要確保 "Model" 跟你的專案資料夾名稱一致
{
    public class ApplicationUser : IdentityUser
    {
        public string Username { get; set; } = string.Empty;  // 避免 Null 警告
    }
}
