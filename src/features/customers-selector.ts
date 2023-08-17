import { RootState } from "../store";

export const customersSelectors = (state: RootState) => state.customer.list;