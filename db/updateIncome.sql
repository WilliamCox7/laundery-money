update incomes
set source = $2, amount = $3, period = $4, next = $5, pattern = $6, days = $7, deduction = $8, percent = $9
where id = $1 and source = $2
returning id;
