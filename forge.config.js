module.exports = {
    "packagerConfig": {
        "ignore": [
            "^(\/src$)",
            "^(\/README.md$)",
            ".gitignore",
            "package-lock.json",
            "tsconfig.json",
            "webpack.config.js",
            "forge.config.js"
        ]
    },
    "makers": [
        {
            "name": "@electron-forge/maker-squirrel",
            "config": {
                "name": "SlimeClicker"
            }
        },
        {
            "name": "@electron-forge/maker-zip",
            "platforms": [
                "darwin"
            ]
        },
        {
            "name": "@electron-forge/maker-deb",
            "config": {}
        },
        {
            "name": "@electron-forge/maker-rpm",
            "config": {}
        }
    ]
}