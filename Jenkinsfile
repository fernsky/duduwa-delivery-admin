pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'isresearch/duduwa-integrated-profile'
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
        NODE_VERSION = '20'
        
        // Define environment variables from Jenkins credentials
        DATABASE_URL = credentials('duduwa-profile-database-url')
        NEXT_PUBLIC_APP_URL = credentials('duduwa-profile-next-public-app-url')
        MINIO_ENDPOINT = credentials('duduwa-profile-minio-endpoint')
        MINIO_PORT = credentials('duduwa-profile-minio-port')
        MINIO_CLIENT_ACCESS_KEY = credentials('duduwa-profile-minio-client-access-key')
        MINIO_CLIENT_SECRET_KEY = credentials('duduwa-profile-minio-client-secret-key')
        MINIO_USE_SSL = credentials('duduwa-profile-minio-use-ssl')
        BUCKET_NAME = credentials('duduwa-profile-bucket-name')
        REDIS_URL = credentials('duduwa-profile-redis-url')
        REDIS_PASSWORD = credentials('duduwa-profile-redis-password')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Test') {
            steps {
                sh """
                    docker --version
                    docker info
                    echo ${DOCKER_CREDENTIALS_PSW} | docker login -u ${DOCKER_CREDENTIALS_USR} --password-stdin
                    docker logout
                """
            }
        }

        stage('Docker Build') {
            steps {
                sh """
                    docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                    --build-arg DATABASE_URL=${DATABASE_URL} \
                    --build-arg NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
                    --build-arg MINIO_ENDPOINT=${MINIO_ENDPOINT} \
                    --build-arg MINIO_PORT=${MINIO_PORT} \
                    --build-arg MINIO_CLIENT_ACCESS_KEY=${MINIO_CLIENT_ACCESS_KEY} \
                    --build-arg MINIO_CLIENT_SECRET_KEY=${MINIO_CLIENT_SECRET_KEY} \
                    --build-arg MINIO_USE_SSL=${MINIO_USE_SSL} \
                    --build-arg BUCKET_NAME=${BUCKET_NAME} \
                    --build-arg REDIS_URL=${REDIS_URL} \
                    --build-arg REDIS_PASSWORD=${REDIS_PASSWORD} \
                    .
                    
                    docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} ${DOCKER_IMAGE}:latest
                """
            }
        }

        stage('Docker Push') {
            steps {
                sh """
                    echo ${DOCKER_CREDENTIALS_PSW} | docker login -u ${DOCKER_CREDENTIALS_USR} --password-stdin
                    docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
                    docker push ${DOCKER_IMAGE}:latest
                    docker logout
                """
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
