var args = arguments[0] || {};
var model = Alloy.createModel("movie");
model.fetch({id:args.id});

$.movie.set(model.toJSON()[0]);
