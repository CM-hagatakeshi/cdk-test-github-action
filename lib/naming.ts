export class Naming {
  public static appName: string = "cdk-github-action";
  public static env: string = process.env.ENV ? process.env.ENV : "dev";

  public static of(name: string): string {
    return `${this.appName}-${this.env}-${name}`;
  }
}