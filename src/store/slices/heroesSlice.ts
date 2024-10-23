import { createAsyncThunk, createSlice,PayloadAction } from '@reduxjs/toolkit';
import * as restController from '../../api/restController';
import { pendingReducer, rejectedReducer } from '../../utils/store';


interface HeroesState{
  data: any;
  error: string | null;
}
interface GetResponse {
  data: any;
  status: number;
}
const HEROES_SLICE_NAME = 'heroes';

const initialState: HeroesState = {
  data:{},
  error: null,
};

export const getHeroes = createAsyncThunk<GetResponse, string>(
  `${HEROES_SLICE_NAME}/getHeroes`,
  async (address: string, thunkAPI) => {
    try {
      const { data, status} = await restController.getInfo(address);
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
  builder.addCase(getHeroes.pending, pendingReducer);
  builder.addCase(getHeroes.fulfilled, (state:HeroesState, action: PayloadAction<GetResponse>) => {
    state.data = action.payload.data;
    state.error = null;
  });
  builder.addCase(getHeroes.rejected, rejectedReducer);
};

const heroesSlice = createSlice({
  name: HEROES_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers,
});
export default heroesSlice.reducer;