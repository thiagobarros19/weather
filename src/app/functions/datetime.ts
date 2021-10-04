import * as moment from 'moment';

export function timestampToDatetime(timestamp: number, format: string) {
  if (format) {
    return moment(timestamp * 1000).format(format);
  }

  return moment(timestamp * 1000);
}

export function stringToDatetime(date: string, format: string) {
  if (format) {
    return moment(date).format(format);
  }

  return moment(date);
}
