FROM gradle:jdk21-alpine AS build
COPY . /home
WORKDIR /home
RUN gradle build -x test --no-daemon

FROM eclipse-temurin:17-jre-alpine as builder
WORKDIR /application
COPY --from=build home/build/libs/*.jar application.jar
RUN java -Djarmode=layertools -jar application.jar extract

FROM eclipse-temurin:17-jre-alpine
WORKDIR /application
COPY --from=builder /application/dependencies/ ./
COPY --from=builder /application/spring-boot-loader/ ./
COPY --from=builder /application/snapshot-dependencies/ ./
COPY --from=builder /application/application/ ./
RUN addgroup -S app && adduser -S app -G app
USER app


ENV OTEL_SERVICE_NAME=user-service
ENV OTEL_RESOURCE_ATTRIBUTES="deployment.environment=dev,service.namespace=app,service.version=1"
ENV OTEL_EXPORTER_OTLP_ENDPOINT="http://grafana-k8s-monitoring-grafana-agent.monitoring.svc.cluster.local:4318"
ENV OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
WORKDIR test
COPY ../grafana-opentelemetry-java.jar test/grafana-opentelemetry-java.jar
#ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
ENTRYPOINT ["java", "-javaagent:test/grafana-opentelemetry-java.jar", "java", "org.springframework.boot.loader.launch.JarLauncher"]


#java -javaagent:../grafana-opentelemetry-java.jar -jar myapp.jar
