// 文章資料
const articles = [
    "20250207_103719_使用AWS CloudFront 的原始存取控制(OAC)建立安全的 S3 靜態網站 ｜ by Kuro Huang ｜ 資安工作者的學習之路 ｜ Medium.html",
    "20250207_100514_AWS WAF 設定, 無法上傳檔案的問題 (403 Forbidden error) ： Minibox.html",
    "20250207_100409_AWS S3 公開存取權完整指南.html",
    "20250124_162548_S3に保存したAWS WAFログをAthenaで分析してみた ｜ DevelopersIO.html",
    "20250124_154333_使用Athena分析在S3上的WAF Log – PCMAN的技術博客 – 用看得懂的方式講AWS！.html",
    "20250122_171931_SSM權限設定問題.html",
    "20250122_122308_DNS ｜ * 記錄 ｜ kl317.us.kg ｜ [email protected]'s Account ｜ Cloudflare.html",
    "20250109_175546_將 Microsoft AD 與介面類型 VPC 終端節點組合在一起時要設置的內容 ｜ 開發者IO.html",
    "20250108_094019_為 AWS CLI 安裝 Session Manager 外掛程式 - AWS Systems Manager.html",
    "20241206_163057_EC2 系統日誌分析.html",
    "20241205_002043_AWS ECR 建構多平台 Images 的操作過程.html",
    "20241202_123702_使用 WindowsDNS 的 ConditionalForwarders(條件式轉寄站) 加上 AmazonProvidedDNS.html",
    "20241127_164654_自動發佈到 GitHub Pages.html",
    "20241123_175255_管理个人访问令牌 - GitHub 文档.html",
    "20241123_174801_使用 GitHub 免費製作個人網站 - 為你自己學 Git ｜ 高見龍.html",
    "20241123_174547_從 0 到 1 的 GitHub Pages 教學手冊 - HackMD.html",
    "20241123_174308_Vue - 使用 GitHub Actions 部署到 GitHub Pages - 想飛的葉子.html",
    "20241123_174303_使用 GitHub Actions 进行部署 - GitHub 文档.html",
    "20241123_174236_何謂 CI_CD ？ 利用 Github Actions 做一個簡單的 CI_CD ｜ by Sean Chou ｜ Recording everything ｜ Medium.html",
    "20241123_174221_CI_CD： GitHub Actions 自動部署到 GitHub Page.html",
    "20241123_174001_使用 GitHub Actions 來自動部署 GitHub Pages - iT 邦幫忙：一起幫忙解決難題，拯救 IT 人的一天.html"
];

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
    pageInfo.textContent = `第 ${currentPage} 頁，共 ${totalPages} 頁`;
}

// 更新頁面
function updatePage() {
    displayArticles(currentPage);
    createPagination();
}

// 初始化頁面
updatePage();
