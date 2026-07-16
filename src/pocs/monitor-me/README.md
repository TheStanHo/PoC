# Monitor-Me PoC

An interactive phone mockup inspired by the **Monitor-Me** Android dissertation app.

The page explains what the original study application did, while the phone UI lets you click through the same participant flow:

1. Consent
2. Questionnaire
3. Usage permission
4. Monitoring
5. Finish study

## Inspired by the original app

The Android study app collected:

- Participant consent and a short questionnaire
- Truncated device IDs instead of names
- Unlock events (`ACTION_USER_PRESENT`)
- Screen-on sessions (`SCREEN_ON` / `SCREEN_OFF`)
- Foreground service heartbeats
- Study start and finish markers

It did not collect message content, photos, or personal account data.

## Current scope

- Clickable phone-screen walkthrough of the main app screens
- Side panel with application details and collected signals
- Synthetic live unlock / screen-on counters while monitoring is active
- Restart path so the demo can be tried again

All participant data in this PoC is synthetic.
