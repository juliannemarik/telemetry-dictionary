import { get } from 'lodash';

export class BaseTelemetryDictionary {
  buildConfig(path: string) {
    const paths = path.split('.');
    const actionIdx = paths.indexOf('actions');

    return {
      category: this[paths[0]].id,
      action: get(this, `${paths.slice(0, actionIdx + 2).join('.')}.id`),
      label: get(this, `${path}.id`)
    };
  }
}
