const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Helper configuration for Axios headers
const githubAuthHeader = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

app.get('/api/analyze', async (req, res) => {
    const { repoUrl } = req.query;
    if (!repoUrl) return res.status(400).json({ error: 'Repository URL is required' });

    try {
        // Extract owner and repo name from URL (e.g., https://github.com/facebook/react)
        const matches = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!matches) return res.status(400).json({ error: 'Invalid GitHub URL format' });

        const [_, owner, repo] = matches;
        const cleanRepo = repo.replace('.git', '');

        // Fetch parallel data from GitHub REST API v3
        const [repoData, languagesData, commitsData] = await Promise.all([
            axios.get(`https://api.github.com/repos/${owner}/${cleanRepo}`, { headers: githubAuthHeader }),
            axios.get(`https://api.github.com/repos/${owner}/${cleanRepo}/languages`, { headers: githubAuthHeader }),
            axios.get(`https://api.github.com/repos/${owner}/${cleanRepo}/commits?per_page=30`, { headers: githubAuthHeader })
        ]);

        // Process Language Percentages
        const totalBytes = Object.values(languagesData.data).reduce((a, b) => a + b, 0);
        const languages = Object.entries(languagesData.data).map(([lang, bytes]) => ({
            name: lang,
            percentage: ((bytes / totalBytes) * 100).toFixed(1)
        }));

        // Mocking daily aggregate timeline data from the recent 30 commits for the chart layout
        const commitActivity = commitsData.data.map((c, i) => ({
            date: new Date(c.commit.author.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            commits: Math.floor(Math.random() * 150) + 50 // UI-placeholder simulation tracking
        })).reverse();

        res.json({
            name: `${owner}/${cleanRepo}`,
            description: repoData.data.description,
            stars: repoData.data.stargazers_count,
            forks: repoData.data.forks_count,
            openIssues: repoData.data.open_issues_count,
            mainLanguage: repoData.data.language,
            license: repoData.data.license ? repoData.data.license.name : 'No License',
            createdAt: repoData.data.created_at,
            updatedAt: repoData.data.updated_at,
            defaultBranch: repoData.data.default_branch,
            languagesDistribution: languages,
            commitActivity: commitActivity
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch repository information. Ensure it is public.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
