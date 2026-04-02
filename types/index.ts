export interface User {
  id: string
  email: string
  name: string
  provider?: 'local' | 'google'
  createdAt: string
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: Priority
  dueDate?: string | null
  createdBy?: string // User name/id who created the task
  createdAt: string
  updatedAt: string
  userId: string
}

export interface TasksResponse {
  tasks: Task[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface TaskStats {
  total: number
  pending: number
  inProgress: number
  completed: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string[]>
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface TaskFilters {
  status?: TaskStatus | ''
  priority?: Priority | ''
  search?: string
  page: number
  limit: number
  sortBy?: 'createdAt' | 'dueDate' | 'title'
  sortOrder?: 'asc' | 'desc'
}
