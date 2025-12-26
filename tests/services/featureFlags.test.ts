import assert from 'assert';
import { isFeatureEnabled } from '../../services/featureFlags';

(async () => {
  process.env.FEATURE_LEAVE = 'true';
  process.env.FEATURE_AI_RESUME = 'false';

  const leave = await isFeatureEnabled('nonexistent-tenant', 'FEATURE_LEAVE');
  const ai = await isFeatureEnabled('nonexistent-tenant', 'FEATURE_AI_RESUME');

  assert.strictEqual(leave, true);
  assert.strictEqual(ai, false);

  console.log('featureFlags tests passed');
})();
