export const formattingTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  // calculate the difference in milliseconds between the two dates
  const diff = now.getTime() - date.getTime();

  // convert the difference to seconds
  const diffSeconds = Math.floor(diff / 1000);

  // define the time intervals in seconds
  const intervals = [
    { label: '年', seconds: 31536000 },
    { label: '月', seconds: 2592000 },
    { label: '天', seconds: 86400 },
    { label: '小時', seconds: 3600 },
  ];

  let result = '';

  // iterate over the time intervals and find the largest one that fits the difference
  intervals.forEach((interval) => {
    const intervalDiff = Math.floor(diffSeconds / interval.seconds);
    if (intervalDiff >= 1) {
      // convert to years if the interval is days and the difference is greater than or equal to 365 days
      if (interval.label === '月' && intervalDiff >= 12) {
        result = `${Math.floor(intervalDiff / 12)} 年前`;
        return false;
      }
      if (interval.label === '天' && intervalDiff >= 30) {
        result = `${Math.floor(intervalDiff / 30)} 月前`;
        return false;
      }
      // convert to days if the interval is hours and the difference is greater than or equal to 24 hours
      if (interval.label === '小時' && intervalDiff >= 24) {
        result = `${Math.floor(intervalDiff / 24)} 天前`;
        return false;
      }
      result = `${intervalDiff} ${interval.label}前`;
      return false;
    }
    return true;
  });

  // if the difference is less than a second, set result to "just now"
  if (!result) {
    result = '剛剛';
  }

  return result;
};

export const formatTimestamp = (timestamp, format) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let timeRange;
  if (hours >= 0 && hours < 6) {
    timeRange = '凌晨';
  } else if (hours >= 6 && hours < 9) {
    timeRange = '早上';
  } else if (hours >= 9 && hours < 12) {
    timeRange = '上午';
  } else if (hours >= 12 && hours < 14) {
    timeRange = '中午';
  } else if (hours >= 14 && hours < 18) {
    timeRange = '下午';
  } else if (hours >= 18 && hours < 20) {
    timeRange = '傍晚';
  } else {
    timeRange = '晚上';
  }

  if (format === 'time') {
    return `${timeRange}${hours}:${minutes}`;
  }

  if (format === 'date') {
    return `${year}年${month}月${day}日`;
  }

  const dateString = `${timeRange}${hours}:${minutes} ${year}年${month}月${day}日`;

  return dateString;
};
