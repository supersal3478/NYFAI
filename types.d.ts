// This file contains custom type declarations for modules that don't have their own type definitions

// Declare modules for UI components
declare module '@/components/ui/button' {
  export const Button: React.ComponentType<any>;
}

declare module '@/components/ui/input' {
  export const Input: React.ComponentType<any>;
}

// Declare module for NetworkBackground component
declare module '@/components/NetworkBackground' {
  export const NetworkBackground: React.ComponentType<any>;
}

// Declare module for lucide-react icons
declare module 'lucide-react' {
  export const ArrowRight: React.ComponentType<any>;
  export const ArrowLeft: React.ComponentType<any>;
  export const Play: React.ComponentType<any>;
} 