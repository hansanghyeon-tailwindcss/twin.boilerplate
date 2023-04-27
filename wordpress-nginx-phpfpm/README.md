## docker

```
docker-compose up -d
```

## docker swarm

```
docker stack deploy -c <(docker-compose -f docker-compose.swarm.yaml config) {stack name}
```