/**
 * @fileoverview
 *
 * Fix for a known, long-standing Leaflet bug - the default marker icons
 * aren't correctly detected by bundlers (Vite/Webpack), because Leaflet
 * tries to "guess" the icon path by reading the CSS background-image,
 * which breaks when the bundler processes assets differently.
 *
 * See: https://github.com/Leaflet/Leaflet/issues/4968
 *
 * See also: https://github.com/PaulLeCam/react-leaflet/issues/255
 */

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
