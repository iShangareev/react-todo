import { useEffect, useState } from 'react';
import Card, { CardVariant } from './components/Card';
import UserList from './components/UserList';
import { ITodo, IUser } from './types/types';
import axios from 'axios';
import List from './components/List';
import UserItem from './components/UserItem';
import TodoItem from './components/TodoItem';
import EventsExample from './components/ExentsExample'


const App = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fectUsers()
    fectTodos()
  }, [])

  async function fectUsers() {
    try {
      const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
      setUsers(response.data)
    } catch (e) {
      alert(e)
    }
  }

  async function fectTodos() {
    try {
      const response = await axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
      setTodos(response.data)
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div>
      <EventsExample></EventsExample>
      <Card
        variant={CardVariant.outlined}
        height={'200px'}
        width={'300px'}>
        <button>Кнопка</button>
      </Card>
      <List
        items={users}
        renderItem={(user:IUser) => <UserItem user={user} key={user.id}/>}
      />
      <List
        items={todos}
        renderItem={(todo:ITodo) => <TodoItem todo={todo} key={todo.id}/>}
      />
    </div>
  );
};

export default App;
