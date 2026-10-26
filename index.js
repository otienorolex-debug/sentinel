async function runAuditPipeline() {
    const urlInput = document.getElementById('url-input').value.trim();
    const cpc = parseFloat(document.getElementById('cpc-input').value) || 0;
    const dailyClicks = parseInt(document.getElementById('clicks-input').value) || 0;
    const matrixOutput = document.getElementById('matrix-output');
    
    if (!urlInput) {
        matrixOutput.innerHTML = `<p style="color: var(--accent-crimson);">Error: No active routing targets provided.</p>`;
        return;
    }

    // Step A: Parse raw strings into a clean array of valid URLs
    const urls = urlInput.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    matrixOutput.innerHTML = ''; 
    
    let failedCount = 0;

    // Step B: Map URLs into an array of asynchronous execution workers
    const auditPromises = urls.map(async (url) => {
        const itemRow = document.createElement('div');
        itemRow.className = 'matrix-item';
        itemRow.innerHTML = `<span class="url-text">${url}</span><span class="status-badge" style="background:#30363d;">Testing...</span>`;
        matrixOutput.appendChild(itemRow);

        // Step C: Route through headless network translation proxy
        const proxyUrl = `https://allorigins.win{encodeURIComponent(url)}`;
        
        try {
            const response = await fetch(proxyUrl);
            const data = await response.json();
            
            // Step D: Evaluate payload payload integrity parameters
            if (data.status && data.status.http_code >= 400 || data.contents === null) {
                throw new Error('Link Unreachable');
            }
            
            itemRow.querySelector('.status-badge').className = 'status-badge status-pass';
            itemRow.querySelector('.status-badge').innerText = 'Active (200)';
        } catch (error) {
            failedCount++;
            itemRow.querySelector('.status-badge').className = 'status-badge status-fail';
            itemRow.querySelector('.status-badge').innerText = 'Critical (404/ERR)';
        }
    });

    // Step E: Fire asynchronous operations in parallel
    await Promise.all(auditPromises);

    // Step F: Execute financial mathematical logic
    const failureRatio = failedCount / urls.length;
    const failurePercentage = Math.round(failureRatio * 100);
    const dailyLoss = dailyClicks * failureRatio * cpc;

    // Step G: Render telemetry outputs down to screen interfaces
    document.getElementById('failure-rate').innerText = `${failurePercentage}%`;
    document.getElementById('failure-rate').style.color = failurePercentage > 0 ? '#ff7b72' : '#58a6ff';
    document.getElementById('bleed-amount').innerText = `$${dailyLoss.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}
