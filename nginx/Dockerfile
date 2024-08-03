# Nginxの公式イメージをベースに使用
FROM nginx:alpine

# 作業ディレクトリを作成
WORKDIR /usr/share/nginx/html

# 現在のディレクトリ内のすべてのファイルをコンテナ内にコピー
COPY . .

# コンテナがリッスンするポートを指定
EXPOSE 80

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]
