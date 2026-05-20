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
                sh 'docker run --rm -d myapp:latest'
                sh 'docker stop myapp-container'
                sh 'docker ps -a'
            }
        }
        stage('Tagging Docker Image'){
            steps{
                sh 'docker tag myapp:latest chandan6566/python-app'
                sh 'docker images'
            }
        }
        stage('Docker Login'){
            steps{
                sh 'docker login -u chandan6566 -p <Chandangowda@6>'
            }
        }
    }
}