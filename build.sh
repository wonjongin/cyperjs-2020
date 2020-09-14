#!/bin/bash

# nexe -i ./app.js -o "./dist/mac/cyper" -t 'macos-10.13.0' -n "cyper";
# nexe -i ./app.js -o "./dist/linux/cyper" -t 'linux-x64' -n "cyper";
# nexe -i ./app.js -o "./dist/win/cyper" -t 'windows-x64-10.13.0' -n "cyper";
pkg . --out-path ./dist/ -o cyper