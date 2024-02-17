import { createContext, useContext } from "react";
import { getTimeStr } from "../utils/basic";
import { store } from "../utils/localStore";
//simple || nude
const initDate = `${getTimeStr("date")}`;
export let config = {
  theme: store.hasTheme(),
  year: getTimeStr("year"),
  month: getTimeStr("month"),
  onDate: initDate,
  dataList: store.initData,
};

export const settingConext = createContext(config);
export const dispatchSettingContext = createContext(null);

export function useSetting() {
  return useContext(settingConext);
}
export function useSettingDispatch() {
  return useContext(dispatchSettingContext);
}
