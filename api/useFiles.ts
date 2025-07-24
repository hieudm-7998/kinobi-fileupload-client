import axios from 'axios'
import { FileResponseSchema } from '~/schema/FileSchema'
import type { FileResponseType } from '~/schema/FileSchema'

export const baseURL =
  process.env.API_BASE_URL || 'https://kinobi-fileupload-server.onrender.com'

const apiClient = axios.create({ baseURL })

export async function fetchFiles(): Promise<FileResponseType> {
  const res = await apiClient.get('/files')
  return FileResponseSchema.parse(res.data)
}

export async function uploadFile(
  file: File
): Promise<{ message: string; filename: string }> {
  const form = new FormData()
  form.append('file', file)
  const res = await apiClient.post('/upload', form)
  return res.data
}

export async function deleteFile(
  fileName: string
): Promise<{ message: string }> {
  const res = await apiClient.delete(`/files/${fileName}`)
  return res.data
}

export async function duplicateFile(
  fileName: string
): Promise<{ message: string; filename: string }> {
  const res = await apiClient.post(`/files/${fileName}/duplicate`)
  return res.data
}
