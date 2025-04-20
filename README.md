# Jenkins CI/CD Pipeline

A complete Continuous Integration and Continuous Deployment (CI/CD) pipeline example using Jenkins, SonarQube, JFrog Artifactory, and Docker.

## Architecture

```
┌───────┐     ┌─────────┐     ┌───────────┐     ┌─────────────┐
│ Code  │────▶│ Jenkins │────▶│ SonarQube │────▶│ Artifactory │
│(Git)  │     │ (Build) │     │ (Quality) │     │  (Artifact) │
└───────┘     └─────────┘     └───────────┘     └─────────────┘
                   │
                   ▼
              ┌────────┐
              │ Docker │
              │ Image  │
              └────────┘
```

## Pipeline Stages

1. **Checkout**: Pulls code from Git.
2. **Build & Test**: Compiles Java code and runs JUnit tests using Maven.
3. **SonarQube Analysis**: Scans code for bugs, vulnerabilities, and code smells.
4. **Quality Gate**: Waits for SonarQube quality gate result (Pass/Fail).
5. **Docker Build**: Builds a Docker image of the application.
6. **Upload to Artifactory**: Publishes the JAR file to JFrog Artifactory.

## Prerequisites

- Jenkins 2.x
- Docker
- Java 11
- Maven
- SonarQube Server
- JFrog Artifactory

## Configuration

### Jenkins Plugins Required

- Docker Pipeline
- SonarQube Scanner
- Artifactory Plugin
- Pipeline Utility Steps
- Git Plugin

### Environment Variables

Configure these in Jenkins Global Tools Configuration:
- **Maven**: `Maven 3.8.6`
- **JDK**: `JDK 11`
- **SonarQube**: `SonarScanner`

## Quick Start

### 1. Run Tests Locally

```bash
./scripts/test.sh
```

### 2. Build Locally

```bash
./scripts/build.sh
```

### 3. Run Pipeline

- Create a new "Pipeline" job in Jenkins.
- Point it to this repository.
- Run the build.

## Project Structure

```
jenkins-cicd-pipeline/
├── Jenkinsfile                 # Defining the Pipeline
├── app/
│   └── sample-java-app/        # Java Application
├── docker/
│   └── Dockerfile              # Docker build instructions
├── sonarqube/
│   └── sonar-project.properties
├── jfrog/
│   └── artifactory-config.yaml
└── scripts/                    # Helper scripts
```

## Author

Ramchandra Chintala
