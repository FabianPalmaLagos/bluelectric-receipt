const { createRunOncePlugin, withAndroidManifest } = require('@expo/config-plugins');

/**
 * @typedef {import('@expo/config-plugins').ConfigPlugin} ConfigPlugin
 * @typedef {import('@expo/config-plugins').AndroidManifest} AndroidManifest
 */

/**
 * Remove the custom Expo dev client scheme from intent filters, which are set to `autoVerify=true`.
 * The custom scheme `<data android:scheme="exp+<slug>"/>` seems to block verification for these intent filters.
 * This plugin makes sure there is no scheme in the autoVerify intent filters, that starts with `exp+`.
 *
 * @type {ConfigPlugin}
 */
const withAndroidVerfiedLinksWorkaround = (config) => (
  withAndroidManifest(config, (config) => {
    config.modResults = removeExpoSchemaFromVerifiedIntentFilters(config.modResults);
    return config;
  })
);

/**
 * Iterate over all `autoVerify=true` intent filters, and pull out schemes starting with `exp+`.
 *
 * @param {AndroidManifest} androidManifest
 */
function removeExpoSchemaFromVerifiedIntentFilters(androidManifest) {
  for (const application of androidManifest.manifest.application || []) {
    for (const activity of application.activity || []) {
      if (activityHasSingleTaskLaunchMode(activity)) {
        for (const intentFilter of activity['intent-filter'] || []) {
          if (intentFilterHasAutoVerification(intentFilter) && intentFilter?.data) {
            intentFilter.data = intentFilterRemoveSchemeFromData(intentFilter, (scheme) => scheme?.startsWith('exp+'));
          }
        }
        break;
      }
    }
  }
  return androidManifest;
}

/**
 * Determine if the activity should contain the intent filter to clean.
 */
function activityHasSingleTaskLaunchMode(activity) {
  return activity?.$?.['android:launchMode'] === 'singleTask';
}

/**
 * Determine if the intent filter has `autoVerify=true`.
 *
 * @param {object} intentFilter
 */
function intentFilterHasAutoVerification(intentFilter) {
  return intentFilter?.$?.['android:autoVerify'] === 'true';
}

/**
 * Pull the entry from intent filter data, based on the result of the tester.
 *
 * @param {object} intentFilter
 * @param {Function} schemeTester
 */
function intentFilterRemoveSchemeFromData(intentFilter, schemeTester) {
  // This intent filter only contains a single data entry, which we need to check
  if (!Array.isArray(intentFilter.data)) {
    const scheme = intentFilter.data?.$?.['android:scheme'];
    
    // When the single entry does not contain the scheme, return the entire data entry
    if (!scheme || !schemeTester(scheme)) {
      return intentFilter.data;
    }
    
    // This entry contains the scheme we want to remove, but there are no others, so return undefined
    return undefined;
  }
  
  // Keep track of all data entries that aren't matching the scheme
  return intentFilter.data.filter((entry) => {
    const scheme = entry?.$?.['android:scheme'];
    return !scheme || !schemeTester(scheme);
  });
}

module.exports = createRunOncePlugin(
  withAndroidVerfiedLinksWorkaround,
  'withAndroidVerfiedLinksWorkaround',
  '1.0.0'
); 