export default function replaceSignsInDate(date) {
  if (date.length < 7) {
    return undefined;
  }

  let year = "";
  let month = "";
  let day = "";

  const splittedDate = date.split("/");

  let answer = "";

  if (splittedDate.length === 1) {
    year = date.slice(0, 4);
    month = date.slice(4, 6);
    day = date.slice(6, 8);

    answer = year + "-" + month + "-" + day;
  } else {
    year = splittedDate[0];
    month = splittedDate[1];
    day = splittedDate[2];
    answer = splittedDate.join("-");
  }

  if (+month < 1 || +month > 12) {
    return undefined;
  }

  if (+day < 1 || +day > 31) {
    return undefined;
  }

  if (+year < 1800) {
    return undefined;
  }

  return answer;
}
