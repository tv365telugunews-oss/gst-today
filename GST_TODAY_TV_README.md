# 📺 GST TODAY TV - Mobile App

A modern, professional Android mobile application focused on GST news, videos, and business compliance updates for Indian users.

## 🎨 Design Overview

### Color Palette
- **Primary Red**: `#DC2626` - Breaking news, important actions
- **Blue**: `#2563EB` - Trust, professional elements
- **White**: `#FFFFFF` - Clean backgrounds
- **Yellow/Amber**: `#FFC107` - Highlights, due dates
- **Gray**: `#F8FAFC` - Background, subtle elements

### Design Philosophy
- **Clean & Trustworthy**: News-channel style UI
- **Professional**: Minimal design with high readability
- **User-Friendly**: Designed for non-technical users (small business owners, traders, accountants)
- **Mobile-First**: Optimized for Android mobile experience

## 📱 Screens

### 1. **Splash Screen** (`/`)
- App logo with "GST TODAY TV" branding
- Tagline: "Your Daily GST Update"
- Auto-navigates to home after 2.5 seconds
- Gradient background (red to blue)

### 2. **Home Screen** (`/app`)
- **Breaking News Carousel**: Horizontal scrolling news cards
- **Featured Video**: Today's GST video highlight
- **Quick Actions Grid**: 
  - GST TV
  - News
  - Due Dates
  - GST Tools
- **Latest Articles**: Recent news previews
- **Upcoming Due Dates**: Important filing deadlines reminder

### 3. **GST TV Screen** (`/app/gst-tv`)
- **Featured Video Banner**: Large hero video with play button
- **Category Filters**: 
  - All Videos
  - Daily GST News
  - GST Explained
  - Returns & Filing
  - Case Laws
- **Video List**: Scrollable list with thumbnails, duration, and views

### 4. **Video Player Screen** (`/app/gst-tv/:videoId`)
- Video player with controls
- Title, date, and view count
- Like and Share buttons
- Description
- Related videos section

### 5. **News Screen** (`/app/news`)
- **Search Bar**: Find news and notifications
- **Filter Tabs**: 
  - Latest
  - Notifications
  - Circulars
  - Case Laws
- **News Cards**: Headlines with tags, preview text, and dates

### 6. **Article Detail Screen** (`/app/news/:articleId`)
- Featured image
- Article title and metadata
- Bookmark and Share actions
- Full article content
- Related articles

### 7. **Due Dates Screen** (`/app/due-dates`)
- **Monthly Calendar Overview**: Current month GST deadlines
- **Due Dates List**: 
  - GSTR-1, GSTR-3B, GSTR-5, GSTR-6, etc.
  - Days remaining countdown
  - Priority indicators (high/medium/low)
  - Reminder toggle for each deadline
- **Progress Bars**: Visual deadline proximity
- **Help Section**: Links to filing guide videos

### 8. **GST Tools Screen** (`/app/tools`)
- **Featured Tool**: GST Calculator card
- **All Tools Grid**: 
  - GST Calculator
  - Late Fee Calculator
  - Interest Calculator
  - HSN/SAC Finder
  - ITC Calculator
  - Return Due Date
  - Tax Rate Finder
  - GST Glossary
- **Quick Calculator**: Embedded GST calculator

### 9. **Profile Screen** (`/app/profile`)
- **User Section**: Guest mode with login prompt
- **Preferences**: 
  - Language selection (English/Hindi)
  - Notification settings
  - App settings
- **Content**: Saved articles (bookmark count)
- **Support**: About and Contact options
- **App Info**: Version and branding

## 🎯 Key Features

### Bottom Navigation
Consistent across all main screens:
- Home
- GST TV
- News
- Tools
- Profile

### Card-Based Layout
- Consistent shadow and rounded corners
- Clear visual hierarchy
- Touch-friendly tap targets

### Responsive Design
- Mobile-first approach
- Optimized for Android screens
- Safe area support for notched devices

### Professional Typography
- Clear font hierarchy
- High contrast for readability
- Consistent spacing

## 🛠️ Tech Stack

- **React 18.3.1** with TypeScript
- **React Router 7** for navigation
- **Tailwind CSS 4** for styling
- **Lucide React** for icons
- **Vite** for build tooling

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
src/app/
├── App.tsx                       # Main app component with router
├── routes.tsx                    # Route configuration
├── components/
│   └── gst/
│       └── Layout.tsx            # Bottom navigation layout
└── pages/
    └── gst/
        ├── SplashScreen.tsx      # Splash screen
        ├── HomePage.tsx          # Dashboard/home
        ├── GSTTVScreen.tsx       # Video hub
        ├── VideoPlayerScreen.tsx # Video player
        ├── NewsScreen.tsx        # News listing
        ├── ArticleDetailScreen.tsx # Article reader
        ├── DueDatesScreen.tsx    # Due dates calendar
        ├── GSTToolsScreen.tsx    # Tools collection
        └── ProfileScreen.tsx     # User profile
```

## 🎨 Design System

### Colors
```css
Primary Red:    #DC2626
Blue:           #2563EB
Yellow/Amber:   #FFC107
Green:          #059669
Purple:         #7C3AED
Gray:           #F8FAFC
```

### Border Radius
- Cards: `rounded-xl` (12px)
- Buttons: `rounded-lg` (8px)
- Icons: `rounded-full` (50%)

### Shadows
- Cards: `shadow-md`
- Hover: `shadow-lg`
- Featured: `shadow-xl`

### Spacing
- Section padding: `p-4` (16px)
- Card spacing: `space-y-3` or `gap-3`
- Content margins: `mb-2`, `mb-3`, `mb-4`

## 🎯 Target Audience

- Small business owners
- Traders and merchants
- Accountants and tax professionals
- Finance managers
- Anyone dealing with GST compliance in India

## 📱 Android Optimization

- Mobile-first responsive design
- Touch-optimized UI elements
- Safe area support for notched displays
- Smooth scrolling and transitions
- Optimized image loading

## 🔄 Future Enhancements

- [ ] User authentication
- [ ] Bookmark functionality
- [ ] Push notifications for due dates
- [ ] Offline mode
- [ ] Dark mode
- [ ] Hindi language support
- [ ] Working calculator functionality
- [ ] Video playback integration
- [ ] Real-time GST updates

---

**GST TODAY TV** - Your trusted source for GST news and compliance updates 📺
