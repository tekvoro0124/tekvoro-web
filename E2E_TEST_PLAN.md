# 🧪 End-to-End Test Plan - Tekvoro Website

**Last Updated:** Feb 26, 2026  
**Environment:** Production (tekvoro.com)  
**Status:** Testing in progress

---

## 📋 Test Execution Summary

| Feature | Form | Status | Issues | Fixes |
|---------|------|--------|--------|-------|
| **Public Pages** | - | Testing | - | - |
| Homepage | - | ⏳ | - | - |
| Services Pages | - | ⏳ | - | - |
| Blog Page | - | ⏳ | - | - |
| Resources | - | ⏳ | - | - |
| **Public Forms** | - | Testing | - | - |
| Contact Form | Yes | ⏳ | Email fails | Fix SendGrid |
| Book Demo Form | Yes | ⏳ | Email fails | Fix SendGrid |
| Subscribe | Yes | ⏳ | Email fails | Fix SendGrid |
| Support Form | Yes | ⏳ | Email fails | Fix SendGrid |
| **Admin Section** | - | Testing | - | - |
| Admin Login | Yes | ⏳ | No admin user | Create admin |
| Admin Dashboard | - | ⏳ | Needs MongoDB | Fix whitelist |
| Blog Manager | Yes | ⏳ | Needs MongoDB | Fix whitelist |
| Ticket Manager | Yes | ⏳ | Needs MongoDB | Fix whitelist |
| Event Manager | Yes | ⏳ | Needs MongoDB | Fix whitelist |
| Contact Submissions | - | ⏳ | Needs MongoDB | Fix whitelist |
| Analytics | - | ⏳ | Needs MongoDB | Fix whitelist |
| **Security Issues** | - | Audit | Multiple | Implement fixes |

---

## 🔍 Test Scenarios by Page

### 1️⃣ Homepage (`/`)
**Expected:** Logo visible, navigation works, CTA buttons clickable  
**To Test:**
- [ ] Page loads without errors
- [ ] All images load
- [ ] Navigation menu works
- [ ] Hero CTA buttons navigate correctly
- [ ] Mobile responsive

---

### 2️⃣ Contact Form (`/contact`)
**Form Fields:**
- First Name (required)
- Last Name (required)
- Email (required, validated)
- Company
- Phone
- Project Type (dropdown)
- Budget (dropdown, leads to scoring)
- Timeline (dropdown, leads to scoring)
- Describe Project (textarea)
- How Found Us (dropdown)
- Additional Message

**Test Data:**
```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@testvoro.com",
  "company": "Test Corp",
  "phone": "+91-9999999999",
  "projectType": "AI Integration / Bot",
  "budget": "₹8L - ₹20L",
  "timeline": "ASAP (< 1 month)",
  "describeProject": "We need AI integration for our platform",
  "howFoundUs": "LinkedIn",
  "subject": "AI Integration Project",
  "message": "Interested in AI solutions"
}
```

**Expected:**
- [ ] Form validates required fields
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Lead score calculated (HOT/WARM/COLD/UNFIT)
- [ ] Submission succeeds
- [ ] Confirmation email sent
- [ ] Data saved to database

---

### 3️⃣ Book Demo Form (`/book-demo`)

**Multi-Step Form:**

**Step 1: Your Info**
- Name (required)
- Email (required)

**Step 2: Select Solution**
- Solution type (required, radio buttons)
- Options: AI Solutions, Cloud Solutions, Cybersecurity, IoT & Smart Devices

**Step 3: Pick Date/Time**
- Date picker (required)
- Time picker (required)

**Step 4: Confirm**
- Review all info
- Confirm button

**Test Data:**
```json
{
  "name": "John Doe",
  "email": "john@test.com",
  "company": "Tech Corp",
  "solution": "ai-solutions",
  "date": "2026-03-15",
  "time": "14:00"
}
```

**Expected:**
- [ ] All steps render correctly
- [ ] Can navigate between steps
- [ ] Form validates before proceeding
- [ ] Confirmation email sent
- [ ] Success message shown

---

### 4️⃣ Subscribe Form (`/subscribe`)

**Form Fields:**
- Email (required)
- Name (optional)
- Topic (optional, multi-select?)

**Test Data:**
```json
{
  "email": "subscriber@test.com",
  "name": "Test Subscriber"
}
```

**Expected:**
- [ ] Email validation
- [ ] Subscription saved
- [ ] Confirmation email sent
- [ ] Double opt-in working (check email)

---

### 5️⃣ Admin Login (`/admin/login`)

**Form Fields:**
- Email (required)
- Password (required)

**Test Data:**
```json
{
  "email": "admin@tekvoro.com",
  "password": "AdminPass123!"
}
```

**Expected:**
- [ ] Invalid email/password shows error
- [ ] Successful login redirects to `/admin`
- [ ] JWT token stored in localStorage
- [ ] Invalid token on next visit redirects to login

---

### 6️⃣ Admin Dashboard (`/admin`)

**Sections (16 total):**
1. Dashboard Home
2. Blog Manager
3. Ticket Manager
4. Event Manager
5. Contact Submissions
6. Analytics
7. Testimonials
8. Email Templates
9. Email Campaigns
10. Email Analytics
11. SEO Tools
12. Pages Content
13. Site Settings
14. Security
15. Blog Subscribers
16. Portfolio

**Expected:**
- [ ] All sections load without errors
- [ ] Can switch between sections
- [ ] Data displays correctly from MongoDB
- [ ] No console errors

---

### 7️⃣ Blog Manager (`/admin/blog`)

**Create Blog Post:**
- [ ] Click "New Blog"
- [ ] Fill in fields:
  - Title: "Test Blog Post"
  - Content: "This is a test blog post"
  - Category: "Testing"
  - Featured Image: Upload
  - Excerpt: "Test excerpt"
  - Status: "Draft" or "Published"
- [ ] Save Post
- [ ] Verify in database
- [ ] Edit Post
- [ ] Delete Post

---

### 8️⃣ Ticket Manager (`/admin/tickets`)

**Create Ticket:**
- [ ] Manual creation (backend only, users contact)
- [ ] Filter by status
- [ ] Update ticket status
- [ ] View details
- [ ] Delete ticket

---

### 9️⃣ Event Manager (`/admin/events`)

**Create Event:**
- [ ] Click "New Event"
- [ ] Fill in:
  - Title
  - Description
  - Event Type (dropdown)
  - Date & Time
  - Location (Virtual/Physical)
  - Capacity
  - Meeting Link (if virtual)
- [ ] Save Event
- [ ] Edit Event
- [ ] Delete Event
- [ ] View registrations

---

### 🔟 Contact Submissions (`/admin/contacts`)

**Expected:**
- [ ] Displays all contact form submissions
- [ ] Shows lead score (HOT/WARM/COLD)
- [ ] Can filter by source
- [ ] Can mark as contacted
- [ ] Can delete

---

## 🔒 Security Testing

### ✅ Authentication
- [ ] Unauthenticated users cannot access `/admin/*`
- [ ] Invalid JWT token redirects to login
- [ ] Token expiry works (7 days)
- [ ] Logout clears token
- [ ] Session hijacking prevented

### ✅ Authorization
- [ ] Only admin role can access admin pages
- [ ] Admin cannot create other admins (if not designed for that)
- [ ] Role-based access controls work

### ✅ Input Validation
- [ ] Email validation (both client and server)
- [ ] Phone validation
- [ ] XSS prevention (HTML encoded)
- [ ] SQL injection prevention (MongoDB queries safe)
- [ ] CSRF protection (if applicable)

### ✅ CORS & Headers
- [ ] CORS allows frontend domain only
- [ ] Security headers set (Helmet middleware)
- [ ] No sensitive headers exposed
- [ ] API keys not in frontend code

### ✅ Database
- [ ] Passwords hashed with bcrypt
- [ ] Sensitive fields not exposed in API responses
- [ ] Rate limiting on login attempts
- [ ] Connection string uses SSL

### ✅ Email Service
- [ ] SendGrid API key not logged
- [ ] Email addresses validated before sending
- [ ] Unsubscribe links present
- [ ] No email injection vulnerabilities

---

## 🐛 Known Issues & Fixes Needed

### 1. Email Service Failing ❌
**Error:** `Failed to fetch` in emailService  
**Cause:** SendGrid API key missing or invalid in environment  
**Fix:** Verify SENDGRID_API_KEY in Railway variables

### 2. MongoDB Connection Error ❌
**Error:** `MongooseServerSelectionError`  
**Cause:** IP not whitelisted in MongoDB Atlas  
**Fix:** Add `0.0.0.0/0` to MongoDB Atlas IP whitelist

### 3. Admin User Missing ❌
**Issue:** Cannot login to admin  
**Fix:** Create admin user in database (see ADMIN_SETUP_GUIDE.md)

### 4. Missing Pages ⚠️
**Identified:**
- [ ] User dashboard (logged-in users)
- [ ] Profile editing page
- [ ] Password reset page
- [ ] Email verification page
- [ ] Unsubscribe page
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Cookie Consent Banner

---

## 📊 Test Results Template

Use this format for each test:

```
## Test: [Feature Name]

**URL:** [Full URL]
**Date:** [YYYY-MM-DD]
**Environment:** Production
**Browser:** [Chrome/Safari/Firefox]
**OS:** macOS

**Steps:**
1. Navigate to page
2. Fill form with test data
3. Submit
4. Verify result

**Result:** ✅ PASS / ❌ FAIL
**Issues:** [Any issues found]
**Screenshots:** [Attach if needed]
**Notes:** [Additional notes]
```

---

## 🎯 Test Execution Order

1. **Database Setup**
   - [ ] MongoDB whitelist verified
   - [ ] Admin user created
   - [ ] Collections initialized

2. **API Testing**
   - [ ] Health check endpoint responding
   - [ ] All routes accessible
   - [ ] Error handling working

3. **Public Forms** (Low security risk)
   - [ ] Contact form
   - [ ] Book demo form
   - [ ] Subscribe form
   - [ ] Support form

4. **Email Service**
   - [ ] Confirmation emails sending
   - [ ] Admin notifications working
   - [ ] No duplicate sends

5. **Admin Panel**
   - [ ] Login working
   - [ ] All 16 sections accessible
   - [ ] Data CRUD operations

6. **Security Audit**
   - [ ] No XSS vulnerabilities
   - [ ] No CSRF vulnerabilities
   - [ ] Authentication enforced
   - [ ] Authorization rules followed

7. **Mobile Testing**
   - [ ] All forms responsive
   - [ ] Touch interactions working
   - [ ] No layout issues

---

## ✅ Sign-Off Checklist

When all tests pass, verify:

- [ ] All 10 public pages load
- [ ] All 5 public forms work
- [ ] All 16 admin sections accessible
- [ ] Emails sending correctly
- [ ] Database operations working
- [ ] No console errors
- [ ] Mobile fully responsive
- [ ] Security audit passed
- [ ] Performance acceptable
- [ ] No broken links

**Ready for production:** ___________  
**Date:** ___________  
**Tester:** ___________

