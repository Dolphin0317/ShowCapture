#!/bin/bash

# 設定環境變數來確保使用 UTF-8 編碼
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

> singlefile-repo/file-list.txt
find singlefile-repo -type f -name "*.html" -exec basename {} \; | while IFS= read -r file; do
    echo "<li><a href='${file}'>${file}</a></li>" >> singlefile-repo/file-list.txt
done
