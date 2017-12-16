# HEAD is BRANCH NAME uncomment to get branch name locally
# this variable exist in deployement
# HEAD=$(git rev-parse --abbrev-ref HEAD)

echo "REPOSITORY_URL"
echo $REPOSITORY_URL
echo "BRANCH"
echo $BRANCH
echo "PULL_REQUEST"
echo $PULL_REQUEST
echo "HEAD"
echo $HEAD
echo "COMMIT_REF"
echo $COMMIT_REF
echo "CONTEXT"
echo $CONTEXT

# curl -X POST \
#   https://lighthouse-ci.appspot.com/run_on_chrome \
#   -H 'content-type: application/json' \
#   -H 'x-api-key: '"$LIGHTHOUSE_API_KEY"'' \
#   -d '{
#   "testUrl": "'"$DEPLOY_PRIME_URL"'",
#   "output": "json",
#   "addComment": true,
#   "repo": {
#     "owner": "my8bit",
#     "name": "tomatoes.work"
#   },
#   "pr": {
#     "number": 13,
#     "sha": "e51f9a8611d0c70d7f1b5d21899cdaa3f5a0478e"
#   }
# }'


# curl -X POST \
#   https://api.travis-ci.org/repo/my8bit%2Ftomatoes.work/requests \
#   -H 'accept: application/json' \
#   -H "authorization: token $TRAVIS_TOKEN" \
#   -H 'content-type: application/json' \
#   -H 'travis-api-version: 3' \
#   -d '{"branch": "'"$HEAD"'", "config": {"env": {"TRAVIS_EVENT_TYPE": "pull_request", "URL": "'"$DEPLOY_PRIME_URL"'"}}}'
