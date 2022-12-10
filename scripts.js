/*
select * from public.employee;

select * from public.employeeCount

INSERT INTO 
public.employee(name)
VALUES('jane');




CREATE OR REPLACE TRIGGER trig_employees_cnt
	AFTER INSERT
	ON public.employee
	FOR EACH ROW
	EXECUTE FUNCTION employee_cnt();
	
	
    CREATE OR REPLACE FUNCTION employee_cnt()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
AS $BODY$
declare row_cnt int;
BEGIN 
	row_cnt := (select count(*) + 1 from public.employee);
	insert into employeeCount
	select 'TOTAL_COUNT', row_cnt;
--update employeeCount set count = select count(*) + 1 from public.employee;
	RETURN NULL;
END;
$BODY$

****************************************************************************************
for getting all emppoyees
Select * from employee


getting a single emoployee
Select * from employee where id=${req.params.id}












*/