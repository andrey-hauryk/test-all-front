export type WidgetType = 'chart' | 'note' | 'todo'
export type WidgetStatus = 'active' | 'inactive'

export interface Widget {
  id: number
  name: string
  type: WidgetType
  status: WidgetStatus
}
