import { useReducer } from "react";
import {
  config,
  settingConext,
  dispatchSettingContext,
} from "./settingContext";

export function SettingProvider({ children }) {
  const [setting, dispatch] = useReducer(settingReducer, config);
  return (
    <settingConext.Provider value={setting}>
      <dispatchSettingContext.Provider value={dispatch}>
        {children}
      </dispatchSettingContext.Provider>
    </settingConext.Provider>
  );
}

function settingReducer(set, action) {
  switch (action.type) {
    case "moveUp":
      return { ...set, year: action.year, month: action.month };
    case "moveBack":
      return { ...set, year: action.year, month: action.month };
    case "moveYearUp":
      return { ...set, year: action.year };
    case "moveYearBack":
      return { ...set, year: action.year };
    case "markDate":
      return { ...set, onDate: action.onDate };
    case "changed":
      return { ...set, theme: action.theme };
    case "updated":
      return { ...set, dataList: action.dataList };
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
