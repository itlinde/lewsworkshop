gatekeeping

`supabase db pull` is something you should be running everytime the remote changes

ok so here is how to do migrations

`supabase migration new {name}`
replace `{name}` with like the name of the migration type shiii

it will create a sql file and you edit it

`supabase db push` applies these to remote db
`supabase db link` if you get errors n shi

and uhhhh