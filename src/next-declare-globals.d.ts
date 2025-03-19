// Detta är en tillfällig fix som deklarerar React typer
declare module 'react' {
  export default any;
  export function useState<T>(initialState: T): [T, (newState: T) => void];
  export function useEffect(effect: () => void, deps?: any[]): void;
  export interface FC<P = {}> {
    (props: P): JSX.Element | null;
  }
}

declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 