import { useMemo, useState } from "react";
import {
  formatMinutes,
  getParticipantTotals,
  heroImage,
  participants,
  studyOverview,
  studySteps,
} from "./data";
import type { Participant } from "./types";

type SignalView = "unlocks" | "screen";

function ParticipantChip({
  participant,
  selected,
  onSelect,
}: {
  participant: Participant;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className={`mm-participant${selected ? " is-active" : ""}`}
      onClick={() => onSelect(participant.id)}
      aria-pressed={selected}
    >
      <strong>{participant.id}</strong>
      <span>
        {participant.ageBand} · {participant.gender}
      </span>
      <em className={`mm-status mm-status--${participant.status}`}>
        {participant.status}
      </em>
    </button>
  );
}

function DailyChart({
  participant,
  view,
}: {
  participant: Participant;
  view: SignalView;
}) {
  const maxValue = Math.max(
    ...participant.daily.map((day) =>
      view === "unlocks" ? day.unlocks : day.screenOnMinutes,
    ),
    1,
  );

  return (
    <div className="mm-chart" role="img" aria-label={`Daily ${view} chart`}>
      {participant.daily.map((day) => {
        const value = view === "unlocks" ? day.unlocks : day.screenOnMinutes;
        const height = `${Math.max(8, (value / maxValue) * 100)}%`;

        return (
          <div className="mm-chart__col" key={day.day}>
            <div className="mm-chart__bar-wrap">
              <span className="mm-chart__bar" style={{ height }}>
                <em>
                  {view === "unlocks" ? value : formatMinutes(value)}
                </em>
              </span>
            </div>
            <strong>{day.day}</strong>
            <span>{day.dateLabel}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function MonitorMeDemo() {
  const [selectedId, setSelectedId] = useState(participants[0].id);
  const [signalView, setSignalView] = useState<SignalView>("unlocks");

  const participant = useMemo(
    () =>
      participants.find((item) => item.id === selectedId) ?? participants[0],
    [selectedId],
  );

  const totals = useMemo(
    () => getParticipantTotals(participant),
    [participant],
  );

  return (
    <div className="mm-poc">
      <section className="mm-hero" aria-labelledby="mm-brand">
        <div className="mm-hero__media" aria-hidden="true">
          <img src={heroImage} alt="" />
          <div className="mm-hero__veil" />
          <div className="mm-hero__grain" />
        </div>

        <div className="mm-hero__content">
          <nav className="mm-nav" aria-label="Monitor-Me navigation">
            <a className="mm-hub-link" href="/">
              ← PoC hub
            </a>
          </nav>

          <p className="mm-brand" id="mm-brand">
            Monitor-Me
          </p>
          <h1>Phone unlocks and screen time, observed over a week.</h1>
          <p className="mm-hero__lede">
            A researcher-facing proof of concept based on the Android
            dissertation study that recorded unlock events and screen-on
            duration — never message content or personal accounts.
          </p>

          <div className="mm-hero__actions">
            <a className="mm-button" href="#study-signals">
              Explore study signals
            </a>
            <span>Synthetic participants · mock event stream</span>
          </div>
        </div>
      </section>

      <section className="mm-section mm-flow" aria-labelledby="mm-flow-heading">
        <div className="mm-section__intro">
          <span className="mm-kicker">Study path</span>
          <h2 id="mm-flow-heading">How the original app worked</h2>
          <p>
            Participants moved from consent to a short questionnaire, then
            granted usage access so a foreground service could keep listening
            for unlock and screen events.
          </p>
        </div>

        <ol className="mm-steps">
          {studySteps.map((item) => (
            <li key={item.step}>
              <span>{String(item.step).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="mm-section mm-overview"
        aria-labelledby="mm-overview-heading"
      >
        <div className="mm-section__intro">
          <span className="mm-kicker">Study design</span>
          <h2 id="mm-overview-heading">What was measured</h2>
          <p>
            The dissertation app focused on a narrow set of behavioural signals
            so phone use could be studied without reading private content.
          </p>
        </div>

        <div className="mm-overview__grid">
          {studyOverview.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="mm-section mm-signals"
        id="study-signals"
        aria-labelledby="mm-signals-heading"
      >
        <div className="mm-section__intro mm-signals__intro">
          <div>
            <span className="mm-kicker">Live study view</span>
            <h2 id="mm-signals-heading">Participant signal board</h2>
            <p>
              Choose a synthetic participant to inspect weekly unlocks,
              screen-on totals, and the service heartbeat that kept monitoring
              alive.
            </p>
          </div>

          <div className="mm-view-toggle" aria-label="Signal view">
            <button
              type="button"
              className={signalView === "unlocks" ? "is-active" : undefined}
              onClick={() => setSignalView("unlocks")}
            >
              Unlocks
            </button>
            <button
              type="button"
              className={signalView === "screen" ? "is-active" : undefined}
              onClick={() => setSignalView("screen")}
            >
              Screen on
            </button>
          </div>
        </div>

        <div className="mm-participant-row" role="group" aria-label="Participants">
          {participants.map((item) => (
            <ParticipantChip
              key={item.id}
              participant={item}
              selected={item.id === participant.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>

        <div className="mm-summary-strip" aria-label="Participant summary">
          <article>
            <span>Participant</span>
            <strong>{participant.id}</strong>
            <p>
              Started {participant.startedAt}
              {participant.finishedAt
                ? ` · finished ${participant.finishedAt}`
                : " · still active"}
            </p>
          </article>
          <article>
            <span>Total unlocks</span>
            <strong>{totals.unlocks}</strong>
            <p>About {totals.averageUnlocks} per day across the week</p>
          </article>
          <article>
            <span>Screen-on time</span>
            <strong>{formatMinutes(totals.screenOnMinutes)}</strong>
            <p>
              Peak unlock day: {totals.peakDay.day} ({totals.peakDay.unlocks})
            </p>
          </article>
          <article>
            <span>Service gaps</span>
            <strong>{totals.heartbeatGaps}</strong>
            <p>Heartbeat misses in the sample window</p>
          </article>
        </div>

        <div className="mm-board">
          <div className="mm-board__chart">
            <div className="mm-board__heading">
              <h3>
                {signalView === "unlocks"
                  ? "Daily unlock count"
                  : "Daily screen-on time"}
              </h3>
              <p>
                Mirrors Firebase event aggregation for{" "}
                {signalView === "unlocks" ? "Unlocks" : "ScreenOnTime"}.
              </p>
            </div>
            <DailyChart participant={participant} view={signalView} />
          </div>

          <div className="mm-board__side">
            <div className="mm-board__heading">
              <h3>Sample unlock stream</h3>
              <p>
                Each unlock was stored with truncated ID, sequence, timestamp,
                and date.
              </p>
            </div>
            <ul className="mm-event-list">
              {participant.unlockEvents.map((event) => (
                <li key={event.id}>
                  <strong>
                    Unlock #{event.sequence.toString().padStart(2, "0")}
                  </strong>
                  <span>
                    {event.day} · {event.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mm-sessions">
          <div className="mm-board__heading">
            <h3>Screen-on sessions</h3>
            <p>
              Duration was calculated between screen-on and screen-off, then
              stored as elapsed time for that cycle.
            </p>
          </div>

          <div className="mm-session-list">
            {participant.screenSessions.map((session) => (
              <article key={session.id}>
                <strong>
                  {session.day} · {session.startTime} → {session.endTime}
                </strong>
                <span>{session.elapsedLabel}</span>
                <div className="mm-session-meter" aria-hidden="true">
                  <span
                    style={{
                      width: `${Math.min(100, (session.minutes / 70) * 100)}%`,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mm-heartbeat">
          <div className="mm-board__heading">
            <h3>Service running check</h3>
            <p>
              The foreground service sent periodic heartbeats so the researcher
              could see whether monitoring stayed alive.
            </p>
          </div>
          <div className="mm-heartbeat__track" aria-label="Heartbeat samples">
            {participant.heartbeats.map((beat) => (
              <div
                key={beat.time}
                className={`mm-heartbeat__beat${beat.running ? " is-live" : " is-gap"}`}
              >
                <span />
                <strong>{beat.time}</strong>
                <em>{beat.running ? "running" : "gap"}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mm-footer">
        <div>
          <p className="mm-brand mm-brand--footer">Monitor-Me</p>
          <p>
            Web PoC inspired by the Android dissertation study. All participant
            records here are synthetic.
          </p>
        </div>
        <a className="mm-hub-link" href="/">
          ← Back to PoC hub
        </a>
      </footer>
    </div>
  );
}
