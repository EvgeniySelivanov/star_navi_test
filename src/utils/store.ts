interface State {
  isFetching: boolean;
  error: string | null;
}
interface Action {
  payload: string;
}

export const pendingReducer = (state: State) => {
  state.isFetching = true;
  state.error = null;
};

export const rejectedReducer = (state: State, { payload }: Action) => {
  state.isFetching = false;
  state.error = payload;
};
