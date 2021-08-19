import { BaseTelemetryDictionary } from './base';
import { ITelemetryCategory } from '../types';

interface IHubTelemetryDictionary {
  auth: ITelemetryCategory;
  content: ITelemetryCategory;
  data: ITelemetryCategory;
  engagement: ITelemetryCategory;
  interaction: ITelemetryCategory;
  groups: ITelemetryCategory;
  navigation: ITelemetryCategory;
  search: ITelemetryCategory;
  share: ITelemetryCategory;
  status: ITelemetryCategory;
  users: ITelemetryCategory;
}

class AuthCategory implements ITelemetryCategory {
  id = 'Auth';
  definition = 'interactions involving authentication';
  actions = {};
}

class ContentCategory implements ITelemetryCategory {
  id = 'Content';
  definition = 'interactions which affect a content item';
  actions = {};
}

class DataCategory implements ITelemetryCategory {
  id = 'Data';
  definition = 'interactions associated with altering how data is being visualized (i.e. in a chart, table, map etc.)';
  actions = {};
}

class EngagementCategory implements ITelemetryCategory {
  id = 'Engagement';
  definition =
    'interactions across content/groups/users which we designate as being very important in measuring user engagement - i.e. downloading, favoriting, following, etc.';
  actions = {
    favorite: {
      id: 'Favorite',
      definition: 'favorite/unfavorite a content/group/user item',
      labels: {
        add: {
          id: 'Add',
          definition: 'add to favorites',
        },
        remove: {
          id: 'Remove',
          definition: 'remove from favorites',
        }
      },
      elements: {
        actionsMenu: {
          id: 'Actions Menu'
        },
        stickyHero: {
          id: 'Sticky Hero'
        }
      },
    },
    download: {
      id: 'Download',
      definition: 'download an item',
      labels: {
        open: {
          id: 'Open'
        },
        start: {
          id: 'Start'
        }
      },
      elements: {
        stickyHero: {
          id: 'Sticky Hero'
        },
        contentHero: {
          id: 'Content Hero'
        },
        downloadCard: {
          id: 'Download Card'
        }
      }
    }
  };
}

class InteractionCategory implements ITelemetryCategory {
  id = 'Interaction';
  definition = 'interactions across content/groups/users which we designate as being less important in measuring user engagement, but still useful to track - i.e. opening a team info panel, viewing a content license, etc.';
  actions = {};
}

class GroupsCategory implements ITelemetryCategory {
  id = 'Groups';
  definition = 'interactions which affect a group item';
  actions = {};
}

class NavigationCategory implements ITelemetryCategory {
  id = 'Navigation';
  definition = 'interactions which effectively navigate the user to a new view';
  actions = {};
}

class SearchCategory implements ITelemetryCategory {
  id = 'Search';
  definition = 'interactions involving searching for items';
  actions = {};
}

class ShareCategory implements ITelemetryCategory {
  id = 'Share';
  definition = 'interactions involving sharing items';
  actions = {};
}

class StatusCategory implements ITelemetryCategory {
  id = 'Status';
  definition = 'non-interactive events for logging API responses - these will often have an associated interactive event logged in succession';
  actions = {};
}

class UsersCategory implements ITelemetryCategory {
  id = 'Users';
  definition = 'interactions which affect a user item';
  actions = {};
}

class HubTelemetryDictionary extends BaseTelemetryDictionary implements IHubTelemetryDictionary {
  auth = new AuthCategory();
  content = new ContentCategory();
  data = new DataCategory();
  engagement = new EngagementCategory();
  interaction = new InteractionCategory();
  groups = new GroupsCategory();
  navigation = new NavigationCategory();
  search = new SearchCategory();
  share = new ShareCategory();
  status = new StatusCategory();
  users = new UsersCategory();
}

export const hubTelemetryDictionary = new HubTelemetryDictionary();