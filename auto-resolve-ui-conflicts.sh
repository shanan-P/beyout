#!/bin/bash

echo "Automated UI Conflict Resolution Script"
echo "======================================="
echo "This script will help resolve conflicts by keeping your UI improvements"
echo ""

# Check if we're in the middle of a rebase/merge
if [ -d ".git/rebase-merge" ] || [ -d ".git/rebase-apply" ]; then
    echo "Already in the middle of a rebase. Please complete or abort it first."
    echo "Run: git rebase --abort to start fresh"
    exit 1
fi

echo "Creating backup branch..."
git branch -f backup-ui-improvements-$(date +%Y%m%d-%H%M%S) HEAD

echo "Starting rebase..."
git rebase origin/main || {
    echo ""
    echo "Conflicts detected. Auto-resolving UI files..."
    
    # List of UI files we know we want to keep our version
    UI_FILES=(
        "frontend/src/components/Layout/Layout.tsx"
        "frontend/src/components/Common/LoadingSpinner.tsx"
        "frontend/src/components/Auth/ProtectedRoute.tsx"
        "frontend/src/pages/HomePage.tsx"
        "frontend/src/pages/LoginPage.tsx"
        "frontend/src/pages/SignupPage.tsx"
        "frontend/src/pages/DashboardPage.tsx"
        "frontend/src/pages/NotFoundPage.tsx"
        "frontend/src/pages/CoursePage.tsx"
        "frontend/src/pages/ChapterPage.tsx"
        "frontend/src/pages/ProfilePage.tsx"
        "frontend/src/pages/CommunityPage.tsx"
        "frontend/src/pages/MessagesPage.tsx"
        "frontend/src/pages/SettingsPage.tsx"
        "frontend/src/pages/CreateCoursePage.tsx"
        "frontend/src/pages/CertificatePage.tsx"
    )
    
    # For each conflicting UI file, keep our version
    for file in "${UI_FILES[@]}"; do
        if [ -f "$file" ] && grep -q "<<<<<<< HEAD" "$file" 2>/dev/null; then
            echo "Resolving $file - keeping our UI improvements..."
            # Keep our version (everything after =======)
            sed -i '/<<<<<<<.*HEAD/,/=======/d' "$file"
            sed -i '/>>>>>>>/d' "$file"
            git add "$file"
        fi
    done
    
    # Check if there are any remaining conflicts
    remaining_conflicts=$(git diff --name-only --diff-filter=U)
    
    if [ -z "$remaining_conflicts" ]; then
        echo ""
        echo "All conflicts resolved automatically!"
        echo "Continuing rebase..."
        git rebase --continue
    else
        echo ""
        echo "Some conflicts remain and need manual resolution:"
        echo "$remaining_conflicts"
        echo ""
        echo "Please resolve these manually, then run:"
        echo "  git add <resolved-files>"
        echo "  git rebase --continue"
    fi
}

echo ""
echo "Next steps:"
echo "1. Test your application to ensure everything works"
echo "2. Push with: git push --force-with-lease origin cursor/enhance-ui-design-and-add-night-mode-7ede"
echo "3. Create/update your pull request"