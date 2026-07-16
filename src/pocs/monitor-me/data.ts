import type { Participant, StudyMetric, StudyStep } from "./types";

export const studySteps: StudyStep[] = [
  {
    step: 1,
    title: "Consent",
    description:
      "Participants read the study information and agree before any monitoring begins.",
  },
  {
    step: 2,
    title: "Questionnaire",
    description:
      "Age band and gender are collected with a short form, using a truncated device ID.",
  },
  {
    step: 3,
    title: "Usage permission",
    description:
      "The Android study app asked for usage-access permission, then started a foreground service.",
  },
  {
    step: 4,
    title: "Passive monitoring",
    description:
      "Unlocks and screen-on duration were recorded through screen events and sent to Firebase.",
  },
];

export const studyOverview: StudyMetric[] = [
  {
    label: "Study length",
    value: "7 days",
    detail: "Same week-long window as the dissertation study",
  },
  {
    label: "Signals collected",
    value: "2",
    detail: "Unlock count and screen-on duration only",
  },
  {
    label: "Participant IDs",
    value: "6 chars",
    detail: "Truncated device ID, never a real name",
  },
  {
    label: "Storage model",
    value: "Events",
    detail: "Push-style records for unlocks, sessions, and heartbeats",
  },
];

export const heroImage =
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80";

export const participants: Participant[] = [
  {
    id: "A3F91C",
    ageBand: "18–24",
    gender: "Female",
    status: "completed",
    startedAt: "Mon 09:12",
    finishedAt: "Sun 18:40",
    daily: [
      { day: "Mon", dateLabel: "Day 1", unlocks: 42, screenOnMinutes: 186 },
      { day: "Tue", dateLabel: "Day 2", unlocks: 51, screenOnMinutes: 214 },
      { day: "Wed", dateLabel: "Day 3", unlocks: 38, screenOnMinutes: 162 },
      { day: "Thu", dateLabel: "Day 4", unlocks: 47, screenOnMinutes: 201 },
      { day: "Fri", dateLabel: "Day 5", unlocks: 63, screenOnMinutes: 248 },
      { day: "Sat", dateLabel: "Day 6", unlocks: 58, screenOnMinutes: 271 },
      { day: "Sun", dateLabel: "Day 7", unlocks: 44, screenOnMinutes: 193 },
    ],
    unlockEvents: [
      { id: "u1", time: "07:14", day: "Fri", sequence: 1 },
      { id: "u2", time: "07:41", day: "Fri", sequence: 2 },
      { id: "u3", time: "08:05", day: "Fri", sequence: 3 },
      { id: "u4", time: "09:22", day: "Fri", sequence: 4 },
      { id: "u5", time: "11:03", day: "Fri", sequence: 5 },
      { id: "u6", time: "12:48", day: "Fri", sequence: 6 },
      { id: "u7", time: "14:16", day: "Fri", sequence: 7 },
      { id: "u8", time: "16:02", day: "Fri", sequence: 8 },
      { id: "u9", time: "18:37", day: "Fri", sequence: 9 },
      { id: "u10", time: "21:09", day: "Fri", sequence: 10 },
    ],
    screenSessions: [
      {
        id: "s1",
        day: "Fri",
        startTime: "07:14",
        endTime: "07:28",
        elapsedLabel: "0h 14m 02s",
        minutes: 14,
      },
      {
        id: "s2",
        day: "Fri",
        startTime: "09:22",
        endTime: "09:51",
        elapsedLabel: "0h 29m 11s",
        minutes: 29,
      },
      {
        id: "s3",
        day: "Fri",
        startTime: "12:48",
        endTime: "13:19",
        elapsedLabel: "0h 31m 44s",
        minutes: 32,
      },
      {
        id: "s4",
        day: "Fri",
        startTime: "18:37",
        endTime: "19:26",
        elapsedLabel: "0h 49m 08s",
        minutes: 49,
      },
      {
        id: "s5",
        day: "Fri",
        startTime: "21:09",
        endTime: "22:01",
        elapsedLabel: "0h 52m 33s",
        minutes: 53,
      },
    ],
    heartbeats: [
      { time: "07:00", running: true },
      { time: "07:15", running: true },
      { time: "07:30", running: true },
      { time: "07:45", running: true },
      { time: "08:00", running: true },
      { time: "08:15", running: false },
      { time: "08:30", running: true },
      { time: "08:45", running: true },
    ],
  },
  {
    id: "B82E04",
    ageBand: "25–34",
    gender: "Male",
    status: "completed",
    startedAt: "Mon 08:03",
    finishedAt: "Sun 20:11",
    daily: [
      { day: "Mon", dateLabel: "Day 1", unlocks: 29, screenOnMinutes: 141 },
      { day: "Tue", dateLabel: "Day 2", unlocks: 33, screenOnMinutes: 158 },
      { day: "Wed", dateLabel: "Day 3", unlocks: 31, screenOnMinutes: 149 },
      { day: "Thu", dateLabel: "Day 4", unlocks: 36, screenOnMinutes: 167 },
      { day: "Fri", dateLabel: "Day 5", unlocks: 41, screenOnMinutes: 188 },
      { day: "Sat", dateLabel: "Day 6", unlocks: 39, screenOnMinutes: 203 },
      { day: "Sun", dateLabel: "Day 7", unlocks: 27, screenOnMinutes: 132 },
    ],
    unlockEvents: [
      { id: "u11", time: "06:58", day: "Thu", sequence: 1 },
      { id: "u12", time: "07:30", day: "Thu", sequence: 2 },
      { id: "u13", time: "08:44", day: "Thu", sequence: 3 },
      { id: "u14", time: "10:12", day: "Thu", sequence: 4 },
      { id: "u15", time: "12:05", day: "Thu", sequence: 5 },
      { id: "u16", time: "15:21", day: "Thu", sequence: 6 },
      { id: "u17", time: "17:48", day: "Thu", sequence: 7 },
      { id: "u18", time: "20:03", day: "Thu", sequence: 8 },
    ],
    screenSessions: [
      {
        id: "s6",
        day: "Thu",
        startTime: "06:58",
        endTime: "07:12",
        elapsedLabel: "0h 14m 19s",
        minutes: 14,
      },
      {
        id: "s7",
        day: "Thu",
        startTime: "10:12",
        endTime: "10:40",
        elapsedLabel: "0h 28m 05s",
        minutes: 28,
      },
      {
        id: "s8",
        day: "Thu",
        startTime: "15:21",
        endTime: "15:55",
        elapsedLabel: "0h 34m 42s",
        minutes: 35,
      },
      {
        id: "s9",
        day: "Thu",
        startTime: "20:03",
        endTime: "20:47",
        elapsedLabel: "0h 44m 16s",
        minutes: 44,
      },
    ],
    heartbeats: [
      { time: "08:00", running: true },
      { time: "08:15", running: true },
      { time: "08:30", running: true },
      { time: "08:45", running: true },
      { time: "09:00", running: true },
      { time: "09:15", running: true },
      { time: "09:30", running: true },
      { time: "09:45", running: true },
    ],
  },
  {
    id: "C17D9A",
    ageBand: "18–24",
    gender: "Non-binary",
    status: "active",
    startedAt: "Mon 10:27",
    daily: [
      { day: "Mon", dateLabel: "Day 1", unlocks: 55, screenOnMinutes: 228 },
      { day: "Tue", dateLabel: "Day 2", unlocks: 61, screenOnMinutes: 241 },
      { day: "Wed", dateLabel: "Day 3", unlocks: 49, screenOnMinutes: 197 },
      { day: "Thu", dateLabel: "Day 4", unlocks: 57, screenOnMinutes: 219 },
      { day: "Fri", dateLabel: "Day 5", unlocks: 68, screenOnMinutes: 265 },
      { day: "Sat", dateLabel: "Day 6", unlocks: 72, screenOnMinutes: 289 },
      { day: "Sun", dateLabel: "Day 7", unlocks: 0, screenOnMinutes: 0 },
    ],
    unlockEvents: [
      { id: "u19", time: "08:11", day: "Sat", sequence: 1 },
      { id: "u20", time: "08:39", day: "Sat", sequence: 2 },
      { id: "u21", time: "09:54", day: "Sat", sequence: 3 },
      { id: "u22", time: "11:28", day: "Sat", sequence: 4 },
      { id: "u23", time: "13:07", day: "Sat", sequence: 5 },
      { id: "u24", time: "15:42", day: "Sat", sequence: 6 },
      { id: "u25", time: "17:19", day: "Sat", sequence: 7 },
      { id: "u26", time: "19:05", day: "Sat", sequence: 8 },
      { id: "u27", time: "22:14", day: "Sat", sequence: 9 },
    ],
    screenSessions: [
      {
        id: "s10",
        day: "Sat",
        startTime: "08:11",
        endTime: "08:36",
        elapsedLabel: "0h 25m 07s",
        minutes: 25,
      },
      {
        id: "s11",
        day: "Sat",
        startTime: "11:28",
        endTime: "12:09",
        elapsedLabel: "0h 41m 22s",
        minutes: 41,
      },
      {
        id: "s12",
        day: "Sat",
        startTime: "15:42",
        endTime: "16:31",
        elapsedLabel: "0h 49m 51s",
        minutes: 50,
      },
      {
        id: "s13",
        day: "Sat",
        startTime: "19:05",
        endTime: "20:12",
        elapsedLabel: "1h 07m 03s",
        minutes: 67,
      },
      {
        id: "s14",
        day: "Sat",
        startTime: "22:14",
        endTime: "23:01",
        elapsedLabel: "0h 47m 18s",
        minutes: 47,
      },
    ],
    heartbeats: [
      { time: "10:00", running: true },
      { time: "10:15", running: true },
      { time: "10:30", running: true },
      { time: "10:45", running: false },
      { time: "11:00", running: true },
      { time: "11:15", running: true },
      { time: "11:30", running: true },
      { time: "11:45", running: true },
    ],
  },
];

export function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
}

export function getParticipantTotals(participant: Participant) {
  const unlocks = participant.daily.reduce((sum, day) => sum + day.unlocks, 0);
  const screenOnMinutes = participant.daily.reduce(
    (sum, day) => sum + day.screenOnMinutes,
    0,
  );
  const peakDay = participant.daily.reduce((peak, day) =>
    day.unlocks > peak.unlocks ? day : peak,
  );
  const heartbeatGaps = participant.heartbeats.filter(
    (beat) => !beat.running,
  ).length;

  return {
    unlocks,
    screenOnMinutes,
    peakDay,
    heartbeatGaps,
    averageUnlocks: Math.round(unlocks / Math.max(1, participant.daily.length)),
  };
}
