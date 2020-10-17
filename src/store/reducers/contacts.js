import { combineReducers } from 'redux';

const contactsDefault = [
  {
    id: 1,
    name: 'Pedro Roberto',
    email: 'pedro.roberto@gmail.com',
    fone: 4859656595,
  },
  {
    id: 2,
    name: 'Vinicius dos Santos',
    email: 'vini.santos@gmail.com',
    fone: 4996264536,
  }
]

function contacts(state = contactsDefault, action) {
  switch(action.type) {
    case 'ADD_CONTACT_LIST':
      return [
        ...state,
        action.payload
      ];
    case 'ADD_NEW_LIST':
      return action.payload
    default:
      return state;
  }
}

const reducers = combineReducers({
  contacts
});

export default reducers;