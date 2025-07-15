<template>
  <div>
    <h2>Список виджетов</h2>

    <button @click="showModal = true" style="margin-bottom:1rem; padding:0.5rem 1rem;">
      + Добавить виджет
    </button>

    <div v-if="widgets.length === 0" style="color: gray;">Виджеты отсутствуют</div>

    <div>
      <WidgetCard
        v-for="widget in widgets"
        :key="widget.id"
        :widget="widget"
        @toggle="toggleStatus"
        @remove="removeWidget"
      />
    </div>

    <!-- Модальное окно -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">&times;</button>
        <WidgetForm @add="handleAdd" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WidgetCard from './WidgetCard.vue'
import WidgetForm from './WidgetForm.vue'
import type { Widget } from '../types/widget'

const widgets = ref<Widget[]>([])
let nextId = 1
const showModal = ref(false)

function addWidget(data: { name: string; type: Widget['type'] }) {
  widgets.value.push({
    id: nextId++,
    name: data.name,
    type: data.type,
    status: 'active',
  })
}

function toggleStatus(id: number) {
  const widget = widgets.value.find(w => w.id === id)
  if (widget) {
    widget.status = widget.status === 'active' ? 'inactive' : 'active'
  }
}

function removeWidget(id: number) {
  widgets.value = widgets.value.filter(w => w.id !== id)
}

function handleAdd(data: { name: string; type: Widget['type'] }) {
  addWidget(data)
  closeModal()
}

function closeModal() {
  showModal.value = false
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 320px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: 0.3rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
