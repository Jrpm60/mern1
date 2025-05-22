from sqlalchemy import text
from db_pg import get_session

def test_connection(): 

    session = get_session()

    try:
        # Execute raw SQL inside a session
        result = session.execute(text("SELECT * FROM biblioteca.vw_autor_libro;"))
        rows = result.fetchall()
        for row in rows:
            print(row)
    finally:
        session.close()


if __name__ == '__main__':
    test_connection()