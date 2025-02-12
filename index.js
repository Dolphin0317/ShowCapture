function getArticles() {
    const fileListContainer = document.querySelector('.file-list-container');
    if (!fileListContainer) {
        console.error('找不到 .file-list-container 元素');
        return "沒有資料"; // 返回 "沒有資料"
    }

    const fileList = fileListContainer.querySelector('#file-list');
    if (!fileList) {
        console.error('找不到 #file-list 元素');
        return "沒有資料"; // 返回 "沒有資料"
    }

    const listItems = fileList.querySelectorAll('li');
    const articles = [];

    listItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            articles.push(link.href);
        } else {
            console.warn('<li> 元素中找不到 <a> 標籤', item);
        }
    });

    if (articles.length === 0) {
        return "沒有資料"; // 如果 articles 是空陣列，返回 "沒有資料"
    }

    return articles;
}

// 主要功能
document.addEventListener('DOMContentLoaded', function () {
    const articles = getArticles();
    console.log(articles); // 文章資料

    // 分頁設定
    const itemsPerPage = 8;
    let currentPage = 1;
    const totalPages = Math.ceil(articles.length / itemsPerPage);

    // 格式化文章標題
    function formatTitle(filename) {
        return filename
            .replace(/^\d{8}_\d{6}_/, '')
            .replace('.html', '');
    }

    // 格式化日期
    function formatDate(filename) {
        const dateStr = filename.split('_')[0];
        return dateStr.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }

    // 顯示文章列表
    function displayArticles(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const articleList = document.getElementById('articleList');

        if (articleList) {
            articleList.innerHTML = '';

            articles.slice(startIndex, endIndex).forEach(article => {
                const li = document.createElement('li');
                li.className = 'article-item';
                li.innerHTML = `
                        <h3 class="article-title">${formatTitle(article)}</h3>
                        <div class="article-date">${formatDate(article)}</div>
                    `;
                articleList.appendChild(li);
            });
        } else {
            console.error('找不到 #articleList 元素');
        }

    }

    // 建立分頁按鈕
    function createPagination() {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        // 上一頁按鈕
        const prevButton = document.createElement('button');
        prevButton.textContent = '上一頁';
        prevButton.disabled = currentPage === 1;
        prevButton.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                updatePage();
            }
        };
        pagination.appendChild(prevButton);

        // 頁碼按鈕
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = currentPage === i ? 'active' : '';
            pageButton.onclick = () => {
                currentPage = i;
                updatePage();
            };
            pagination.appendChild(pageButton);
        }

        // 下一頁按鈕
        const nextButton = document.createElement('button');
        nextButton.textContent = '下一頁';
        nextButton.disabled = currentPage === totalPages;
        nextButton.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePage();
            }
        };
        pagination.appendChild(nextButton);

        // 更新頁面資訊
        const pageInfo = document.getElementById('pageInfo');
        if (pageInfo) {
            pageInfo.textContent = `第 ${currentPage} 頁，共 ${totalPages} 頁`;
        } else {
            console.error('找不到 #pageInfo 元素');
        }

    }

    // 更新頁面
    function updatePage() {
        displayArticles(currentPage);
        createPagination();
    }

    // 初始化頁面
    updatePage();
});
