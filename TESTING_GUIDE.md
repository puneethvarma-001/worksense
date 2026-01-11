# Testing Guide - WorkSense HRMS Upgrade

## Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

## Creating a Test Tenant

Since the application requires a tenant to be created, you have two options:

### Option 1: Using the API
```bash
curl -X POST http://localhost:3000/api/tenants/create \
  -H "Content-Type: application/json" \
  -d '{
    "subdomain": "acme",
    "name": "Acme Corp",
    "emoji": "🏢"
  }'
```

This will return a response with `dashboardUrl`. Navigate to that URL to access the HRMS.

### Option 2: Using the Admin Panel
1. Navigate to http://localhost:3000/admin
2. Fill in the create tenant form:
   - Subdomain: `acme`
   - Company Name: `Acme Corp`
   - Emoji: 🏢
3. Click Create
4. You'll be redirected to `http://acme.localhost:3000`

**Note:** If Redis is not configured, you may need to mock the data or configure Upstash Redis credentials in `.env.local`.

## Testing the New Features

### 1. Test the New Sidebar

#### Desktop View:
1. Navigate to `http://acme.localhost:3000/app` (or your tenant subdomain)
2. Observe the new sidebar on the left with:
   - Company logo/emoji at top
   - Grouped navigation sections
   - User profile at bottom
3. Click the hamburger icon or press `⌘B` (Mac) / `Ctrl+B` (Windows) to toggle sidebar
4. Verify sidebar collapses to icon-only mode
5. Hover over collapsed items to see tooltips

#### Mobile View:
1. Resize browser to mobile width (< 768px)
2. Sidebar should be hidden by default
3. Click hamburger menu to open drawer
4. Verify backdrop overlay appears
5. Click outside or close button to dismiss

#### Dark Mode:
1. Click the sun/moon icon in sidebar footer
2. Verify theme switches between light and dark
3. Check all colors and contrasts are appropriate

### 2. Test Leave Management Module

Navigate to: `http://acme.localhost:3000/app/leave`

#### Leave Balance Cards:
- Verify 3 cards display: Casual Leave, Earned Leave, Sick Leave
- Check proper icons and colors
- Verify balance numbers are visible

#### My Requests Tab:
1. Default tab should show leave requests table
2. Verify Indian employee names are displayed
3. Check leave types are shown (Casual Leave, Sick Leave, etc.)
4. Verify status badges are color-coded:
   - Green for approved
   - Red for rejected
   - Amber for pending
5. Check all columns are visible and aligned

#### Apply Leave Tab:
1. Click "Apply Leave" tab
2. Test the leave type dropdown - should have 5 options:
   - Casual Leave
   - Sick Leave
   - Earned Leave
   - Compensatory Off
   - Loss of Pay
3. Click "From Date" - calendar popover should open
4. Select a date
5. Click "To Date" - select another date
6. Verify days count auto-calculates
7. Test half-day checkboxes (should be mutually exclusive)
8. Enter reason in textarea
9. Click Submit - should show success alert
10. Form should reset after submission

#### Approvals Tab:
1. Click "Approvals" tab
2. Verify pending requests are shown
3. Test filter dropdown by leave type
4. Check employee avatars show initials
5. Click Approve/Reject buttons - should show alert

### 3. Test Holidays Module

Navigate to: `http://acme.localhost:3000/app/holidays`

#### View Toggle:
1. Verify "List" view is default
2. Click "Calendar" button
3. Verify calendar view displays
4. Click "List" button to return

#### Upcoming Holidays Card:
1. Check card displays next 3 upcoming holidays
2. Verify dates are formatted correctly
3. Check color-coded badges match holiday type

#### Year Selector:
1. Click year dropdown (should show 2025, 2026, 2027)
2. Select different years
3. Verify holidays update accordingly

#### List View:
1. Count total holidays (should be 10 for 2026)
2. Verify badge colors:
   - Green for National holidays (3)
   - Amber for Regional holidays (5)
   - Blue for Optional holidays (2)
3. Check Indian holiday names:
   - Republic Day (Jan 26)
   - Independence Day (Aug 15)
   - Gandhi Jayanti (Oct 2)
   - Diwali, Holi, Ugadi, etc.

#### Calendar View:
1. Switch to calendar view
2. Verify holiday dates are highlighted
3. Check legend shows color coding
4. Verify dates are marked correctly

### 4. Test Policies Module

Navigate to: `http://acme.localhost:3000/app/policies`

#### Stats Cards:
1. Verify Total Policies shows 5
2. Check Categories shows correct count
3. Acknowledged counter starts at 0

#### Search:
1. Type "leave" in search box
2. Verify only "Leave & Attendance Policy" shows
3. Clear search - all policies return
4. Test search with other keywords

#### Accordion:
1. Verify policies are grouped by category
2. Click on "Leave & Attendance Policy"
3. Accordion should expand
4. Verify policy content is displayed
5. Check effective date and last updated date
6. Click on another policy - first should collapse

#### Policy Actions:
1. Expand a policy
2. Check the acknowledgment checkbox
3. Verify "Acknowledged" count increases in stats
4. Click "Download PDF" button
5. Should show alert (demo placeholder)
6. Uncheck checkbox - count should decrease

### 5. Test Navigation

#### Test All Routes:
1. Dashboard: `/app`
2. Leave: `/app/leave`
3. Attendance: `/app/attendance`
4. Payroll: `/app/payroll`
5. Holidays: `/app/holidays`
6. Policies: `/app/policies`
7. Onboarding & Exits: `/app/onboarding-exits`
8. Organization: `/app/org`
9. AI Tools: `/app/ai`

#### Verify Demo Mode:
1. All navigation items should be visible
2. No "Access Denied" or permission errors
3. Click through each menu item
4. All pages should load successfully

### 6. Test Role Switcher

1. Locate role switcher in top right (desktop) or menu (mobile)
2. Click to open dropdown
3. Switch between roles:
   - Employee
   - Manager
   - HR
   - AMP (Admin)
4. Verify all navigation items remain visible (demo mode)
5. Check page reloads with new role
6. Verify role displays correctly in sidebar footer

### 7. Test Responsive Design

#### Mobile (< 768px):
1. Resize browser to mobile width
2. Sidebar should hide, show hamburger menu
3. Click hamburger - drawer should slide in
4. Test all pages on mobile
5. Tables should scroll horizontally
6. Cards should stack vertically
7. Forms should be touch-friendly

#### Tablet (768px - 1024px):
1. Resize to tablet width
2. Sidebar should be visible
3. Grid layouts should adapt (2 columns)
4. All features should work

#### Desktop (> 1024px):
1. Full sidebar visible
2. Grid layouts show 3 columns
3. All features accessible

## Common Issues & Solutions

### Issue: "Redis client was initialized without url or token"
**Solution:** This is expected in demo mode. The app will still work with demo data. To fix:
1. Sign up for Upstash Redis (free tier available)
2. Create a `.env.local` file with:
   ```
   KV_REST_API_URL=your_redis_url
   KV_REST_API_TOKEN=your_redis_token
   ```
3. Restart dev server

### Issue: "Tenant not found" error
**Solution:** Create a tenant first using the API or admin panel (see above).

### Issue: Subdomain not working on localhost
**Solution:** 
- Use `acme.localhost:3000` format in browser
- Some browsers may not support `.localhost` subdomains
- Alternative: Edit `/etc/hosts` file (Mac/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows):
  ```
  127.0.0.1 acme.localhost
  ```

### Issue: Build errors
**Solution:** 
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

## Automated Testing Checklist

- [ ] All pages load without errors
- [ ] Sidebar toggles correctly
- [ ] Dark/light mode switches work
- [ ] Tabs switch properly in Leave page
- [ ] Calendar picker works in Leave form
- [ ] View toggle works in Holidays page
- [ ] Search filters policies correctly
- [ ] Accordion expands/collapses in Policies
- [ ] Mobile drawer opens/closes
- [ ] All navigation items visible
- [ ] Role switcher changes role
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build completes successfully

## Performance Checklist

- [ ] Page loads in < 3 seconds
- [ ] Sidebar animation is smooth (60fps)
- [ ] Tab switching is instant
- [ ] Calendar picker opens without lag
- [ ] Search filters update in real-time
- [ ] No layout shift during page load
- [ ] Images/icons load quickly

## Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader can navigate properly
- [ ] Form labels are associated with inputs
- [ ] Buttons have descriptive text
- [ ] Keyboard shortcuts work (⌘B for sidebar)

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

For any issues or questions, refer to `IMPLEMENTATION_SUMMARY.md` or create an issue in the repository.
