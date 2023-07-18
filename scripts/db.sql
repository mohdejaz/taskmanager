07/18/23
ALTER TABLE Tasks ADD COLUMN update_ts TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP();
alter table Tasks alter column created_date rename to create_dt;
alter table tasks drop column run_date;
-- Users
drop table if exists Users;
create table Users (
id int not null primary key auto_increment,
first_name varchar(50) not null,
last_name varchar(50) not null,
login varchar(50) not null,
password varchar(100) not null,
unique(login),
unique(first_name, last_name)
);
insert into Users(first_name, last_name, login, password) values ('Ejaz','Mohammed','ejazm','5fbtt61');
alter table tasks add column user_id int not null default 1;
alter table tasks add constraint fk1 foreign key (user_id) references Users(id);
-- Groups
drop table if exists Groups;
create table Groups (
id int not null primary key auto_increment,
name varchar(50) not null,
unique(name)
);
insert into Groups (name) values ('Unknown');
alter table tasks add column grp_id int not null default 1;
alter table tasks add constraint fk2 foreign key (grp_id) references Groups(id);
