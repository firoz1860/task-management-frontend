'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Task } from '@/types'

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Too long'),
  description: z.string().max(1000, 'Too long').optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
  dueDate: z.string().optional(),
})
type FormData = z.infer<typeof schema>

interface TaskFormProps {
  task?: Task | null
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const priorityOptions = [
  { value: 'LOW', label: '🟢 Low Priority' },
  { value: 'MEDIUM', label: '🟡 Medium Priority' },
  { value: 'HIGH', label: '🔴 High Priority' },
]

const statusOptions = [
  { value: 'PENDING', label: '⏳ Pending' },
  { value: 'IN_PROGRESS', label: '🔄 In Progress' },
  { value: 'COMPLETED', label: '✅ Completed' },
]

export function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const isEdit = !!task

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '', priority: 'MEDIUM', status: 'PENDING', dueDate: '' },
  })

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      })
    } else {
      reset({ title: '', description: '', priority: 'MEDIUM', status: 'PENDING', dueDate: '' })
    }
  }, [task, reset])

  const handleFormSubmit = async (data: FormData) => {
    const payload: any = {
      title: data.title,
      description: data.description || undefined,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
    }
    if (isEdit) payload.status = data.status
    await onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <Input
        label="Title"
        required
        placeholder="What needs to be done?"
        error={errors.title?.message}
        {...register('title')}
      />

      <Textarea
        label="Description"
        placeholder="Add some details (optional)..."
        error={errors.description?.message}
        {...register('description')}
      />

      {/* Priority + Status/Date in responsive grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
        <Select
          label="Priority"
          options={priorityOptions}
          error={errors.priority?.message}
          {...register('priority')}
        />
        {isEdit ? (
          <Select
            label="Status"
            options={statusOptions}
            error={errors.status?.message}
            {...register('status')}
          />
        ) : (
          <Input
            label="Due Date"
            type="date"
            error={errors.dueDate?.message}
            {...register('dueDate')}
          />
        )}
      </div>

      {isEdit && (
        <Input label="Due Date" type="date" error={errors.dueDate?.message} {...register('dueDate')} />
      )}

      <div className="flex flex-col-reverse xs:flex-row gap-3 pt-1">
        <Button type="button" variant="ghost" onClick={onCancel} fullWidth>Cancel</Button>
        <Button type="submit" isLoading={isLoading} fullWidth>
          {isEdit ? 'Save Changes' : 'Create Task'}
        </Button>
      </div>
    </form>
  )
}
