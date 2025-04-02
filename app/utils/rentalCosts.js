export const calculateRentalCost = (
  start_date_time,
  end_date_time,
  price_per_hour
) => {
  const startDate = new Date(start_date_time);
  const endDate = new Date(end_date_time);

  // Total rental hours
  const totalHours = (endDate - startDate) / (1000 * 60 * 60);

  // Cost for rentals of 24 hours, the maximum price is 8 * price per hour
  const fullDays = Math.floor(totalHours / 24);
  const fullDayPrice = fullDays * (8 * price_per_hour);

  // Cost for remaining rental hours (under 24)
  const remainingHours = totalHours % 24;
  const remainingPrice = remainingHours * price_per_hour;

  return fullDayPrice + remainingPrice;
};
