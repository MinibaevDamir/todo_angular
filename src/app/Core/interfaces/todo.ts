
export interface TODO {
  id: number,
  title: string,
  status: boolean
  having_access: {
    nickname: string
  }
  updatedAt: string
}
export interface TodoChart {
  name: string,
  series: TodoChartSeries[]
}
export interface TodoChartSeries {
  name: string,
  value: number
}