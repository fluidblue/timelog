import { TimelogAPI } from "./api";

declare global {
    interface Window {
        timelogAPI: TimelogAPI
    }
}
