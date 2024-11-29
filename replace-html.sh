#!/bin/bash

# 設定環境變數來確保使用 UTF-8 編碼
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
        
# 定義檔案
index_file="index_sample"
file_list="file-list.txt"
output_file="index.html"

# 使用 sed 替換內容
sed "/<!-- file-list.txt 的內容將自動插入至此處 -->/ {
    r ${file_list}
    d
}" "${index_file}" > "${output_file}"

echo "已生成更新後的檔案：${output_file}"
