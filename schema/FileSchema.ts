import { z } from 'zod'

export const FileSchema = z.object({
  filename: z.string(),
  timestamp: z.string(),
})

export const FileResponseSchema = z.array(FileSchema)

export type FileSchemaType = z.infer<typeof FileSchema>
export type FileResponseType = z.infer<typeof FileResponseSchema>
