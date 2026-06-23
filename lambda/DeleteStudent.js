import { DynamoDBClient } from "@aws-sdk/client-dynamodb";


import {
  DynamoDBDocumentClient,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({
  region: "ap-south-1"
});


const dynamodb =
  DynamoDBDocumentClient.from(client);


export const handler = async (event) => {


  const data =
    JSON.parse(event.body);


  await dynamodb.send(
    new DeleteCommand({


      TableName: "Students",


      Key: {
        id: data.id
      }


    })
  );


  return {
    statusCode: 200,


    body: JSON.stringify({
      message:
        "Student Deleted Successfully"
    })
  };
};


