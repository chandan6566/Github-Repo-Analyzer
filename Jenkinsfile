pipeline{
    agent any
    stages{
        stage('Build Docker Image'){
            step{
                sh 'docker build -t myapp:latest .'
            }
        }
    }
}