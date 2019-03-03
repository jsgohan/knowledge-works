const consoleLog = fn => Promise.resolve().then(() => fn()).then(console.log);
/**
 * dayOfYear: 获取指定时间在当年的第几天
 * @param date
 */
const dayOfYear = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

consoleLog(dayOfYear.bind(null, new Date())); // 33

/**
 * getDaysDiffBetweenDates: 返回两个不同日期相差的天数
 * @param dateIntial
 * @param dateFinal
 * @return number
 */
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);

consoleLog(getDaysDiffBetweenDates.bind(null, new Date('2018-01-01'), new Date('2018-02-02'))); // 32

/**
 * maxDate: 返回所给日期的最大时间
 * @param dates[]
 * @return 最大的日期
 */
const maxDate = (...dates) => new Date(Math.max.apply(null, ...dates));

const array = [
  new Date(2018, 4, 16),
  new Date(2019, 4, 16),
  new Date(2017, 4, 16),
  new Date(2019, 8, 15)
];
consoleLog(maxDate.bind(null, array)); // 2019-09-14T16:00:00.000Z

/**
 * minDate: 返回所给日期的最小时间
 * @param dates[]
 * @return 最小的日期
 */
const minDate = (...dates) => new Date(Math.min.apply(null, ...dates));

consoleLog(minDate.bind(null, array)); // 2017-05-15T16:00:00.000Z

/**
 * tomorrow: 返回明天日期
 */
const tomorrow = () => {
  let t = new Date();
  t.setDate(t.getDate() + 1);
  return t.toISOString().split('T')[0];
}

consoleLog(tomorrow.bind(null)); // 2019-02-03
