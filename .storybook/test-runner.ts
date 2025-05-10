import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';

import { checkA11y, configureAxe, injectAxe } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    });

    const element = storyContext.parameters?.a11y?.element ?? 'body';
    await checkA11y(page, element, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default config;
