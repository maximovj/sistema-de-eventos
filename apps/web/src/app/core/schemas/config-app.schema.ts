import { z } from 'zod';

// Define el esquema (puedes exportarlo para usarlo en otros lugares)
export const ConfigAppSchema = z.object({
  tab: z.string(),
  theme: z.string().optional(),
  language: z.string().optional(),
});

export type ConfigAppType = z.infer<typeof ConfigAppSchema>;
