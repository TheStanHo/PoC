# Monitor-Me PoC

A web proof of concept inspired by the **Monitor-Me** Android dissertation app, which studied phone usage over one week by collecting unlock counts and screen-on duration.

This demo is not a rebuild of the Android app. It shows how the study signals could be reviewed in a lightweight researcher dashboard using synthetic participants.

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

- Study flow overview matching the original consent → monitor → finish path
- Synthetic participant selector with anonymised IDs
- Weekly unlock and screen-on charts
- Sample unlock timeline and screen sessions
- Service heartbeat strip showing when monitoring stayed alive

## Imagery

Hero photography is from Unsplash (phone / everyday usage atmosphere).
