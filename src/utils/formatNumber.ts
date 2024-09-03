export default function formatNumber(number: number):number {
  const formatedString = (Math.round(number * 100) / 100).toFixed(2);
  return !!Number(formatedString.split('.')[1]) ? Number(formatedString) : Number(formatedString.split('.')[0])
}
// if fomated num is "130.00" it removes last two 2 and returns 130 if it is 130.01 it returns 130.01 