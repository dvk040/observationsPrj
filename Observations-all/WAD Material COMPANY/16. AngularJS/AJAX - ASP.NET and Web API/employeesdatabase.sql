create database employeesdatabase
go

use employeesdatabase
go

create table Employees(
EmpID int primary key,
EmpName nvarchar(max),
Salary decimal)
go

insert into Employees values(1, 'Scott', 4000)
insert into Employees values(2, 'Allen', 5000)
insert into Employees values(3, 'Jones', 6000)
go

