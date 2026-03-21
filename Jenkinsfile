pipeline {
    agent any
    
    tools {
        nodejs 'node20.9.0'
    }

    stages {

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Sonar Scan') {
            steps {
                withSonarQubeEnv('sonar') {
                    sh '''
                    npx sonar-scanner \
                    -Dsonar.projectKey=Todo-Frontend \
                    -Dsonar.sources=./src \
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
