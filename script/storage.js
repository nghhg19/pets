'use strict';

// Lưu đối tượng
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy đối tượng
function getFromStorage(key) {
  return localStorage.getItem(key);
}
