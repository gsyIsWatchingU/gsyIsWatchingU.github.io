// 名言数据
const quotes = [
    { text: "生活不是等待风暴过去，而是学会在雨中跳舞。", author: "佚名" },
    { text: "种一棵树最好的时间是十年前，其次是现在。", author: "佚名" },
    { text: "成功不是最终的，失败也不是致命的：重要的是继续前进的勇气。", author: "温斯顿·丘吉尔" },
    { text: "你的时间有限，所以不要浪费它活在别人的生活里。", author: "史蒂夫·乔布斯" },
    { text: "要么你主宰生活，要么生活主宰你。", author: "吉姆·罗恩" }
];

// DOM 元素
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const shareBtn = document.getElementById('share-quote');
const statusEl = document.getElementById('status');

// 显示随机名言
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteEl.textContent = `"${quote.text}"`;
    authorEl.textContent = `—— ${quote.author}`;
    
    // 保存到本地存储
    localStorage.setItem('lastQuote', JSON.stringify(quote));
}

// 显示保存的名言
function showSavedQuote() {
    const saved = localStorage.getItem('lastQuote');
    if (saved) {
        const quote = JSON.parse(saved);
        quoteEl.textContent = `"${quote.text}"`;
        authorEl.textContent = `—— ${quote.author}`;
    } else {
        showRandomQuote();
    }
}

// 更新网络状态
function updateOnlineStatus() {
    if (navigator.onLine) {
        statusEl.textContent = '✅ 在线模式';
        document.body.classList.remove('offline');
        newQuoteBtn.disabled = false;
    } else {
        statusEl.textContent = '📴 离线模式 - 显示缓存的语录';
        document.body.classList.add('offline');
        newQuoteBtn.disabled = true;
    }
}

// 分享名言
async function shareQuote() {
    const quote = quoteEl.textContent;
    const author = authorEl.textContent;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: '每日名言',
                text: `${quote} ${author}`,
                url: window.location.href
            });
        } catch (err) {
            console.log('分享取消:', err);
        }
    } else {
        // 降级处理：复制到剪贴板
        navigator.clipboard.writeText(`${quote} ${author}`)
            .then(() => alert('名言已复制到剪贴板！'))
            .catch(() => alert('复制失败'));
    }
}

// 注册 Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log('✅ Service Worker 注册成功:', reg.scope);
                
                // 检查更新
                reg.addEventListener('updatefound', () => {
                    const newSW = reg.installing;
                    console.log('发现新版本 Service Worker');
                    
                    newSW.addEventListener('statechange', () => {
                        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                            // 新版本已安装，提示用户刷新
                            if (confirm('有新版本可用，是否更新？')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            })
            .catch(err => {
                console.log('❌ Service Worker 注册失败:', err);
            });
    });
    
    // 监听 controllerchange 事件
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('新的 Service Worker 已激活');
    });
}

// 监听在线/离线状态
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// 事件监听
newQuoteBtn.addEventListener('click', showRandomQuote);
shareBtn.addEventListener('click', shareQuote);

// 初始化
showSavedQuote();
updateOnlineStatus();

// 定期更新状态
setInterval(updateOnlineStatus, 1000);