# Admin Access Instructions

## How to Access Admin Panel

Since you are the only admin, the admin access has been secured with a special authentication system:

### Method 1: Hidden Key Sequence
1. Go to the home page (`/`)
2. Type the letters **A-D-M-I-N** in sequence (case insensitive)
3. A red pulsing admin access button will appear in the bottom-right corner for 10 seconds
4. Click the button to access the admin login page

### Method 2: Direct URL
Navigate directly to `/admin/login` in your browser

## Admin Login Credentials

**Admin Access Key:** `ALGERIA_ADMIN_2025`

**Login Process:**
1. Enter your admin email address
2. Enter your admin password  
3. Enter the admin access key: `ALGERIA_ADMIN_2025`
4. Click "Access Admin Panel"

## Security Features

- Admin role is completely hidden from public registration/login forms
- Special access key required for admin authentication
- Admin login page is separate from regular user login
- Hidden access method prevents unauthorized discovery
- 10-second timeout on the hidden admin button for security

## Admin Panel Features

Once logged in as admin, you will have access to:
- Admin Dashboard (`/admin`)
- User Management (`/admin/users`)
- Product Management (`/admin/products`)  
- Advertisement Management (`/admin/ads`)

## Notes

- The admin access key should be changed in a production environment
- Consider implementing environment variables for the access key
- The hidden key sequence can be customized by modifying the Home.jsx component