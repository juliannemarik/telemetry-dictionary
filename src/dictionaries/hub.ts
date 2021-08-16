import { BaseTelemetryDictionary } from './base';
import { ITelemetryCategory } from '../interfaces';

interface IHubTelemetryDictionary {
  auth:ITelemetryCategory;
  content:ITelemetryCategory;
  data:ITelemetryCategory;
  engagement:ITelemetryCategory;
  interaction:ITelemetryCategory;
  groups:ITelemetryCategory;
  navigation:ITelemetryCategory;
  search:ITelemetryCategory;
  share:ITelemetryCategory;
  status:ITelemetryCategory;
  users:ITelemetryCategory;
}

class authCategory implements ITelemetryCategory {
  id = 'Auth';
  definition = 'interactions involving authentication';
  actions = {};
}

class contentCategory implements ITelemetryCategory {
  id = 'Content';
  definition = 'interactions which affect a content item';
  actions = {};
}

class dataCategory implements ITelemetryCategory {
  id = 'Data';
  definition = 'interactions associated with altering how data is being visualized (i.e. in a chart, table, map etc.)';
  actions = {};
}

class engagementCategory implements ITelemetryCategory {
  id = 'Engagement';
  definition = 'interactions across content/groups/users which we designate as being very important in measuring user engagement - i.e. downloading, favoriting, following, etc.';
  actions = {
    favorite: {
      id: 'Favorite',
      definition: 'favorite/unfavorite a content/group/user item',
      labels: {
        add: {
          id: 'Add',
          definition: 'add to favorites'
        },
        remove: {
          id: 'Remove',
          definition: 'remove from favorites'
        }
      }
    }
  }
}

class interactionCategory implements ITelemetryCategory {
  id = 'Interaction';
  definition = 'interactions across content/groups/users which we designate as being less important in measuring user engagement, but still useful to track - i.e. opening a team info panel, viewing a content license, etc.';
  actions = {};
}

class groupsCategory implements ITelemetryCategory {
  id = 'Groups';
  definition = 'interactions which affect a group item';
  actions = {};
}

class navigationCategory implements ITelemetryCategory {
  id = 'Navigation';
  definition = 'interactions which effectively navigate the user to a new view';
  actions = {};
}

class searchCategory implements ITelemetryCategory {
  id = 'Search';
  definition = 'interactions involving searching for items';
  actions = {};
}

class shareCategory implements ITelemetryCategory {
  id = 'Share';
  definition = 'interactions involving sharing items';
  actions = {};
}

class statusCategory implements ITelemetryCategory {
  id = 'Status';
  definition = 'non-interactive events for logging API responses - these will often have an associated interactive event logged in succession';
  actions = {};
}

class usersCategory implements ITelemetryCategory {
  id = 'Users';
  definition = 'interactions which affect a user item';
  actions = {};
}

class HubTelemetryDictionary extends BaseTelemetryDictionary implements IHubTelemetryDictionary {
  auth = new authCategory
  content = new contentCategory
  data = new dataCategory
  engagement = new engagementCategory
  interaction = new interactionCategory
  groups = new groupsCategory
  navigation = new navigationCategory
  search = new searchCategory
  share = new shareCategory
  status = new statusCategory
  users = new usersCategory
}

export const hubTelemetryDictionary = new HubTelemetryDictionary;

console.log('TESTING1234', hubTelemetryDictionary.buildConfig('engagement.actions.favorite.labels.add'));