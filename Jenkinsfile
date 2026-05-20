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
                sh 'docker run -d --name myapp-container -p 5001:5000 myapp:latest'
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
                withCredentials([usernamePassword(credentialsId: 'chandan6566',
                                                      passwordVariable: 'DockerhubPassword',
                                                      usernameVariable: 'DockerhubUserName')]) {
                sh 'echo "$DockerhubPassword" | docker login -u "$DockerhubUserName" --password-stdin'
                }
            }
        }
        stage('Pushing Docker Image'){
            steps{
                sh 'docker push chandan6566/python-app'
            }
        }
    }
}