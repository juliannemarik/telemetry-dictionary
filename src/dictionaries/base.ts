import { get } from 'lodash';

export class BaseTelemetryDictionary {
  buildConfig(path: string) {
    const paths = path.split('.');
    const actionIdx = paths.indexOf('actions');

    const categoryPath = paths[0];
    const actionPath = paths.slice(0, actionIdx + 2).join('.');
    const labelPath = path;

    return {
      ...(categoryPath && { category: get(this, `${categoryPath}.id`) }),
      ...(actionPath && { action: get(this, `${actionPath}.id`) }),
      ...((labelPath && labelPath !== actionPath) && { label: get(this, `${labelPath}.id`) })
    };
  }

  buildConfig2(category: string, action?: string, label?: string, element?: string) {
    const categoryPath = `${category}`;
    const actionPath = action && `${categoryPath}.actions.${action}`;
    const labelPath = label && `${actionPath}.labels.${label}`;
    const elementPath = element && `${actionPath}.elements.${element}`;

    return {
      ...(categoryPath && { category: get(this, `${categoryPath}.id`) }),
      ...(actionPath && { action: get(this, `${actionPath}.id`) }),
      ...(labelPath && { label: get(this, `${labelPath}.id`) }),
      ...(element && { element: get(this, `${elementPath}.id`) })
    };
  }
}
