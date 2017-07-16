import debug from 'debug';
import { APP_NAME } from 'src/constants';

export default name =>
  debug(`${APP_NAME}.${name}`);
