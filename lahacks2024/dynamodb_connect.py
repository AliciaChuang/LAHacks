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


def ddb_create_account(raw_info):
    update_new_account_info = {
        "expression_attribute_names": {
            '#FC': 'friend_code',
            '#GN': 'game_name'
        },
        "expression_attribute_values": {
            ':fc': {'S': raw_info.get("friend_code")},
            ':gn': {'S': raw_info.get("game_name")},
        },
        "key": {
            'user_id': {
                'S': raw_info.get("user_id"),
            },
            'password': {
                'S': raw_info.get("password"),
            },
        },
        "table_name": "PogoUsers",
        "update_expression": "SET #FC = :fc, #GN = :gn"
    }

    ddb_update(update_new_account_info)


def ddb_login_validation(raw_info):
    response = client.query(
        ExpressionAttributeValues={
            ':v1': {
                'S': raw_info.get("user_id"),
            },
            ':v2': {
                'S': raw_info.get("password"),
            },
        },
        KeyConditionExpression='user_id = :v1 and password = :v2',
        TableName='PogoUsers',
    )
    if response.get("Count") != 0:
        return True
    else:
        return False