import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock Supabase client if credentials are not available
let supabaseInstance;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase credentials not found. Using mock client. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.",
    );
    // Create a mock client with dummy methods
    supabaseInstance = {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({
          data: { user: null },
          error: { message: "Mock: Authentication not configured" },
        }),
        signUp: async () => ({
          data: { user: null },
          error: { message: "Mock: Authentication not configured" },
        }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ error: null }),
        updateUser: async () => ({ error: null }),
        signInWithOAuth: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
          }),
        }),
        insert: async () => ({ error: null }),
      }),
    };
  } else {
    // Create the real Supabase client
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.error("Error initializing Supabase client:", error);
  // Fallback to mock client
  supabaseInstance = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({
        data: { user: null },
        error: { message: "Error: Failed to initialize authentication" },
      }),
      signUp: async () => ({
        data: { user: null },
        error: { message: "Error: Failed to initialize authentication" },
      }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({ error: null }),
      updateUser: async () => ({ error: null }),
      signInWithOAuth: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
      insert: async () => ({ error: null }),
    }),
  };
}

export const supabase = supabaseInstance;
