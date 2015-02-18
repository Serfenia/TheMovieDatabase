exports.definition = {
	config: {
		columns: {
			name: "TEXT",
			biography: "TEXT",
			birthday: "TEXT",
			profile_path: "TEXT",
			id: "INTEGER"
		},
		adapter: {
			type: "sql",
			collection_name: "person",
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