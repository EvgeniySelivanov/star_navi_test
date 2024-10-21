import { createAsyncThunk, createSlice,PayloadAction } from '@reduxjs/toolkit';
import * as restController from '../../api/restController';
import { pendingReducer, rejectedReducer } from '../../utils/store';
// interface Hero {
//   birth_year: string;    
//   eye_color: string;     
//   films: number[];       
//   gender: string;         
//   hair_color: string;    
//   height: string;        
//   homeworld: number;      
//   mass: string;           
//   name: string;         
//   skin_color: string;    
//   created: string;        
//   edited: string;         
//   species: number[];      
//   starships: number[];   
//   url: string;            
//   vehicles: number[];
// }

interface HeroesState{
  heroes:number[],
  error: string | null;
}
interface GetHeroesResponse {
  data: number[];
  status: number;
}
const HEROES_SLICE_NAME = 'heroes';

const initialState: HeroesState = {
  heroes: [],
  error: null,
};

export const getHeroes = createAsyncThunk<GetHeroesResponse, string>(
  `${HEROES_SLICE_NAME}/getHeroes`,
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
  builder.addCase(getHeroes.pending, pendingReducer);
  builder.addCase(getHeroes.fulfilled, (state:HeroesState, action: PayloadAction<GetHeroesResponse>) => {
    state.heroes = action.payload.data;
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