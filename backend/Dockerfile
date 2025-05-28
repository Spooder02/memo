FROM amazoncorretto:21.0.4-alpine3.18

WORKDIR /app

COPY build/libs/memo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]