<template>
  <div id="app-layout">
    <AppSidebar />

    <div class="main-container">
      <AppHeader />

      <main class="app-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from './components/layout/AppSidebar.vue'
import AppHeader from './components/layout/AppHeader.vue'
</script>

<style>
/* 여기는 비워두거나 전역 레이아웃 밀림을 방지하는 최소한의 규칙만 둡니다. 
  기존 스크린샷처럼 화면이 밀리는 현상을 강제로 방지합니다.
*/
#app {
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: none;
}
</style>