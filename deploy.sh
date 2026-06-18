#!/bin/bash
# Quick start script for deployment

echo "🚀 GST Admin Panel - Deployment Setup"
echo "======================================"
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi
echo "✅ Node.js $(node --version) found"

# Check npm
echo "Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi
echo "✅ npm $(npm --version) found"

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "Building project..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "Next steps:"
echo "1. Install Netlify CLI: npm install -g netlify-cli"
echo "2. Login to Netlify: netlify login"
echo "3. Deploy: netlify deploy --prod"
echo ""
echo "Or use Git integration for automatic deployments."
echo "See NETLIFY_DEPLOYMENT.md for detailed instructions."
