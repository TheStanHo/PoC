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
