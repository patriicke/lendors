import { createSlice } from "@reduxjs/toolkit";
import { CarObject } from "../../types/carTypes";

const initialState: {
  cars: CarObject[];
  allCars: CarObject[];
} = {
  cars: [],
  allCars: []
};

const carsSlice: any = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCarRedux: (state: any, { payload }) => {
      state.cars.push(payload);
    },
    updateCars: (state: any, { payload }) => {
      state.cars = payload;
    },
    updateAllCars: (state: any, { payload }) => {
      state.allCars = payload;
    },
    removeCar: (state: any, { payload }) => {
      state.cars = state.cars.filter((car: any) => {
        return car.id != payload;
      });
      state.allCars = state.allCars.filter((car: any) => {
        return car.id != payload;
      });
    },
    updateCar: (state: any, { payload }) => {
      state.cars = state.cars.map((car: any) => {
        return car.id != payload ? payload : car;
      });
      state.allCars = state.allCars.map((car: any) => {
        return car.id != payload ? payload : car;
      });
    },
    resetCars: (state: any) => {
      state.cars = [];
    }
  }
});

export const {
  addCarRedux,
  updateCars,
  updateCar,
  removeCar,
  resetCars,
  updateAllCars
} = carsSlice.actions;

export default carsSlice.reducer;
