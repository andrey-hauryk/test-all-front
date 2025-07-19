import { ref } from 'vue'
import type { Widget } from '../types/widget'

export function useWidgets() {
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

  function openModal() {
    showModal.value = true
  }

  function closeModal() {
    showModal.value = false
  }

  function handleAdd(data: { name: string; type: Widget['type'] }) {
    addWidget(data)
    closeModal()
  }

  return {
    widgets,
    showModal,
    addWidget,
    toggleStatus,
    removeWidget,
    openModal,
    closeModal,
    handleAdd,
  }
}
