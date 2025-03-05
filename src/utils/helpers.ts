/**
 * Genera un UUID v4
 * @returns string UUID
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Convierte un valor number a string
 */
export function numberToStringId(id: number): string {
  return id.toString();
}

/**
 * Convierte un valor string a number
 */
export function stringToNumberId(id: string): number {
  return parseInt(id, 10);
}