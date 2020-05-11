#!/bin/bash -e

CHART_VERSION=v0.1.0
NOW=$(date +'%s')
REPO="pokedextracker/pokedextracker.com"
TAG="$(git rev-parse --short HEAD)"
[[ -z $(git status -s) ]] || TAG="${TAG}-dirty-${NOW}"

echo
echo -e "\033[1;32m==> Building ${TAG}...\033[0m"
echo

DOCKER_BUILDKIT=1 docker build --build-arg VERSION=${TAG} -t ${REPO}:${TAG} .

echo
echo -e "\033[1;32m==> Pushing ${TAG} to ${REPO}...\033[0m"
echo

# this will fail if you're not logged in
docker push ${REPO}:${TAG}

echo
echo -e "\033[1;32m==> Updating Helm repos\033[0m"
echo

helm repo update

echo
echo -e "\033[1;32m==> Deploying ${TAG} to staging...\033[0m"
echo

helm upgrade \
  --install frontend \
  --version ${CHART_VERSION} \
  --namespace staging \
  --values .kube/staging.yaml \
  --set-string processes.web.image.tag=${TAG} \
  --wait \
  pokedextracker/app

echo
echo -e "\033[1;33m==> Deployed to staging. If everything looks good and you want to deploy to"
echo -e "==> production, type 'yes' and hit enter. If you don't want to proceed with"
echo -e "==> production, type anything else or hit ^C.\033[0m"
echo

echo -n "Enter a value: "
read proceed

if [ "${proceed}" == "yes" ]; then
  echo
  echo -e "\033[1;32m==> Deploying ${TAG} to production...\033[0m"
  echo

  helm upgrade \
    --install frontend \
    --version ${CHART_VERSION} \
    --namespace production \
    --values .kube/production.yaml \
    --set-string processes.web.image.tag=${TAG} \
    --wait \
    pokedextracker/app
else
  echo
  echo -e "\033[1;33m==> Skipping deploying ${TAG} to production...\033[0m"
  echo
fi
