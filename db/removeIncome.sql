delete from incomes where id = $1 and source = $2
returning id;
