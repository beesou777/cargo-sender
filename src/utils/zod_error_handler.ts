import { ZodError } from 'zod';

export function zodToError(err: ZodError) {
  const errorMessages = err.errors.map((issue: any) => ({
    message: `${issue.path.join('.')} is ${issue.message}`,
  }));
  return {
    error: 'Invalid data',
    details: errorMessages,
  };
}
