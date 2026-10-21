# ---- build stage ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /src
COPY pom.xml .
RUN mvn -B -q dependency:go-offline
COPY src ./src
RUN mvn -B -q package -DskipTests

# ---- runtime stage: JRE only, non-root ----
FROM eclipse-temurin:17-jre-jammy
RUN useradd --uid 10001 --no-create-home app
WORKDIR /app
COPY --from=build /src/target/gestion_parking-0.0.1-SNAPSHOT.jar app.jar
USER 10001
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "app.jar"]
