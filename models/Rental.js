import { Schema, model, models } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const Rental = models.Rental || model("Rental", rentalSchema);

export default Rental;
