= Building a New Alexa Skill

== Template
1. Start Fresh with a new template

== Package
1. Fill out package.json, at a minimum:
   - name
   - description
1. Fill out config/lambda-config.js

== Brainstorm
1. Edit Examples.txt and brainstorm interactions between a user and the skill
   1. Start with simple queries
   1. Add wording variations
   1. Envision where slots would be and create examples that use slots
   1. Move on to interactive examples (much more difficult to code)
   
== Create Intents
=== Structure
1. Using the simple examples, create an Intent named by the intended output
=== Utterances
1. Start to fill in the utterances; use alternation where possible
1. Add potential slots to the utterances for that intent
1. Repeat for other intents that generate different types of responses
==== Test
1. Use the UI to test the utterances your code generates 
   - http://localhost:8003/test
   
== Add Code

== Test via UI

== Build Alexa Skill

=== Generate Assets
1. `gulp build-assets`

== Connect to AWS
=== Credentials
1. Create a new user (alexa-skill-author)
1. Permissions: AWSLambdaFullAccess (can tweak)
1. Add to ~/.aws/credentials, use "new user" profile name
 

== Add New Lambda Endpoint
1. Log into AWS Management Console
   https://console.aws.amazon.com/console/home?region=us-east-1#
1. Click on Lambda
1. Create a Lambda function
   1. Select blueprint
      Blank Function
   1. Configure triggers
      Click on dotted outline (empty) box and select Alexa Skills Kit
   1. Configure function
      1. Configure function
          1. Input Name (same as in lambda-config.js)
          1. Input Description
          1. Leave Runtime as Node.js 4.3
      1. Lambda function code
         will upload code later
         1. Code entry type: Edit code inline 
         1. Leave sample Lambda function code
         1. Set any necessary environment variables
      1. Lambda function handler and role
         1. Handler: index.handler
         1. Role: Choose an existing role
         1. Existing role: lambda_basic_execution
      1. Advanced settings
         1. Memory (MB): 128
         1. Timeout: 0 min 3 sec
         1. DLQ Resource: None
         1. VPC: No VPC
         1. KMS key: (default) aws/lambda
   1. Create function
== Add New Skill in Amazon Developer Console
1. Create Skill
   1. https://developer.amazon.com/home.html
   1. Click on ALEXA tab (top)
   1. Click on Alexa Skills Kit -- Get Started > button
   1. Click on Add a New Skill button (top right)
1. Fill Out Skill Information Form
   Skill Type: Custom Interaction Model
   Language: English (U.S.)
   Name: Code Camp Tweets
   Invocation Name: code camp tweets
   Audio Player: No
   1. Press Next button (bottom right)
1. Fill Out Interaction Model
   Must have previously generated assets with `gulp build-assets`
   1. Copy contents of assets/speech/IntentSchema.json and paste into Intent Schema
   1. Copy contents of assets/speech/SampleUtterances.txt and paste into Sample Utterances
1. Fill Out Configuration tab
   Service Endpoint Type: AWS Lambda ARN, North America
   -- fill in ARN
   Account Linking: No
   