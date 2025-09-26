# IndiYield: Technical Architecture

This document provides a detailed breakdown of the technical components and data flow for the IndiYield prototype.

### Core Technology Stack

| Layer | Technology / Library | Purpose |
|---|---|---|
| **Frontend Framework** | **Next.js 14+ (App Router)** | Provides the foundation for the application, enabling server-side rendering (SSR), React Server Components, and a robust routing system. The App Router is used for all page navigation. |
| **UI Library** | **React 18** | The core library for building the user interface with a component-based architecture. |
| **UI Components** | **ShadCN UI** | A collection of accessible and composable "un-styled" components that form the building blocks of the UI (e.g., Cards, Buttons, Forms). |
| **Styling** | **Tailwind CSS** | A utility-first CSS framework used for all styling. The theme and colors are configured in `src/app/globals.css` and `tailwind.config.ts`. |
| **Animations** | **Framer Motion** | Used for adding polished, declarative animations to UI elements, such as the fade-in effects on the dashboard, to improve the user experience. |
| **Charts & Graphs** | **Recharts** | Used to render the historical yield bar chart (`CropStatistics`), providing a simple and effective way to visualize data. |
| **AI Framework** | **Genkit (Google)** | The orchestration layer for all AI functionality. It defines the structure of AI "flows," manages prompts, and handles communication with the underlying language model. All AI logic is organized within `src/ai/`. |
| **AI Model** | **Gemini 2.5 Flash** | The specific Large Language Model (LLM) from Google used for all reasoning tasks. It generates crop suggestions, yield predictions, actionable recommendations, and market analysis based on prompts prepared by Genkit. |
| **Client-Server Comms** | **Next.js Server Actions** | Used as the RPC (Remote Procedure Call) mechanism for the frontend to securely communicate with the backend AI logic. All communication is handled via functions in `src/app/actions.ts`. |
| **Deployment** | **Firebase App Hosting** | The target deployment platform. It provides a managed, serverless environment optimized for Next.js applications, offering scalability and security out-of-the-box. Configuration is managed in `apphosting.yaml`. |

### Data Flow Diagram (Current Prototype)

This diagram illustrates how data moves through the system from user interaction to AI-generated results.

```mermaid
graph TD
    subgraph Browser (Client)
        A[1. User interacts with Prediction Form in Next.js/React UI] --> B(2. Form data is sent via Next.js Server Action);
    end

    subgraph Server (Firebase App Hosting)
        B --> C{3. `actions.ts`: `getIndiYieldPrediction`};
        C --> D(4. Parallel AI Calls);
        D --> E{Genkit Flow: `predictCropYields`};
        D --> F{Genkit Flow: `provideActionableRecommendations`};
        E --> G[5a. Prompt sent to Gemini 2.5 Flash];
        F --> H[5b. Prompt sent to Gemini 2.5 Flash];
        G --> I[6a. Yield Number (e.g., 3.5)];
        H --> J[6b. Detailed Recommendations];
        I --> K{7. Results are combined};
        J --> K;
    end

    subgraph Browser (Client)
        K --> L[8. Results returned to UI];
        L --> M[9. Results are displayed to User];
    end

    style G fill:#d2e3fc,stroke:#4285f4,stroke-width:2px
    style H fill:#d2e3fc,stroke:#4285f4,stroke-width:2px
```

### Architectural Approach: Hybrid AI Model

The current prototype uses a **hybrid model**:

1.  **Real AI Logic:** All core reasoning, analysis, and generation tasks are performed in real-time by the **Gemini 2.5 Flash** model. The predictions and recommendations are unique for every request and are not hardcoded.
2.  **Simulated Supplementary Data:** To create a self-contained prototype that does not require external API keys, some of the data provided to the AI is simulated. Specifically, the `getLongRangeWeatherForecast` tool in `src/ai/tools/` and the historical/soil data strings in `src/app/actions.ts` generate realistic but mock data.

This approach delivers the best of both worlds for a prototype: it demonstrates the power of a real generative AI model while ensuring the application is easy to run and present.

### Future Production-Ready Architecture

The current architecture is designed to be easily upgraded for production by swapping out the simulated data sources with real-world APIs and a database.

1.  **Data Integration:**
    *   **Weather:** Integrate with a real-time weather API (e.g., OpenWeatherMap, IMD).
    *   **Soil & Land Data:** Connect to government soil health card databases and satellite imagery APIs (Google Earth Engine, ISRO).
    *   **Market Prices:** Integrate with government market data APIs (`data.gov.in`).
2.  **Farmer Database:**
    *   Use **Firebase Firestore** (a NoSQL database) to store user profiles, farm details, and past predictions. This creates a feedback loop where actual yields can be recorded to fine-tune the AI model over time.
