FROM openjdk:11-jre-slim
WORKDIR /app
COPY app/sample-java-app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
