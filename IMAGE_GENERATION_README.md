# 🖼️ Image Generation Scripts

This directory contains scripts for generating project images using various AI APIs.

## 📁 Files

- `generate-images-zai.py` - Generate images using Z.ai API with GLM models
- `generate-project-images.py` - Generate images using Google Gemini API
- `test-zai-api.py` - Test script for Z.ai API connection
- `requirements.txt` - Python dependencies

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Test API Connection

```bash
python test-zai-api.py
```

### 3. Generate Images

```bash
# Generate all project images with Z.ai
python generate-images-zai.py

# Test API connection only
python generate-images-zai.py test
```

## 🔧 Configuration

### Z.ai API Setup

The script uses the Z.ai API key: `de443cf82d4e4bb19b935a45e9027346.b38BndsNIy7shrf5`

**⚠️ Important Note**: This is a GLM Coding Lite Monthly Plan key designed for **coding assistance**, not image generation. The Z.ai GLM Coding Lite plan may not support direct image generation APIs.

### Alternative: Use Gemini API

For reliable image generation, use the Gemini API script instead:

```bash
python generate-project-images.py
```

### API Endpoints

The script tries multiple endpoints:
1. Primary: `https://api.z.ai/v1/images/generations`
2. Alternative: `https://api.z.ai/v1/chat/completions`

## 📊 Features

- ✅ Multiple API endpoint fallbacks
- ✅ Detailed progress tracking
- ✅ Error handling and retry logic
- ✅ Placeholder image generation as fallback
- ✅ Rate limiting protection
- ✅ File overwrite protection
- ✅ Comprehensive logging

## 🎯 Generated Images

The script generates 9 project images:

1. `project-1-villa.jpg` - Modern luxury villa construction
2. `project-2-monument.jpg` - Historic building renovation
3. `project-3-office.jpg` - Office building transformation
4. `project-4-bathroom.jpg` - Luxury bathroom renovation
5. `project-5-extension.jpg` - House extension construction
6. `project-6-apartments.jpg` - Sustainable apartment complex
7. `project-7-crepi.jpg` - Facade renovation with crepi
8. `project-8-windows.jpg` - Window and door replacement
9. `project-9-commercial.jpg` - Commercial building renovation

## ⚠️ Limitations

### Z.ai GLM Coding Lite Plan

The Z.ai GLM Coding Lite Monthly Plan is designed for **coding assistance**, not image generation:

- ✅ **Supported**: Code completion, debugging, Q&A, task automation
- ❌ **Not Supported**: Direct image generation APIs
- 🔄 **Alternative**: Use `generate-project-images.py` with Gemini API

### Why Z.ai May Not Work

1. **Plan Type**: GLM Coding Lite is for coding tools integration
2. **API Access**: May not include image generation endpoints
3. **Usage Limits**: Designed for lightweight coding workloads

## 🔍 Troubleshooting

### Common Issues

1. **404 Errors**: Z.ai endpoints may not support image generation
2. **Plan Limitations**: GLM Coding Lite plan may not include image APIs
3. **Rate Limiting**: The script includes 3-second delays between requests
4. **Network Issues**: Check internet connection and firewall settings

### Recommended Solution

Use the Gemini API script for reliable image generation:

```bash
python generate-project-images.py
```

### Debug Mode

Run with test mode to check API connection:

```bash
python generate-images-zai.py test
```

### Manual Testing

Use the test script to verify API endpoints:

```bash
python test-zai-api.py
```

## 📝 API Response Format

The script expects responses in this format:

```json
{
  "data": [
    {
      "url": "https://example.com/generated-image.jpg"
    }
  ]
}
```

## 🛠️ Customization

### Adding New Projects

Edit the `projects` list in `generate-images-zai.py`:

```python
projects = [
    {
        "filename": "new-project.jpg",
        "prompt": "Your detailed prompt here..."
    }
]
```

### Changing Image Size

Modify the `size` parameter in the API request:

```python
data = {
    "size": "1024x1024",  # or "512x512", "2048x2048"
    # ... other parameters
}
```

## 📈 Performance

- **Rate Limit**: 3 seconds between requests
- **Timeout**: 30 seconds per request
- **Retry Logic**: Automatic fallback to alternative endpoints
- **Error Handling**: Comprehensive error reporting

## 🔒 Security

- API key is embedded in the script (consider using environment variables for production)
- No sensitive data is logged
- Images are saved locally only

## 📞 Support

For issues with the Z.ai API:
- Check the [Z.ai documentation](https://docs.z.ai)
- Verify your API key and credits
- Contact Z.ai support for API-specific issues

---

**Note**: This script is configured for the Yannova construction website project and generates images specific to Dutch construction projects.
