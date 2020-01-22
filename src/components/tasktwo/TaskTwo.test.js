import React from 'react';
import renderer from 'react-test-renderer';
import TaskTwo, { dataReducer } from './TaskTwo';

describe('TaskTwo', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<TaskTwo />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('TaskTwo data reducer', () => {
  it('should set a user', () => {
    const state = { user: null, searchError: null };
    const user = { userId: 1, username: 'test' };

    const newState = dataReducer(state, {
      type: 'SET_USER',
      user,
    });
    expect(newState).toEqual({ user: user, searchError: null });
  });

  it('should set an error', () => {
    const state = { user: null, userTodos: [], searchError: null };

    const newState = dataReducer(state, {
      type: 'SEARCH_ERROR'
    });
    expect(newState).toEqual({ user: null, userTodos: [], searchError: true });
  });

  it('should set a todo list', () => {
    const state = { userTodos: [], searchError: null };
    const list = ['a', 'b', 'c'];

    const newState = dataReducer(state, {
      type: 'SET_LIST',
      list,
    });
    expect(newState).toEqual({ userTodos: list, searchError: null });
  });
});
