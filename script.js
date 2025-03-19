// Check for saved API key on load
document.addEventListener('DOMContentLoaded', () => {
    const savedApiKey = localStorage.getItem('openRouterApiKey');
    if (savedApiKey) {
        document.getElementById('apiKeySection').style.display = 'none';
    }
    
    // Load history when page loads
    loadHistoryLog();
});

// Save API key to localStorage
function saveApiKey() {
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    if (apiKey) {
        localStorage.setItem('openRouterApiKey', apiKey);
        document.getElementById('apiKeySection').style.display = 'none';
    } else {
        alert('Please enter a valid API key');
    }
}

// History Log Management
function saveToHistory(productDescription, analysisData) {
    // Get existing history or initialize empty array
    let history = JSON.parse(localStorage.getItem('siapaHistory') || '[]');
    
    // Add new entry at the beginning (newest first)
    history.unshift({
        timestamp: new Date().toISOString(),
        description: productDescription.substring(0, 100) + (productDescription.length > 100 ? '...' : ''),
        fullDescription: productDescription,
        data: analysisData
    });
    
    // Limit history to 20 entries
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    
    // Save back to localStorage
    localStorage.setItem('siapaHistory', JSON.stringify(history));
    
    // Refresh history display
    loadHistoryLog();
}

function loadHistoryLog() {
    const historyList = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('siapaHistory') || '[]');
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="no-history">No history yet</div>';
        return;
    }
    
    historyList.innerHTML = '';
    
    history.forEach((entry, index) => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.dataset.index = index;
        
        const timestamp = new Date(entry.timestamp);
        const formattedDate = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;
        
        item.innerHTML = `
            <div class="timestamp">${formattedDate}</div>
            <div class="description">${entry.description}</div>
        `;
        
        item.addEventListener('click', () => loadHistoryItem(index));
        historyList.appendChild(item);
    });
}

function loadHistoryItem(index) {
    const history = JSON.parse(localStorage.getItem('siapaHistory') || '[]');
    if (!history[index]) return;
    
    const item = history[index];
    
    // Fill the product description
    document.getElementById('productDescription').value = item.fullDescription;
    
    // Fill the result sections
    const sectionTitles = ['sasaran', 'isu', 'akibat', 'potensi', 'action'];
    sectionTitles.forEach(field => {
        const outputElement = document.getElementById(`${field}Output`).querySelector('ul');
        if (item.data[field] && item.data[field].length > 0) {
            outputElement.innerHTML = item.data[field]
                .map(point => `<li>${point}</li>`)
                .join('');
        } else {
            outputElement.innerHTML = '';
        }
    });
    
    // Show results section
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        localStorage.removeItem('siapaHistory');
        loadHistoryLog();
    }
}

// Export history to text file
function exportHistoryToFile() {
    const history = JSON.parse(localStorage.getItem('siapaHistory') || '[]');
    
    if (history.length === 0) {
        alert('No history to export');
        return;
    }
    
    // Create text content
    let fileContent = "SIAPA MARKETING FRAMEWORK GENERATOR - HISTORY LOG\n\n";
    
    history.forEach((entry, index) => {
        const timestamp = new Date(entry.timestamp);
        const formattedDate = `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;
        
        fileContent += `--- ENTRY ${index + 1} - ${formattedDate} ---\n\n`;
        fileContent += `PRODUCT DESCRIPTION:\n${entry.fullDescription}\n\n`;
        fileContent += "ANALYSIS RESULTS:\n";
        
        const sections = ['sasaran', 'isu', 'akibat', 'potensi', 'action'];
        sections.forEach(section => {
            if (entry.data[section] && entry.data[section].length > 0) {
                fileContent += `\n${section.toUpperCase()}:\n`;
                entry.data[section].forEach(point => {
                    fileContent += `• ${point}\n`;
                });
            }
        });
        
        fileContent += "\n\n" + "=".repeat(50) + "\n\n";
    });
    
    // Create and download the file
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'siapa_history_' + new Date().toISOString().slice(0, 10) + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

const progressMessages = [
    "Analyzing your product...",
    "Identifying target market...",
    "Evaluating market issues...",
    "Assessing consequences...",
    "Exploring potential...",
    "Formulating action steps...",
    "Generating SIAPA analysis..."
];

function updateProgressMessage() {
    const progressText = document.querySelector('.progress-text');
    let messageIndex = 0;

    return setInterval(() => {
        progressText.textContent = progressMessages[messageIndex];
        messageIndex = (messageIndex + 1) % progressMessages.length;
    }, 4000);
}

async function generateSIAPA() {
    const apiKey = localStorage.getItem('openRouterApiKey');
    if (!apiKey) {
        alert('Please enter your OpenRouter API key first');
        return;
    }

    const productDescription = document.getElementById('productDescription').value.trim();
    if (!productDescription) {
        alert('Please enter a product description');
        return;
    }

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    
    // Start progress message updates
    const progressInterval = updateProgressMessage();

    try {
        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 180000); // 3 minutes timeout

        const analysisPrompt = `Create a SIAPA marketing framework analysis for this product: "${productDescription}"

        Format your response exactly like this:

        1. Sasaran (Target Market):
        - Target point 1
        - Target point 2
        - Target point 3

        2. Isu (Issues/Problems):
        - Issue point 1
        - Issue point 2
        - Issue point 3

        3. Akibat (Consequences):
        - Consequence point 1
        - Consequence point 2
        - Consequence point 3

        4. Potensi (Potential):
        - Potential point 1
        - Potential point 2
        - Potential point 3

        5. Action:
        - Action point 1
        - Action point 2
        - Action point 3`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": window.location.href,
                "X-Title": "SIAPA Marketing Framework Generator",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/learnlm-1.5-pro-experimental:free",
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": analysisPrompt
                            }
                        ]
                    }
                ]
            }),
            signal: controller.signal // Add abort signal
        });

        // Clear timeout if request completes
        clearTimeout(timeoutId);

        const data = await response.json();
        console.log('API Response:', data);
        
        if (!response.ok) {
            console.error('API Error:', data);
            throw new Error(data.error?.message || 'Failed to generate analysis');
        }

        // Get the response content
        let contentText;
        if (data.choices && data.choices.length > 0) {
            contentText = data.choices[0].message?.content || data.choices[0].content;
        } else if (data.response) {
            contentText = data.response;
        }

        console.log('Raw content:', contentText);

        if (!contentText) {
            console.error('Full API response:', data);
            throw new Error('No content received from API. Please try again.');
        }

        // Parse the sections
        const analysisData = {};
        const sectionTitles = ['sasaran', 'isu', 'akibat', 'potensi', 'action'];
        
        try {
            // First try to split by numbered sections
            const sections = contentText.split(/\d\.\s+/);
            
            // Process each section
            sections.forEach((section, index) => {
                if (index === 0 || index > sectionTitles.length) return; // Skip first empty split
                
                // Extract section content
                const sectionContent = section.split('\n')
                    .filter(line => line.trim().startsWith('-'))
                    .map(line => line.replace(/^-\s*/, '').trim())
                    .filter(point => point.length > 0);
                
                if (sectionContent.length > 0) {
                    analysisData[sectionTitles[index - 1]] = sectionContent;
                }
            });

            // If any section is missing, try alternative parsing
            const missingFields = sectionTitles.filter(field => !analysisData[field]?.length);
            if (missingFields.length > 0) {
                // Try alternative parsing using section titles
                sectionTitles.forEach((title, index) => {
                    if (!analysisData[title]) {
                        const titlePattern = new RegExp(`${title.charAt(0).toUpperCase() + title.slice(1)}[^:]*:`);
                        const sectionMatch = contentText.match(titlePattern);
                        
                        if (sectionMatch) {
                            const startIndex = contentText.indexOf(sectionMatch[0]);
                            const nextTitle = sectionTitles[index + 1];
                            const endIndex = nextTitle ? 
                                contentText.indexOf(nextTitle.charAt(0).toUpperCase() + nextTitle.slice(1), startIndex) : 
                                contentText.length;
                            
                            const sectionContent = contentText
                                .slice(startIndex, endIndex)
                                .split('\n')
                                .filter(line => line.trim().startsWith('-'))
                                .map(line => line.replace(/^-\s*/, '').trim())
                                .filter(point => point.length > 0);
                            
                            if (sectionContent.length > 0) {
                                analysisData[title] = sectionContent;
                            }
                        }
                    }
                });
            }
        } catch (parseError) {
            console.error('Section parsing error:', parseError);
            // If parsing fails, try simpler approach
            const lines = contentText.split('\n');
            let currentSection = null;
            
            lines.forEach(line => {
                line = line.trim();
                if (!line) return;
                
                // Check for section headers
                sectionTitles.forEach(title => {
                    if (line.toLowerCase().includes(title)) {
                        currentSection = title;
                        analysisData[currentSection] = [];
                    }
                });
                
                // Add points to current section
                if (currentSection && line.startsWith('-')) {
                    const point = line.replace(/^-\s*/, '').trim();
                    if (point) {
                        analysisData[currentSection].push(point);
                    }
                }
            });
        }

        console.log('Parsed data:', analysisData);

        // Validate the data
        const missingFields = sectionTitles.filter(field => !analysisData[field]?.length);
        
        if (missingFields.length > 0) {
            console.error('Missing fields:', missingFields);
            console.error('Current analysis data:', analysisData);
            console.error('Raw content:', contentText);
            throw new Error(`Missing content for: ${missingFields.join(', ')}`);
        }

        // Update the UI with results
        sectionTitles.forEach(field => {
            const outputElement = document.getElementById(`${field}Output`).querySelector('ul');
            outputElement.innerHTML = analysisData[field]
                .map(point => `<li>${point}</li>`)
                .join('');
        });

        // When done, update UI
        clearInterval(progressInterval);
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'block';
        
        // Save to history
        saveToHistory(productDescription, analysisData);

    } catch (error) {
        // On error, clean up
        clearInterval(progressInterval);
        console.error('Full error:', error);
        console.error('Error stack:', error.stack);
        
        // Provide more specific error message for timeout
        if (error.name === 'AbortError') {
            alert('The request took too long to complete. Please try again.');
        } else {
            alert('Error generating analysis: ' + error.message);
        }
        
        document.getElementById('loadingSpinner').style.display = 'none';
    }
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text:', err);
        return false;
    }
}

function formatSectionContent(section, points) {
    return `${section.toUpperCase()}:\n${points.map(point => `• ${point}`).join('\n')}\n`;
}

async function copySectionResults(sectionId) {
    const button = document.querySelector(`button[onclick="copySectionResults('${sectionId}')"]`);
    const ul = document.getElementById(`${sectionId}Output`).querySelector('ul');
    const points = Array.from(ul.getElementsByTagName('li')).map(li => li.textContent);
    
    if (points.length === 0) return;

    const text = formatSectionContent(sectionId, points);
    const success = await copyToClipboard(text);

    if (success) {
        // Visual feedback
        button.classList.add('success');
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.classList.remove('success');
            button.textContent = 'Copy';
        }, 2000);
    }
}

async function copyAllResults() {
    const button = document.querySelector('.header-actions .copy-btn');
    const sections = ['sasaran', 'isu', 'akibat', 'potensi', 'action'];
    let allText = 'SIAPA ANALYSIS\n\n';

    sections.forEach(section => {
        const ul = document.getElementById(`${section}Output`).querySelector('ul');
        const points = Array.from(ul.getElementsByTagName('li')).map(li => li.textContent);
        if (points.length > 0) {
            allText += formatSectionContent(section, points) + '\n';
        }
    });

    const success = await copyToClipboard(allText);

    if (success) {
        // Visual feedback
        button.classList.add('success');
        button.textContent = 'All Copied!';
        setTimeout(() => {
            button.classList.remove('success');
            button.textContent = 'Copy All Results';
        }, 2000);
    }
}

// Export current analysis to text file
function exportCurrentAnalysis() {
    const productDescription = document.getElementById('productDescription').value.trim();
    const sections = ['sasaran', 'isu', 'akibat', 'potensi', 'action'];
    
    // Check if there's any content to export
    let hasContent = false;
    for (const section of sections) {
        const ul = document.getElementById(`${section}Output`).querySelector('ul');
        if (ul.getElementsByTagName('li').length > 0) {
            hasContent = true;
            break;
        }
    }
    
    if (!hasContent) {
        alert('No analysis results to export');
        return;
    }
    
    // Create file content
    let fileContent = "SIAPA MARKETING FRAMEWORK ANALYSIS\n";
    fileContent += "Generated on: " + new Date().toLocaleString() + "\n\n";
    fileContent += "PRODUCT DESCRIPTION:\n" + productDescription + "\n\n";
    fileContent += "ANALYSIS RESULTS:\n";
    
    sections.forEach(section => {
        const ul = document.getElementById(`${section}Output`).querySelector('ul');
        const points = Array.from(ul.getElementsByTagName('li')).map(li => li.textContent);
        
        if (points.length > 0) {
            fileContent += `\n${section.toUpperCase()}:\n`;
            points.forEach(point => {
                fileContent += `• ${point}\n`;
            });
        }
    });
    
    // Create and download the file
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'siapa_analysis_' + new Date().toISOString().slice(0, 10) + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Visual feedback
    const button = document.getElementById('exportCurrentBtn');
    button.classList.add('success');
    button.textContent = 'Exported!';
    setTimeout(() => {
        button.classList.remove('success');
        button.textContent = 'Export as File';
    }, 2000);
} 