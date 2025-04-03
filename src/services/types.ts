//types.ts file

export type APIResponse<T> = {
  success: boolean
  content: T
  status?: number
  total?: number
}
