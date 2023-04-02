import React, { useState, createContext, useEffect } from "react";
import { Alert } from "react-native";

const ProgressContext = createContext<{
  inProgress: boolean;
  spinner: {
    start: (setTimeOut?: boolean, timeOut?: number) => void;
    stop: () => void;
  };
}>({
  inProgress: false,
  spinner: {
    start: () => {},
    stop: () => {},
  },
});

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [inProgress, setInProgress] = useState(false);
  var timer: NodeJS.Timeout;
  const spinner = {
    start: (setTimeOut = true, timeOut = 10) => {
      if (setTimeOut !== false) {
        const t = setTimeout(() => {
          Alert.alert("Request timeout");
          setInProgress(false);
        }, timeOut * 1000);
        timer = t;
      }
      setInProgress(true);
    },
    stop: () => {
      if (timer) {
        clearTimeout(timer);
      }
      setInProgress(false);
    },
  };
  const value = { inProgress, spinner };
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export { ProgressContext, ProgressProvider };
