pipeline{
    agent any
    stages{
        stage('Build Docker Image'){
            steps{
                sh 'docker build -t myapp:latest .'
            }
        }
        stage('Running Docker Image'){
            steps{
                sh 'docker run -d -p 8080:8080 myapp:latest'
                sh 'docker ps'
            }
        }
    }
}