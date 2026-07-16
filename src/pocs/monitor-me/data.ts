export type AppScreen =
  | "consent"
  | "questionnaire"
  | "permission"
  | "study-info"
  | "monitoring"
  | "finished";

export type AppFact = {
  label: string;
  value: string;
  detail: string;
};

export type CollectedSignal = {
  title: string;
  description: string;
};

export const demoParticipantId = "A3F91C";

export const appFacts: AppFact[] = [
  {
    label: "Platform",
    value: "Android",
    detail: "Java app with a foreground service and Firebase writes",
  },
  {
    label: "Study length",
    value: "1 week",
    detail: "Participants kept the monitoring notification running",
  },
  {
    label: "Identity",
    value: "6-char ID",
    detail: "Truncated device ID only — no real names collected",
  },
  {
    label: "Storage",
    value: "Firebase",
    detail: "Unlocks, screen-on sessions, start/finish, and heartbeats",
  },
];

export const collectedSignals: CollectedSignal[] = [
  {
    title: "Unlocks",
    description:
      "Counted whenever the phone was unlocked via ACTION_USER_PRESENT.",
  },
  {
    title: "Screen-on time",
    description:
      "Measured between SCREEN_ON and SCREEN_OFF for each screen session.",
  },
  {
    title: "Service heartbeat",
    description:
      "Periodic checks confirmed the foreground monitoring service was still alive.",
  },
];

export const consentCopy = `The study is about mobile phones. To study this the following information must be given but will not be misused or given to a third party, nor will you be identified by name.

1. Age and gender — used only to look for correlations with phone use.
2. Permission to access phone data. No content or personal information is gathered.
3. Only time spent on the phone and number of unlocks are collected.
4. You receive an ID and complete a questionnaire before and after the study.
5. The study lasts one week. You cannot see the recorded data in the app, but you can request it afterwards.

If you are willing to participate, check the box. By pressing Enter you are consenting to take part.`;

export const studyInfoCopy = `Monitor-Me collects unlock counts and screen-on duration while a foreground service keeps listening in the background.

No messages, photos, passwords, or app content are recorded. Keep the study notification visible while monitoring is active.`;

export const genderOptions = ["Female", "Male", "Non-binary", "Prefer not to say"];

export const screenLabels: Record<AppScreen, string> = {
  consent: "Consent",
  questionnaire: "Questionnaire",
  permission: "Usage permission",
  "study-info": "Study information",
  monitoring: "Monitoring",
  finished: "Finished",
};
