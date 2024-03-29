import { createContext, ReactNode, useEffect, useState } from 'react';
import { UserType } from '../../schema/userSchema';
import { getUserData, tryAuthorize } from '../../utils/authentication';

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {
    return;
  },
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  async function tryGetUserData() {
    await tryAuthorize();

    if (localStorage.getItem('accessToken')) {
      return await getUserData();
    }
  }

  // if statement added for when not logged in they need to be redirected, else it will try to set the user without any data
  useEffect(() => {
    tryGetUserData().then((userData) => {
      if (userData) {
        setUser({ login: userData.login, avatar_url: userData.avatar_url });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
