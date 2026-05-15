export class FormStore {
  private values: Record<string, any> = {};
  private listeners = new Set<() => void>();

  constructor(initialValues: Record<string, any> = {}) {
    this.values = initialValues;
  }

  getValues() {
    return this.values;
  }

  getFieldValue(name: string) {
    return this.values[name];
  }

  setFieldValue(name: string, value: any) {
    if (this.values[name] === value) return;
    this.values[name] = value;
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}
