exports.definition = {
	config: {
		columns: {
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