import boto3
client = boto3.client('dynamodb')


def ddb_get(key, table_name):
    response = client.get_item(
        Key=key, TableName=table_name,
    )
    return response.get("Item")

def ddb_update(update_info):
    client.update_item(
    ExpressionAttributeNames=update_info.get("expression_attribute_names"),
    ExpressionAttributeValues=update_info.get("expression_attribute_values"),
    Key=update_info.get("key"),
    TableName=update_info.get("table_name"),
    UpdateExpression=update_info.get("update_expression"),
    )

