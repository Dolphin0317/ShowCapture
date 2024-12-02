#!/bin/bash

# 設定環境變數來確保使用 UTF-8 編碼
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# 定義檔
file_list="file-list.txt"
idx=0

# 清空或建立輸出檔案
> ${file_list}


find . -type f -name "*.html" -exec basename {} \; | sort -nr | while IFS= read -r file; do
    idx=$((idx + 1))
    echo "<li><a href='${file}' target='_a${idx}'>${file}</a></li>" >> ${file_list}
done
