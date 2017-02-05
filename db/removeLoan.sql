delete from loans where id = $1 and payee = $2
returning id;
