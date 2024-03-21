#337mb
#FROM gradle:4.7.0-jdk8-alpine AS build
#COPY . /home/gradle/src
#WORKDIR home/gradle/src
#RUN gradle build --no-daemon
#
#FROM amazoncorretto:21.0.2-alpine3.19
#EXPOSE 8080
#
#RUN mkdir /app
#COPY --from=build home/gradle/src/build/libs/*.jar /app/UserManagement-0.0.1-SNAPSHOT.jar
#ENTRYPOINT ["java -jar /app/UserManagement-0.0.1-SNAPSHOT.jar"]

##337mb
#FROM gradle:4.7.0-jdk8-alpine AS build
#COPY . /home/gradle/src
#WORKDIR home/gradle/src
#RUN gradle build --no-daemon
#
#FROM build as run
#EXPOSE 8080
#
##RUN #mkdir /app
##COPY --from=build home/gradle/src/build/libs/*.jar /app/UserManagement-0.0.1-SNAPSHOT.jar
#ENTRYPOINT ["java -jar home/gradle/src/build/libs/*.jar"]
#

#FROM gradle:latest AS build
#COPY . /home/gradle/src
#WORKDIR /home/gradle/src
#RUN gradle build --no-daemon
#
#FROM amazoncorretto:17-al2023-jdk
#
#EXPOSE 8080
#
#RUN mkdir /app
#
#COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
#
#ENTRYPOINT ["java","-jar","/app/spring-boot-application.jar"]


FROM gradle:latest AS build
COPY . /home
WORKDIR /home
RUN gradle build --no-daemon

FROM eclipse-temurin:17-jre-alpine as builder
WORKDIR application
COPY --from=build home/build/libs/*.jar application.jar
RUN java -Djarmode=layertools -jar application.jar extract

FROM eclipse-temurin:17-jre-alpine
WORKDIR application
COPY --from=builder application/dependencies/ ./
COPY --from=builder application/spring-boot-loader/ ./
COPY --from=builder application/snapshot-dependencies/ ./
COPY --from=builder application/application/ ./

ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]



