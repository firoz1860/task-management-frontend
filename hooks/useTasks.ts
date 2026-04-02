import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/api'
import { TaskFilters, Task, TasksResponse, TaskStats } from '@/types'
import { getErrorMessage } from '@/lib/utils'

export function useGetTasks(filters: TaskFilters) {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined)
  )
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      const { data } = await api.get('/tasks', { params })
      return data.data as TasksResponse
    },
  })
}

export function useGetStats() {
  return useQuery({
    queryKey: ['tasks-stats'],
    queryFn: async () => {
      const { data } = await api.get('/tasks/stats')
      return data.data as TaskStats
    },
  })
}

export function useCreateTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post('/tasks', payload)
      return data.data as Task
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] })
      qc.invalidateQueries({ queryKey: ['tasks-stats'] })
      toast.success('Task created!')
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}

export function useUpdateTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...payload }: any) => {
      const { data } = await api.patch(`/tasks/${id}`, payload)
      return data.data as Task
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] })
      qc.invalidateQueries({ queryKey: ['tasks-stats'] })
      toast.success('Task updated!')
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}

export function useDeleteTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/tasks/${id}`)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks'] })
      qc.invalidateQueries({ queryKey: ['tasks-stats'] })
      toast.success('Task deleted')
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}

export function useToggleTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.patch(`/tasks/${id}/toggle`)
      return data.data as Task
    },
    onSuccess: (task) => {
      qc.invalidateQueries({ queryKey: ['tasks'] })
      qc.invalidateQueries({ queryKey: ['tasks-stats'] })
      toast.success(`Marked as ${task.status.replace('_', ' ').toLowerCase()}`)
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}
