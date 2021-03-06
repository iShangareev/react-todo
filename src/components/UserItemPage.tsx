import React, {FC, useEffect, useState} from 'react';
import { IUser } from '../types/types';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UserItemPage: FC = () => {

  interface UserItemPageParams {
    id: string
  }

  const [user, setUser] = useState<IUser | null> (null)
  const params = useParams<UserItemPageParams>()
  const history = useHistory()

  useEffect(() => {
    fectUser()
  }, [])

  async function fectUser() {
    try {
      const response = await axios.get<IUser>('https://jsonplaceholder.typicode.com/users/' + params.id)
      setUser(response.data)
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div>
      <button onClick={() => history.push('/users')}>Back</button>
      <h1>Страница пользователя {user?.name}</h1>
      <div>{user?.address.city} {user?.address.street} {user?.address.zipcode}</div>
    </div>
  );
};

export default UserItemPage;
