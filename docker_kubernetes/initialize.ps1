kubectl apply -f  https://github.com/envoyproxy/gateway/releases/download/v1.0.1/install.yaml;
kubectl apply -f ./app/database;
kubectl apply -f ./app;