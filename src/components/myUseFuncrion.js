export const getBusinessDatesCount = (startDate, endDate) => {
  var count = 0;
  var curDate = startDate;
  while (curDate <= endDate) {
    var dayOfWeek = curDate.getDay();
    if (!(dayOfWeek == 6 || dayOfWeek == 0)) count++;
    curDate.setDate(curDate.getDate() + 1);
  }
  return count;
};

export const percentage = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
};

export const precisionRound = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};

export const numberWithSep = (x) => {
  x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return x.replace(".", ",");
};
