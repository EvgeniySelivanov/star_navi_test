import { createAsyncThunk, createSlice,PayloadAction } from '@reduxjs/toolkit';
import * as restController from '../../api/restController';
import { pendingReducer, rejectedReducer } from '../../utils/store';

interface FilmsState{
  films:number[],
  error: string | null;
}
interface GetHeroesResponse {
  data: number[];
  status: number;
}
const FILMS_SLICE_NAME = 'films';

const initialState: FilmsState = {
  films: [],
  error: null,
};

export const getFilms = createAsyncThunk<GetHeroesResponse, string>(
  `${FILMS_SLICE_NAME}/getFilms`,
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
  builder.addCase(getFilms.pending, pendingReducer);
  builder.addCase(getFilms.fulfilled, (state:FilmsState, action: PayloadAction<GetHeroesResponse>) => {
    state.films = action.payload.data;
    state.error = null;
  });
  builder.addCase(getFilms.rejected, rejectedReducer);
};

const filmsSlice = createSlice({
  name: FILMS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers,
});
export default filmsSlice.reducer;