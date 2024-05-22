#!/bin/bash

docker compose stop
docker compose up -d

# Docker-Container-ID des Containers mit dem Namen "taskify_backend" erhalten
container_id=$(docker ps -qf "name=socializer-frontend")

# Prüfen, ob ein Container mit dem Namen "socializer-frontend" läuft
if [ -z "$container_id" ]; then
    echo "Der Container mit dem Namen 'socializer-frontend' läuft nicht."
    exit 1
fi

# Docker-Logs des Containers mit der Container-ID anzeigen und folgen
docker logs --follow "$container_id"

