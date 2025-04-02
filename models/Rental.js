import { Schema, model, models } from "mongoose";
import Car from "@/models/Car";

const rentalSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car_id: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    start_date_time: {
      type: Date,
      required: true,
    },
    end_date_time: {
      type: Date,
      required: true,
    },
    price_per_hour: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

rentalSchema.pre("save", async function (next) {
  if (this.isNew) {
    const car = await Car.findById(this.car_id);
    if (car) {
      if (!this.price_per_hour) {
        this.price_per_hour = car.price_per_hour;
      }
    }
  }
  next();
});
const Rental = models.Rental || model("Rental", rentalSchema);

export default Rental;
