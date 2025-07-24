import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://kinobi-fileupload-server.onrender.com',
})

export async function fetchFiles() {
  const res = await apiClient.get('/files')
  return res.data
}

export async function deleteFile(filename) {
  const res = await apiClient.delete(`/files/${filename}`)
  return res.data
}

export async function uploadFile(file) {
  const form = new FormData()
  form.append('file', file)
  const res = await apiClient.post('/upload', form)
  return res.data
}

export async function duplicateFile(filename) {
  const res = await apiClient.post(`/files/${filename}/duplicate`)
  return res.data
}
