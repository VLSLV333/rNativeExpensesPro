export default function formatDate(date) {
  let dateString = "";

  const year = new Date(date).getFullYear();
  let month = new Date(date).getMonth();
  const day = new Date(date).getDate();

  if (year) {
    if (String(month).length === 1) {
      month = "0" + String(month);
    }
    dateString = "" + year + month + day;
  }
//   console.log(dateString);


  return dateString;
}
