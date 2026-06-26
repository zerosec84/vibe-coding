<template>
  <div class="login-wrap">
    <!-- 좌측: 브랜드 패널 -->
    <div class="login-left">
      <div class="brand-text">
        <div class="sub">전사 프로젝트 관리 시스템</div>
        <h1>프로젝트의 시작부터 완료까지<br>한 눈에 관리하세요.</h1>
      </div>
      <div class="kpis">
        <div class="kpi-card">
          <div class="kpi-label">대기</div>
          <div class="kpi-value">6</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">진행</div>
          <div class="kpi-value">14</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">완료</div>
          <div class="kpi-value">6</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">전체</div>
          <div class="kpi-value">27</div>
        </div>
      </div>
    </div>

    <!-- 우측: 폼 패널 -->
    <div class="login-right">
      <div class="login-form">
        <h2>로그인</h2>

        <div class="field-group">
          <label class="field-label">아이디</label>
          <div class="field-input">
            <input v-model="userId" placeholder="사번 또는 외주 웹메일 ID" />
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">비밀번호</label>
          <div class="field-input">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="비밀번호"
            />
            <span class="eye-btn" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁' }}
            </span>
          </div>
        </div>

        <div class="row-between">
          <label class="save-id">
            <input type="checkbox" v-model="saveId" />
            아이디 저장
          </label>
          <a class="reset-link" @click="showResetPopup = true">비밀번호 재설정</a>
        </div>
        <div v-if="alertMsg" class="login-alert">
            <span class="alert-icon">⚠️</span>
                {{ alertMsg }}
        </div>
        <button class="login-btn" @click="handleLogin">로그인</button>

        <p class="login-notice">임직원 사번 계정 · 외주 전용 ID만 로그인 가능</p>
      </div>
    </div>

    <!-- 비밀번호 재설정 팝업 -->
    <PasswordResetPopup
      v-if="showResetPopup"
      @close="showResetPopup = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PasswordResetPopup from '@/components/popup/PasswordResetPopup.vue'

const userId = ref('')
const password = ref('')
const saveId = ref(false)
const showPassword = ref(false)
const showResetPopup = ref(false)

// 알럿 메시지 (null이면 숨김)
const alertMsg = ref(null)

const ALERTS = {
  EMPTY:   '아이디와 비밀번호를 입력해주세요.',
  NO_USER: '존재하지 않는 계정입니다.',
  MISMATCH:'아이디 또는 비밀번호가 올바르지 않습니다.',
  LOCKED:  '계정이 잠겼습니다. 관리자에게 문의해주세요.',
  SERVER:  '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
}

const handleLogin = async () => {
  alertMsg.value = null

  // 1. 미입력 체크
  if (!userId.value.trim() || !password.value.trim()) {
    alertMsg.value = ALERTS.EMPTY
    return
  }

  try {
    // TODO: 실제 API 호출로 교체
    // const res = await authApi.login(userId.value, password.value)

    // 아래는 API 응답 에러코드 기준 예시
    // if (res.code === 'NO_USER')   alertMsg.value = ALERTS.NO_USER
    // if (res.code === 'MISMATCH')  alertMsg.value = ALERTS.MISMATCH
    // if (res.code === 'LOCKED')    alertMsg.value = ALERTS.LOCKED

  } catch (e) {
    alertMsg.value = ALERTS.SERVER
  }
}
</script>

<style scoped>
.login-wrap {
  display: flex;
  width: 100%;
  height: 100vh;
  min-width: 1280px;
}

/* 좌측 브랜드 */
.login-left {
  flex: 1.2;
  background: linear-gradient(135deg, #1451891 0%, #185fa5 60%, #1e7bc4);
  /* 컨셉 E 포인트 컬러 기반 그라디언트 */
  background: linear-gradient(135deg, #0e4a82, #185fa5 60%, #1e7bc4);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8%;
  gap: 26px;
}

.brand-text .sub {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 10px;
}

.brand-text h1 {
  font-size: 30px;
  font-weight: 800;
  line-height: 1.35;
  margin: 0;
}

.kpis {
  display: flex;
  gap: 12px;
}

.kpi-card {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  padding: 14px 18px;
  min-width: 84px;
}

.kpi-label {
  font-size: 11px;
  opacity: 0.85;
}

.kpi-value {
  font-size: 24px;
  font-weight: 800;
  margin-top: 2px;
}

/* 우측 폼 */
.login-right {
  flex: 1;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.login-form h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--ink);
}

.field-label {
  display: block;
  font-size: 12px;
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 5px;
}

.field-input {
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 9px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
  background: var(--field);
}

.field-input input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 13px;
  font-family: var(--font);
  color: var(--ink);
}

.eye-btn {
  color: var(--muted);
  cursor: pointer;
  font-size: 14px;
}

.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: var(--ink-2);
}

.save-id {
  display: flex;
  gap: 6px;
  align-items: center;
  cursor: pointer;
}

.reset-link {
  color: var(--primary);
  font-weight: 600;
  cursor: pointer;
}

.reset-link:hover {
  text-decoration: underline;
}

.login-btn {
  height: 44px;
  background: var(--primary);
  color: #fff;
  border-radius: 9px;
  font-weight: 700;
  font-size: 14px;
  width: 100%;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  transition: filter 0.15s;
}

.login-btn:hover {
  filter: brightness(0.93);
}

.login-notice {
  font-size: 11px;
  color: var(--muted);
  text-align: center;
  margin: 0;
}
/* 알럿 */
.login-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fdecea;
  border: 1px solid #f5c2be;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 12.5px;
  color: #c0392b;
  font-weight: 500;
}

.alert-icon {
  font-size: 14px;
  flex-shrink: 0;
}
</style>