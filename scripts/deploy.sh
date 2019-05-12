#!/bin/bash

if [ "$#" != 2 ]; then
  echo
  echo -e "\033[1;33mUsage: $0 <staging|production> <tag>\033[0m"
  echo
  exit 1
fi

CHART_VERSION=v0.1.2
ENVIRONMENT=$1
VERSION=$2

echo
echo -e "\033[1;32m==> Updating pokedextracker Helm repo\033[0m"
echo

helm repo update

echo
echo -e "\033[1;32m==> Deploying $VERSION in $ENVIRONMENT\033[0m"
echo

helm upgrade \
  --install frontend-$ENVIRONMENT \
  --version $CHART_VERSION \
  --namespace $ENVIRONMENT \
  --values .kube/$ENVIRONMENT.yaml \
  --set-string image.tag=$VERSION \
  --wait \
  pokedextracker/web-app
