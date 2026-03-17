const CACHE_NAME = 'quote-pwa-v1';
const API_CACHE_NAME = 'quote-api-v1';

// 需要缓存的资源
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/offline.html',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', event => {
    console.log('🔧 Service Worker 安装中...');
    
    // 跳过等待，立即激活
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 缓存静态资源中...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ 静态资源缓存完成');
            })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker 激活中...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // 删除旧版本的缓存
                    if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
                        console.log('🗑️ 删除旧缓存:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // 立即控制所有客户端
            return self.clients.claim();
        })
    );
});

// 拦截请求
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // 处理 API 请求
    if (url.pathname.includes('/api/')) {
        event.respondWith(handleApiRequest(event.request));
        return;
    }
    
    // 处理静态资源
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 如果缓存中有，直接返回
                if (response) {
                    console.log('📖 从缓存读取:', url.pathname);
                    return response;
                }
                
                // 否则发起网络请求
                console.log('🌐 从网络获取:', url.pathname);
                return fetch(event.request)
                    .then(response => {
                        // 只缓存同源请求
                        if (url.origin === self.location.origin) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        return response;
                    })
                    .catch(error => {
                        console.log('❌ 网络请求失败:', url.pathname);
                        
                        // 如果是HTML请求，返回离线页面
                        if (event.request.headers.get('Accept').includes('text/html')) {
                            return caches.match('/offline.html');
                        }
                        
                        return new Response('网络连接失败', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// 处理 API 请求（网络优先，缓存备用）
async function handleApiRequest(request) {
    try {
        // 优先从网络获取
        const networkResponse = await fetch(request);
        
        // 缓存响应
        const responseClone = networkResponse.clone();
        caches.open(API_CACHE_NAME)
            .then(cache => cache.put(request, responseClone));
        
        return networkResponse;
    } catch (error) {
        console.log('📴 网络不可用，使用缓存API');
        
        // 网络失败，从缓存获取
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // 如果连缓存都没有，返回模拟数据
        return new Response(
            JSON.stringify({
                quote: "离线模式下的缓存语录",
                author: "系统提示"
            }),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// 后台同步
self.addEventListener('sync', event => {
    console.log('🔄 后台同步触发:', event.tag);
    
    if (event.tag === 'sync-quotes') {
        event.waitUntil(syncQuotes());
    }
});

// 推送通知
self.addEventListener('push', event => {
    console.log('📨 收到推送通知');
    
    const options = {
        body: event.data.text(),
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        data: {
            url: '/'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('每日名言', options)
    );
});

// 通知点击
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

// 模拟数据同步
async function syncQuotes() {
    console.log('正在同步数据...');
    // 这里可以添加实际的数据同步逻辑
    return Promise.resolve();
}