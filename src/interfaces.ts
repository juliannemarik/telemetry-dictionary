export interface ITelemetryLabel {
  id: string
  definition?: string
}

export interface ITelemetryAction {
  id: string
  definition?: string
  labels: {[key:string]: ITelemetryLabel}
}

export interface ITelemetryCategory {
  id: string
  definition?: string
  actions: {[key:string]: ITelemetryAction}
}