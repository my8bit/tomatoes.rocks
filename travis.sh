# HEAD is BRANCH NAME uncomment to get branch name locally
# this variable exist in deployement
# HEAD=$(git rev-parse --abbrev-ref HEAD)

curl -X POST \
  https://api.travis-ci.org/repo/my8bit%2Ftomatoes.work/requests \
  -H 'accept: application/json' \
  -H "authorization: token $TRAVIS_TOKEN" \
  -H 'content-type: application/json' \
  -H 'travis-api-version: 3' \
  -d '{"branch": "'"$HEAD"'", "config": {"env": {"TRAVIS_EVENT_TYPE": "pull_request", "URL": "DEPLOY_PRIME_URL"}}}'
