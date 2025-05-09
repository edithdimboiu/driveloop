export const categorizeAndSortRentals = rentals => {
  const now = Date.now();

  return rentals
    .map(rental => {
      const start = new Date(
        new Date(rental.start_date_time).toLocaleString("en-US", {
          timeZone: "GMT",
        })
      );
      const end = new Date(
        new Date(rental.end_date_time).toLocaleString("en-US", {
          timeZone: "GMT",
        })
      );
      let status = "";

      if (start > now) status = "Upcoming";
      else if (end > now) status = "In Progress";
      else status = "Finalized";

      return { ...rental, status, start, end };
    })
    .sort((a, b) => {
      if (a.status === b.status) {
        if (a.status === "Upcoming") return a.start - b.start;
        if (a.status === "Finalized") return b.end - a.end;
      }
      return (
        ["Upcoming", "In Progress", "Finalized"].indexOf(a.status) -
        ["Upcoming", "In Progress", "Finalized"].indexOf(b.status)
      );
    });
};
