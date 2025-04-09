document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const fileList = document.getElementById('file-list');
    const paginationContainer = document.getElementById('pagination');
    const pageInfoContainer = document.getElementById('pageInfo');

    // 將原始的列表項目儲存起來，注意：NodeList 是 live 的，轉為靜態 Array
    const allListItems = Array.from(fileList.querySelectorAll('li'));

    const itemsPerPage = 10;
    let currentPage = 1;
    let filteredItems = [...allListItems]; // 初始狀態下，篩選結果包含所有項目

    // --- 核心更新函式 ---
    function updateDisplay() {
        // 1. 根據搜尋框篩選
        const searchTerm = searchInput.value.toLowerCase();
        filteredItems = allListItems.filter(item => {
            const linkText = item.querySelector('a')?.textContent.toLowerCase() || '';
            return linkText.includes(searchTerm);
        });

        // 2. 計算總頁數
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        // 確保目前頁碼不會超過總頁數 (例如篩選後項目變少)
        currentPage = Math.max(1, Math.min(currentPage, totalPages));

        // 3. 顯示目前頁面的項目
        displayPageItems(currentPage);

        // 4. 更新分頁控制項
        setupPagination(totalPages);

        // 5. 更新頁面資訊
        updatePageInfo(totalPages);
    }

    // --- 顯示指定頁面的項目 ---
    function displayPageItems(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // 先隱藏所有原始項目
        allListItems.forEach(item => item.style.display = 'none');

        // 只顯示當前頁面且符合篩選條件的項目
        const itemsToShow = filteredItems.slice(startIndex, endIndex);
        itemsToShow.forEach(item => item.style.display = ''); // 恢復預設顯示 (通常是 'list-item')
    }

    // --- 建立分頁按鈕 ---
    function setupPagination(totalPages) {
        paginationContainer.innerHTML = ''; // 清空舊按鈕

        if (totalPages <= 1) return; // 只有一頁或沒有內容時，不顯示分頁

        // 上一頁按鈕
        const prevButton = createButton('上一頁', () => {
            if (currentPage > 1) {
                currentPage--;
                updateDisplay(); // 只需更新顯示即可，篩選條件不變
            }
        }, currentPage === 1);
        paginationContainer.appendChild(prevButton);

        // 頁碼按鈕 (可視情況簡化，例如只顯示部分頁碼)
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = createButton(i, () => {
                currentPage = i;
                updateDisplay(); // 只需更新顯示即可
            }, false, currentPage === i); // 第四個參數標示是否為目前頁
            paginationContainer.appendChild(pageButton);
        }

        // 下一頁按鈕
        const nextButton = createButton('下一頁', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateDisplay(); // 只需更新顯示即可
            }
        }, currentPage === totalPages);
        paginationContainer.appendChild(nextButton);
    }

    // --- 更新頁面資訊 ---
    function updatePageInfo(totalPages) {
        if (filteredItems.length === 0) {
            pageInfoContainer.textContent = '沒有符合條件的項目';
        } else if (totalPages <= 1) {
             pageInfoContainer.textContent = `共 ${filteredItems.length} 個項目`;
        }
        else {
            pageInfoContainer.textContent = `第 ${currentPage} / ${totalPages} 頁，共 ${filteredItems.length} 個項目`;
        }
    }

    // --- 輔助：建立按鈕 ---
    function createButton(text, onClick, isDisabled, isCurrent = false) {
        const button = document.createElement('button');
        button.textContent = text;
        button.disabled = isDisabled;
        button.onclick = onClick;
        if (isCurrent) {
            button.classList.add('current-page'); // 為目前頁碼按鈕添加樣式 (需在 index.css 定義)
            button.disabled = true; // 目前頁碼按鈕也禁用
        }
        return button;
    }

    // --- 事件監聽 ---
    searchInput.addEventListener('input', () => {
        currentPage = 1; // 每次搜尋時，都回到第一頁
        updateDisplay();
    });

    // --- 初始載入 ---
    updateDisplay(); // 頁面載入後，執行一次以顯示第一頁內容和分頁

});
