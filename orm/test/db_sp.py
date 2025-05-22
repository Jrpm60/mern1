from sqlalchemy import text
from db_pg import get_session

def upsert_libro(id_socio, nombre, correo):
    session = get_session()
    try:
        session.execute(
            text ("CALL biblioteca.verif_correo(:id_socio, :nombre, :correo)"),
            {"id_socio": id_socio, "nombre": nombre, "correo": correo}
        )
        session.commit()  # Important: commit the transaction
        print("Upsert executed successfully.")
    except Exception as e:
        session.rollback()
        print(f"Error: {e}")
    finally:
        session.close()


if __name__ == '__main__':
    upsert_libro(2, 'Carlos Pérez', 'carlos@correo.com')