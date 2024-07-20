export interface DocumentedFn {
  doc: string;
  fn: (...args: any[]) => any;
}
