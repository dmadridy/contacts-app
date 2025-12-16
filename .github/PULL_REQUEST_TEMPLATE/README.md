# Pull Request Templates

This directory contains multiple pull request templates for different types of changes.

## Available Templates

- **feat.md** - For new features and enhancements
- **fix.md** - For bug fixes
- **refactor.md** - For code refactoring and improvements
- **release.md** - For release PRs
- **hotfix.md** - For critical hotfixes

## How to Use

GitHub doesn't provide a UI dropdown for multiple templates. To use a specific template:

### Option 1: URL Parameters (Recommended)

When creating a PR, add a query parameter to the URL:

- Feature: `?template=feat.md`
- Bug Fix: `?template=fix.md`
- Refactor: `?template=refactor.md`
- Release: `?template=release.md`
- Hotfix: `?template=hotfix.md`

**Example:**
```
https://github.com/your-org/your-repo/compare/main...develop?template=feat.md
```

### Option 2: Default Template

If you don't specify a template, GitHub will use the default `.github/pull_request_template.md` file, which includes a general template with links to the specific templates.

### Option 3: Manual Copy

You can manually copy the content from the desired template file into your PR description.

## Notes

- Templates must be in the default branch (usually `main`) to be recognized by GitHub
- File names are case-insensitive
- Templates support Markdown formatting

