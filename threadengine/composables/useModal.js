import { ref } from 'vue'

export default function useModal() {
  const isOpen = ref(false)
  const data = ref(null)

  const open = (payload = null) => {
    data.value = payload
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    data.value = null
  }

  return {
    isOpen,
    data,
    open,
    close,
  }
}
