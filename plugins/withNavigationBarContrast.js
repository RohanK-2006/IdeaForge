const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

module.exports = function withNavigationBarContrast(config) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const stylesPath = path.join(
        config.modRequest.platformProjectRoot,
        "app/src/main/res/values/styles.xml"
      );

      let styles = fs.readFileSync(stylesPath, "utf8");

      // Prevent duplicate insertion
      if (styles.includes("android:enforceNavigationBarContrast")) {
        return config;
      }

      // Insert before </style> closing tag of AppTheme
      styles = styles.replace(
        /<\/style>\s*<\/resources>/,
        `    <item name="android:enforceNavigationBarContrast">false</item>\n  </style>\n</resources>`
      );

      fs.writeFileSync(stylesPath, styles);

      return config;
    },
  ]);
};