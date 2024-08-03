const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const chatHistory = []; // メモリ内のチャット履歴

server.on('connection', (ws) => {
    // 既存のチャット履歴を送信
    chatHistory.forEach((message) => ws.send(JSON.stringify(message)));

    ws.on('message', (data) => {
        try {
            // メッセージを JSON パース
            const parsedData = JSON.parse(data);

            if (parsedData.username && parsedData.message) {
                // 新しいメッセージをチャット履歴に追加
                const newMessage = { username: parsedData.username, message: parsedData.message };
                chatHistory.push(newMessage);

                // メッセージを全クライアントに送信
                server.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(newMessage));
                    }
                });

                // サーバーのコンソールに受け取った JSON をそのまま出力
                console.log('Received message:', parsedData);
            }
        } catch (error) {
            console.error('Error parsing message', error);
        }
    });
});
