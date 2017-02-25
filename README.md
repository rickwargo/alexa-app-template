# Starter Template for Alexa Development Environment based on [alexa-app](https://github.com/alexa-js/alexa-app)
An [AWS Lambda](http://aws.amazon.com/lambda) template for building Alexa Skills. 
This template provides the shell that can be used to set up a working Alexa Skill on AWS and the Amazon Echo. 

Development with this starter template is best done using [alexa-app-root](https://github.com/rickwargo/alexa-app-root), an [alexa-app-server](https://github.com/alexa-js/alexa-app-server) derivation that offers a UI/webpage specifically designed for testing and development.

## Setup
This skill will run locally to support development and testing. 
When ready to push the code to AWS Lambda to test as an
actual Alexa skill, AWS Lambda needs to be configured and code pushed to it, and then the Alexa Skill needs to be set up.
Prior to the following steps, you will need to set up an 
[AWS Developer account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) and get set up on the 
[AWS Free Tier](https://aws.amazon.com/free/) to enable development, testing, and hosting for free for 12 months.

After successful sign-up of an AWS account, perform the following setups.

### AWS Template Installation
1. Clone (or fork) using `git clone git://github.com/rickwargo/alexa-app-template.git my-alexa-skill`.
2. cd my-alexa-skill
3. npm install
4. gulp lint
5. gulp test
6. edit config
7. develop app
8. gulp build
9. gulp push

### AWS Lambda Setup
You can view one of the many tutorials (e.g., [Creating an AWS Lambda Function for a Custom Skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function)) on adding a function to Lambda or use the gulp task: `gulp push-lambda`. This task will create or update the function with the defaults specified in [aws-config.js](config/aws-config.js).

### Alexa Skill Setup
1. Go to the [Alexa Console](https://developer.amazon.com/edw/home.html) and click `Get Started` under Alexa Skills Kit and then click the `Add a New Skill` button in the top right.
2. Set the `name` of the new skill name and an appropriate `invocation name` - this is what is used to activate your skill.
3. Optionally, set the version number of the skill, I recommend a 3-part version such as 1.0.0.
4. Select `Lambda ARN (Amazon Resource Name)` for the `Endpoint` and paste the ARN copied from the above step. Click `Next`.
5. Copy the Intent Schema from `assets/speech/IntentSchema.json`. This file was created from source during the gulp build step above.
5. Create the Custom Slot Types (if any) using the information from `assets/speech/CustomSlotTypes.txt`. This file was created from source during the gulp build step above.
6. Copy the Sample Utterances from `assets/speech/SampleUtterances.txt`. This file was created from source during the gulp build step above. Click `Next`.

### Source Setup
1. Go back to the `Skill Information` tab and copy the `Application Id`. Paste the `Application Id` into [package.json](package.json) and [config/aws-config.js](config/aws-config.js).
2. Add the AWS Function Name to [config/aws-config.js](config/aws-config.js).
3. If the timeout is changed from the default of 3, adjust the setting in [config/aws-config.js](config/aws-config.js).
4. Fill out the `Description` tab. You can use icons in images folder as a start but copy with your own icons.

### Prepare for Testing on Echo
1. Update the lambda source zip file with this change by using `gulp build` and upload to lambda again. You can also use `gulp push-lambda-code` to build the zip file and upload it to AWS Lambda. This assumes your information has been stored in the environment or in the `~/.aws/credentials` file.
3. You are now able to start testing your sample skill on the Amazon Echo! You should be able to go to the [Echo webpage](http://echo.amazon.com/#skills) and see your skill enabled.
3. In order to test it, try to say some of the Sample Utterances you created.
4. Your skill is now saved and once you are finished testing you can continue to publish your skill. Make sure to pay close attention to the information in [Submitting an Alexa Skill for Certification](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/publishing-an-alexa-skill), especially the [Submission Checklist](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-submission-checklist). 
5. At some point prior to Submitting for Certification, you will need to complete the information on the `Publishing Information` tab. This can be done now and saved.

## Notes

## config/lambda-config.js

## Debugging
### Startup
- If there is no response, check the application Id is set up correctly.

### Gulp Tasks
This template supports the following development practices through gulp:

| Available tasks              | Description                                                      |
| ---------------------------- | ---------------------------------------------------------------- |
| build-assets                 | Build assets for updating Alexa Skill Model ** Aliases: assets   |
| build-custom-slot-types      | Build the custom slot types from source ** Aliases: slots        |
| build-intent-schema          | Build the intent schema from source ** Aliases: intent, intents  |
| build-lambda-code            | Process source and create dist.zip file to upload to AWS lambda ** Aliases: build|
| build-utterances             | Build the utterances from source ** Aliases: utterances          |
| build-zip                    | Process source and create zip file                               |
| clean                        | Clean out the dist folder and remove the compiled zip file       |
| config                       | Compile/move config files to dist                                |
| create-zip-file              | Zip the dist directory ** Aliases: zip                           |
| gather-node-mods             | Install npm packages to dist, ignoring devDependencies           |
| default                      | [help]                                                           |
| help                         | Display this help text.                                          |
| lint                         | Lints all server side js                                         |
| make-dist                    | Compile/move javascript files to dist                            |
| node-mods                    | Install npm packages to dist, ignoring devDependencies           |
| push-lambda-code             | Process source then upload to AWS lambda ** Aliases: push        |
| quick-build-zip              | Process source and create zip file (without rebuilding node modules)|
| quick-push-lambda-code       | Process source then upload to AWS lambda without updating modules ** Aliases: quick, quick-push|
| rm-dist-package              | Removes unnecessary package.json from dist so it does not go to AWS Lambda|
| super-quick-push-lambda-code | Process source then upload to AWS Lambda without updating modules|
| test-mock                    | Run unit tests against AWS lambda ** Aliases: test               |
| test-local                   | Run unit tests against local server                              |
| test-lambda                  | Run unit tests against AWS lambda                                |
| test-and-cover               | Run unit tests against local server and run coverage tool ** Aliases: cover|
| upload                       | Upload zip file to lambda                                        |
| vendor                       | Compile/move vendor files to dist                                |
| watch                        | [watch-lint, watch-test]                                         |
| watch-lint                   | Watch for changed files and run lint of the file that has changed|
| watch-test                   | Watch for changed files and run unit tests when a file changes   |
| zip                          | Zip the dist directory                                           |
