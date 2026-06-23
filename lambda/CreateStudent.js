import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand
} from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient({
  region: "ap-south-1"
});


const dynamodb =
  DynamoDBDocumentClient.from(client);


export const handler = async (event) => {


  try {


    const data = JSON.parse(event.body);


    const student = {
      id: data.id,
      name: data.name,
      course: data.course
    };


    await dynamodb.send(
      new PutCommand({
        TableName: "Students",
        Item: student
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
        message: "Student Added Successfully",
        student
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
