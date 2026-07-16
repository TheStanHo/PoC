export type StudyStatus = "active" | "completed" | "pending";

export type DailyUnlockSummary = {
  day: string;
  dateLabel: string;
  unlocks: number;
  screenOnMinutes: number;
};

export type UnlockEvent = {
  id: string;
  time: string;
  day: string;
  sequence: number;
};

export type ScreenSession = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  elapsedLabel: string;
  minutes: number;
};

export type ServiceHeartbeat = {
  time: string;
  running: boolean;
};

export type Participant = {
  id: string;
  ageBand: string;
  gender: string;
  status: StudyStatus;
  startedAt: string;
  finishedAt?: string;
  daily: DailyUnlockSummary[];
  unlockEvents: UnlockEvent[];
  screenSessions: ScreenSession[];
  heartbeats: ServiceHeartbeat[];
};

export type StudyMetric = {
  label: string;
  value: string;
  detail: string;
};

export type StudyStep = {
  step: number;
  title: string;
  description: string;
};
