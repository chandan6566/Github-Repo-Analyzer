pipeline{
    agent any
    stages{
        stage{
            step('Memory'){
                sh "df -h"
            }
        }
        stage{
            step('Disk'){
                sh "htop"
            }
        }
    }
}
