/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setupGlobal } from './utils/apis';

global.XMLHttpRequest = global.originalXMLHttpRequest ? global.originalXMLHttpRequest  : global.XMLHttpRequest;
setupGlobal();

AppRegistry.registerComponent(appName, () => App);
