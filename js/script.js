$(document).ready(function() {

	$('#searchUser').on('keyup', function(e){

		var username = e.target.value;



        //make github request
		$.ajax({
			url:'https://api.github.com/users/'+username,
			data:{
				client_id:'44e39dbe066a87f604d7',
				client_secret:'b471646a0f38d50d7e4e095e8450a487a05e0a03',
			}

		}).done(function(user){

			$.ajax({
				url:'https://api.github.com/users/'+username+'/repos',
			    data:{
					client_id:'44e39dbe066a87f604d7',
					client_secret:'b471646a0f38d50d7e4e095e8450a487a05e0a03',
					sort: 'created: asc',
					per_page: 5
			    }


			}).done(function(repos){
				$.each(repos, function(index, repo){
					$('#repos').append(`

						<div class="well">
						  <div class="row">

						    <div class="col-md-7">

						      <strong> ${repo.name} </strong> ${repo.description}

						    </div>

						    <div class="col-md-3">

						    <span class="label label-default">Public Repos: ${repo.forks_count}</span>
							<span class="label label-primary">Public Gist: ${repo.watchers_count}</span>
							<span class="label label-success">followers: ${repo.stargazers_count}</span>

						    </div>

						    <div class="col-md-2">

						    <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo page</a>


						    </div>



						  </div>




						</div>
						`);
				});
			});

			$('#profile').html(`

				<div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                       <div class="col-md-3">
                         <img src="${user.avatar_url}" class="thumbnail avatar" />
                         <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">view Profile</a>
                       </div>
                       <div class="col-md-9">

	                        <span class="label label-default">Public Repos: ${user.public_repos}</span>
							<span class="label label-primary">Public Gist: ${user.public_gists}</span>
							<span class="label label-success">followers: ${user.followers}</span>
							<span class="label label-info">following: ${user.following}</span>
							<br>
							<br>

							<ul class="list-group">

							   <li class="list-group-item">Company: ${user.company}</li>
							   <li class="list-group-item">Website/blog: ${user.blog}</li>
							   <li class="list-group-item">Locaton: ${user.location}</li>
							   <li class="list-group-item">Member Since: ${user.created_at}</li>



							</ul>

                       </div>
                    </div>
                  </div>
               </div>
               <h3 class="page-header">Latest Repos</h3>
               <div id="repos">


               </div>

				`);
			
		});

	});

});
