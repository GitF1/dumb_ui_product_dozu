import { supabase } from "@/lib/supabase";
import { Provider } from "@supabase/supabase-js";

export type UserRole = "student" | "instructor" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser | null;
  error?: string;
}

export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    // Get user profile with role information
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user?.id)
      .single();

    if (profileError) throw profileError;

    return {
      success: true,
      user: {
        id: data.user?.id || "",
        email: data.user?.email || "",
        name: profileData?.name,
        role: (profileData?.role as UserRole) || "student",
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to login",
    };
  }
};

export const register = async (
  credentials: RegisterCredentials,
): Promise<AuthResponse> => {
  try {
    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    if (data.user) {
      // Create profile with role
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          name: credentials.name,
          role: credentials.role,
          email: credentials.email,
        },
      ]);

      if (profileError) throw profileError;
    }

    return {
      success: true,
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email || "",
            name: credentials.name,
            role: credentials.role,
          }
        : undefined,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to register",
    };
  }
};

export const logout = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to logout",
    };
  }
};

export const resetPassword = async (
  email: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to send reset password email",
    };
  }
};

export const updatePassword = async (
  newPassword: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to update password",
    };
  }
};

export const loginWithProvider = async (
  provider: Provider,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth-callback`,
      },
    });
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || `Failed to login with ${provider}`,
    };
  }
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;

    // Get user profile with role information
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    return {
      id: data.user.id,
      email: data.user.email || "",
      name: profileData?.name,
      role: (profileData?.role as UserRole) || "student",
    };
  } catch (error) {
    return null;
  }
};
