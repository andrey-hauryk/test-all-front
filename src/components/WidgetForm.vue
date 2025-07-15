<template>
  <form @submit.prevent="submit" class="form" v-show="visible" @animationend="onAnimationEnd">
    <div class="form-group">
      <label for="name">Название:</label>
      <input
        id="name"
        v-model="name"
        type="text"
        required
        placeholder="Введите название виджета"
        autocomplete="off"
      />
    </div>

    <div class="form-group">
      <label for="type">Тип:</label>
      <select id="type" v-model="type" aria-label="Выбор типа виджета">
        <option value="chart">Chart</option>
        <option value="note">Note</option>
        <option value="todo">Todo</option>
      </select>
    </div>

    <button type="submit" class="btn-submit">Добавить</button>
  </form>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { WidgetType } from '../types/widget'

const emit = defineEmits<{
  (e: 'add', data: { name: string; type: WidgetType }): void
}>()

const name = ref('')
const type = ref<WidgetType>('chart')

const visible = ref(true)

function submit() {
  if (!name.value.trim()) return
  emit('add', { name: name.value.trim(), type: type.value })
  name.value = ''
  type.value = 'chart'
  visible.value = false // Запускаем анимацию скрытия
}

function onAnimationEnd(event: AnimationEvent) {
  if (!visible.value && event.animationName === 'fadeOut') {
    // Здесь можно, например, emit закрытия, если нужно
  }
}
</script>

<style scoped>
.form {
  animation: fadeIn 0.35s ease forwards;
  max-width: 100%;
  padding: 1.25rem;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  user-select: none;
}

/* Анимация плавного появления */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
}

input,
select {
  padding: 0.55rem 0.75rem;
  font-size: 1rem;
  border: 1.8px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  outline-offset: 2px;
}

input:focus,
select:focus {
  border-color: #1976d2;
  outline: none;
}

input::placeholder {
  color: #aaa;
}

.btn-submit {
  align-self: flex-start;
  background-color: #1976d2;
  color: white;
  padding: 0.6rem 1.2rem;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
}

.btn-submit:hover {
  background-color: #115293;
}
</style>
