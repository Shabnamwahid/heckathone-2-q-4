import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { Pool } from "pg";

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "",
});

// Configure Better Auth with PostgreSQL adapter and JWT plugin
export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET || "your-super-secret-key-change-this-in-production",
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3001",
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    jwt({
      secret: process.env.BETTER_AUTH_JWT_SECRET || process.env.BETTER_AUTH_SECRET || "your-jwt-secret-change-this",
    }),
  ],
});

// Export the client configuration
export const authClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3001",
};