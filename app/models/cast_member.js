exports.definition = {
	config: {
		columns: {
		    "cast_id": "INTEGER",
		    "character": "TEXT",
		    "credit_id": "PRIMARY KEY STRING",
		    "id": "INTEGER",
		    "name": "TEXT",
		    "position": "INTEGER",
		    "profile_path": "TEXT",
		    "movieId": "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "cast_member",
			idAttribute: "credit_id"
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
			getCastByMovieId:function(id) {
				this.fetch({
					query: "SELECT * FROM cast_members WHERE movieId = "+id
				});
			},
			
			comparator: function(model) {
				return model.get('position');
			}
		});

		return Collection;
	}
};