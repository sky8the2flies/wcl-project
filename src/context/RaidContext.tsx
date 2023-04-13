import { Raid } from "@/types/raid";
import * as React from "react";

type Action = { type: "set"; payload: Raid[] };
type Dispatch = (action: Action) => void;
type State = { raids: Raid[] };
type RaidsProviderProps = { children: React.ReactNode };

const RaidsStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function raidsReducer(state: State, action: Action) {
  switch (action.type) {
    case "set": {
      return { raids: action.payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function RaidsProvider({ children }: RaidsProviderProps) {
  const [state, dispatch] = React.useReducer(raidsReducer, { raids: [] });
  const value = { state, dispatch };
  return (
    <RaidsStateContext.Provider value={value}>
      {children}
    </RaidsStateContext.Provider>
  );
}

function useRaids() {
  const context = React.useContext(RaidsStateContext);
  if (context === undefined) {
    throw new Error("useRaids must be used within a RaidsProvider");
  }
  return context;
}

export { RaidsProvider, useRaids };
