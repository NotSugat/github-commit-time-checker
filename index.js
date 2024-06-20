import "dotenv/config";

const initialReposLink = [
  "https://github.com/NotSugat/github-commit-time-checker",
  // "https://github.com/example_owner/example_repo_link",
];

const changeToAPI = (link) => {
  const splitLink = link.split("/");
  const username = splitLink[3];
  let repo = splitLink[4];

  if (repo.includes(".git")) {
    repo = repo.slice(0, -4);
  }

  return {
    apiLink: `https://api.github.com/repos/${username}/${repo}/commits`,
    owner: username,
  };
};

function convertUtcToNepaliTime(utcDate) {
  try {
    // Parse the UTC date
    const date = new Date(utcDate);

    // Add 5 hours and 45 minutes to the UTC date
    date.setUTCHours(date.getUTCHours() + 5);
    date.setUTCMinutes(date.getUTCMinutes() + 45);

    // Formatting options for en-GB (British English) with 24-hour format
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };

    // Format the date
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date,
    );

    // Return the formatted date without the comma
    return formattedDate.replace(",", "");
  } catch (error) {
    console.log("Repo not found");
  }
}

let repos = [];
let passedOwner = [];
let failedOwner = [];

const fetchCommits = async () => {
  // hackathon starting time in UTC
  const initialDate = new Date("2024-06-14T10:15:00Z");

  // hacakathon ending time in UTC
  const finalDate = new Date("2024-06-16T03:15:00Z");

  initialReposLink.map((link) => {
    repos.push(changeToAPI(link));
  });

  const fetchPromises = repos.map(async (repo) => {
    const url = repo.apiLink;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

    console.log(
      "First commit at:",
      convertUtcToNepaliTime(data[data.length - 1]?.commit.committer.date),
    );
    console.log(
      "Last commit at:",
      convertUtcToNepaliTime(data[0]?.commit.committer.date),
    );

    if (
      new Date(data[0]?.commit.committer.date) <= finalDate &&
      new Date(data[data.length - 1]?.commit.committer.date) >= initialDate
    ) {
      console.log(repo?.owner, "repo is passed\n");
      passedOwner.push(repo.owner);
    } else {
      console.log(repo?.owner, "repo is failed\n");
      failedOwner.push(repo.owner);
    }
  });

  await Promise.all(fetchPromises);

  console.log("\nPassed Owner:", passedOwner);
  console.log("\nFailed Owner:", failedOwner);
};

fetchCommits();
