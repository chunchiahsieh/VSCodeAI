// 記帳管理功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化數據
    let expenses = [];
    let categories = ['飲食', '交通', '娛樂', '其他'];

    // 載入本地存儲的數據
    if (localStorage.getItem('expenses')) {
        expenses = JSON.parse(localStorage.getItem('expenses'));
    }
    if (localStorage.getItem('categories')) {
        categories = JSON.parse(localStorage.getItem('categories'));
    }

    // 主頁功能
    const expenseForm = document.getElementById('expenseForm');
    if (expenseForm) {
        // 初始化分類選項
        const categorySelect = document.getElementById('category');
        if (categorySelect) {
            categorySelect.innerHTML = categories.map(cat => 
                `<option value="${cat}">${cat}</option>`
            ).join('');
        }

        // 表單提交處理
        expenseForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const newExpense = {
                date: document.getElementById('date').value,
                amount: parseFloat(document.getElementById('amount').value).toFixed(2),
                category: document.getElementById('category').value,
                description: document.getElementById('description').value
            };

            expenses.push(newExpense);
            saveToLocalStorage();
            if (expenseTable) renderExpenses();
            expenseForm.reset();
        });
    }

    // 報表頁功能
    const expenseChart = document.getElementById('expenseChart');
    if (expenseChart) {
        renderChart();
    }

    // 分類管理頁功能
    const categoryForm = document.getElementById('categoryForm');
    if (categoryForm) {
        categoryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newCategory = document.getElementById('categoryName').value.trim();
            if (newCategory && !categories.includes(newCategory)) {
                categories.push(newCategory);
                saveToLocalStorage();
                renderCategories();
                categoryForm.reset();
            }
        });
        renderCategories();
    }

    // 渲染支出記錄
    function renderExpenses() {
        const expenseTable = document.getElementById('expenseTable');
        if (expenseTable) {
            expenseTable.innerHTML = '';
            expenses.forEach((expense, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${expense.date}</td>
                    <td>$${expense.amount}</td>
                    <td>${expense.category}</td>
                    <td>${expense.description}</td>
                    <td>
                        <button onclick="deleteExpense(${index})">刪除</button>
                    </td>
                `;
                expenseTable.appendChild(row);
            });
        }
    }

    // 渲染分類列表
    function renderCategories() {
        const categoryList = document.getElementById('categoryList');
        if (categoryList) {
            categoryList.innerHTML = categories.map((category, index) => `
                <li>
                    ${category}
                    <button onclick="deleteCategory(${index})">刪除</button>
                </li>
            `).join('');
        }
    }

    // 渲染圖表
    function renderChart() {
        const ctx = document.getElementById('expenseChart').getContext('2d');
        const categoryTotals = {};

        expenses.forEach(expense => {
            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += parseFloat(expense.amount);
        });

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(categoryTotals),
                datasets: [{
                    data: Object.values(categoryTotals),
                    backgroundColor: [
                        '#1abc9c', '#3498db', '#9b59b6', '#f1c40f',
                        '#e67e22', '#e74c3c', '#95a5a6'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` ${context.label}: $${context.raw.toFixed(2)}`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 保存到本地存儲
    function saveToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    // 刪除支出記錄
    window.deleteExpense = function(index) {
        if (confirm('確定要刪除此筆記錄嗎？')) {
            expenses.splice(index, 1);
            saveToLocalStorage();
            renderExpenses();
        }
    };

    // 刪除分類
    window.deleteCategory = function(index) {
        if (confirm('確定要刪除此分類嗎？所有相關支出記錄也將被刪除')) {
            const category = categories[index];
            categories.splice(index, 1);
            expenses = expenses.filter(expense => expense.category !== category);
            saveToLocalStorage();
            renderCategories();
            if (expenseTable) renderExpenses();
            if (expenseChart) renderChart();
        }
    };
});
