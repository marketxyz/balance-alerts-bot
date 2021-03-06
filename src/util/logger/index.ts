export function log(message: string, ...args: any[]): void {
  const time = new Date().toLocaleTimeString()
  console.log(`[INFO] ${time} - ${message}`, ...args)
}
