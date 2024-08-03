// Materialize の初期化（必要に応じて追加）
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit(); // Materialize の自動初期化
});

// WebSocketサーバーに接続
const socket = new WebSocket('ws://localhost:8080');
let myUsername = 'YOUR_USERNAME'; // 自分のユーザー名を設定する

socket.addEventListener('message', function(event) {
    try {
        // メッセージを JSON パース
        const data = JSON.parse(event.data);

        // メッセージ表示エリアの取得
        const messages = document.getElementById('messages');
        
        // メッセージ表示用の div を作成
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        // ユーザー名とメッセージを分けて表示
        const usernameSpan = document.createElement('span');
        usernameSpan.classList.add('username');
        usernameSpan.textContent = data.username || 'Unknown'; // username がない場合のフォールバック

        const messageSpan = document.createElement('span');
        messageSpan.classList.add('text');
        messageSpan.textContent = data.message || 'No message'; // message がない場合のフォールバック

        // 自分が送信したメッセージにスタイルを適用
        if (data.username === myUsername) {
            messageDiv.classList.add('my-message');
        } else {
            messageDiv.classList.add('other-message');
        }

        messageDiv.appendChild(usernameSpan);
        messageDiv.appendChild(messageSpan);
        messages.appendChild(messageDiv);

        // スクロールを最新のメッセージに合わせる
        messages.scrollTop = messages.scrollHeight;
   } catch (error) {
        console.error('Error handling message', error);
    }
});

// メッセージを送信する関数
function sendMessage() {
    const username = document.getElementById('username').value.trim();
    const message = document.getElementById('messageInput').value.trim();
    myUsername = username;
    if (username && message) {
        const sendjson = JSON.stringify({ username, message });
        socket.send(sendjson);
        document.getElementById('messageInput').value = '';
    } else {
        alert('Please enter both username and message.');
    }
}

// WebSocketの接続が開かれたときの処理
socket.onopen = function(event) {
    console.log('Connected to the WebSocket server');
};

// WebSocketの接続が閉じられたときの処理
socket.onclose = function(event) {
    console.log('Disconnected from the WebSocket server');
};

// エラーが発生したときの処理
socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};
