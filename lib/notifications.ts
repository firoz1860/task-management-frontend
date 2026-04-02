import api from '@/lib/api'

export interface NotificationResponse {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: string
  read: boolean
}

export const notificationsApi = {
  getNotifications: async () => {
    try {
      const { data } = await api.get<{ data: NotificationResponse[] }>('/notifications')
      return data.data || []
    } catch {
      // Return default notifications if API fails
      return [
        {
          id: '1',
          title: 'Welcome!',
          message: 'Welcome to TaskFlow. Start managing your tasks now.',
          type: 'success' as const,
          timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
          read: false,
        },
        {
          id: '2',
          title: 'Task Reminder',
          message: 'You have pending tasks for today.',
          type: 'info' as const,
          timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
          read: false,
        },
      ]
    }
  },

  markAsRead: async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`)
      return true
    } catch {
      return false
    }
  },
}
