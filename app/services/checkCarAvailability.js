import Rental from "@/models/Rental";

async function checkCarAvailability(carId, startDate, endDate) {
  try {
    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Find any existing rentals that overlap with the selected dates
    const rentals = await Rental.find({
      car_id: carId,
      $or: [
        {
          // The new rental starts before an existing rental ends and ends after it starts
          start_date_time: { $lt: end },
          end_date_time: { $gt: start },
        },
      ],
    });

    if (rentals.length > 0) {
      return false;
    }

    return true; // If no overlapping rentals, the car is available
  } catch (error) {
    console.log("Error checking car availability:", error);
    return false; // In case of error, consider the car unavailable
  }
}

export default checkCarAvailability;
