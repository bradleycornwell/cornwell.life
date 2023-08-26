export function howLongAgo(date: Date): string {
  const minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    month = day * 30;

  var delta = Math.round((+new Date() - date.getTime()) / 1000);

  if (delta > month) {
    return Math.floor(delta / month) + " months ago";
  } else if (delta > week) {
    return Math.floor(delta / week) + " weeks ago";
  } else if (delta > day) {
    return Math.floor(delta / day) + " days ago";
  } else if (delta > hour) {
    return Math.floor(delta / day) + " hours ago";
  } else {
    return date.toDateString();
  }
}
