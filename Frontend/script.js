async function analyzeRepo() {

    const repoUrl = document.getElementById('repoInput').value;

    const result = document.getElementById('result');

    result.innerHTML = 'Loading...';

    try {

        const response = await fetch(
            'http://13.220.246.82:5000/api/analyze?repo=' + repoUrl
        );

        const data = await response.json();

        result.innerHTML = `
            <h2>${data.name}</h2>

            <p>${data.description}</p>

            <p>Stars: ${data.stars}</p>

            <p>Forks: ${data.forks}</p>

            <p>Language: ${data.language}</p>

            <p>Open Issues: ${data.issues}</p>
        `;

    } catch (error) {

        result.innerHTML = 'Error fetching repo';
    }
}
