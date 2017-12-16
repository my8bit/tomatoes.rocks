#!/bin/bash

curl -X POST \
  https://lighthouse-ci.appspot.com/run_on_chrome \
  -H 'content-type: application/json' \
  -H 'x-api-key: "'"$LIGHTHOUSE_API_KEY"'"' \
  -d '{
    "testUrl": "'"$DEPLOY_PRIME_URL"'",
    "output": "json",
    "addComment": true,
    "repo": {
      "owner": "my8bit",
      "name": "tomatoes.work"
    },
    "pr": {
      "number": "'"$(grep -Eo '[0-9]{1,4}' <<< $BRANCH)"'",
      "sha": "'"$COMMIT_REF"'"
    }
  }'
