import {mergeTests} from '@playwright/test';

import { testBar } from './bar2.fixture';
import { testKitchen } from './kitchen2.fixture';

// tao ra 1 test moi, ke thua tu 2 test bar va kitchen

export const test = mergeTests(testBar, testKitchen);
export {expect} from '@playwright/test';
