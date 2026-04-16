import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
