<template>

</template>

<script setup>
import { ref } from 'vue'

// LNB가 접혔는지 펼쳐졌는지 기억하는 변수 (기본값: 펼침상태 false)
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.app-sidebar {
  width: 240px;
  background: var(--ink);
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition: width 0.3s ease;
  flex-shrink: 0;
}
.app-sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.logo-placeholder {
  height: 30px;
  max-width: 140px;
}
.toggle-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}
.menu-group {
  margin-bottom: 20px;
}
.menu-title {
  font-size: 11px;
  color: var(--muted);
  padding: 0 16px;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.sidebar-nav ul li {
  display: flex;
  align-items: center;
  padding: 10px 18px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  gap: 12px;
}
.sidebar-nav ul li:hover, .sidebar-nav ul li.active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.sidebar-nav ul li.active {
  border-left: 3px solid var(--teal);
  padding-left: 15px;
}
.icon {
  font-size: 16px;
  text-align: center;
  width: 20px;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
}
.user-info {
  font-size: 12px;
  margin-bottom: 8px;
  color: var(--teal-100);
}
.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  text-align: left;
}
.logout-btn:hover {
  color: #fff;
}
</style>