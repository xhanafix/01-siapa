# SIAPA Marketing Framework Generator

An AI-powered web application that generates comprehensive SIAPA marketing framework analyses for any product or service. Built with HTML, CSS, and JavaScript, it leverages the OpenRouter API to provide intelligent marketing insights.

## 🎯 SIAPA Framework Overview

The SIAPA framework consists of five key marketing components:

- **Sasaran (Target)**: Who is your target market?
  - Demographics, preferences, and needs
  - Market segmentation
  - Customer profiles

- **Isu (Issue)**: What problems need solving?
  - Pain points
  - Market gaps
  - Customer challenges

- **Akibat (Consequence)**: What happens if issues aren't addressed?
  - Negative impacts
  - Missed opportunities
  - Market risks

- **Potensi (Potential)**: What benefits does your solution offer?
  - Value proposition
  - Opportunities
  - Growth potential

- **Action**: What steps should be taken?
  - Call to action
  - Implementation steps
  - Next moves

## 🚀 Getting Started

### Prerequisites

1. **OpenRouter API Key Required**
   - Visit [OpenRouter](https://openrouter.ai/)
   - Create an account
   - Generate your API key
   - Keep it handy for the application

### Quick Start

1. Open `index.html` in your web browser
2. Enter your OpenRouter API key in the setup section
3. Input your product description
4. Click "Generate SIAPA Analysis"

## 💡 Features

- **One-Click Generation**: Get complete SIAPA analysis instantly
- **Dark Theme**: Easy on the eyes
- **Copy Functions**: 
  - Copy individual sections
  - Copy entire analysis
- **Export to File**:
  - Save current analysis as a text file
  - Export entire generation history
  - Organized, timestamped records
  - Automatic file naming with dates
  - Formatted output with bullet points
- **Generation History**: 
  - Automatically saves all generated analyses
  - Quick access to previous work
  - Reload past analyses with a single click
  - Limited to 20 most recent entries
  - Persistent storage in browser
- **Responsive Design**: Works on all devices
- **API Key Storage**: Saves your key locally
- **Real-time Processing**: Quick analysis generation

## 🛠️ Technical Implementation

### Files Structure 
```
siapa/
├── index.html      # Main application interface
├── styles.css      # Styling and theming
├── script.js       # Core functionality
└── README.md       # Documentation
```

### Export File Formats

1. **Current Analysis Export**
   - Filename: `siapa_analysis_YYYY-MM-DD.txt`
   - Includes:
     - Generation timestamp
     - Product description
     - Complete SIAPA analysis
     - Formatted sections with bullet points

2. **History Export**
   - Filename: `siapa_history_YYYY-MM-DD.txt`
   - Includes:
     - All historical analyses (up to 20)
     - Timestamps for each entry
     - Full product descriptions
     - Complete SIAPA analyses
     - Clear section separators

## 📋 Usage Tips

1. **Writing Product Descriptions**
   - Be specific about product features
   - Include target market information
   - Mention unique selling points
   - Provide clear problem statements

2. **Getting Better Results**
   - Provide clear, concise descriptions
   - Include relevant market context
   - Specify any particular focus areas
   - Use bullet points for clarity

3. **Using the Export Features**
   - Export current analysis for immediate sharing
   - Export history for record keeping
   - Use text files for documentation
   - Share analyses via email or document management systems

4. **Managing History**
   - Click history items to reload past analyses
   - Export history before clearing
   - Use clear history to free up storage
   - Regular exports recommended for backup

## ⚠️ Common Issues

1. **API Key Issues**
   - Ensure key is entered correctly
   - Check key validity on OpenRouter
   - Clear browser cache if needed
   - Verify API usage limits

2. **No Response**
   - Check internet connection
   - Verify API key status
   - Try refreshing the page
   - Check browser console for errors

3. **Parsing Errors**
   - Try simplifying product description
   - Ensure text is properly formatted
   - Avoid special characters
   - Check for minimum content length

4. **Export Issues**
   - Ensure browser allows downloads
   - Check available storage space
   - Verify file permissions
   - Try different browser if needed

## 🔒 Security Notes

- API key is stored in browser's localStorage
- Clear browser data to remove stored key
- Don't share your API key
- Use HTTPS in production
- Regular history cleanup recommended
- Export sensitive data before clearing

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation
- Add new export formats
- Enhance error handling

## 📝 License

MIT License - feel free to use and modify for your needs.

## 🆘 Support

For issues or questions:
1. Check the common issues section
2. Review the OpenRouter API documentation
3. Open an issue in the repository
4. Check browser console for errors
5. Verify API key status

## 🙏 Acknowledgments

- OpenRouter for AI API access
- SIAPA framework methodology
- Contributors and users
- Open source community 

### API Integration 