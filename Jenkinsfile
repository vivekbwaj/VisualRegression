def buildVersion = ''

pipeline {
  agent  { label 'win' } 
	triggers { cron('15 09 * * *') }
    
	options { 
			buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
		}	

    stages {
		stage("Restore") {
			steps {
				sh 'node --version'
				sh 'npm install'
    		}
		}   
		

	 stage("Test Prod") {
			steps {
				echo 'run tests'
				sh 'npm run prod-test'
			}
		}

	}   
	post {
		always {

		//	archiveArtifacts allowEmptyArchive: true, artifacts: '.blah/**' 
			junit allowEmptyResults: true, testResults: 'backstop_data/prod_ci_report/xunit.xml'
			publishHTML(target: [allowMissing: true, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'backstop_data/', reportFiles: 'prod_html_report/index.html', reportName: 'Results', reportTitles: ''])
		            		
		}	
	}
}