# Git Workflow - Jake Cozza DJ Services

## Repository Information
- **Local Repository**: Initialized and configured
- **GitHub Username**: im8kapps
- **Email**: robbie.smith@musictravel.com
- **Main Branch**: main
- **Current Commit**: 3fd6dbd (Initial launch)

## Development Workflow

### 1. Making Changes
```bash
# Check current status
git status

# Add specific files
git add filename.html
# Or add all changes
git add .

# Commit with descriptive message
git commit -m "feat: description of changes"
```

### 2. Commit Message Conventions
- **feat**: New features (e.g., "feat: add testimonials section")
- **fix**: Bug fixes (e.g., "fix: mobile menu navigation")
- **style**: Design/CSS changes (e.g., "style: update blue color scheme")
- **content**: Content updates (e.g., "content: update Jake's bio")
- **perf**: Performance improvements
- **docs**: Documentation changes

### 3. Branch Strategy (Optional for Future)
```bash
# Create feature branch
git checkout -b feature/new-section

# Work on changes...
git add .
git commit -m "feat: add new section"

# Switch back to main
git checkout main

# Merge feature
git merge feature/new-section

# Delete feature branch
git branch -d feature/new-section
```

## GitHub Setup (Next Steps)

### 1. Create GitHub Repository
1. Go to https://github.com/im8kapps
2. Click "New repository"
3. Name: `jake-cozza-dj-services`
4. Description: "Professional DJ services landing page for Indianapolis area"
5. Keep it public or private as preferred
6. Don't initialize with README (we already have one)

### 2. Connect Local to GitHub
```bash
# Add GitHub remote
git remote add origin https://github.com/im8kapps/jake-cozza-dj-services.git

# Push initial commit
git push -u origin main
```

### 3. Future Updates
```bash
# Make changes locally
git add .
git commit -m "your message"

# Push to GitHub
git push origin main

# This will trigger automatic Netlify deployment
```

## Netlify Integration

### Automatic Deployment
- **Current**: Manual deployment via Netlify CLI
- **Recommended**: Connect GitHub repository to Netlify for automatic deployments
- **Benefit**: Every push to main branch automatically updates the live site

### Setup Automatic Deployment
1. Go to Netlify dashboard
2. Connect GitHub account
3. Select the repository
4. Configure build settings (already in netlify.toml)
5. Enable automatic deployments

## File Structure
```
jake-cozza-dj-services/
├── .git/                 # Git repository data
├── .gitignore           # Files to ignore in Git
├── .netlify/            # Netlify deployment data (ignored)
├── index.html           # Main landing page
├── styles.css           # All CSS styles
├── script.js            # JavaScript functionality
├── manifest.json        # PWA manifest
├── sw.js                # Service worker
├── netlify.toml         # Netlify configuration
├── README.md            # Project documentation
├── DEPLOYMENT.md        # Deployment information
└── GIT_WORKFLOW.md      # This file
```

## Common Tasks

### Update Content
```bash
# Edit files (index.html, styles.css, etc.)
git add .
git commit -m "content: update Jake's bio and services"
git push origin main
```

### Add New Features
```bash
# Create new branch (optional)
git checkout -b feature/photo-gallery

# Make changes
git add .
git commit -m "feat: add photo gallery section"

# Push to GitHub
git push origin feature/photo-gallery

# Create pull request on GitHub (optional)
# Or merge directly to main
```

### Quick Updates
```bash
# For small fixes/updates
git add .
git commit -m "fix: update phone number formatting"
git push origin main
```

## Best Practices

### Commit Frequency
- Commit early and often
- Each commit should represent a logical change
- Don't commit broken code to main branch

### Commit Messages
- Use present tense ("add feature" not "added feature")
- Keep first line under 50 characters
- Use detailed description for complex changes

### Before Committing
- Test changes locally
- Check responsive design on mobile
- Verify form functionality
- Run Lighthouse audit for performance

### Backup Strategy
- GitHub serves as remote backup
- Netlify has deployment history
- Local repository maintains full history

## Emergency Recovery

### Undo Last Commit (Not Pushed)
```bash
git reset --soft HEAD~1
```

### Undo Changes to File
```bash
git checkout -- filename.html
```

### View Change History
```bash
git log --oneline
git show commit-hash
```

## Support
- **Git Documentation**: https://git-scm.com/docs
- **GitHub Guides**: https://guides.github.com/
- **Netlify Docs**: https://docs.netlify.com/

---
**Created**: July 31, 2025  
**Repository Status**: ✅ Initialized and Ready  
**Next Step**: Create GitHub repository and connect remote