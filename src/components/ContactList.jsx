import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { del } from '../redux/contactsSlice';
import { fetchContacts, deleteContact } from '../redux/contactsOperations';
import { List, Item, ButtonDelete, ContactName } from './ui/ContactList.styled';

export const ContactList = () => {
  const { items, isLoading, error } = useSelector(state => state.root.contacts);
  // const filter = useSelector(state => state.root.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // console.log(items);

  // const filteredContacts = () => {
  //   const normalizedFilter = filter?.toLowerCase();

  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  // const contactsList = filteredContacts();

  return (
    <List>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Oops, something's wrong... Try again</h1>}

      {items.map(({ id, name, phone }) => (
        <Item key={id} id={id}>
          <ContactName>{name}:</ContactName>
          {phone}
          <ButtonDelete
            type="buton"
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </ButtonDelete>
        </Item>
      ))}
    </List>
  );
};
