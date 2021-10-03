import * as moment from "moment";

export const DATETIME_FORMAT = "DD/MM/YYYY HH:mm"

export const newSchedule = () => {
  return moment().minute(0).second(0);
};
