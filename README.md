
# EmojiBeat Wall 🎶💡🥳

**EmojiBeat Wall** is an interactive web application designed to bring your parties to life! Guests can join a party session and vote for emojis that represent the current vibe. The host can then use these emoji trends to generate AI-powered music playlists and control smart lighting, creating a dynamic and engaging atmosphere.

## ✨ Core Features

*   **Real-time Emoji Voting:** Guests can instantly cast votes for their favorite emojis, influencing the party's mood.
*   **Live Emoji Wall:** A dynamic visual display of the top-voted emojis, reacting in real-time to guest input.
*   **AI-Powered Playlist Generation:** Hosts can generate themed 5-track playlists using Genkit based on the most popular emojis.
*   **Smart Lighting Control:** (Conceptual) Interface to control smart lighting colors and effects based on the party vibe.
*   **Emoji Trend Analysis:** Hosts can analyze emoji trends over different time periods to understand guest preferences.
*   **AI Theme Suggestion:** Hosts can get AI-generated party theme names based on a descriptive prompt.
*   **Host Dashboard:** Centralized place for hosts to create new parties, manage existing ones, and access party controls.
*   **Party Management:** Specific controls for an active party, including starting/ending sessions, resetting votes, and accessing analytics.
*   **Guest & Host Views:** Separate, tailored interfaces for guests (voting, viewing emoji wall) and hosts (management, controls).
*   **Anonymous Guest Access:** Easy entry for guests using a party code and a fun, randomly generated username.
*   **Ambient Noise Cooldown:** (Conceptual) A system that can adjust vote cooldowns based on ambient noise levels.

## 🚀 Tech Stack

*   **Frontend:**
    *   [Next.js](https://nextjs.org/) (App Router)
    *   [React](https://reactjs.org/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [ShadCN UI](https://ui.shadcn.com/) (Component Library)
    *   [Tailwind CSS](https://tailwindcss.com/) (Styling)
    *   [Lucide React](https://lucide.dev/) (Icons)
    *   [Recharts](https://recharts.org/) (Charts for vote summary)
    *   [Framer Motion](https://www.framer.com/motion/) (Animations for Emoji Wall)
*   **Backend & AI:**
    *   [Firebase](https://firebase.google.com/):
        *   Firebase Hosting (Frontend Deployment)
        *   Firestore (Real-time Database for sessions, votes, etc.)
        *   Cloud Functions (Serverless backend logic - planned)
        *   Cloud Scheduler (Scheduled tasks - planned)
        *   Firebase Authentication (Anonymous Auth - planned)
    *   [Genkit (by Google)](https://firebase.google.com/docs/genkit):
        *   Flows for AI-driven features (playlist generation, theme suggestion, trend analysis).
        *   Integrates with Google AI models (e.g., Gemini).
*   **APIs (Conceptual):**
    *   Music Service API (e.g., Spotify - for resolving tracks, planned)
    *   Smart Lighting API (e.g., Philips Hue, LIFX - for light control, planned)
    *   Web Audio API (For ambient noise detection, planned)

## 📁 Project Structure

A brief overview of important directories:

```
.
├── src/
│   ├── ai/                     # Genkit AI flows and configuration
│   │   ├── flows/              # Specific AI flow implementations
│   │   ├── dev.ts              # Genkit development server entry
│   │   └── genkit.ts           # Genkit global configuration
│   ├── app/                    # Next.js App Router (pages and layouts)
│   │   ├── (guest)/            # Guest-facing routes
│   │   ├── host/               # Host-facing routes
│   │   ├── globals.css         # Global styles and ShadCN theme
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Guest landing page
│   ├── components/             # Reusable React components
│   │   ├── guest/              # Components specific to guest view
│   │   ├── host/               # Components specific to host view
│   │   ├── layout/             # Layout components (header, footer, logo)
│   │   ├── shared/             # Components used by both guest and host
│   │   └── ui/                 # ShadCN UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── .env                        # Environment variables (Firebase config, API keys) - GITIGNORED
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── components.json             # ShadCN UI configuration
└── package.json                # Project dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or newer recommended)
*   [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
*   [Firebase CLI](https://firebase.google.com/docs/cli) (for Firebase deployment and local emulation)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/emojibeat-wall.git
    cd emojibeat-wall
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Firebase:**
    *   Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    *   Add a Web app to your Firebase project to get your Firebase configuration object.
    *   Create a `.env` file in the root of your project by copying `.env.example` (if one exists, otherwise create it from scratch).
    *   Add your Firebase configuration to `.env`:
        ```env
        NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
        NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
        NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
        # Add any other necessary API keys here (e.g., for Google AI Studio / Vertex AI)
        GOOGLE_API_KEY="your-google-ai-api-key"
        ```
    *   **Enable Firestore:** Go to the Firestore Database section in your Firebase project and create a database. Start in **test mode** for initial development (but remember to set up [security rules](https://firebase.google.com/docs/firestore/security/get-started) before production).
    *   **(Planned)** Set up Firebase Authentication (enable Anonymous sign-in).
    *   **(Planned)** Configure Cloud Functions and Cloud Scheduler as needed.

4.  **Configure Genkit:**
    *   Ensure your `GOOGLE_API_KEY` in `.env` is set up for the AI models (e.g., Gemini via Google AI Studio or Vertex AI).
    *   The Genkit configuration is in `src/ai/genkit.ts`.

### Running the Development Servers

You'll typically need two terminals: one for the Next.js frontend and one for the Genkit AI flows.

1.  **Run the Next.js development server:**
    ```bash
    npm run dev
    ```
    This will usually start the app on `http://localhost:9002`.

2.  **Run the Genkit development server (for AI flows):**
    ```bash
    npm run genkit:dev
    # or for auto-reloading on changes:
    npm run genkit:watch
    ```
    This will start the Genkit development UI, typically on `http://localhost:4000`, where you can inspect and test your AI flows.

## ✨ Key Functionality Highlights

*   **Guest Experience:**
    *   **Join Party:** Guests enter a 6-character party code on the landing page (`/`).
    *   **Emoji Voting:** On the party page (`/party/[partyId]`), guests can select from available emojis and submit their vote.
    *   **Emoji Wall:** A live, animated display of current emoji votes, showing the most popular ones.
    *   **Ambient Noise Indicator:** (Conceptual) Shows a mock ambient noise level and potential vote cooldown status.
*   **Host Experience:**
    *   **Host Dashboard (`/host`):**
        *   Create new parties with an optional AI-suggested theme name.
        *   View and manage a list of existing (mock) parties.
    *   **Party Management Page (`/host/party/[partyId]`):**
        *   **Party Code Display:** Easily copy and share the party code.
        *   **Session Controls:** Start/end sessions, reset votes.
        *   **Vote Summary:** Real-time bar chart of top emoji votes.
        *   **Playlist Generator:** Generate a 5-track playlist with AI based on top emojis.
        *   **Smart Lighting Controller:** (Mock UI) Adjust brightness and select color themes.
        *   **Trend Analyzer:** Analyze emoji trends with AI over selected time periods.

## 🔥 Firebase & Genkit Integration

*   **Firestore:** Intended as the primary real-time database for storing party session data, guest votes, generated playlists, and user information. It will act as the pub/sub mechanism for real-time updates.
*   **Firebase Hosting:** Serves the Next.js frontend.
*   **Genkit:**
    *   `src/ai/flows/generate-playlist.ts`: Takes top emojis and returns a list of 5 song titles.
    *   `src/ai/flows/suggest-initial-theme.ts`: Takes a text prompt and suggests a party theme name.
    *   `src/ai/flows/analyze-emoji-trend.ts`: Analyzes emoji vote data and suggests themes, music genres, and lighting colors.
*   **(Planned)** **Cloud Functions:** To host backend logic like vote aggregation, triggering AI calls, controlling smart lights, and generating recap graphics.
*   **(Planned)** **Cloud Scheduler:** To trigger periodic functions (e.g., playlist/lighting updates).
*   **(Planned)** **Firebase Authentication:** For anonymous user IDs for guests and potentially host authentication.

## 💡 Future Enhancements

*   Full implementation of Firebase backend (Cloud Functions, real Firestore data persistence).
*   Integration with actual Music Service APIs (e.g., Spotify) to make playlists playable.
*   Integration with Smart Lighting APIs (e.g., Philips Hue, LIFX).
*   Web Audio API implementation for real ambient noise detection.
*   Host authentication and secure party management.
*   Sharable party recap graphics.
*   More sophisticated emoji wall animations (WebGL).

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code follows the existing style and an Eslint/Prettier setup is respected if added.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE.md) (You would need to add a LICENSE.md file with the MIT license text if you choose this).
Feel free to replace `your-username` with your actual GitHub username.
