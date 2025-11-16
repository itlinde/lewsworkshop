"use server";

function constantTimeEquals(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

export const verifyPassword = async (password) => {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword) {
    throw new Error("ADMIN_PASSWORD is not set");
  }

  return constantTimeEquals(correctPassword, password);
};
