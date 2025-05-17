# **App Name**: EmojiBeat Wall

## Core Features:

- Client-Server Model: Web front-ends served by Firebase Hosting for guests and host.
- Serverless Backend: Firebase Cloud Functions react to events (timers, database writes).
- Realtime Data Flow: Firestore’s real-time listeners push updates instantly to all connected clients based on guests’ emoji votes and ambient audio readings.
- Generative AI Playlist: Crafting playlists based on emoji “vibe” prompts using a generative AI Engine.
- Music API Integration: Resolve AI-suggested track names into playable links or embeds using a Music API (e.g., Spotify).
- Smart Lighting API: Translate vibe into light colors, effects, and patterns using a Smart Lighting API (e.g., Philips Hue / LIFX).
- Reactive Programming: Clients subscribe to vote data; the UI updates automatically when new votes arrive using Publish/Subscribe (Pub/Sub). Continuous streams of audio-level data determine vote cool-downs, while vote streams animate the emoji wall.
- Serverless Orchestration: Cloud Functions designed around database writes, scheduled jobs, and HTTP endpoints.
- Generative-AI Prompt Engineering: Crafting prompts that list the top emojis in descending order of votes and Instructing the AI to return exactly five tracks that fit a “party vibe” matching those emojis.
- UX-Centric Design: Every vote instantly changes the on-screen visualization, reinforcing engagement. Anonymous entry with random fun names avoids manual sign-up. Canvas or WebGL animations make the emoji wall feel alive and social. Guests vs. host have tailored interfaces—one to vote and enjoy, one to manage and tweak.
- Security & Access Control: Firestore security rules ensure that Guests can only write their own votes and read session data, and Only the host can reset votes, end sessions, or generate playlists/recaps.
- Anonymous Auth: Auto-generates unique user IDs with Anonymous Auth; no passwords, no barriers to entry.
- Firestore Database: Stores sessions, votes, playlists, and recap metadata and serves as the real-time pub/sub bus using Firestore Database.
- Cloud Functions: Hosts business logic: Aggregating votes & scheduling AI calls, Controlling smart lights, and Generating shareable recap graphics using Cloud Functions.
- Cloud Scheduler: Triggers playlist- and lighting-update functions on a fixed cadence (e.g., every 3 minutes) with Cloud Scheduler.
- Generative AI API: Transforms top-emoji data into a themed playlist—encapsulating the “vibe” into five track titles using Generative AI API.
- Music Service API: Looks up AI-suggested track names and returns URIs or embed snippets for playback using Music Service API.
- Lighting Control API: Sends HTTP commands to smart bulbs, mapping emoji themes to colors and effects using Lighting Control API.
- Web Audio API: Samples ambient noise levels to enforce vote cool-down rules naturally based on crowd volume using Web Audio API.
- Canvas/Animation: Renders an interactive emoji wall that pulses, grows, or shimmers in response to live vote data using Canvas/Animation.
- Hosting & Storage: Firebase Hosting serves the front-end SPA, and Firebase Storage holds final recap images for sharing using Hosting & Storage.

## Style Guidelines:

- Map emoji themes to light colors and effects.