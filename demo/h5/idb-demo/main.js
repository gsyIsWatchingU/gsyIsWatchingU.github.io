/**
 * IDB (IndexedDB) 核心功能演示
 * 使用 idb 库 - https://github.com/jakearchibald/idb
 */

import { openDB } from 'idb';

// ============================================================
// 数据库配置
// ============================================================
const DB_NAME = 'idb-demo-db';
const DB_VERSION = 1;

// 存储项名称
const STORE_GENERAL = 'general';    // 通用键值存储
const STORE_USERS = 'users';        // 用户存储（带索引）

// ============================================================
// 数据库初始化
// ============================================================
let db = null;

/**
 * 初始化数据库
 * 定义对象存储和索引
 */
async function initDB() {
  if (db) {
    console.log('数据库已打开');
    return db;
  }

  db = await openDB(DB_NAME, DB_VERSION, {
    /**
     * 数据库升级函数
     * 在这里定义对象存储和索引
     */
    upgrade(db, oldVersion, newVersion, transaction) {
      console.log(`数据库升级：${oldVersion} -> ${newVersion}`);

      // 1. 创建通用存储项（简单键值对）
      if (!db.objectStoreNames.contains(STORE_GENERAL)) {
        const generalStore = db.createObjectStore(STORE_GENERAL, {
          keyPath: 'key'  // 使用 'key' 字段作为主键
        });
        console.log(`创建存储项：${STORE_GENERAL}`);
      }

      // 2. 创建用户存储项（带索引）
      if (!db.objectStoreNames.contains(STORE_USERS)) {
        const userStore = db.createObjectStore(STORE_USERS, {
          keyPath: 'id',      // 使用 'id' 作为主键
          autoIncrement: true // 自增 ID
        });

        // 创建索引
        userStore.createIndex('name', 'name', { unique: false });
        userStore.createIndex('email', 'email', { unique: true });
        userStore.createIndex('age', 'age', { unique: false });

        console.log(`创建存储项：${STORE_USERS}，并创建索引：name, email, age`);
      }
    },

    /**
     * 数据库阻塞事件
     * 当其他页面尝试删除数据库时被调用
     */
    blocked() {
      console.log('数据库被阻塞');
    },

    /**
     * 数据库阻塞关闭事件
     */
    blocking() {
      console.log('数据库被其他连接阻塞关闭');
    },

    /**
     * 数据库升级失败
     */
    terminated() {
      console.log('数据库连接被终止');
    }
  });

  console.log('数据库打开成功');
  return db;
}

// ============================================================
// CRUD 操作
// ============================================================

/**
 * 添加数据 (Create)
 */
async function addData(key, value) {
  const database = await initDB();
  const tx = database.transaction(STORE_GENERAL, 'readwrite');

  await tx.store.put({ key, value });
  await tx.done;

  console.log(`添加数据：${key} = ${value}`);
  return { success: true, key, value };
}

/**
 * 读取数据 (Read)
 */
async function getData(key) {
  const database = await initDB();
  const result = await database.get(STORE_GENERAL, key);
  console.log(`查询数据：${key}`, result);
  return result;
}

/**
 * 更新数据 (Update)
 */
async function updateData(key, value) {
  const database = await initDB();
  const tx = database.transaction(STORE_GENERAL, 'readwrite');

  // put 方法：如果 key 存在则更新，不存在则添加
  await tx.store.put({ key, value });
  await tx.done;

  console.log(`更新数据：${key} = ${value}`);
  return { success: true, key, value };
}

/**
 * 删除数据 (Delete)
 */
async function deleteData(key) {
  const database = await initDB();
  await database.delete(STORE_GENERAL, key);
  console.log(`删除数据：${key}`);
  return { success: true, key };
}

/**
 * 获取所有数据
 */
async function getAllData() {
  const database = await initDB();
  const all = await database.getAll(STORE_GENERAL);
  console.log('获取所有数据', all);
  return all;
}

/**
 * 清空存储项
 */
async function clearStore(storeName = STORE_GENERAL) {
  const database = await initDB();
  await database.clear(storeName);
  console.log(`清空存储项：${storeName}`);
  return { success: true };
}

// ============================================================
// 批量操作
// ============================================================

/**
 * 批量添加数据
 */
async function addAllData(items) {
  const database = await initDB();
  const tx = database.transaction(STORE_GENERAL, 'readwrite');

  for (const item of items) {
    await tx.store.put(item);
  }

  await tx.done;
  console.log(`批量添加 ${items.length} 条数据`);
  return { success: true, count: items.length };
}

// ============================================================
// 用户相关操作（带索引查询）
// ============================================================

/**
 * 添加用户
 */
async function addUser(name, age, email) {
  const database = await initDB();
  const tx = database.transaction(STORE_USERS, 'readwrite');

  const user = { name, age: parseInt(age), email, createdAt: new Date() };
  const id = await tx.store.add(user);
  await tx.done;

  console.log(`添加用户：`, { id, ...user });
  return { success: true, id, user };
}

/**
 * 获取所有用户
 */
async function getAllUsers() {
  const database = await initDB();
  const users = await database.getAll(STORE_USERS);
  console.log('所有用户', users);
  return users;
}

/**
 * 通过索引查询用户 - 按名称
 */
async function getUsersByName(name) {
  const database = await initDB();
  const index = database.transaction(STORE_USERS).store.index('name');
  const users = await index.getAll(name);
  console.log(`按名称查询 ${name}:`, users);
  return users;
}

/**
 * 通过索引查询用户 - 按邮箱
 */
async function getUserByEmail(email) {
  const database = await initDB();
  const index = database.transaction(STORE_USERS).store.index('email');
  const user = await index.get(email);
  console.log(`按邮箱查询 ${email}:`, user);
  return user;
}

/**
 * 通过索引范围查询 - 年龄大于指定值
 */
async function getUsersOlderThan(age) {
  const database = await initDB();
  const tx = database.transaction(STORE_USERS);
  const index = tx.store.index('age');

  // 使用 IDBKeyRange 进行范围查询
  const range = IDBKeyRange.lowerBound(age);
  const users = await index.getAll(range);

  console.log(`年龄 > ${age} 的用户:`, users);
  return users;
}

/**
 * 使用游标遍历数据
 */
async function iterateWithCursor() {
  const database = await initDB();
  const tx = database.transaction(STORE_USERS);
  const users = [];

  await tx.store.iterate((value, cursor) => {
    users.push({ key: cursor.key, ...value });
  });

  console.log('游标遍历结果:', users);
  return users;
}

// ============================================================
// 事务操作
// ============================================================

/**
 * 手动事务操作示例
 * 演示事务的读写和错误处理
 */
async function transactionExample() {
  const database = await initDB();

  // 创建只读事务
  const readTx = database.transaction(STORE_GENERAL, 'readonly');
  const allData = await readTx.store.getAll();
  await readTx.done;

  // 创建读写事务
  const writeTx = database.transaction(STORE_GENERAL, 'readwrite');

  try {
    await writeTx.store.put({ key: 'tx-test-1', value: '事务测试 1' });
    await writeTx.store.put({ key: 'tx-test-2', value: '事务测试 2' });
    await writeTx.done;

    console.log('事务执行成功');
    return { success: true, message: '事务执行成功' };
  } catch (error) {
    console.error('事务执行失败，自动回滚:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================
// UI 交互绑定
// ============================================================

function displayResult(elementId, data) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  }
}

function displayData(data) {
  const el = document.getElementById('dataDisplay');
  if (el) {
    if (!data || data.length === 0) {
      el.innerHTML = '<pre>暂无数据</pre>';
    } else {
      el.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
  }
}

function showStatus(elementId, message, isSuccess = true) {
  const el = document.getElementById(elementId);
  if (el) {
    el.className = `status ${isSuccess ? 'success' : 'error'}`;
    el.textContent = message;
  }
}

// 绑定事件
document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化数据库
  document.getElementById('btnInit')?.addEventListener('click', async () => {
    try {
      await initDB();
      showStatus('initStatus', `✓ 数据库 "${DB_NAME}" 打开成功 (版本：${DB_VERSION})`, true);
      refreshDataDisplay();
    } catch (error) {
      showStatus('initStatus', `✗ 错误：${error.message}`, false);
    }
  });

  // 2. CRUD 操作
  document.getElementById('btnAdd')?.addEventListener('click', async () => {
    const key = document.getElementById('inputKey').value.trim();
    const value = document.getElementById('inputValue').value.trim();
    if (!key) {
      displayResult('crudResult', { error: '请输入键' });
      return;
    }
    try {
      const result = await addData(key, value);
      displayResult('crudResult', result);
      document.getElementById('inputKey').value = '';
      document.getElementById('inputValue').value = '';
      refreshDataDisplay();
    } catch (error) {
      displayResult('crudResult', { error: error.message });
    }
  });

  document.getElementById('btnGet')?.addEventListener('click', async () => {
    const key = document.getElementById('getKey').value.trim();
    if (!key) {
      displayResult('crudResult', { error: '请输入要查询的键' });
      return;
    }
    try {
      const result = await getData(key);
      displayResult('crudResult', result || { message: '未找到该键的数据' });
    } catch (error) {
      displayResult('crudResult', { error: error.message });
    }
  });

  document.getElementById('btnUpdate')?.addEventListener('click', async () => {
    const key = document.getElementById('updateKey').value.trim();
    const value = document.getElementById('updateValue').value.trim();
    if (!key) {
      displayResult('crudResult', { error: '请输入键' });
      return;
    }
    try {
      const result = await updateData(key, value);
      displayResult('crudResult', result);
      document.getElementById('updateKey').value = '';
      document.getElementById('updateValue').value = '';
      refreshDataDisplay();
    } catch (error) {
      displayResult('crudResult', { error: error.message });
    }
  });

  document.getElementById('btnDelete')?.addEventListener('click', async () => {
    const key = document.getElementById('deleteKey').value.trim();
    if (!key) {
      displayResult('crudResult', { error: '请输入要删除的键' });
      return;
    }
    try {
      const result = await deleteData(key);
      displayResult('crudResult', result);
      document.getElementById('deleteKey').value = '';
      refreshDataDisplay();
    } catch (error) {
      displayResult('crudResult', { error: error.message });
    }
  });

  // 3. 批量操作
  document.getElementById('btnAddAll')?.addEventListener('click', async () => {
    const sampleData = [
      { key: 'item-1', value: '第一项' },
      { key: 'item-2', value: '第二项' },
      { key: 'item-3', value: '第三项' },
      { key: 'config-theme', value: 'dark' },
      { key: 'config-lang', value: 'zh-CN' }
    ];
    try {
      const result = await addAllData(sampleData);
      displayResult('batchResult', result);
      refreshDataDisplay();
    } catch (error) {
      displayResult('batchResult', { error: error.message });
    }
  });

  document.getElementById('btnGetAll')?.addEventListener('click', async () => {
    try {
      const result = await getAllData();
      displayResult('batchResult', result || { message: '暂无数据' });
      refreshDataDisplay();
    } catch (error) {
      displayResult('batchResult', { error: error.message });
    }
  });

  document.getElementById('btnClear')?.addEventListener('click', async () => {
    if (confirm('确定要清空所有数据吗？')) {
      try {
        await clearStore(STORE_GENERAL);
        displayResult('batchResult', { success: true, message: '已清空 general 存储项' });
        refreshDataDisplay();
      } catch (error) {
        displayResult('batchResult', { error: error.message });
      }
    }
  });

  // 4. 用户操作（索引查询）
  document.getElementById('btnAddUser')?.addEventListener('click', async () => {
    const name = document.getElementById('userName').value.trim();
    const age = document.getElementById('userAge').value.trim();
    const email = document.getElementById('userEmail').value.trim();

    if (!name || !age || !email) {
      displayResult('userResult', { error: '请填写完整的用户信息' });
      return;
    }

    try {
      const result = await addUser(name, age, email);
      displayResult('userResult', result);
      document.getElementById('userName').value = '';
      document.getElementById('userAge').value = '';
      document.getElementById('userEmail').value = '';
    } catch (error) {
      displayResult('userResult', { error: error.message });
    }
  });

  document.getElementById('btnGetAllUsers')?.addEventListener('click', async () => {
    try {
      const result = await getAllUsers();
      displayResult('userResult', result || { message: '暂无用户数据' });
    } catch (error) {
      displayResult('userResult', { error: error.message });
    }
  });

  document.getElementById('btnGetByAge')?.addEventListener('click', async () => {
    try {
      const result = await getUsersOlderThan(18);
      displayResult('userResult', {
        message: `年龄 > 18 的用户 (${result.length} 人):`,
        data: result
      });
    } catch (error) {
      displayResult('userResult', { error: error.message });
    }
  });

  document.getElementById('btnGetByEmail')?.addEventListener('click', async () => {
    const email = document.getElementById('userEmail').value.trim();
    if (!email) {
      displayResult('userResult', { error: '请输入邮箱地址' });
      return;
    }
    try {
      const result = await getUserByEmail(email);
      displayResult('userResult', result || { message: '未找到该邮箱的用户' });
    } catch (error) {
      displayResult('userResult', { error: error.message });
    }
  });

  // 5. 事务操作
  document.getElementById('btnTransaction')?.addEventListener('click', async () => {
    try {
      const result = await transactionExample();
      displayResult('transactionResult', result);
      refreshDataDisplay();
    } catch (error) {
      displayResult('transactionResult', { error: error.message });
    }
  });
});

// 刷新数据显示
async function refreshDataDisplay() {
  try {
    const [generalData, users] = await Promise.all([
      getAllData(),
      getAllUsers()
    ]);
    displayData({
      [STORE_GENERAL]: generalData || [],
      [STORE_USERS]: users || []
    });
  } catch (error) {
    console.error('刷新数据失败:', error);
  }
}

// 导出函数供控制台使用
window.idbDemo = {
  initDB,
  addData,
  getData,
  updateData,
  deleteData,
  getAllData,
  clearStore,
  addAllData,
  addUser,
  getAllUsers,
  getUsersByName,
  getUserByEmail,
  getUsersOlderThan,
  iterateWithCursor,
  transactionExample,
  refreshDataDisplay
};

console.log('IDB Demo 已加载，可在控制台使用 window.idbDemo 访问所有方法');
