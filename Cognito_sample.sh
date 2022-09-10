#!/bin/bash


# Create Cognito User Pool
awslocal cognito-idp create-user-pool --pool-name=test_pool
pool_id=<my_pool_id>

# Create Cognito User Pool Client
awslocal cognito-idp create-user-pool-client --client-name=test_client --user-pool-id=$pool_id
client_id=<my_client_id>

# SignUp Client in User Pool
awslocal cognito-idp sign-up --client-id=$client_id --username=tester_user --password=Pass12345@ --user-attributes Name=email,Value=tester@test.com

# Confirm SignUp
awslocal cognito-idp confirm-sign-up --client-id=$client_id --username=tester_user --confirmation-code=XXXXXXXXXXXX

# Admin Confirm SignUp
awslocal cognito-idp admin-confirm-sign-up --username=tester_user --user-pool-id=$pool_id

# List Cognito User Pools
awslocal cognito-idp list-users --user-pool-id=$pool_id

# Delete Cognito User Pool Client
awslocal cognito-idp delete-user-pool-client --client-id=$client_id --user-pool-id=$pool_id

# Delete Cognito User Pool
awslocal cognito-idp delete-user-pool --user-pool-id=$pool_id
