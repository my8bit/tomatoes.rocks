# uncomment to get branch name locally
# this variable exist in deployement
# BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo $REPOSITORY_URL
echo $BRANCH
echo $PULL_REQUEST
echo $HEAD
echo $COMMIT_REF
echo $CONTEXT

curl -X POST \
  https://api.travis-ci.org/repo/my8bit%2Ftomatoes.work/requests \
  -H 'accept: application/json' \
  -H "authorization: token $TRAVIS_TOKEN" \
  -H 'content-type: application/json' \
  -H 'travis-api-version: 3' \
  -d '{"branch": "'"$BRANCH"'"}'
