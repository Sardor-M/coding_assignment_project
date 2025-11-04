// Type declarations to ensure React 18 types are used consistently
// This file helps TypeScript use React 18 types instead of React 19

// Override JSX namespace to use React 18 types
declare namespace React {
    namespace JSX {
        type Element = import('react').ReactElement;
        type ElementType = import('react').ElementType;
    }
}

declare global {
    namespace JSX {
        interface Element extends React.ReactElement<any, any> {}
    }
}

export {};
