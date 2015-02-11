var db = Ti.Database.open("_alloy_");
db.execute("create table if not exists reviews (author TEXT, content TEXT, id INTEGER, url TEXT, movieId INTEGER)");
db.execute("create table if not exists cast_members (cast_id INTEGER, character TEXT, credit_id STRING, id INTEGER, name TEXT, position INTEGER, profile_path TEXT, movieId INTEGER)");

db.close();
db = null;
