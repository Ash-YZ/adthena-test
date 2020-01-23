export const getUser = (username) =>
  fetch('https://jsonplaceholder.typicode.com/users?username=' + username);

export const getUserTodoList = (userId) =>
  fetch('https://jsonplaceholder.typicode.com/todos?userId=' + userId);