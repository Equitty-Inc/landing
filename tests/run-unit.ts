import {
  runMailerLocaleTests,
  runReferralUtilityTests,
  runRegistrySchemaTests,
} from './registrySchema.test.ts';
import { runUnsubscribeTests } from './unsubscribe.test.ts';

type Suite = {
  name: string;
  run: () => void | Promise<void>;
};

const suites: Suite[] = [
  {
    name: 'registrySchema',
    run: runRegistrySchemaTests,
  },
  {
    name: 'referralUtils',
    run: runReferralUtilityTests,
  },
  {
    name: 'mailerLocale',
    run: runMailerLocaleTests,
  },
  {
    name: 'unsubscribe',
    run: runUnsubscribeTests,
  },
];

async function runSuites() {
  let passed = 0;
  for (const suite of suites) {
    await suite.run();
    passed += 1;
    console.log(`PASS ${suite.name}`);
  }

  console.log(`Unit test suites passed: ${passed}/${suites.length}`);
}

runSuites().catch((error) => {
  console.error(error);
  process.exit(1);
});
