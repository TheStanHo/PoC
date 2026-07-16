import { useEffect, useState } from "react";
import {
  appFacts,
  collectedSignals,
  consentCopy,
  demoParticipantId,
  genderOptions,
  screenLabels,
  studyInfoCopy,
} from "./data";
import type { AppScreen } from "./types";

type PhoneProps = {
  screen: AppScreen;
  consentChecked: boolean;
  age: string;
  gender: string;
  permissionGranted: boolean;
  monitoring: boolean;
  stopText: string;
  unlockCount: number;
  screenMinutes: number;
  onConsentChecked: (value: boolean) => void;
  onEnterConsent: () => void;
  onAgeChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onStartQuestionnaire: () => void;
  onGrantPermission: () => void;
  onStartMonitoring: () => void;
  onOpenStudyInfo: () => void;
  onBackFromStudyInfo: () => void;
  onStopTextChange: (value: string) => void;
  onFinishStudy: () => void;
  onRestart: () => void;
};

function StatusBar({ title }: { title: string }) {
  return (
    <div className="mm-phone__status">
      <span>9:41</span>
      <strong>{title}</strong>
      <span>LTE</span>
    </div>
  );
}

function PhoneApp({
  screen,
  consentChecked,
  age,
  gender,
  permissionGranted,
  monitoring,
  stopText,
  unlockCount,
  screenMinutes,
  onConsentChecked,
  onEnterConsent,
  onAgeChange,
  onGenderChange,
  onStartQuestionnaire,
  onGrantPermission,
  onStartMonitoring,
  onOpenStudyInfo,
  onBackFromStudyInfo,
  onStopTextChange,
  onFinishStudy,
  onRestart,
}: PhoneProps) {
  const canStartQuestionnaire = age.trim().length > 0 && gender.length > 0;
  const canFinish = stopText.trim().toUpperCase() === "STOP";

  return (
    <div className="mm-phone" aria-label="Monitor-Me phone mockup">
      <div className="mm-phone__bezel">
        <div className="mm-phone__notch" aria-hidden="true" />
        <div className="mm-phone__screen">
          <StatusBar title="Monitor-Me" />

          {screen === "consent" ? (
            <div className="mm-app-screen">
              <h2>Thank you for downloading Monitor-Me</h2>
              <p className="mm-app-screen__lead">
                Below is some information about the study
              </p>
              <div className="mm-app-scroll">{consentCopy}</div>
              <label className="mm-app-check">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(event) => onConsentChecked(event.target.checked)}
                />
                <span>I consent to take part in the study</span>
              </label>
              <button
                type="button"
                className="mm-app-button"
                disabled={!consentChecked}
                onClick={onEnterConsent}
              >
                Enter
              </button>
            </div>
          ) : null}

          {screen === "questionnaire" ? (
            <div className="mm-app-screen">
              <h2>Please answer the questionnaire</h2>
              <p className="mm-app-screen__lead">
                Your study ID is shown below. Fill in age and gender to continue.
              </p>

              <div className="mm-app-field">
                <span>ID</span>
                <strong>{demoParticipantId}</strong>
              </div>

              <label className="mm-app-field">
                <span>Age</span>
                <input
                  type="number"
                  min={18}
                  max={99}
                  value={age}
                  placeholder="e.g. 22"
                  onChange={(event) => onAgeChange(event.target.value)}
                />
              </label>

              <label className="mm-app-field">
                <span>Gender</span>
                <select
                  value={gender}
                  onChange={(event) => onGenderChange(event.target.value)}
                >
                  <option value="">Select</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className="mm-app-form-card">
                <span>Pre-study form</span>
                <p>
                  In the real app this area loaded a Google Form inside a
                  WebView. Here it is simplified for the phone demo.
                </p>
              </div>

              <button
                type="button"
                className="mm-app-button"
                disabled={!canStartQuestionnaire}
                onClick={onStartQuestionnaire}
              >
                Start Study
              </button>
            </div>
          ) : null}

          {screen === "permission" || screen === "monitoring" ? (
            <div className="mm-app-screen">
              <h2>Usage access</h2>
              <p className="mm-app-screen__lead">
                Allow usage stats, then start monitoring. You will not see the
                collected data inside the app.
              </p>

              <button
                type="button"
                className="mm-app-button mm-app-button--secondary"
                onClick={onGrantPermission}
              >
                {permissionGranted ? "Permission granted" : "Grant Permission"}
              </button>

              <button
                type="button"
                className="mm-app-button"
                disabled={!permissionGranted || monitoring}
                onClick={onStartMonitoring}
              >
                {monitoring ? "Monitoring active" : "Start Monitor-Me"}
              </button>

              <button
                type="button"
                className="mm-app-button mm-app-button--ghost"
                onClick={onOpenStudyInfo}
              >
                Study Information
              </button>

              {monitoring ? (
                <div className="mm-app-live" aria-live="polite">
                  <span>Foreground service</span>
                  <strong>Data is being collected</strong>
                  <p>
                    Unlocks recorded: {unlockCount}
                    <br />
                    Screen-on so far: {screenMinutes} min
                  </p>
                </div>
              ) : null}

              <div className="mm-app-stop">
                <p>
                  After the week is over, or if you want to opt out, type STOP
                  and finish the study.
                </p>
                <input
                  type="text"
                  value={stopText}
                  placeholder="Type STOP"
                  onChange={(event) => onStopTextChange(event.target.value)}
                  disabled={!monitoring}
                />
                <button
                  type="button"
                  className="mm-app-button mm-app-button--danger"
                  disabled={!monitoring || !canFinish}
                  onClick={onFinishStudy}
                >
                  Finish Study
                </button>
              </div>
            </div>
          ) : null}

          {screen === "study-info" ? (
            <div className="mm-app-screen">
              <h2>Study information</h2>
              <div className="mm-app-scroll">{studyInfoCopy}</div>
              <ul className="mm-app-signal-list">
                {collectedSignals.map((signal) => (
                  <li key={signal.title}>
                    <strong>{signal.title}</strong>
                    <span>{signal.description}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mm-app-button"
                onClick={onBackFromStudyInfo}
              >
                Back
              </button>
            </div>
          ) : null}

          {screen === "finished" ? (
            <div className="mm-app-screen mm-app-screen--center">
              <p className="mm-app-brand-mini">Monitor-Me</p>
              <div className="mm-app-face" aria-hidden="true">
                :)
              </div>
              <h2>Thank you for participating</h2>
              <p className="mm-app-screen__lead">
                In the real study you could request results by emailing with the
                ID below. Feel free to close and uninstall the app.
              </p>
              <div className="mm-app-field">
                <span>Your ID</span>
                <strong>{demoParticipantId}</strong>
              </div>
              <button type="button" className="mm-app-button" onClick={onRestart}>
                Restart demo
              </button>
            </div>
          ) : null}
        </div>
        <div className="mm-phone__home" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function MonitorMeDemo() {
  const [screen, setScreen] = useState<AppScreen>("consent");
  const [returnScreen, setReturnScreen] = useState<AppScreen>("permission");
  const [consentChecked, setConsentChecked] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [stopText, setStopText] = useState("");
  const [unlockCount, setUnlockCount] = useState(0);
  const [screenMinutes, setScreenMinutes] = useState(0);

  useEffect(() => {
    if (!monitoring) {
      return;
    }

    const unlockTimer = window.setInterval(() => {
      setUnlockCount((count) => count + 1);
    }, 4200);

    const screenTimer = window.setInterval(() => {
      setScreenMinutes((minutes) => minutes + 1);
    }, 2800);

    return () => {
      window.clearInterval(unlockTimer);
      window.clearInterval(screenTimer);
    };
  }, [monitoring]);

  const restart = () => {
    setScreen("consent");
    setReturnScreen("permission");
    setConsentChecked(false);
    setAge("");
    setGender("");
    setPermissionGranted(false);
    setMonitoring(false);
    setStopText("");
    setUnlockCount(0);
    setScreenMinutes(0);
  };

  const activeStep: AppScreen =
    screen === "study-info"
      ? monitoring
        ? "monitoring"
        : "permission"
      : screen === "permission" && monitoring
        ? "monitoring"
        : screen;

  return (
    <div className="mm-poc">
      <div className="mm-shell">
        <header className="mm-top">
          <a className="mm-hub-link" href="/">
            ← PoC hub
          </a>
          <span>Interactive phone demo</span>
        </header>

        <section className="mm-layout" aria-labelledby="mm-brand">
          <div className="mm-copy">
            <p className="mm-brand" id="mm-brand">
              Monitor-Me
            </p>
            <h1>Tap through the dissertation Android app.</h1>
            <p>
              This page explains the original study application, while the phone
              lets you click through the same flow participants used: consent,
              questionnaire, usage permission, monitoring, then finish.
            </p>

            <div className="mm-step-rail" aria-label="Current app screen">
              {(
                [
                  "consent",
                  "questionnaire",
                  "permission",
                  "monitoring",
                  "finished",
                ] as AppScreen[]
              ).map((item) => (
                <span
                  key={item}
                  className={`mm-step-rail__item${
                    item === activeStep ? " is-active" : ""
                  }`}
                >
                  {screenLabels[item]}
                </span>
              ))}
            </div>

            <div className="mm-facts">
              {appFacts.map((fact) => (
                <article key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                  <p>{fact.detail}</p>
                </article>
              ))}
            </div>

            <div className="mm-about">
              <h2>About the application</h2>
              <p>
                Monitor-Me was built for a masters dissertation looking at phone
                usage behaviour. After consent, the Android app started a
                foreground service that listened for unlock and screen events,
                then sent anonymised records to Firebase.
              </p>
              <ul>
                {collectedSignals.map((signal) => (
                  <li key={signal.title}>
                    <strong>{signal.title}</strong>
                    <span>{signal.description}</span>
                  </li>
                ))}
              </ul>
              <p className="mm-about__note">
                The demo uses synthetic data only. No real participant records
                are shown here.
              </p>
            </div>
          </div>

          <div className="mm-stage">
            <PhoneApp
              screen={screen}
              consentChecked={consentChecked}
              age={age}
              gender={gender}
              permissionGranted={permissionGranted}
              monitoring={monitoring}
              stopText={stopText}
              unlockCount={unlockCount}
              screenMinutes={screenMinutes}
              onConsentChecked={setConsentChecked}
              onEnterConsent={() => setScreen("questionnaire")}
              onAgeChange={setAge}
              onGenderChange={setGender}
              onStartQuestionnaire={() => setScreen("permission")}
              onGrantPermission={() => setPermissionGranted(true)}
              onStartMonitoring={() => {
                setMonitoring(true);
                setScreen("permission");
              }}
              onOpenStudyInfo={() => {
                setReturnScreen(screen === "finished" ? "permission" : screen);
                setScreen("study-info");
              }}
              onBackFromStudyInfo={() => setScreen(returnScreen)}
              onStopTextChange={setStopText}
              onFinishStudy={() => {
                setMonitoring(false);
                setScreen("finished");
              }}
              onRestart={restart}
            />
            <p className="mm-stage__hint">
              Use the phone like the real app — check consent, fill the form,
              grant permission, start monitoring, then type STOP to finish.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
