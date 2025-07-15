<template>
  <transition name="fade-slide" appear>
    <div class="card">
      <div class="card-content">
        <h3 class="card-title">{{ widget.name }}</h3>
        <p class="card-type">Тип: <span>{{ widget.type }}</span></p>
        <p :class="['card-status', widget.status]">Статус: {{ widget.status }}</p>
      </div>
      <div class="card-actions">
        <button @click="$emit('toggle', widget.id)" class="btn-toggle" aria-label="Переключить статус">
          {{ widget.status === 'active' ? 'Отключить' : 'Активировать' }}
        </button>
        <button @click="$emit('remove', widget.id)" class="btn-remove" aria-label="Удалить виджет">
          Удалить
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { Widget } from '../types/widget'

defineProps<{
  widget: Widget
}>()
defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'remove', id: number): void
}>()
</script>

<style scoped>
/* Плавное появление с небольшим сдвигом снизу */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Карточка */
.card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 0.1);
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
  user-select: none;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover {
  box-shadow: 0 6px 24px rgb(0 0 0 / 0.15);
  transform: translateY(-4px);
}

/* Содержимое карточки */
.card-content {
  flex-grow: 1;
  user-select: text;
}

.card-title {
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0 0 0.25rem 0;
}

.card-type {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.5rem 0;
}

.card-type span {
  font-weight: 500;
  color: #444;
}

/* Статус */
.card-status {
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  display: inline-block;
  user-select: none;
}

.card-status.active {
  background-color: #e6f4ea;
  color: #2e7d32;
}

.card-status.inactive {
  background-color: #f4f4f4;
  color: #999;
}

/* Кнопки */
.card-actions {
  display: flex;
  gap: 0.5rem;
}

button {
  border: none;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease;
  user-select: none;
}

.btn-toggle {
  background-color: #1976d2;
  color: white;
}

.btn-toggle:hover {
  background-color: #115293;
}

.btn-remove {
  background-color: #e53935;
  color: white;
}

.btn-remove:hover {
  background-color: #ab2e2e;
}
</style>
