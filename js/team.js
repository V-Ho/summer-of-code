// get information about the organizers

var TeamMembers = function() {
	this.init();
};

TeamMembers.prototype = {

	//queryUrl: 'http://teams.railsgirlssummerofcode.org/contributors.json',
	queryUrl: '/js/teamdata.json',
	queryData: {},
	roles: [],

	init: function() {
		console.log(this.roles);
		var self = this;
		$.get(this.queryUrl)
			.done(function(data) {

				console.log(data);
				this.queryData = data;
				self.getRolesFromData(this.queryData);
				self.buildPage(this.queryData);

			}).fail(function() {
				console.log('whoopsie');
			}).always(function() {
				console.log('always');
			});
	},
	getRolesFromData: function(data) {
		var self = this;
		$.each(data, function(k, v){
			$.each(v.roles, function(key, val) {
				if($.inArray(val.name, self.roles) === -1) {
					self.roles.push(val.name);
				}
			});
		});
	},
	buildPage: function(data) {
		var self = this;
		var output = '';
		var avatar = '';
		$.each(this.roles, function(k, v) {
			output += '<h2 class="color--red">'+ self.capitalizePluralize(v) +'</h2>';
			output += '<ul class="list--none list--team Grid--5">';
			$.each(data, function(key, val) {
				$.each(val.roles, function(kr, vr) {
					if(vr.name === v) {
						if(val.avatar_url === null) {
							avatar = '/img/default-avatar.jpg';
						} else {
							avatar = val.avatar_url;
						}
						output += '<li><figure><img src="'+ avatar +'" alt="">';
						output += '</figure><figcaption><p>'+ val.name_or_handle +'<br>';
						output += '<a href="//github.com/'+ val.github_handle +'"><i class="fa fa-github"></i>'+ val.github_handle +'</a><br>';
						if(val.twitter_handle !== null) {
							output += '<a href="//twitter.com/'+ val.twitter_handle +'"><i class="fa fa-twitter"></i>'+ val.twitter_handle +'</a><br>';
						} else {
							output += '<a href="//twitter.com/'+ val.twitter_handle +'"></a><br>';
						}
						output += '</p></figcaption></li>';
					}
				});
			});
			output += '</ul>';
		});
		$('#js-team').append(output);
	},
	capitalizePluralize: function(string) {
		var suffix = 's';
		if (string === 'coach') {
			suffix = 'es';
		}
		return string.charAt(0).toUpperCase() + string.slice(1) + suffix;
	}

};

if($('#js-team').length > 0) {
	var team = new TeamMembers();
}

