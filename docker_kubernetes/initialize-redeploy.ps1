kubectl apply -f ./app/databases/global-config.yaml;
kubectl apply -f ./app/databases/local-storage.yaml;
kubectl apply -f ./app/databases/post-volume.yaml;
kubectl apply -f ./app/databases/gateway.yaml;