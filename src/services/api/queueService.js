import queueData from '../mockData/queue.json'

let queue = [...queueData]

const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))

export const queueService = {
  async getAll() {
    await delay()
    return queue.map(item => ({ ...item }))
  },

  async getById(id) {
    await delay()
    const item = queue.find(q => q.id === id)
    return item ? { ...item } : null
  },

  async create(queueData) {
    await delay()
    const newItem = {
      id: `queue_${Date.now()}`,
      track: null,
      position: 0,
      addedAt: new Date().toISOString(),
      ...queueData
    }
    queue.push(newItem)
    return { ...newItem }
  },

  async update(id, queueData) {
    await delay()
    const index = queue.findIndex(q => q.id === id)
    if (index !== -1) {
      queue[index] = { ...queue[index], ...queueData }
      return { ...queue[index] }
    }
    return null
  },

  async delete(id) {
    await delay()
    const index = queue.findIndex(q => q.id === id)
    if (index !== -1) {
      const deleted = queue.splice(index, 1)[0]
      return { ...deleted }
    }
    return null
  }
}

export default queueService