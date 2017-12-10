#BODY="{\"branch\": \"$(git rev-parse --abbrev-ref HEAD)}\"";
BODY='{"request": {"branch":"master"}}'
curl -H "Travis-API-Version: 3" -H "User-Agent: API Explorer" \
  -H "Authorization: token $TRAVIS_TOKEN" \
  -d "$BODY" \
  https://api.travis-ci.org/repo/my8bit%2Ftomatoes.work/requests
