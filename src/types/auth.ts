import z from "zod";

const emailSchema = z.string().email({ message: "Invalid email" });
const usernameSchema = z
  .string()
  .trim()
  .regex(/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/, {
    message:
      "Username must start with a letter and can only contain letters, numbers, underscores, and hyphens",
  })
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username cannot be longer than 20 characters" });

const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must include an uppercase, lowercase, number, special character, and be 8+ characters",
    },
  );

export const signUpFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
});
