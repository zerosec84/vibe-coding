<template>
  <div class="modal-scrim" @click.self="$emit('close')">
    <div class="modal">
      <!-- 헤더 -->
      <div class="modal-header">
        <span class="modal-title">비밀번호 재설정</span>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>

      <!-- 바디 -->
      <div class="modal-body">
        <!-- 이름 / 사번 -->
        <div class="field-group">
          <label>이름</label>
          <input class="inp" v-model="name" placeholder="" />
        </div>
        <div class="field-group">
          <label>사번 / ID</label>
          <input class="inp" v-model="empId" placeholder="" />
        </div>

        <div class="divider" />

        <!-- 휴대전화 인증 -->
        <div class="field-group">
          <label>휴대전화 (- 제외)</label>
          <div class="inp-row">
            <input class="inp flex1" v-model="phone" placeholder="" />
            <button class="btn ghost sm" @click="sendCode">인증번호</button>
            <button class="btn ghost sm" @click="sendCode">재발송</button>
          </div>
        </div>

        <div class="field-group">
          <label>인증번호</label>
          <div class="inp-row">
            <input class="inp flex1" v-model="authCode" placeholder="" />
            <span class="timer">{{ timerDisplay }}</span>
            <button class="btn ghost sm" @click="verifyCode">인증</button>
          </div>
        </div>

        <p v-if="verified" class="verified-msg">✓ 인증에 성공하였습니다.</p>

        <div class="divider" />

        <!-- 새 비밀번호 -->
        <div class="field-group">
          <label>신규 비밀번호</label>
          <div class="inp pw-inp">
            <input
              :type="showNew ? 'text' : 'password'"
              v-model="newPassword"
              placeholder="PASSWORD"
            />
            <span @click="showNew = !showNew">👁</span>
          </div>
        </div>

        <div class="field-group">
          <label>신규 비밀번호 확인</label>
          <div class="inp pw-inp">
            <input
              :type="showConfirm ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="PASSWORD"
            />
            <span @click="showConfirm = !showConfirm">👁</span>
          </div>
        </div>

        <!-- 규칙 안내 -->
        <div class="pw-rules">
          <b>비밀번호 생성 규칙</b><br />
          · 영문/숫자/특수문자 포함 8자리 이상<br />
          · 영문 대/소문자·숫자·특수문자 중 2종 이상 조합 필수<br />
          · 동일 문자 연속 3회 이상 사용 불가<br />
          · 공백 문자 사용 불가
        </div>
      </div>

      <!-- 푸터 -->
      <div class="modal-footer">
        <button class="btn ghost" @click="$emit('close')">취소</button>
        <button class="btn primary" @click="handleSave">저장</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

const name = ref('')
const empId = ref('')
const phone = ref('')
const authCode = ref('')
const verified = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')
const showNew = ref(false)
const showConfirm = ref(false)

// 타이머 (3분)
const timeLeft = ref(180)
let timer = null

const timerDisplay = computed(() => {
  const m = String(Math.floor(timeLeft.value / 60)).padStart(2, '0')
  const s = String(timeLeft.value % 60).padStart(2, '0')
  return `${m}:${s}`
})

const sendCode = () => {
  timeLeft.value = 180
  clearInterval(timer)
  timer = setInterval(() => {
    if (timeLeft.value > 0) timeLeft.value--
    else clearInterval(timer)
  }, 1000)
  // TODO: 인증번호 발송 API
}

const verifyCode = () => {
  // TODO: 인증번호 검증 API
  verified.value = true
  clearInterval(timer)
}

const handleSave = () => {
  // TODO: 비밀번호 변경 API
  emit('close')
}

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.modal-scrim {
  position: fixed;
  inset: 0;
  background: rgba(18, 30, 34, 0.34);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 460px;
  max-width: 92vw;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: var(--shadow);
}

.modal-header {
  display: flex;
  align-items: center;
  padding: 15px 18px;
  border-bottom: 1px solid var(--line-2);
}

.modal-title {
  font-weight: 800;
  font-size: 14px;
}

.modal-close {
  margin-left: auto;
  color: var(--muted);
  cursor: pointer;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 13px;
}

.modal-close:hover {
  background: var(--field);
}

.modal-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-group label {
  font-size: 11px;
  color: var(--muted);
  font-weight: 600;
}

.inp {
  height: 34px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 7px;
  padding: 0 10px;
  font-size: 12px;
  font-family: var(--font);
  color: var(--ink-2);
  outline: none;
}

.inp:focus {
  border-color: var(--primary);
}

.inp-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.flex1 { flex: 1; }

.timer {
  color: var(--red);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.verified-msg {
  font-size: 11px;
  color: var(--green);
  margin: 0;
}

.pw-inp {
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 8px;
}

.pw-inp input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 12px;
  font-family: var(--font);
  color: var(--ink-2);
}

.pw-inp span {
  cursor: pointer;
  font-size: 13px;
}

.divider {
  border-top: 1px solid var(--line-2);
  margin: 4px 0;
}

.pw-rules {
  background: var(--field);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 14px 16px;
  font-size: 11.5px;
  color: var(--ink-2);
  line-height: 1.9;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 18px;
  border-top: 1px solid var(--line-2);
}
</style>