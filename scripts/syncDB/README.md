NOT DONE
hi! run this whenever we want to sync our dev database with our prod.
`node scripts/syncDB`
there are easier more built-in ways to do this, but 
1. while i was testing the way to do it (supabase local) was crazyyyyy slow and
2. other ways can result in a complete rewrite. i want to instead keep the data in our dev database, just upsert everything from prod into it.
3. sounds cool "oh wow look i built a custom migration script to sync our dev database with our prod"
now that i am thinking about it, was this worth it? sometimes i be working on this project like olivia has a gun to my head and i need to ship things NOW and sometimes i be working like i am writing the backbone code for google.