import React, { useEffect, useState } from 'react';
import './styles.scss';

export const dataReducer = (state, action) => {
  if (action.type === 'SET_USER') {
    return { ...state, user: action.user, searchError: null };
  }
  if (action.type === 'SEARCH_ERROR') {
    return { ...state, user: null, userTodos: [], searchError: true };
  }
  if (action.type === 'SET_LIST') {
    return { ...state, userTodos: action.list };
  }
  throw new Error();
};

const initialData = {
  user: null,
  userTodos: [],
  searchError: null
}

const TaskTwo = () => {

  const [username, setUsername] = useState('');
  const [searchFor, setSearchFor] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [theme, setTheme] = useState(null);

  const [data, dispatch] = React.useReducer(dataReducer, initialData);


  const getUserTodos = (userId) => {
    fetch('https://jsonplaceholder.typicode.com/todos?userId=' + userId)
      .then(res => res.json())
      .then(res => {
        dispatch({ type: 'SET_LIST', list: res })
      })
  }

  useEffect(() => {
    searchFor.length && fetch('https://jsonplaceholder.typicode.com/users?username=' + searchFor)
      .then(res => res.json())
      .then(res => {
        if (!!res[0]) {
          dispatch({ type: 'SET_USER', user: res[0] })
          getUserTodos(res[0].id);
        } else {
          dispatch({ type: 'SEARCH_ERROR' })
        }
        setIsInitialLoad(false);
        setUsername('');
      })
  }, [searchFor]);

  const userDetails = () =>
    <>
      <h1>User details</h1>
      <p><strong>Username:</strong> {data.user.username}</p>
      <p><strong>Email address:</strong> {data.user.email}</p>
      <p><strong>Website:</strong> {data.user.website}</p>
    </>

  const userTodoList = () =>
    <>
      <h1>To do list</h1>
      <ul>{data.userTodos.map(todo =>
        <li key={todo.id}
          className={todo.completed ? 'complete' : 'incomplete'}>
          {todo.title}
        </li>)}
      </ul>
    </>;

  return (
    <div className={`task2 ${!theme ? 'light' : theme}`}>
      <button type='button' className='themeSwitch'
        onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')}>
        {`Set ${theme === 'dark' ? 'light' : 'dark'} theme`}
      </button>
      <div className='searchWrapper'>
        <h1>Find a user</h1>
        <input value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={e => e.keyCode === 13 && setSearchFor(username)} />
        <button type='button'
          onClick={() => username.length && setSearchFor(username)}>
          Search
        </button>
      </div>
      <div className='listWrapper'>
        {isInitialLoad ? null :
          (!data.searchError ? (
            <>
              {userDetails()}
              {userTodoList()}
            </>) :
            <h2 className='searchError'>{`User '${searchFor}' not found`}</h2>
          )}
      </div>
    </div>
  )
}

export default TaskTwo;
