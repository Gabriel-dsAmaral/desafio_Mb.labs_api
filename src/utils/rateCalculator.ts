interface Irate {
  id?: string;
  userId: string;
  eventId: string;
  rate: number;
}

export const rateCalculator = (array: Irate[]) => {
  let calculatedRate: number = 0;
  array.forEach((rate) => (calculatedRate = rate.rate + calculatedRate));
  return Math.round(calculatedRate / array.length);
};
