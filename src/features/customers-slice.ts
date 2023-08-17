import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Extra } from "../types/Extra";
import { StatusType } from "../types/Status";
import { CustomerType } from "../types/Customer";

type AuthInitialState = {
  customer: CustomerType | null;
  status: StatusType;
  error: string | null;
  list: CustomerType[];
};

const initialState: AuthInitialState = {
  customer: null,
  status: "idle",
  error: null,
  list: [],
};

export const loadingCustomers = createAsyncThunk<
  { data: CustomerType[] },
  undefined,
  { extra: Extra; rejectValue: string }
>(
  "@@customers/load-customers",
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.ALL_CUSTOMERS);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

const customerSlice = createSlice({
  name: "@@customerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadingCustomers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadingCustomers.rejected, (state) => {
        state.status = "rejected";
        state.error = "cannot load data";
      })
      .addCase(loadingCustomers.fulfilled, (state, action) => {
        state.status = "received";
        state.list = action.payload.data;
      });
  },
});

export const customerReducer = customerSlice.reducer;
