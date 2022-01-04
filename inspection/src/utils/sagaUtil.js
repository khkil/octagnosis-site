import { DELVELOP_ENV } from "../constants"

export const DELAY_TIME = process.env.NODE_ENV === DELVELOP_ENV ? 1000 : 0;

