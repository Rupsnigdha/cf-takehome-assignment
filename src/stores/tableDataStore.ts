import { create } from "zustand";
import { ExecutionRecord } from "@/components/dashboard-table/columns";

interface TableDataState {
  data: ExecutionRecord[];
  toggleMarkForReview: (execId: string) => void;
}

// Initial data
const initialData: ExecutionRecord[] = [
  {
    execId: "exec-001",
    execUser: "alice",
    status: "SUCCESS",
    latency: 120,
    input: JSON.stringify({ action: "calculate", operands: [5, 7] }),
    output: JSON.stringify({ result: 12 }),
    markForReview: true,
  },
  {
    execId: "exec-002",
    execUser: "bob",
    status: "FAILURE",
    latency: 200,
    input: JSON.stringify({ action: "fetchUser", userId: 123 }),
    output: JSON.stringify({
      error: "User not found",
      details:
        "The requested user ID does not exist in the database. Please check the user ID and try again.",
      timestamp: "2025-03-08T14:25:00Z",
      suggestions: [
        "Verify that the user ID is correct.",
        "Ensure that the database connection is stable.",
        "Contact support if the issue persists.",
      ],
      debugInfo: {
        requestId: "req-xyz-123",
        databaseQuery: "SELECT * FROM users WHERE id = 123",
        server: "auth-service-01",
        latencyMs: 200,
      },
    }),
    markForReview: true,
  },
  {
    execId: "exec-003",
    execUser: "charlie",
    status: "SUCCESS",
    latency: 95,
    input: JSON.stringify({
      action: "translate",
      text: "Hello",
      language: "Spanish",
    }),
    output: JSON.stringify({ translation: "Hola" }),
    markForReview: false,
  },
  {
    execId: "exec-004",
    execUser: "dave",
    status: "SUCCESS",
    latency: 300,
    input: JSON.stringify({ action: "generatePassword", length: 8 }),
    output: JSON.stringify({ password: "Xk8$Pz7q" }),
    markForReview: false,
  },
  {
    execId: "exec-005",
    execUser: "eve",
    status: "FAILURE",
    latency: 180,
    input: JSON.stringify({ action: "connectToDatabase" }),
    output: JSON.stringify({
      error: "Connection timed out",
      retryAfterSeconds: 30,
      possibleCauses: [
        "Network congestion or instability.",
        "Database server is under maintenance.",
        "Firewall rules blocking the connection.",
      ],
      attemptedEndpoints: [
        "db-primary.company.com:5432",
        "db-backup.company.com:5432",
      ],
      debugInfo: {
        requestId: "req-abc-789",
        server: "db-connector-02",
        retries: 3,
        lastAttempt: "2025-03-08T14:30:00Z",
      },
    }),
    markForReview: true,
  },
  {
    execId: "exec-006",
    execUser: "frank",
    status: "SUCCESS",
    latency: 250,
    input: JSON.stringify({
      action: "analyzeSentiment",
      text: "I love programming!",
    }),
    output: JSON.stringify({ sentiment: "Positive" }),
    markForReview: false,
  },
  {
    execId: "exec-007",
    execUser: "grace",
    status: "FAILURE",
    latency: 400,
    input: JSON.stringify({ action: "fetchWeather" }),
    output: JSON.stringify({
      error: "API rate limit exceeded",
      limit: 1000,
      used: 1000,
      resetTime: "2025-03-08T15:00:00Z",
      alternativeDataSources: ["weather-backup.com/api", "openweatherdata.net"],
      debugInfo: {
        requestId: "req-lmn-456",
        endpoint: "/weather/latest",
        server: "api-gateway-03",
        apiKey: "************",
      },
    }),
    markForReview: true,
  },
  {
    execId: "exec-008",
    execUser: "heidi",
    status: "SUCCESS",
    latency: 150,
    input: JSON.stringify({ action: "computeFactorial", number: 6 }),
    output: JSON.stringify({ result: 720 }),
    markForReview: false,
  },
];

export const useTableDataStore = create<TableDataState>((set) => ({
  data: initialData,
  toggleMarkForReview: (execId: string) =>
    set((state) => ({
      data: state.data.map((record) =>
        record.execId === execId
          ? { ...record, markForReview: !record.markForReview }
          : record
      ),
    })),
}));
