import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { contactsSlice } from './contactsSlice';
import { del } from '../redux/contactsSlice';

axios.defaults.baseURL = 'https://63453e45dcae733e8fed14a8.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get(``).then(({ data }) => {
        //   console.log(data);
        return data;
      });
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    try {
      return await axios.post('', newContact).then(({ data }) => data);
    } catch (error) {
      return console.log(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      return await axios.delete(`/${id}`).then(({ data }) => {
        // console.log(data);
        dispatch(del(data.id));
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
