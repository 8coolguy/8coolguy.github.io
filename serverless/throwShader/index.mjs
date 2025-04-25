import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  GetCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

const COUNTER_TABLE = "counters";
const DATA_TABLE = "shaders";

async function getId(){
  const command = new UpdateCommand({
    TableName: COUNTER_TABLE,
    Key: {"counter_id": "shaders"},
    UpdateExpression: "SET current_value = current_value + :p",
    ExpressionAttributeValues: {":p": 1},
    ReturnValues: "ALL_NEW",
  });

  const response = await ddb.send(command);
  return response.Attributes.current_value;
}

export const handler = async (event) => {
  // TODO implement
  console.log('event', event);
  if(event.action == "throw"){
    const nextId = await getId();

    const command = new PutCommand({
      TableName:DATA_TABLE,
      Key:{id: nextId},
      Item:{
        id:nextId,
        author:event.author,
        code:event.code,
        date_created: Math.floor(Date.now() / 1000)
      }
    });
    const response = {
      response:200,
      body:JSON.stringify(`got my new ${nextId}id`)
    }
    await ddb.send(command)
    return response;
  }else if (event.action == "catch"){
    //if the most recent upload is within 300 seconds bring the most recent shader otherwise random
    const command1 = new GetCommand({
      TableName:COUNTER_TABLE,
      Key: {"counter_id": "shaders"},
    }) 
    const counter = await ddb.send(command1);
    let size = counter.Item.current_value;
    const command2 = new GetCommand({
      TableName:DATA_TABLE,
      Key:{id: Math.ceil(Math.random() * size)}
    })
    const shader = await ddb.send(command2);
    const response = {
      statusCode: 200,
      body: JSON.stringify(shader.Item),
    };
    return response;
  }

  const response = {
    statusCode: 400,
    body: JSON.stringify("you need to have a action key"),
  }
  return response;
  
};
