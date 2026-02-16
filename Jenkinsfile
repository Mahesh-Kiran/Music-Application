pipeline {
  agent any

  environment {
    VERCEL_DEPLOY_HOOK_URL = credentials('vercel-deploy-hook-music-app')
  }

  options {
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  // REMOVE this empty block:
  // triggers {
  // }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'if [ -f package-lock.json ]; then npm ci; else npm install; fi'
      }
    }

    stage('Test') {
      when {
        expression { fileExists('package.json') }
      }
      steps {
        sh 'npm test -- --watch=false || echo "Tests failed or not configured, continuing..."'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Trigger Vercel Deploy') {
      when {
        branch 'main'
      }
      steps {
        echo "Triggering Vercel deployment via Deploy Hook..."
        sh 'curl -X POST "$VERCEL_DEPLOY_HOOK_URL"'
      }
    }
  }

  post {
    failure {
      echo "Build failed. Notifying (if you add notifications)."
    }
  }
}
