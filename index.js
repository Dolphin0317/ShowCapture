const itemsPerPage = 10; // 每頁顯示的檔案數量
let currentPage = 1; // 當前頁數
let fileList = []; // 存儲檔案列表

// 更新檔案列表顯示
function updateFileList() {
    const fileListContainer = document.getElementById('file-list');
    fileListContainer.innerHTML = ''; // 清空現有列表

    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const currentItems = fileList.slice(start, end);

    currentItems.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file;
        fileListContainer.appendChild(li);
    });
}

// 更新分頁控制顯示
function updatePagination() {
    document.getElementById('page-number').textContent = `第 ${currentPage} 頁`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage * itemsPerPage >= fileList.length;
}

// 改變頁數
function changePage(direction) {
    currentPage += direction;

    // 防止頁數超出範圍
    if (currentPage < 1) currentPage = 1;
    if (currentPage * itemsPerPage > fileList.length) currentPage = Math.ceil(fileList.length / itemsPerPage);

    updateFileList();
    updatePagination();
}



// 頁面載入後載入檔案列表
// window.onload = function() {
//     fetch('file-list.txt')  // 假設是從伺服器獲取檔案
//         .then(response => response.text())
//         .then(data => {
//             fileList = data.split('\n'); // 假設每行為一個檔案名稱
//             updateFileList();
//             updatePagination();
//             const lastUpdateTime = new Date().toLocaleString();
//             document.getElementById('renew-time').querySelector('span').textContent = lastUpdateTime;
//         })
//         .catch(error => console.error('載入檔案列表錯誤:', error));
// };
