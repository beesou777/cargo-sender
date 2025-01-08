import { QuoteApiSchema } from "@/app/api/orders/zod";
import { createFormContext } from "@mantine/form";
import { z } from "zod";

type FormValues = z.infer<typeof QuoteApiSchema>;

const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();

export { FormProvider, useFormContext, useForm };
