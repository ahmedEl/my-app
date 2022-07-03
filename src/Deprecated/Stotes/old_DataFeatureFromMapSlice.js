import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';

// export const getUsers = createAsyncThunk(
//   'usersSlice/getUsers',
//   async () => {
//     return await fetch('http://localhost:4000').
//       then(res => res.json());
//   }
// );


// export const getUsers = async () => {
//     await setTimeout(() => {
//         return {"Name": "Ahmed", "Email": "Ahmed@gmail.com"};
//     }, 2000);
// }


export const getUsers = createAsyncThunk(
  'usersSlice/getUsers',
  async () => {
    return await fetch('https://jsonplaceholder.typicode.com/todos/1').
      then(res => res.json());
  }
);


const initialState = {
    status: null,
    data: []
}

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    extraReducers: {
      [getUsers.pending] : (state) => {
          debugger;
        state.status = 'Pending';
      },

      [getUsers.fulfilled] : (state, action) => {
          debugger;
        state.status = 'Fulfilled';
        state.data = action.payload;
      },

      [getUsers.rejected] : (state) => {
          debugger;
        state.status = 'Rejected';
      }
    }
});

export default usersSlice.reducer;