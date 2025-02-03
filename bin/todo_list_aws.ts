#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TodoListApiStack } from '../lib/todoListApi-stack';
import { TodoTaskAppStack } from '../lib/todoTaskApp-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
const tags = {
  cost: "todo_list",
  team: "devops",
  project: "todo_list",
};

const todoTaskAppStack = new TodoTaskAppStack(app, "TodoTaskAppStack",{
  env: env,
  tags: tags
})

const todoListApiStack = new TodoListApiStack(app, "TodoListApiStack", {
  lambdaTodoTaskApp: todoTaskAppStack.taskHandler,
  env: env,
  tags: tags
})
todoListApiStack.addDependency(todoTaskAppStack)