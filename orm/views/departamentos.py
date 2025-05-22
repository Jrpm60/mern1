from db_pg import get_session
from models.dept import Dept

def get_all_departamentos():
    # Crear una sesión de conexión a la base de datos
    session = get_session()
    try:
        # Consultar todos los registros de la tabla Emp
        departamentos = session.query(Dept).all()
        # Devolver la lista de empleados
        return departamentos
    finally:
        # Cerrar la sesión para liberar recursos
        session.close()

def get_departamento_by_deptno(deptno):
    # Crear una sesión de conexión a la base de datos
    session = get_session()
    try:
        # Consultar un empleado cuyo número (empno) coincida con el dado
        # one_or_none() devuelve un único objeto o None si no existe
        departamento = session.query(Dept).filter(Dept.deptno == deptno).one_or_none()
        # Devolver el empleado encontrado o None
        return departamento
    finally:
        # Cerrar la sesión para liberar recursos
        session.close()

def get_departamentos_by_loc(loc_title):
    # Crear una sesión de conexión a la base de datos
    session = get_session()
    try:
        # Consultar todos los empleados cuyo trabajo coincida con job_title
        departamentos = session.query(Dept).filter(Dept.loc == loc_title).all()
        # Devolver la lista de empleados que cumplen el filtro
        return departamentos
    finally:
        # Cerrar la sesión para liberar recursos
        session.close()

def add_departamento(deptno, dname, loc, budget):
    session = get_session()
    try:
        # Crear una nueva instancia de Emp con los datos recibidos
        new_departamento = Dept(deptno=deptno, dname=dname, loc=loc, budget=budget)
        
        # Agregar el nuevo empleado a la sesión
        session.add(new_departamento)
        
        # Confirmar la transacción para guardar los cambios en la base de datos
        session.commit()
        
        # Opcional: devolver el objeto agregado
        return new_departamento
    except Exception as e:
        # En caso de error, hacer rollback para deshacer cambios pendientes
        session.rollback()
        raise e
    finally:
        # Cerrar la sesión para liberar recursos
        session.close()



"""


session.query(Emp) \
    .filter(Emp.sal > 50000) \
    .order_by(Emp.ename) \
    .limit(10) \
    .all()


"""