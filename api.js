const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(7000, ()=>{
    console.log("Sever is now listening at port 7000");
})

client.connect();

app.get('/employee', (req, res)=>{
    console.log('hey');
    client.query(`Select * from employee`, (err, result)=>{
        if(!err){
            res.json(result.rows); // retirn data based on the time stamp never experieced before 
        }
    });
    client.end;
})

app.get('/employee/:id', (req, res)=>{
    client.query(`Select * from employee where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

const bodyParser = require("body-parser"); // converting app req body into objects
app.use(bodyParser.json());


app.post('/employee', (req, res)=> {
    const employee = req.body;
    console.log('inside post');

    /*
    INSERT INTO 
public.employee(name)
VALUES('jane');


trigger ---->>>> written code in database >>>>>
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

*/


    let insertQuery = `insert into employee(name) 
                       values('${employee.name}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.delete('/employee/:id', (req, res)=> {   //deleteing a single id
    let insertQuery = `delete from employee where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})




