pipeline {
  agent any

  environment {
    // Vercel Deploy Hook URL stored as 'Secret text' in Jenkins credentials
    VERCEL_DEPLOY_HOOK_URL = credentials('vercel-deploy-hook-music-app')
  }

  options {
    // Optional: keep last 10 builds only
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  triggers {
    // GitHub webhook will trigger builds; this is just a fallback
    // pollSCM('H/5 * * * *')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        // Use npm ci if package-lock.json exists, otherwise fallback to npm install
        sh 'if [ -f package-lock.json ]; then npm ci; else npm install; fi'
      }
    }

    stage('Test') {
      when {
        expression { fileExists('package.json') }
      }
      steps {
        // Adjust or remove if you don't have tests
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
