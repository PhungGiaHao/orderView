import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRegistry } from 'react-native';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Đăng ký ứng dụng với AppRegistry
AppRegistry.registerComponent('App', () => App);

// Khởi tạo ứng dụng web
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});
reportWebVitals();
