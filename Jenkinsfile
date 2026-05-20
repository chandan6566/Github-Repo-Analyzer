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
                sh 'docker run -d -p 6060:8080 myapp:latest'
                sh 'docker ps'
            }
        }
        stage('Tagging Docker Image'){
            steps{
                sh 'docker tag myapp:latest chandan6566/python-app'
                sh 'docker images'
            }
        }
    }
}