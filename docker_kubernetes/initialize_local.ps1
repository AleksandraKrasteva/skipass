kubectl apply -f  https://github.com/envoyproxy/gateway/releases/download/v1.0.1/install.yaml;
helm repo add grafana https://grafana.github.io/helm-charts;
helm repo update; 
helm upgrade --install --atomic --timeout 300s grafana-k8s-monitoring grafana/k8s-monitoring --namespace "monitoring" --create-namespace --values .\grafana_config2.txt;
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="html-report.html";
kubectl apply -f ./app;