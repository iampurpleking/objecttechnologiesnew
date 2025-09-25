## 🔐 How to Create Admin Accounts and Manage Admin Users

### New Admin System Overview

Your admin system now uses a **database-based role system**:

- Any user can be made an admin, regardless of their email address.
- Admin status is managed in the `admin_users` table in Supabase.
- Admin access is checked from the database, not by email pattern.

# Admin Setup Guide for Object Technologies

## 🔐 How to Create Admin Accounts and Manage Admin Users

### Current Admin System Overview

Your admin system uses **role-based access control** with the following authentication rules in `AdminLayout.tsx`:

- Users with emails containing 'admin'
- Specific admin emails: `admin@objecttechnologies.online`, `bryght@objecttechnologies.online`
- All other users are redirected to the regular dashboard

## 📋 Step-by-Step Admin Setup

### Step 1: Ensure Supabase Project is Set Up

1. **Check Environment Variables** (should already be done):

   - Create `.env.local` in your project root
   - Add your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Verify Connection**:
   - Visit: `http://localhost:3000/api/health/supabase`
   - Should return: `{"status": "ok", "message": "Supabase connection successful"}`

### Step 2: Create Your First Admin Account

```bash
npm run dev
```

2. **Create a signup page** (if you don't have one):

   ```bash
   # I can help you create this if needed
   ```

3. **Sign up with an admin email**:

   - Use: `admin@objecttechnologies.online` or `bryght@objecttechnologies.online`
   - Or any email containing 'admin' (e.g., `john.admin@objecttechnologies.online`)

4. **Visit the login page**: `http://localhost:3000/login`

5. **Login with your admin credentials**

6. **Access admin dashboard**: You'll automatically be redirected to `/admin` after login

#### Method 2: Through Supabase Dashboard

1. **Go to your Supabase project dashboard**
2. **Navigate to Authentication > Users**
3. **Click "Add User"**
4. **Enter admin email and password**
5. **Confirm the user** (if email confirmation is enabled)

### Step 3: Add More Admin Users

#### Option A: Modify Email Rules (Quick & Simple)

Edit `app/admin/AdminLayout.tsx` to add more specific admin emails:

```typescript
// Replace the current admin check with:
const isAdmin =
  data.user.email === "admin@objecttechnologies.online" ||
  data.user.email === "bryght@objecttechnologies.online" ||
  data.user.email === "manager@objecttechnologies.online" ||
  data.user.email === "supervisor@objecttechnologies.online" ||
  data.user.email?.includes("admin") ||
  data.user.email?.endsWith("@objecttechnologies.online");
```

#### Option B: Database-Based Role Management (Professional)

1. **Create an admin_users table in Supabase**:

   ```sql
   CREATE TABLE admin_users (
     id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
     user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
     email text NOT NULL UNIQUE,
     role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin', 'moderator')),
     created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
     created_by uuid REFERENCES auth.users(id)
   );

   -- Enable RLS
   ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Admin users can view all admin users" ON admin_users
     FOR SELECT USING (auth.uid() IN (SELECT user_id FROM admin_users));

   CREATE POLICY "Super admins can manage admin users" ON admin_users
     FOR ALL USING (
       EXISTS (
         SELECT 1 FROM admin_users
         WHERE user_id = auth.uid() AND role = 'super_admin'
       )
     );
   ```

2. **Update AdminLayout.tsx** to check the database:

   ```typescript
   useEffect(() => {
     const checkAdminAccess = async () => {
       const { data } = await supabase.auth.getUser();
       if (!data.user) {
         router.replace("/login");
         return;
       }

       // Check if user is in admin_users table
       const { data: adminUser } = await supabase
         .from("admin_users")
         .select("*")
         .eq("user_id", data.user.id)
         .single();

       if (!adminUser) {
         router.replace("/dashboard");
         return;
       }

       setUser({ ...data.user, role: adminUser.role });
       setLoading(false);
     };

     checkAdminAccess();
   }, [router]);
   ```

### Step 4: Create a User Signup Page (If Needed)

If you need a signup page, I can create one for you:

```typescript
// app/signup/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      alert("Check your email for confirmation link!");
      router.push("/login");
    }
  };

  // ... rest of component
}
```

## 🛡️ Security Best Practices

### Current Security Measures

- ✅ Role-based access control
- ✅ Authentication required for admin pages
- ✅ Automatic redirection for non-admin users
- ✅ Secure Supabase authentication

### Recommended Improvements

1. **Use Database-Based Roles** (Option B above) for better scalability
2. **Implement Row Level Security** in Supabase
3. **Add password requirements** (minimum length, complexity)
4. **Enable email confirmation** for new signups
5. **Add audit logging** for admin actions

## 🚀 Quick Start Commands

```bash
# Start development server
npm run dev

# Check Supabase health
curl http://localhost:3000/api/health/supabase

# Access admin dashboard (after login)
# Visit: http://localhost:3000/admin
```

1. Verify your email matches the admin rules in `AdminLayout.tsx`
2. Check browser console for authentication errors

### User Not Redirected to Admin

3. Verify email format matches admin rules

### Can't Access Supabase

1. Check `.env.local` file exists and has correct variables
2. Verify Supabase project URL and keys
3. Test health endpoint: `/api/health/supabase`

## 📞 Need Help?

If you need assistance with:

- Creating the signup page
- Setting up database-based roles
- Configuring email templates
- Adding more security features

Just ask, and I'll help you implement any of these features!

---

**Current Admin Access Rules:**

- `admin@objecttechnologies.online` ✅
- `bryght@objecttechnologies.online` ✅
- Any email containing 'admin' ✅
- All others → Regular dashboard
