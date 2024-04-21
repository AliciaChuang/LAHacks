import boto3

def ddb_get(key, table_name):
    client = boto3.client('dynamodb')
    response = client.get_item(
        Key=key, TableName=table_name,
    )
    return response.get("Item")

def ddb_update(update_info):
    client = boto3.client('dynamodb')
    client.update_item(
    ExpressionAttributeNames=update_info.get("expression_attribute_names"),
    ExpressionAttributeValues=update_info.get("expression_attribute_values"),
    Key=update_info.get("key"),
    TableName=update_info.get("table_name"),
    UpdateExpression=update_info.get("update_expression"),
    )

def ddb_update_post(raw_info):
    update_post_info = {
        "expression_attribute_names": {
            '#EN': 'event_name',
            '#ET': 'event_time',
            '#C': 'category',
            '#D': 'description',
            '#L': 'location'
        },
        "expression_attribute_values": {
            ':en': {'S': raw_info.get("event_name")},
            ':et': {'S': raw_info.get("event_time")},
            ':c': {'S': raw_info.get("category")},
            ':d': {'S': raw_info.get("description")},
            ':l': {'M': {'lat': {'N': str(raw_info.get("location").get("lat"))}, 'lng': {'N': str(raw_info.get("location").get("lng"))}}}
        },
        "key": {
            'post_id': {
                'S': raw_info.get("post_id"),
            },
            'user_id': {
                'S': raw_info.get("user_id"),
            },
        },
        "table_name": "PogoPosts",
        "update_expression": "SET #EN = :en, #ET = :et, #C = :c, #D = :d, #L = :l"
    }

    ddb_update(update_post_info)
