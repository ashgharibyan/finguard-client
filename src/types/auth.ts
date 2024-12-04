import z from "zod";

const emailSchema = z.string().email({ message: "Invalid email address." });
const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters long." })
  .nonempty({ message: "Username is required." });

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long." })
  .nonempty({ message: "Password is required." });

export const signUpFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
});
