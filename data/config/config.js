/* MagicMirror configuration with environment placeholders.
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
  address: "0.0.0.0", // Address to listen on, can be:
  // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
  // - another specific IPv4/6 to listen on a specific interface
  // - "", "0.0.0.0", "::" to listen on any interface
  // Default, when address config is left out, is "localhost"
  port: 8080,
  hideConfigSecrets: true,
  //ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
  ipWhitelist: [], // Set [] to allow all IP addresses
  // or add a specific IPv4 of 192.168.1.5 :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
  // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

  language: "fr",
  timeFormat: 24,
  units: "metric",

  modules: [
    {
      module: "alert"
    },
    {
      module: "clock",
      position: "top_left"
    },
    {
      module: "calendar",
      header: "Evénements",
      position: "top_left",
      config: {
        language: "fr-FR",
        coloredText: true,
        coloredSymbol: true,
        fade: false,
        maximumDaysPerLine: 4,
        maximumEntries: 10,
        hideEmptyDays: false,
        tableClass: "medium",
        calendars: [
          {
            symbol: "calendar",
            color: "#ffb86c",
            url: "${SECRET_CALENDAR_1_URL}"
          },
          {
            symbol: "calendar",
            color: "#78a9ff",
            url: "${SECRET_CALENDAR_2_URL}"
          },
          {
            symbol: "calendar",
            color: "#62d98b",
            url: "${SECRET_CALENDAR_3_URL}"
          }
        ]
      }
    },
    {
      module: "weather",
      position: "top_right",
      config: {
        weatherProvider: "openmeteo",
        colored: true,
        type: "current",
        lat: ${MIRROR_WEATHER_LAT},
        lon: ${MIRROR_WEATHER_LON},
        units: "metric",
        tableClass: "medium",
        decimalSymbol: ","
      }
    },
    {
      module: "newsfeed",
      position: "top_bar",
      config: {
        feeds: [
          {
            title: "20minutes",
            url: "https://www.20minutes.fr/feeds/rss-une.xml"
          }
        ],
        wrapTitle: true,
        wrapDescription: true,
        showSourceTitle: true,
        showPublishDate: true,
        broadcastNewsFeeds: true,
        broadcastNewsUpdates: true,
        ignoreOldItems: true,
        reloadInterval: 300000
      }
    },
    {
      module: "MMM-RainForecast-FR",
      position: "top_right",
      header: "Prevision pluie",
      config: {
        lat: ${MIRROR_RAIN_LAT},
        lon: ${MIRROR_RAIN_LON},
        tableClass: "large",
        showText: true,
        showGraph: true
      }
    },
    {
      module: "weather",
      position: "top_right",
      config: {
        weatherProvider: "openmeteo",
        colored: true,
        type: "forecast",
        fade: false,
        maxNumberOfDays: 10,
        lat: ${MIRROR_WEATHER_LAT},
        lon: ${MIRROR_WEATHER_LON},
        units: "metric",
        tableClass: "medium",
        decimalSymbol: ","
      }
    },
    {
      module: "MMM-SNCF",
      position: "top_center",
      config: {
        stationId: "${SNCF_STATION_ID}",
        maximumEntries: 6,
        updateInterval: 3 * 60 * 1000,
        apiKey: "${SECRET_SNCF_API_KEY}"
      }
    },
    {
      module: "MMM-Linky",
      position: "bottom_center",
      config: {
        debug: 0,
        prm: "${SECRET_LINKY_PRM}",
        token: "${SECRET_LINKY_TOKEN}",
        periode: 3,
        apis: ["getDailyConsumption", "getLoadCurve", "getMaxPower"],
        affichageInterval: 1000 * 15,
        annee_n_minus_1: 1,
        couleur: 3,
        valuebar: 1,
        valuebartextcolor: 0,
        header: 1,
        energie: 1,
        updateDate: 0,
        updateNext: 0,
        updateHour: 14
      },
    },
  ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
  module.exports = config;
}
