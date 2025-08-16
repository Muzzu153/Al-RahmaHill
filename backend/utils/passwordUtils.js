import bcrypt from "bcrypt";

const BCRYPT_SALT_ROUNDS = process.env.SALT_ROUNDS;

const hashPassword = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return hashedPassword;
  } catch (error) {
    console.error("Password hashing error:", error);
    throw new Error("Failed to hash password");
  }
};

const isPasswordStrong = (password) => {
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongRegex.test(password);
};

export { hashPassword, isPasswordStrong };
