# IDB Demo - IndexedDB 核心功能展示

使用 [idb](https://github.com/jakearchibald/idb) 库展示 IndexedDB 的核心功能。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

## 功能模块

### 1. 数据库初始化
- 使用 `openDB` 打开/创建数据库
- 定义对象存储（object store）
- 创建索引（index）

### 2. CRUD 操作
- **Create**: `put()` / `add()` 添加数据
- **Read**: `get()` 查询单条数据
- **Update**: `put()` 更新数据
- **Delete**: `delete()` 删除数据

### 3. 批量操作
- `getAll()` 获取所有数据
- `addAll()` 批量添加数据
- `clear()` 清空存储项

### 4. 索引查询
- 创建索引：`createIndex()`
- 按索引查询：`index.get()` / `index.getAll()`
- 范围查询：`IDBKeyRange.lowerBound()` / `upperBound()`

### 5. 事务操作
- 只读事务：`transaction(store, 'readonly')`
- 读写事务：`transaction(store, 'readwrite')`
- 事务提交：`tx.done`
- 自动回滚机制

## 核心 API

```javascript
import { openDB } from 'idb';

// 打开数据库
const db = await openDB('my-db', 1, {
  upgrade(db) {
    // 创建对象存储
    const store = db.createObjectStore('users', {
      keyPath: 'id',
      autoIncrement: true
    });

    // 创建索引
    store.createIndex('email', 'email', { unique: true });
  }
});

// 添加数据
await db.put('users', { name: 'Alice', email: 'alice@example.com' });

// 查询数据
const user = await db.get('users', 1);

// 使用索引查询
const byEmail = await db.getFromIndex('users', 'email', 'alice@example.com');

// 范围查询
const range = IDBKeyRange.lowerBound(18);
const adults = await db.getAllFromIndex('users', 'age', range);
```

## 项目结构

```
idb-demo/
├── index.html    # 入口页面
├── style.css     # 样式文件
├── main.js       # 主逻辑文件
├── package.json  # 项目配置
└── README.md     # 说明文档
```

## 浏览器控制台

加载页面后，可在控制台使用 `window.idbDemo` 访问所有演示方法：

```javascript
// 查看所有可用方法
console.log(window.idbDemo);

// 示例：添加数据
await window.idbDemo.addData('my-key', 'my-value');

// 示例：查询用户
await window.idbDemo.getAllUsers();
```
