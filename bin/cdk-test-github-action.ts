#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkTestGithubActionStack } from '../lib/cdk-test-github-action-stack';

const app = new cdk.App();

const defaultProps = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

new CdkTestGithubActionStack(app, 'CdkTestGithubActionStack', defaultProps);
