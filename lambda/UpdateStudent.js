import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({
  region: "ap-south-1"
});


const dynamodb =
  DynamoDBDocumentClient.from(client);


export const handler = async (event) => {


  try {


    const data = JSON.parse(event.body);


    await dynamodb.send(
      new UpdateCommand({
        TableName: "Students",


        Key: {
          id: data.id
        },


        UpdateExpression:
          "SET #n = :name, course = :course",


        ExpressionAttributeNames: {
          "#n": "name"
        },


        ExpressionAttributeValues: {
          ":name": data.name,
          ":course": data.course
        }
      })
    );


    return {
      statusCode: 200,


      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*"
      },


      body: JSON.stringify({
        message: "Student Updated Successfully"
      })
    };


  } catch (error) {


    console.log(error);


    return {
      statusCode: 500,


      headers: {
        "Access-Control-Allow-Origin": "*"
      },


      body: JSON.stringify({
        error: error.message
      })
    };
  }
};

