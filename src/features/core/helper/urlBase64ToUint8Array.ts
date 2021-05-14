/**
 * This function is used by the user service to get a WebPush Subscription.
 *
 * It is needed because Chrome doesn't accept a base64 encoded string
 * as value for applicationServerKey in pushManager.subscribe yet
 * https://bugs.chromium.org/p/chromium/issues/detail?id=802280
 *
 * @param base64String
 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
