import pyodbc

# Datos de conexión
server = 'SERVIDOR\\SQLEXPRESS'
database = 'D100_APALATEGI'
username = 'sa'
password = 'Donostia'  # <-- Cambia esto

# Cadena de conexión
conn_str = (
    'DRIVER={SQL Server};'  # También puedes probar con {ODBC Driver 11 for SQL Server}
    f'SERVER={server};'
    f'DATABASE={database};'
    f'UID={username};'
    f'PWD={password};'
)

try:
    conn = pyodbc.connect(conn_str)
    print("✅ Conexión establecida correctamente")

    cursor = conn.cursor()

    cursor.execute("SELECT name FROM sys.tables")
    tablas = cursor.fetchall()

    print("📋 Tablas en la base de datos:")
    for row in tablas:
        print(row.name)

    print(f"\n🔢 Total de tablas: {len(tablas)}")

    conn.close()

except Exception as e:
    print("❌ Error al conectar:", e)
