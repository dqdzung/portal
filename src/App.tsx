import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { GlobalData, GlobalDataContext } from './contexts/GlobalDataContext';
import { useAuth } from './hooks/useAuth';
import { ModelTypes } from './models';
import { SystemGroup } from './models/systemGroups';
import router from './router';
import { api } from './services';

function App() {
  const { currentUser: user, setCurrentUser: setUser } = useAuth();
  const [globalData, setGlobalData] = useState<GlobalData>({
    systemGroups: null,
    systems: null
  });

  const fetchSystemGroups = async () => {
    const res = await api.base.filter({
      filter: {},
      modelType: ModelTypes.systemGroup
    });

    if (res.data.success) {
      const systemGroups = res.data.data as SystemGroup[];
      const systems = systemGroups.map((e) => e.systems).flat();
      setGlobalData({
        ...globalData,
        systemGroups,
        systems
      });
    }
  };

  useEffect(() => {
    fetchSystemGroups();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <GlobalDataContext.Provider value={{ ...globalData }}>
        <RouterProvider router={router} />
      </GlobalDataContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
