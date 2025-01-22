#!/bin/bash

# 設定環境變數來確保使用 UTF-8 編碼
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
        
# 定義檔案
index_file="index_sample"
file_list="file-list.txt"
output_file="index.html"

# 獲取當前時間，格式為 yyyy-MM-dd HH:mm:ss
current_time=$(TZ="Asia/Taipei" date "+%Y-%m-%d %H:%M:%S")

# 初始化分頁變數
page_size=10
page_count=0

# 生成分頁內容
page_content=""
while read -r line; do
    # 新增一筆資料
    if [[ $((++count % page_size)) -eq 1 ]]; then
        page_count=$((page_count + 1))
        if [[ $page_count -gt 1 ]]; then
            page_content+="</ul></div>"
        fi
        page_content+="<div class='page' id='page-${page_count}' style='display: none;'><ul>"
    fi
    page_content+="\n<li>${line}</li>"
done < "${file_list}"

# 關閉最後一個分頁
page_content+="</ul></div>"

# 生成分頁按鈕
pagination_controls="<div class='pagination'>"
for i in $(seq 1 "${page_count}"); do
    pagination_controls+="<button onclick='showPage(${i})'>第 ${i} 頁</button>"
done
pagination_controls+="</div>"

# 使用 sed 替換內容
sed "/<!-- file-list.txt 的內容將自動插入至此處 -->/ {
    #r ${file_list}
    r /dev/null
    d
}
s/<!-- LastRenewTime -->/${current_time}/" "${index_file}" > "${output_file}"

# 插入分頁內容和分頁按鈕
sed -i "/<!-- 分頁內容插入點 -->/c ${page_content}" "${output_file}"
sed -i "/<!-- 分頁控制插入點 -->/c ${pagination_controls}" "${output_file}"

echo "已生成更新後的檔案：${output_file}"

# 移除臨時檔案
rm -f ./${index_file} ./${file_list} 
