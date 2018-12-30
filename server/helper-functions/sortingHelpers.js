module.exports = {

  arrayOfRepoNameAndOwner: function(array) {
    return array.map(repo => ({ repo: repo.name, owner: repo.owner.login }));
  },

  updateRanking: function(arr) {
    let hash = {};
    let repos = [];
    arr.map(repo => {
      if (!hash[repo.url]) {
        hash[repo.url] = true;
        repos.push(repo);
      }
    });
    return repos.sort((a, b) =>  b.ranking - a.ranking);
  }, 

  sortEventsAndGiveRanking: function(arr) {
    arr.map(repo => {
      const now = new Date();
      const typeOfEvent = repo.html_url.split('/')[5].toString();
      let secondsPast;
      if (typeOfEvent === 'pull') {
        const createdAtPR = new Date(repo.created_at);
        secondsPast = (now.getTime() - createdAtPR.getTime());
        repo.ranking = (100 * Math.pow(1 / secondsPast, 2));
      } else if (typeOfEvent === 'issues') {
        const updatedAt = new Date(repo.updated_at);
        secondsPast = (now.getTime() - updatedAt.getTime());
        repo.ranking = (150 * Math.pow(1 / secondsPast, 2));
      } else if (typeOfEvent === 'releases') {
        const publishedAt = new Date(repo.published_at);
        secondsPast = (now.getTime() - publishedAt.getTime());
        repo.ranking = (500 * Math.pow(1 / secondsPast, 2));
      }
    });
  }
}

