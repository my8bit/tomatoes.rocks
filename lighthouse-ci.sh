#!/bin/bash

# export WEBHOOK_BODY='{
#     "testUrl": "'"$DEPLOY_PRIME_URL"'",
#     "output": "json",
#     "addComment": true,
#     "repo": {
#       "owner": "my8bit",
#       "name": "tomatoes.work"
#     },
#     "pr": {
#       "number": "'"$(grep -Eo '[0-9]{1,4}' <<< $BRANCH)"'",
#       "sha": "'"$COMMIT_REF"'"
#     }
#   }'

# curl -X POST \
#   https://wt-c4bac0445c2fe7d18676b1c5286ab6c7-0.run.webtask.io/lighthouse \
#   -H 'content-type: application/json' \
#   -H 'x-api-key: "'"$LIGHTHOUSE_API_KEY"'"' \
#   -d '{
#     "testUrl": "'"$DEPLOY_PRIME_URL"'",
#     "output": "json",
#     "addComment": true,
#     "repo": {
#       "owner": "my8bit",
#       "name": "tomatoes.work"
#     },
#     "pr": {
#       "number": "'"$(grep -Eo '[0-9]{1,4}' <<< $BRANCH)"'",
#       "sha": "'"$COMMIT_REF"'"
#     }
#   }'
