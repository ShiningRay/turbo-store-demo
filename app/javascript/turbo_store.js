// Turbo Store Demo: document-level reactive store + Turbo Stream sync
import Alpine from "alpinejs"

// 1. 全局响应式 store
Alpine.store("app", {
  current_user: { name: "Guest", role: "visitor" },
  cart: { count: 0, items: [] },
  theme: "light",
  notifications: [],
  merge(payload) {
    Object.assign(this, payload)
  }
})

// 2. 把 Alpine 挂到 window，供调试与模板使用
window.Alpine = Alpine

// 3. Turbo Stream 自定义 action：update_store
//    服务器可发送 <turbo-stream action="update_store" target="app">
//    模板内放 JSON，自动合并进 Alpine.store("app")
document.addEventListener("turbo:before-stream-render", (event) => {
  const stream = event.target
  if (stream.action !== "update_store") return

  const template = stream.templateElement.content
  const jsonNode = template.querySelector("[data-store-json]")
  if (!jsonNode) return

  try {
    const payload = JSON.parse(jsonNode.textContent)
    Alpine.store("app").merge(payload)
    // 阻止默认 DOM 替换，因为这条 stream 只更新 store
    event.preventDefault()
  } catch (e) {
    console.error("[turbo-store] invalid JSON", e)
  }
})

// 4. 启动 Alpine（必须在 Turbo 之后，确保 Turbo 事件已注册）
document.addEventListener("DOMContentLoaded", () => {
  Alpine.start()
})
