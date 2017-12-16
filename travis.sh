# HEAD is BRANCH NAME uncomment to get branch name locally
# this variable exist in deployement
# HEAD=$(git rev-parse --abbrev-ref HEAD)

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


# curl -X POST \
#   https://api.travis-ci.org/repo/my8bit%2Ftomatoes.work/requests \
#   -H 'accept: application/json' \
#   -H "authorization: token $TRAVIS_TOKEN" \
#   -H 'content-type: application/json' \
#   -H 'travis-api-version: 3' \
#   -d '{"branch": "'"$HEAD"'", "config": {"env": {"TRAVIS_EVENT_TYPE": "pull_request", "URL": "'"$DEPLOY_PRIME_URL"'"}}}'
