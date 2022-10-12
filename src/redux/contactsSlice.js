import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact } from './contactsOperations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    add(state, action) {
      const findName = state.contacts.items.find(
        el => el.name.toLowerCase() === action.payload.name.toLowerCase()
      );

      findName
        ? alert(`${state.contacts.items.name} is already in contacts`)
        : state.contacts.items.push(action.payload);
    },
    del(state, action) {
      const index = state.contacts.items.findIndex(
        task => task.id === action.payload
      );
      state.contacts.items.splice(index, 1);
    },
    filterAdd(state, action) {
      // console.log("state", state, action)
      state.filter = action.payload;
    },
  },
  extraReducers: {
    // встоенный IMMER который не мутирует state! только для Redux Toolkit
    [fetchContacts.pending]: state => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      // console.log('action', action.payload);
      // console.log('state', state.contacts);
      state.contacts.items = action.payload;
      state.contacts.isLoading = false;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    [deleteContact.pending]: state => {
      state.contacts.isLoading = true;
      state.contacts.error = null;
    },
    [deleteContact.fulfilled]: state => {
      state.contacts.isLoading = false;
    },
    [deleteContact.rejected]: 
      (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      },

  },
});

// console.log(contactsSlice);

export const { add, del, filterAdd } = contactsSlice.actions;
