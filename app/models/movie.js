exports.definition = {
	config: {
		columns: {
		    "id": "PRIMARY KEY INTEGER",
		    "original_title": "TEXT",
		    "overview": "TEXT",
			"genres": "TEXT",
		    "poster_path":"TEXT",
		    "vote_average": "REAL",
		    "vote_count": "INTEGER",
		    "trailers": "TEXT",
		    "release_date":"TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "movie",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};