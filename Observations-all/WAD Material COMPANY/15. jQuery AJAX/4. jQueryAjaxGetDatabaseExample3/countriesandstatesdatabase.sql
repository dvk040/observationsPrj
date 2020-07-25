create database countriesandstatesdatabase
go

use countriesandstatesdatabase
go

create table Countries(
CountryID int primary key,
CountryName nvarchar(max))
go

create table States(
StateID int primary key,
StateName nvarchar(max),
CountryID int references Countries(CountryID))
go

insert into Countries values(1, 'India')
insert into Countries values(2, 'UK')
insert into Countries values(3, 'USA')
go

insert into States values(1, 'a', 1)
insert into States values(2, 'b', 1)
insert into States values(3, 'c', 1)

insert into States values(4, 'd', 2)
insert into States values(5, 'e', 2)
insert into States values(6, 'f', 2)

insert into States values(7, 'g', 3)
insert into States values(8, 'h', 3)
insert into States values(9, 'i', 3)
go
