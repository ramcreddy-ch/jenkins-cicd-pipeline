pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "ramcreddy/my-app"
        SCAN_RESULT = ""
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Lint') {
            steps {
                echo 'Running ShellCheck and YAML lint...'
            }
        }
        stage('Security Scan') {
            steps {
                echo 'Running Trivy vulnerability scan...'
            }
        }
        stage('Build & Push') {
            steps {
                script {
                    echo "Building ${DOCKER_IMAGE}:${BUILD_NUMBER}..."
                    // sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        failure {
            echo "Build failed. Sending notification..."
        }
    }
}
