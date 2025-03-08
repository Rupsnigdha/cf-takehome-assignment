import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { create } from "zustand";
import { useExecutionStore } from "@/stores/executionStore";

type DeploymentStore = {
  deploymentName: string;
  setDeploymentName: (name: string) => void;
};

const useDeploymentStore = create<DeploymentStore>((set) => ({
  deploymentName: "v1",
  setDeploymentName: (name) => set({ deploymentName: name }),
}));

// Define log item type
type LogItem = {
  name: string;
  status: "pending" | "loading" | "completed" | "failed";
  startTime: number | null;
  endTime: number | null;
  duration: number | null;
};

// Define log store
type LogsStore = {
  logs: LogItem[];
  isExecuting: boolean;
  requestPayload: string;
  outputResult: string | null;
  setRequestPayload: (payload: string) => void;
  setAllLogsToLoading: () => void;
  updateLogStatus: (index: number, updates: Partial<LogItem>) => void;
  setOutputResult: (result: string) => void;
  resetLogs: () => void;
};

// Define log items
const LOG_ITEMS = [
  "Cloud Storage",
  "Guidelines",
  "Guardrails Manager",
  "Input Preprocessor",
  "Document Understanding Engine",
  "Document Parser",
  "LLM Preprocessor",
  "JSON Formatter",
  "Report Generator",
];

// Create logs store
const useLogsStore = create<LogsStore>((set, get) => ({
  logs: LOG_ITEMS.map((name) => ({
    name,
    status: "pending",
    startTime: null,
    endTime: null,
    duration: null,
  })),
  isExecuting: false,
  requestPayload: "{}",
  outputResult: null,
  setRequestPayload: (payload) => set({ requestPayload: payload }),
  setAllLogsToLoading: () => {
    const now = Date.now();
    set({
      isExecuting: true,
      outputResult: null,
      logs: get().logs.map((log) => ({
        ...log,
        status: "loading",
        startTime: now,
        endTime: null,
        duration: null,
      })),
    });
  },
  updateLogStatus: (index, updates) => {
    const newLogs = [...get().logs];
    newLogs[index] = { ...newLogs[index], ...updates };
    set({ logs: newLogs });
  },
  setOutputResult: (result) => set({ outputResult: result }),
  resetLogs: () =>
    set({
      logs: LOG_ITEMS.map((name) => ({
        name,
        status: "pending",
        startTime: null,
        endTime: null,
        duration: null,
      })),
      isExecuting: false,
      outputResult: null,
    }),
}));

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDownIcon, X } from "lucide-react";
import { useState } from "react";

export default function ExecutionScreen() {
  const [executingFlow, setExecutingFlow] = useState(false);
  const deploymentName = useDeploymentStore((state) => state.deploymentName);
  const setDeploymentName = useDeploymentStore(
    (state) => state.setDeploymentName
  );

  const { isDialogOpen, closeDialog } = useExecutionStore();
  const {
    logs,
    isExecuting,
    requestPayload,
    outputResult,
    setRequestPayload,
    updateLogStatus,
    setOutputResult,
    resetLogs,
  } = useLogsStore();

  const formatTime = (timestamp: number | null) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };
  const formatDuration = (ms: number | null) => {
    if (!ms) return "";
    return `${Math.floor(ms / 1000)}s`;
  };
  const generateRandomResult = () => {
    const randomData = {
      success: Math.random() > 0.2,
      deploymentName,
      timestamp: new Date().toISOString(),
      processingTime: Math.floor(Math.random() * 1000),
      status: "completed",
    };

    return randomData;
  };

  const executeFlow = async () => {
    setExecutingFlow(true);
    const executionStartTime = Date.now();

    useLogsStore.setState({ isExecuting: true });

    // Initialize all logs to pending state except the first one
    resetLogs(); // Reset all logs to pending state

    // Check if we should simulate a failure
    const shouldSimulateFailure = requestPayload.includes("{data: fail}");

    // If simulating failure, determine a random step to fail at
    const failureIndex = shouldSimulateFailure
      ? Math.floor(Math.random() * logs.length)
      : -1;

    // Process functions sequentially, one at a time
    for (let i = 0; i < logs.length; i++) {
      // Set current log to loading
      updateLogStatus(i, {
        status: "loading",
        startTime: Date.now(),
      });

      // Wait for random time between 2-4 seconds
      const delay = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Check if this is the step that should fail
      if (shouldSimulateFailure && i === failureIndex) {
        // Set error state for this log
        updateLogStatus(i, {
          status: "failed", // We'll still mark it completed but will show error in result
        });

        // Set error output
        setOutputResult(
          JSON.stringify(
            {
              error: `Process failed at step: ${logs[i].name}`,
              status: "failed",
              failedAt: logs[i].name,
              timestamp: new Date().toISOString(),
            },
            null,
            2
          )
        );

        // Set execution to false and exit function
        useLogsStore.setState({ isExecuting: false });
        return;
      }

      // Mark as completed with timing information
      const endTime = Date.now();
      const duration = endTime - (logs[i].startTime || executionStartTime);

      updateLogStatus(i, {
        status: "completed",
        endTime,
        duration,
      });
    }

    // Generate and set random result when all processes are complete
    const result = generateRandomResult();
    setOutputResult(JSON.stringify(result, null, 2));

    // Reset executing state when all done
    useLogsStore.setState({ isExecuting: false });
    setExecutingFlow(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) closeDialog();
      }}
    >
      <DialogContent className="lg:max-w-screen-lg max-h-screen">
        <DialogHeader>
          <DialogTitle>Execute Flow</DialogTitle>
          <DialogDescription className="text-sm">
            Enter the Deployment Name and Request Payload to execute the flow.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex justify-between items-center cursor-pointer"
                >
                  <div>Deployment Name</div>
                  <div className="flex items-center gap-2 overflow-hidden flex-1 justify-end">
                    <div className="text-muted-foreground font-normal truncate">
                      {deploymentName}
                    </div>
                    <ChevronDownIcon className="w-4 h-4 flex-shrink-0" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-primary-foreground flex justify-between items-center"
                  onClick={() => setDeploymentName("v1")}
                >
                  {deploymentName === "v1" ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                  <div>v1</div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-primary-foreground flex justify-between items-center"
                  onClick={() => setDeploymentName("v2")}
                >
                  {deploymentName === "v2" ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                  <div>v2</div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-primary-foreground flex justify-between items-center"
                  onClick={() => setDeploymentName("v3")}
                >
                  {deploymentName === "v3" ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                  <div>v3</div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-primary-foreground flex justify-between items-center"
                  onClick={() => setDeploymentName("v4")}
                >
                  {deploymentName === "v4" ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                  <div>v4</div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Textarea
              placeholder="Request Payload"
              value={requestPayload}
              onChange={(e) => setRequestPayload(e.target.value)}
              className="font-mono"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xs font-bold uppercase">LOGS</div>
            <div className="flex flex-col text-sm">
              {logs.map((log, index) => {
                // Find the index of the first log item with status "loading"
                const firstLoadingIndex = logs.findIndex(
                  (l) => l.status === "loading"
                );
                const isNextToBeResolved = index === firstLoadingIndex;

                return (
                  <div key={index} className="flex items-center py-1 gap-2">
                    {/* Left section - loader, hourglass, timestamp, or failure time */}
                    <div className="min-w-20 text-xs text-gray-500">
                      {log.status === "loading" && isNextToBeResolved && (
                        <div className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin"></div>
                      )}
                      {log.status === "loading" && !isNextToBeResolved && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      )}
                      {log.status === "pending" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                      )}
                      {(log.status === "completed" ||
                        log.status === "failed") &&
                        formatTime(log.endTime)}
                    </div>

                    {/* Center section - log name */}
                    <div
                      className={`flex-1 min-w-32 ${
                        log.status === "failed" ? "text-red-500" : ""
                      }`}
                    >
                      {log.name}
                    </div>

                    {/* Right section - processing, time taken, or failure cross */}
                    <div className="text-xs min-w-20 text-right">
                      {log.status === "loading" && isNextToBeResolved && (
                        <span className="text-gray-500">Processing...</span>
                      )}
                      {log.status === "loading" && !isNextToBeResolved && (
                        <span className="text-gray-500">Queued...</span>
                      )}
                      {log.status === "completed" && (
                        <span className="text-gray-500">
                          {formatDuration(log.duration)}
                        </span>
                      )}
                      {log.status === "failed" && (
                        <span className="text-red-500 flex justify-end items-center gap-1">
                          {formatDuration(log.duration)}
                          <X className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="text-xs font-bold uppercase">OUTPUT</div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (outputResult) {
                      navigator.clipboard.writeText(
                        JSON.stringify(outputResult, null, 2)
                      );
                    }
                  }}
                  disabled={!outputResult}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (outputResult) {
                      const blob = new Blob(
                        [JSON.stringify(outputResult, null, 2)],
                        {
                          type: "application/json",
                        }
                      );
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "output.json";
                      a.click();
                      URL.revokeObjectURL(url);
                    }
                  }}
                  disabled={!outputResult}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </Button>
              </div>
            </div>
            <pre className="bg-gray-100 p-2 rounded-md text-xs overflow-auto h-60 max-h-60">
              {executingFlow
                ? "Processing..."
                : outputResult
                ? outputResult
                : "No output yet. Click 'Execute' to run the flow."}
            </pre>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={resetLogs} disabled={isExecuting}>
            Reset
          </Button>
          <Button onClick={executeFlow} disabled={executingFlow}>
            {executingFlow ? "Executing..." : "Execute"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
