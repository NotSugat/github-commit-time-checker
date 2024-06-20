# GitHub Commit Time Checker

This project checks the commit times of specified GitHub repositories to determine if any commits were made within a specified date range (e.g., during a hackathon).

## Prerequisites

- Node.js installed on your machine
- A GitHub personal access token with the necessary permissions to read commit data from repositories.

## Setup

1. Clone the repository or create a new directory and add the provided script.
2. Create a `.env` file in the root directory of your project.
3. Add your GitHub personal access token to the `.env` file:

```plaintext
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token_here
```

## Running the Script

1. Install the necessary dependencies:

```bash
npm i
```

2. Update the `initialReposLink` array in the script with the GitHub repository links you want to check:

```javascript
const initialReposLink = [
  "https://github.com/example_owner/example_repo",
  // Add more repository links here
];
```

3. Update the `initialDate` and `finalDate` variables in the script to match the date range you want to check. **These dates should be in UTC**.

```javascript
const initialDate = new Date("2024-06-14T10:15:00Z"); // Hackathon starting time
const finalDate = new Date("2024-06-16T03:15:00Z");   // Hackathon ending time
```

4. Run the script:

```bash
node index.js
```

## Conclusion

By following the steps above, you can run the script to check if commits in specified GitHub repositories were made within a particular date range. This can be useful for verifying participation in events like hackathons.

---
