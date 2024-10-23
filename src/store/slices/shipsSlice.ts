import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as restController from '../../api/restController';
import { pendingReducer, rejectedReducer } from '../../utils/store';

interface ShipsState {
  data: any;
  error: string | null;
  isFetching: boolean;
}
interface GetResponse {
  data: any;
  status: number;
}

const SHIPS_SLICE_NAME = 'ships';
const initialState: ShipsState = {
  data: {},
  error: null,
  isFetching: false,
};

export const getShips = createAsyncThunk<GetResponse, string>(
  `${SHIPS_SLICE_NAME}/getShips`,
  async (address: string, thunkAPI) => {
    try {
      const { data, status } = await restController.getShips(address);
      const result: GetResponse = { data, status };
      return result;
    } catch (error: any) {
      console.log(error);
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error);
    }
  }
);
const extraReducers = (builder: any) => {
  builder.addCase(getShips.pending, pendingReducer);
  builder.addCase(
    getShips.fulfilled,
    (state: ShipsState, action: PayloadAction<GetResponse>) => {
      state.data = action.payload.data;
      state.error = null;
      state.isFetching = false;
    }
  );
  builder.addCase(getShips.rejected, rejectedReducer);
};

const shipsSlice = createSlice({
  name: SHIPS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers,
});
export default shipsSlice.reducer;
