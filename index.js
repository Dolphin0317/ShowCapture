 // JavaScript 來切換分頁
function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        page.style.display = (index + 1 === pageNumber) ? 'block' : 'none';
    });
}
// 預設顯示第一頁
document.addEventListener('DOMContentLoaded', () => showPage(1));
