import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export interface User {
  id: string;
  userInfo: {
    profilePhoto?: string;
    firstName: string;
    lastName: string;
    dob: string;
    occupation: string;
    gender: string;
  };
  userContact: {
    email: string;
    phoneNumber: string;
    fax?: string;
    linkedInUrl?: string;
  };
  userAddress: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  userAcademics: { schoolName: string }[];
}

export type NewUser = Omit<User, 'id'>;

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get('/users');
  return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user: NewUser) => {
  const response = await api.post('/users', user);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }: { id: string, user: Partial<User> }) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  await api.delete(`/users/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Fetch failed';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
