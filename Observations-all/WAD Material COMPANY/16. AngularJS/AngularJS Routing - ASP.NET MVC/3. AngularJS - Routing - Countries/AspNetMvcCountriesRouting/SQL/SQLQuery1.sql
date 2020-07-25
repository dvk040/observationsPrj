create database angularjscountriesdatabase
go

use angularjscountriesdatabase
go

create table countries(
CountryID int primary key identity(1,1),
CountryName nvarchar(max),
Population bigint,
FlagURL nvarchar(max))
go

insert into countries values(
'Nigeria', 183523000,
'http://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg')

insert into countries values(
'USA', 320240000,
'http://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg')

insert into countries values(
'Russia', 146300000,
'http://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg')

insert into countries values(
'Brazil', 203769000,
'http://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg')

insert into countries values(
'India', 1265760000,
'http://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg')

insert into countries values(
'Japan', 127020000,
'http://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg')

insert into countries values(
'China', 1367780000,
'http://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg')

insert into countries values(
'Indonesia', 255461700,
'http://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg')

insert into countries values(
'Bangladesh', 157699000,
'http://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg')
go
