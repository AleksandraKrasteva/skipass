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

ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
