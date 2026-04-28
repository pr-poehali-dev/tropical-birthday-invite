import json
import os
import psycopg2

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "tropic2026")
SCHEMA = "t_p43504046_tropical_birthday_in"

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """RSVP: сохранение ответов гостей и получение списка для администратора."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = (body.get("name") or "").strip()
        answer = body.get("answer")

        if not name or answer not in ("yes", "no"):
            return {
                "statusCode": 400,
                "headers": cors,
                "body": json.dumps({"error": "Укажите имя и ответ (yes/no)"}),
            }

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.rsvp_responses (name, answer) VALUES (%s, %s)",
            (name, answer),
        )
        conn.commit()
        cur.close()
        conn.close()

        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"ok": True}),
        }

    if method == "GET":
        params = event.get("queryStringParameters") or {}
        password = params.get("password", "")

        if password != ADMIN_PASSWORD:
            return {
                "statusCode": 403,
                "headers": cors,
                "body": json.dumps({"error": "Неверный пароль"}),
            }

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, name, answer, created_at FROM {SCHEMA}.rsvp_responses ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        guests = [
            {"id": r[0], "name": r[1], "answer": r[2], "created_at": r[3].isoformat()}
            for r in rows
        ]
        yes_count = sum(1 for g in guests if g["answer"] == "yes")
        no_count = sum(1 for g in guests if g["answer"] == "no")

        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({
                "guests": guests,
                "total": len(guests),
                "yes": yes_count,
                "no": no_count,
            }),
        }

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}
