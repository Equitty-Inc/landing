import { runReferralUtilityTests, runRegistrySchemaTests } from './registrySchema.test.ts';

type Suite = {
  name: string;
  run: () => void;
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
];

let passed = 0;

for (const suite of suites) {
  suite.run();
  passed += 1;
  console.log(`PASS ${suite.name}`);
}

console.log(`Unit test suites passed: ${passed}/${suites.length}`);
