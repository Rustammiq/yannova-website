# Cursor Agent Master Prompt - Yannova Website

## 🎯 **Task Management System**

You are an AI agent working on the Yannova construction website project. Follow this systematic approach for all tasks:

### **1. Task Analysis & Documentation**
- Create a task file in `.tasks/` folder named after the current git branch
- Document the complete task, analysis, and implementation plan
- Include progress tracking and decision rationale

### **2. Project Context**
- **Project Overview**: `.notes/project_overview.md` (read this first!)
- **Main Branch**: `main`
- **Tech Stack**: Next.js, TypeScript, Tailwind CSS, AI APIs
- **Key Features**: AI chatbot, video content, animations, responsive design

### **3. Git Workflow**
- Create feature branches for new work
- Use descriptive commit messages
- Merge to main when complete
- Clean up branches after merge

### **4. Checkpoint System**
- Stop at key milestones for user confirmation
- Document progress in task file
- Ask before major changes
- Verify implementation before proceeding

## 📋 **Task Template**

```
# Task: [DESCRIBE YOUR TASK]

## Analysis
- [Problem/Requirement analysis]
- [Technical approach]
- [Files to modify]

## Implementation Plan
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Progress Tracking
- [x] Analysis complete
- [ ] Implementation started
- [ ] Testing complete
- [ ] Documentation updated

## Final Review
- [ ] All requirements met
- [ ] Code quality verified
- [ ] Performance optimized
- [ ] Documentation complete
```

## 🎨 **Yannova-Specific Guidelines**

### **Design Consistency**
- Use Yannova color scheme (yannova-primary, yannova-dark, yannova-gray)
- Maintain professional construction industry aesthetic
- Ensure responsive design for all devices

### **AI Integration**
- Leverage existing AI chatbot functionality
- Use Gemini API for content generation
- Maintain video content quality standards

### **Performance Standards**
- Smooth 60fps animations
- Optimized video loading
- Fast page load times
- Mobile-friendly interactions

### **Content Management**
- Use PhotoManager for image rotation
- Follow video mapping conventions
- Maintain SEO optimization
- Update structured data when needed

## 🚀 **Quick Start Commands**

```bash
# Check current branch
git branch --show-current

# Create task file
echo "# Task: [YOUR TASK]" > .tasks/$(git branch --show-current).md

# Update task progress
# Reference existing task file with @ notation
```

## 📝 **Example Usage**

```
[TASK]: Add new AI automation video section to homepage
[PROJECT OVERVIEW]: .notes/project_overview.md (read this first!)
[MAIN BRANCH]: main
[YOLO MODE]: off
```

## 🔄 **Progress Updates**

When updating task progress, always:
1. Read the ENTIRE existing task file first
2. Update the "Progress Tracking" section
3. Document any changes or decisions
4. Keep the "Final Review" section at the bottom
5. Reference the task file with @ notation to avoid creating duplicates

## 🎯 **Success Criteria**

Every task should result in:
- ✅ Functional implementation
- ✅ Updated documentation
- ✅ Clean git history
- ✅ Performance verification
- ✅ User confirmation

---

**Remember**: This is a professional construction website with AI features. Maintain high quality standards and professional appearance throughout all implementations.
