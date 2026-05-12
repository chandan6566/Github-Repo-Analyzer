pipeline{
    agent any
    stages{
        stage('Memory Usage'){
            sh 'echo "htop"'
        }
        stage('Disk Usage'){
            sh 'echo "df -h"'
        }
        stage('Listing Files'){
            sh 'echo "ls -l"'
        }     
    }
}