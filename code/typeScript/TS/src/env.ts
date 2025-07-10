import { z } from "zod";

//for validating env variables if not crash the server
const envSchema = z.object({
  PORT: z.string().optional(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const validationResult = envSchema.safeParse(env);
  if (!validationResult.success) {
    throw new Error(validationResult.error.message);
  }
  return validationResult.data;
}

export const env = createEnv(process.env);
