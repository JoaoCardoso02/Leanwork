import { combineReducers } from 'redux';

const usersDefault = [
  {
    id: 1,
    name: 'Pedro Roberto',
    email: 'pedro.roberto@gmail.com',
    cpf: 14254854585,
    fone: 4859656595,
    password: '123123'
  },
  {
    id: 2,
    name: 'Vinicius dos Santos',
    email: 'vini.santos@gmail.com',
    cpf: 17485296365,
    fone: 4996264536,
    password: '123123'
  }
]

function users(state = usersDefault, action) {
  switch(action.type) {
    case 'ADD_USER_LIST':
      console.log('a')
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
}

const reducers = combineReducers({
  users
});

export default reducers;