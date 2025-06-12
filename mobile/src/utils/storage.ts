import {MMKV} from 'react-native-mmkv';

/**
 * Set => storage.set('user.name', 'Marc')
 * Get => number: storage.getNumber('user.age'), string => storage.getString('user.name'), boolean => storage.getBoolean("is.authenticated")
 * Hooks => string: const [username, setUsername] = useMMKVString('user.name'), number: const [age, setAge] = useMMKVNumber('user.age'), boolean: const [isAuthenticated, setIsAuthenticated] = useMMKVBoolean('is.authenticated')
 */

export const storage = new MMKV();

export const getAllKeysStorage = () => {
  return storage.getAllKeys();
};

export const checkKeyStorage = (key: string ) => {
  return storage.contains(key);
};

export const deleteKeyStorage = (key: string) => {
  storage.delete(key);
};

export const deleteAllKeysStorage = () => {
  storage.clearAll();
};
