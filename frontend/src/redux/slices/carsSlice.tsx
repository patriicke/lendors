import { createSlice } from "@reduxjs/toolkit";
import { CarObject } from "../../types/carTypes";

const initialState: {
  cars: CarObject[];
} = {
  cars: []
};

const carsSlice: any = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar: (state: any, { payload }) => {
      state.push(payload);
    },
    updateCars: (state: any, { payload }) => {
      state.cars = payload;
    },
    removeCar: (state: any, { payload }) => {
      state.cars = state.cars.filter((car: any) => {
        return car.id != payload;
      });
    },
    resetCars: (state: any) => {
      state.cars = [];
    }
  }
});

export const { carTypes, updateCars, removeCar, resetCars } = carsSlice.actions;

export default carsSlice.reducer;
