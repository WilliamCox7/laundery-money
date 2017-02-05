insert into users (username, password, fb_id, gplus_id, first, last, email)
values ($1, $2, $3, $4, $5, $6, $7)
returning *;
