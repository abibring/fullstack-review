module.exports = {

  arrayOfRepoNameAndOwner: (array) => {
    return array.map(repo => ({ repo: repo.name, owner: repo.owner.login }));
  },

  removeDuplicatesAndSortByRanking: async (arr) => {
    let hash = {};
    let repos = [];
    await arr.map(repo => {
      if (!hash[repo.url]) {
        hash[repo.url] = true;
        repos.push(repo);
      }
    });
    console.log('\n\n this is repos', repos)
    return repos.sort((a, b) =>  b.ranking - a.ranking);
  }, 

  addRankingToRepos: (arr) => {
    arr.map(repo => {
      console.log('THIS IS REPO AD RANKING', repo)
      const now = new Date();
      const typeOfEvent = repo.html_url.split('/')[5].toString();
      let secondsPast;
      if (typeOfEvent === 'pull') {
        const createdAtPR = new Date(repo.created_at);
        secondsPast = (now.getTime() - createdAtPR.getTime());
        repo.ranking = (200 * Math.pow(1 / secondsPast, 2));
      } else if (typeOfEvent === 'issues') {
        const updatedAt = new Date(repo.updated_at);
        secondsPast = (now.getTime() - updatedAt.getTime());
        repo.ranking = (225 * Math.pow(1 / secondsPast, 2));
      } else if (typeOfEvent === 'releases') {
        const publishedAt = new Date(repo.published_at);
        secondsPast = (now.getTime() - publishedAt.getTime());
        repo.ranking = (300 * Math.pow(1 / secondsPast, 2));
      }
    });
  }
}

