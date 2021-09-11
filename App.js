import 'react-native-gesture-handler';
import React from 'react';
import { ContextWrapper } from './context';
import { AppRoutes } from './AppRoutes';
import { Provider as PaperProvider } from 'react-native-paper';
import { LoadingOverlay } from './components';
import Toast from 'react-native-toast-message';
import {toastConfig} from './utils/toastConfigs'

const App = () => {
  return (
    <PaperProvider>
      <ContextWrapper>
        <LoadingOverlay>
          <AppRoutes />
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </LoadingOverlay>
      </ContextWrapper>
    </PaperProvider>
  );
};

export default App;
