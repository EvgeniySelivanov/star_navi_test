import { createAsyncThunk, createSlice,PayloadAction } from '@reduxjs/toolkit';
import * as restController from '../../api/restController';
import { pendingReducer, rejectedReducer } from '../../utils/store';

interface FilmsState{
  data: any;
  error: string | null;
}
interface GetResponse {
  data: any;
  status: number;
}
const FILMS_SLICE_NAME = 'films';

const initialState: FilmsState = {
  data:{},
  error: null,
};

export const getFilms = createAsyncThunk<GetResponse, string>(
  `${FILMS_SLICE_NAME}/getFilms`,
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
  builder.addCase(getFilms.pending, pendingReducer);
  builder.addCase(getFilms.fulfilled, (state:FilmsState, action: PayloadAction<GetResponse>) => {
    state.data = action.payload.data;
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