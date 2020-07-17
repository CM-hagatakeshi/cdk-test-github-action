import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import { Naming } from './naming';

export class CdkTestGithubActionStack extends cdk.Stack {
  private LambdaDefaultRuntime = lambda.Runtime.PYTHON_3_7
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // =================================================================
    // Lambdaへ必要な権限をRoleへ設定する
    const policyName = Naming.of("policy");
    const policy = new iam.ManagedPolicy(this, policyName, {
      managedPolicyName: policyName,
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ],
          resources: ["arn:aws:logs:*:*:*"],
        }),
      ],
    });

    const roleName = Naming.of("role");
    const Lambda_ROLE = new iam.Role(this, roleName, {
      roleName: roleName,
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        policy,
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMReadOnlyAccess'),
      ],
    });

    // =================================================================
    // Lambdaの作成
    const eventAggregator_LambdaHandler = new lambda.Function(this, "cdkTestLambdaHandler", {
      functionName: Naming.of('cdkTestLambda'),
      code: lambda.Code.asset("./resources/cdkTestLambda"),
      handler: "cdkTestLambda.cdk_test_Lambda_handler",
      role: Lambda_ROLE,
      environment:{
        "STAGE": this.node.tryGetContext(Naming.env).stage,
        "LOG_LEVEL": this.node.tryGetContext(Naming.env).lambda.logLevel,
      },
      runtime: this.LambdaDefaultRuntime,
      memorySize: this.node.tryGetContext(Naming.env).lambda.defaultMemorySize,
      timeout: cdk.Duration.seconds(this.node.tryGetContext(Naming.env).lambda.defaultTimeOut),
    });

  }
}
