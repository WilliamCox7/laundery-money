update loans
set payee = $2, amount = $3, payment = $4, rate = $5, type = $6, term = $7, termlength = $8, firstpay = $9
where id = $1 and payee = $2
returning id;
