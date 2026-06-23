import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({
  region: "ap-south-1"
});


const dynamodb =
  DynamoDBDocumentClient.from(client);


export const handler = async () => {


  const response =
    await dynamodb.send(
      new ScanCommand({
        TableName: "Students"
      })
    );


  return {
    statusCode: 200,


    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*"
    },


    body: JSON.stringify(response.Items)
  };
};
