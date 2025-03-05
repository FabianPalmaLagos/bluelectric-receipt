const {
  createRunOncePlugin,
  withAndroidManifest,
} = require("@expo/config-plugins");

/**
 * @typedef {import('@expo/config-plugins').ConfigPlugin} ConfigPlugin
 * @typedef {import('@expo/config-plugins').AndroidManifest} AndroidManifest
 */

/**
 * Remove the `https` scheme from intent filters that do not have `autoVerify=true`.
 *
 * @type {ConfigPlugin}
 */
const withRemoveHttpSchemeFromIntentFilters = (config) =>
  withAndroidManifest(config, (config) => {
    config.modResults = removeHttpSchemeFromIntentFilters(config.modResults);
    return config;
  });

/**
 * Remove the `https` scheme from intent filters that do not have `autoVerify=true`.
 *
 * @param {AndroidManifest} androidManifest
 */
function removeHttpSchemeFromIntentFilters(androidManifest) {
  // Iterate through the application's activities and their intent filters
  for (const application of androidManifest.manifest.application || []) {
    for (const activity of application.activity || []) {
      if (activityHasSingleTaskLaunchMode(activity)) {
        for (const intentFilter of activity["intent-filter"] || []) {
          if (!intentFilterHasAutoVerification(intentFilter)) {
            // Remove the `https` scheme from the intent filter if it doesn't have `autoVerify=true`
            if (intentFilter.data && Array.isArray(intentFilter.data)) {
              intentFilter.data = intentFilter.data.filter(
                (entry) => entry?.$["android:scheme"] !== "https"
              );
            }
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
  return activity?.$?.["android:launchMode"] === "singleTask";
}

/**
 * Determine if the intent filter has `autoVerify=true`.
 *
 * @param {object} intentFilter
 */
function intentFilterHasAutoVerification(intentFilter) {
  return intentFilter?.$?.["android:autoVerify"] === "true";
}

module.exports = createRunOncePlugin(
  withRemoveHttpSchemeFromIntentFilters,
  "withRemoveHttpSchemeFromIntentFilters",
  "1.0.0"
); 