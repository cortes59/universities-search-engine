import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { IUniversity } from "../../app/models/interfaces";
import { fetchUniversitiesAPI } from "./universityAPI";

export interface IUniversityState {
  loading: boolean;
  universities: IUniversity[];
}

const initialState: IUniversityState = {
  loading: false,
  universities: [],
};

export const fetchUniversities = createAsyncThunk(
  "university/fetchUniversities",
  async (country: string) => {
    const response = await fetchUniversitiesAPI(country);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const universitySlice = createSlice({
  name: "university",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.loading = false;
        state.universities = action.payload;
      })
      .addCase(fetchUniversities.rejected, (state) => {
        state.loading = false;
        notification.error({ message: "Something went wrong" });
      });
  },
});


export default universitySlice.reducer;