import { createContext, FC, useContext, useState } from 'react';
import Alert from '../components/general/Alert';

interface IAlertContext {
  setAlert?: (text: string, type?: 'info' | 'warning' | 'success' | 'error') => void;
}

const defaultContext: IAlertContext = {};

export const AlertContext = createContext<IAlertContext>(defaultContext);

export const AlertProvider: FC = ({ children }) => {
  const [text, setText] = useState<string>();
  const [type, setType] = useState<'info' | 'warning' | 'success' | 'error'>('success');

  const setAlert = (
    text: string,
    type: 'info' | 'warning' | 'success' | 'error' = 'success',
  ) => {
    setText(text);
    setType(type);
  };

  const handleCloseAlert = () => {
    setText(undefined);
  };

  const ctx: IAlertContext = {
    setAlert,
  };

  return (
    <AlertContext.Provider value={ctx}>
      {children}
      <Alert
        text={text}
        type={type}
        open={text !== undefined}
        onClose={handleCloseAlert}
      />
    </AlertContext.Provider>
  );
};

const useAlert = () => useContext(AlertContext);

export default useAlert;
