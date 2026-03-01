# API Quick Reference

## 🟢 All Endpoints Live & Tested

### Search Endpoints
```bash
# Basic search - all content types
curl 'http://localhost:5002/api/content/search?q=AI&limit=10'

# Advanced search with filters
curl 'http://localhost:5002/api/content/search/advanced?q=platform&category=Architecture&sortBy=date'

# Autocomplete suggestions
curl 'http://localhost:5002/api/content/search/suggestions?q=AI&limit=3'
```

### Content Endpoints
```bash
# Blog posts
curl 'http://localhost:5002/api/content/blog?page=1&limit=10'
curl 'http://localhost:5002/api/content/blog/building-scale-ai-platforms'

# Services
curl 'http://localhost:5002/api/content/services?page=1&limit=10'

# Case studies  
curl 'http://localhost:5002/api/content/case-studies'
```

### Organization Endpoints
```bash
# Categories
curl 'http://localhost:5002/api/content/categories'

# Tags
curl 'http://localhost:5002/api/content/tags'
```

### Analytics Endpoints
```bash
# Content statistics
curl 'http://localhost:5002/api/content/stats'

# Trending content
curl 'http://localhost:5002/api/content/trending?limit=5'
```

## 🔒 Admin Operations (Requires Auth Token)

### Create
```bash
# Create blog post
curl -X POST 'http://localhost:5002/api/content/blog' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "New Post",
    "slug": "new-post",
    "content": "Article content...",
    "category": "AI Technology"
  }'
```

### Update
```bash
curl -X PUT 'http://localhost:5002/api/content/blog/BLOG_ID' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -d '{ "title": "Updated Title" }'
```

### Delete
```bash
curl -X DELETE 'http://localhost:5002/api/content/blog/BLOG_ID' \
  -H 'Authorization: Bearer YOUR_TOKEN'
```

## 📊 Real Data in Database

### Current Content
- **5 Blog Posts**: AI, Architecture, Development topics
- **5 Services**: Web Dev, Mobile Dev, SaaS, AI Consulting, Marketplace
- **2 Case Studies**: QuickMela, GNN Platform
- **10 Categories**: AI Insights, Architecture, Development, Web, Mobile, SaaS
- **20+ Tags**: ai, machine-learning, scalability, microservices, etc.

## ✅ Status Checks

```bash
# Health check
curl 'http://localhost:5002/api/health'

# All systems should return:
# {"status":"OK","database":{"connected":true}}
```

## 🎯 Next Phase APIs (Coming Soon)

- User favorites & bookmarks
- Comments system
- Content ratings
- Search history
- Real-time notifications
