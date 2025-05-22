""" from views.employees import get_all_employees, add_employee

if __name__ == "__main__":

    nombre = input("Cual es tu nombre")
    new_emp = add_employee(9000, nombre, 'DEVELOPER')


    emps = get_all_employees()
    for emp in emps:
        print(emp) """

from views.departamentos import get_all_departamentos, add_departamento

if __name__ == "__main__":

    nombre_dept = input("Cual es el departa,mento")
    new_dept = add_departamento(6666, nombre_dept, 'LESAKA', 56666)


    depts = get_all_departamentos()
    for dept in depts:
        print(dept)

    