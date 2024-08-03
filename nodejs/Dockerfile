# Node.jsの公式イメージをベースに使用
FROM node:18

# 作業ディレクトリを作成
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# サーバーがリッスンするポートを指定
EXPOSE 8080

# アプリケーションを起動
CMD ["node", "index.js"]
