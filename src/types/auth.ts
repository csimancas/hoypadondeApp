// src/types/auth.ts
export interface User {
    uid: string;
    email: string | null;
    nombre: string;
    apellido: string;
    telefono: string;
  }
  
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    registerUser: (nombre: string, apellido: string, telefono: string, email: string, password: string) => Promise<any>;
    clearError: () => void;
  }