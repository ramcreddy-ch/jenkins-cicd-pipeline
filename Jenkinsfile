pipeline {
    agent any
    
    tools {
        maven 'Maven 3.8.6' 
        jdk 'JDK 11'
    }
    
    environment {
        APP_NAME = 'sample-java-app'
        VERSION = '1.0.0-SNAPSHOT'
        DOCKER_IMAGE = "ramcreddy/${APP_NAME}:${VERSION}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build & Test') {
            steps {
                dir('app/sample-java-app') {
                    sh 'mvn clean package'
                }
            }
            post {
                always {
                    junit 'app/sample-java-app/target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarScanner'
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=${APP_NAME} \
                        -Dsonar.sources=app/sample-java-app/src/main/java \
                        -Dsonar.java.binaries=app/sample-java-app/target/classes \
                        -Dsonar.tests=app/sample-java-app/src/test/java \
                        -Dsonar.java.test.binaries=app/sample-java-app/target/test-classes"
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}", "./docker")
                }
            }
        }
        
        stage('Upload to Artifactory') {
            steps {
                rtServer (
                    id: 'Artifactory',
                    url: 'http://artifactory:8081/artifactory',
                    credentialsId: 'artifactory-creds'
                )
                
                rtUpload (
                    serverId: 'Artifactory',
                    spec: """{
                          "files": [
                            {
                              "pattern": "app/sample-java-app/target/*.jar",
                              "target": "libs-release-local/"
                            }
                          ]
                    }"""
                )
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
