export type IntrospectionEnvironment = "development" | "production"

export function detectIntrospectionEnvironment(): IntrospectionEnvironment {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "production") {
    return "production"
  }
  return "development"
}

export function isIntrospectionEnabled(env: IntrospectionEnvironment): boolean {
  return env === "development"
}

export function guardIntrospection<T>(
  env: IntrospectionEnvironment,
  produce: () => T,
  fallback: T
): T {
  if (!isIntrospectionEnabled(env)) return fallback
  return produce()
}
