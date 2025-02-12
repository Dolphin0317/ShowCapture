// 取得文章
function getArticles() {
    const fileListContainer = document.querySelector('.file-list-container');
    if (!fileListContainer) {
        console.error('找不到 .file-list-container 元素，請檢查 HTML 結構是否正確。');
        return "沒有資料";
    }

    const fileList = fileListContainer.querySelector('#file-list');
    if (!fileList) {
        console.error('找不到 #file-list 元素，請檢查 HTML 結構是否正確。');
        return "沒有資料";
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
        return "沒有資料";
    }

    return articles;
}

// 建立按鈕
function createButton(text, onClick, isDisabled) {
    const button = document.createElement('button');
    button.textContent = text;
    button.disabled = isDisabled;
    button.onclick = onClick;
    return button;
}

// 主要功能
document.addEventListener('DOMContentLoaded', function () {
    const articles = getArticles();
    console.log(articles); // 文章資料

    const itemsPerPage = 8;
    let currentPage = 1;
    const totalPages = Math.ceil(articles.length / itemsPerPage);

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
                li.insertAdjacentHTML('beforeend', `article`);
                articleList.appendChild(li);
            });
        } else {
            console.error('找不到 #articleList 元素，請檢查 HTML 結構是否正確。');
            return;
        }
    }

    // 建立分頁按鈕
    function createPagination() {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        const prevButton = createButton('上一頁', () => {
            if (currentPage > 1) {
                currentPage--;
                updatePage();
            }
        }, currentPage === 1);
        pagination.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = createButton(i, () => {
                currentPage = i;
                updatePage();
            }, currentPage === i);
            pageButton.className = currentPage === i ? 'active' : '';
            pagination.appendChild(pageButton);
        }

        const nextButton = createButton('下一頁', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updatePage();
            }
        }, currentPage === totalPages);
        pagination.appendChild(nextButton);

        // 更新頁面資訊
        const pageInfo = document.getElementById('pageInfo');
        if (pageInfo) {
            pageInfo.textContent = `第 ${currentPage} 頁，共 ${totalPages} 頁`;
        } else {
            console.error('找不到 #pageInfo 元素，請檢查 HTML 結構是否正確。');
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
