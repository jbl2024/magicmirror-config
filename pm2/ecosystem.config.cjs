const os = require("node:os");
const path = require("node:path");

const installRoot =
  process.env.MAGICMIRROR_INSTALL_ROOT ||
  path.join(os.homedir(), ".local", "share", "magicmirror");

module.exports = {
  apps: [
    {
      name: "MagicMirror",
      cwd: path.join(installRoot, "current"),
      script: "npm",
      args: "start",
      autorestart: true,
      max_restarts: 10,
      restart_delay: 5000,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
