-- SCHEMA: scott

-- DROP SCHEMA IF EXISTS scott ;

CREATE SCHEMA IF NOT EXISTS scott
    AUTHORIZATION postgres;

-- Table: scott.dept

-- DROP TABLE IF EXISTS scott.dept;

CREATE TABLE IF NOT EXISTS scott.dept
(
    deptno integer NOT NULL,
    dname character varying(14) COLLATE pg_catalog."default",
    loc character varying(13) COLLATE pg_catalog."default",
    CONSTRAINT dept_pkey PRIMARY KEY (deptno)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS scott.dept
    OWNER to postgres;

-- Table: scott.emp

-- DROP TABLE IF EXISTS scott.emp;

CREATE TABLE IF NOT EXISTS scott.emp
(
    empno integer NOT NULL,
    ename character varying(10) COLLATE pg_catalog."default",
    job character varying(9) COLLATE pg_catalog."default",
    mgr integer,
    hiredate date,
    sal numeric(7,2),
    comm numeric(7,2),
    deptno integer,
    CONSTRAINT emp_pkey PRIMARY KEY (empno),
    CONSTRAINT emp_deptno_fkey FOREIGN KEY (deptno)
        REFERENCES scott.dept (deptno) MATCH SIMPLE
        ON UPDATE SET NULL
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS scott.emp
    OWNER to postgres;


-- Insert sample rows into DEPT
INSERT INTO scott.dept (deptno, dname, loc) VALUES
(10, 'ACCOUNTING', 'NEW YORK'),
(20, 'RESEARCH', 'DALLAS'),
(30, 'SALES', 'CHICAGO'),
(40, 'OPERATIONS', 'BOSTON');

-- Insert sample rows into EMP
INSERT INTO scott.emp (empno, ename, job, mgr, hiredate, sal, comm, deptno) VALUES
(7839, 'KING',   'PRESIDENT', NULL,     DATE '1981-11-17', 5000.00, NULL, 10),
(7566, 'JONES',  'MANAGER',   7839,     DATE '1981-04-02', 2975.00, NULL, 20),
(7698, 'BLAKE',  'MANAGER',   7839,     DATE '1981-05-01', 2850.00, NULL, 30),
(7782, 'CLARK',  'MANAGER',   7839,     DATE '1981-06-09', 2450.00, NULL, 10),
(7788, 'SCOTT',  'ANALYST',   7566,     DATE '1982-12-09', 3000.00, NULL, 20),
(7902, 'FORD',   'ANALYST',   7566,     DATE '1981-12-03', 3000.00, NULL, 20),
(7844, 'TURNER', 'SALESMAN',  7698,     DATE '1981-09-08', 1500.00,  0.00, 30),
(7900, 'JAMES',  'CLERK',     7698,     DATE '1981-12-03',  950.00, NULL, 30),
(7654, 'MARTIN', 'SALESMAN',  7698,     DATE '1981-09-28', 1250.00, 1400.00, 30),
(7499, 'ALLEN',  'SALESMAN',  7698,     DATE '1981-02-20', 1600.00, 300.00, 30),
(7521, 'WARD',   'SALESMAN',  7698,     DATE '1981-02-22', 1250.00, 500.00, 30),
(7934, 'MILLER', 'CLERK',     7782,     DATE '1982-01-23', 1300.00, NULL, 10),
(7876, 'ADAMS',  'CLERK',     7788,     DATE '1983-01-12', 1100.00, NULL, 20),
(7369, 'SMITH',  'CLERK',     7902,     DATE '1980-12-17',  800.00, NULL, 20);