pipeline{
    agent any
    stages{
        stage('Build Docker Image'){
            steps{
                sh 'docker build -t myapp:latest .'
            }
        }
        stage('Removing Container'){
            steps{
                sh 'docker stop myapp-container'
                sh 'docker rm myapp-container'
            }
        }
        stage('Running Docker Image'){
            steps{
                sh 'docker run -d --name myapp-container -p 5001:5000 myapp:latest'
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
                sh 'docker login -u chandan6566 -p Chandangowda@6'
            }
        }
        stage('Pushing Docker Image'){
            steps{
                sh 'docker push chandan6566/python-app'
            }
        }
    }
}