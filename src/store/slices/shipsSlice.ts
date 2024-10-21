import { createAsyncThunk, createSlice,PayloadAction } from '@reduxjs/toolkit';
import * as restController from '../../api/restController';
import { pendingReducer, rejectedReducer } from '../../utils/store';

interface ShipsState{
  ships:number[],
  error: string | null;
}
interface GetHeroesResponse {
  data: number[];
  status: number;
}

const SHIPS_SLICE_NAME = 'ships';
const initialState: ShipsState = {
  ships: [],
  error: null,
};

export const getShips = createAsyncThunk<GetHeroesResponse, string>(
  `${SHIPS_SLICE_NAME}/getShips`,
  async (address: string, thunkAPI) => {
    try {
      const { data, status} = await restController.getInfo(address);
      const result: GetHeroesResponse = { data, status };
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
  builder.addCase(getShips.fulfilled, (state:ShipsState, action: PayloadAction<GetHeroesResponse>) => {
    state.ships = action.payload.data;
    state.error = null;
  });
  builder.addCase(getShips.rejected, rejectedReducer);
};

const shipsSlice = createSlice({
  name: SHIPS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers,
});
export default shipsSlice.reducer;