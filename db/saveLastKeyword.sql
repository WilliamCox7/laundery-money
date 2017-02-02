insert into expense_manager (id, category, subcategory, keyword)
values ($1, $2, $3, $4)
returning id;
