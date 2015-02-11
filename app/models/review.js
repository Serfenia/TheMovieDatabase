exports.definition = {
	config: {
		columns: {
		    "author": "TEXT",
		    "content": "TEXT",
		    "id": "PRIMARY KEY INTEGER",
		    "url": "TEXT",
		    "movieId": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "review",
			idAttribute: 'id'
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
			getReviewsByMovieId:function(id) {
				this.fetch({
					query: "SELECT * FROM reviews WHERE movieId = "+id
				});
			}
		});

		return Collection;
	}
};