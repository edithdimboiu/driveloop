import { Schema, model, models } from "mongoose";

const CarSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    car_name: { type: String },
    manufacturer: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true, max: new Date().getFullYear() },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    engine_type: {
      type: String,
      required: true,
      enum: ["Electric", "Gasoline", "Diesel", "Hybrid"],
    },
    location: { type: String, required: true },
    address: { type: String, required: true },
    features: { type: String, required: true },
    availability: { type: String, required: true },
    price_per_hour: { type: Number, required: true, min: 0 },
    minimum_rental_duration: { type: Number, required: true, min: 1 },
    maximum_rental_duration: { type: Number, required: true, min: 1, max: 72 },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

CarSchema.pre("save", function (next) {
  this.car_name = `${this.manufacturer} ${this.model} ${this.year}`;
  next();
});
const Car = models.Car || model("Car", CarSchema);
export default Car;
