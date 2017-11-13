const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  userId: Number,
  repoId: { type : Number , index: { unique: true }, required : true, dropDups: true },
  username: String,
  reponame: String,
  userLink: String,
  repoLink: String,
  repoDescription: String,
  userImage: String,
  stargazer: Number

});

let Repos = mongoose.model('Repos', repoSchema);

let save = (rep) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var dbRepo = new Repos({ 
    userId: rep.owner.id,
    repoId: rep.id,
    username: rep.owner.login,
    reponame: rep.name,
    userLink: rep.owner.url,
    repoLink: rep.html_url,
    repoDescription: rep.description || 'none',
    userImage: rep.owner.avatar_url,
    stargazer: rep.stargazers_count || 0
  });

  dbRepo.save(function (err, dbRepo) {
  if (err) return console.error(err);
  });
}

let find = (callback) => {
  Repos.find(function (err, repos) {
  if (err) return console.error(err);
  callback(repos);
}).sort( { stargazer: -1 } ).limit( 25 )
  


}

module.exports.save = save;
module.exports.find = find;
