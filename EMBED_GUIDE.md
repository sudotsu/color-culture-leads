# How to Embed on GoDaddy Website Builder

Since GoDaddy's website builder limits custom code to HTML inserts, the best approach is to use a **launch button** that opens the app in a new tab.

## 🎯 Recommended Approach: Feature Box with Launch Button

This gives the best user experience and works perfectly with GoDaddy's limitations.

### Step 1: Add HTML Widget in GoDaddy
1. Log into your GoDaddy Website Builder
2. Click **"Add Section"** or the **"+"** button
3. Look for **"HTML"**, **"Custom Code"**, or **"Embed Code"** widget
4. Click to add it to your page

### Step 2: Paste This Code

```html
<div style="border: 3px solid #2D5F5D; border-radius: 16px; padding: 30px; margin: 30px auto; max-width: 650px; background: linear-gradient(135deg, #f8fafc 0%, #e8f4f4 100%);">
  <h2 style="color: #2D5F5D; margin: 0 0 10px 0; font-size: 26px;">🎨 Free Paint Color Visualizer</h2>
  <p style="color: #4B5563; font-size: 16px; line-height: 1.7; margin: 15px 0;">
    <strong>Not sure about a color?</strong> Upload a photo of your room and try 45+ professional paint colors instantly!
  </p>

  <ul style="color: #4B5563; font-size: 15px; line-height: 1.8; text-align: left; margin: 20px 0;">
    <li>✓ Real paint colors from Sherwin-Williams, Benjamin Moore & Behr</li>
    <li>✓ Get exact SKU numbers to bring to any paint store</li>
    <li>✓ Try different colors on walls, trim, and ceilings</li>
    <li>✓ Export your selections for easy shopping</li>
  </ul>

  <div style="text-align: center; margin-top: 25px;">
    <a href="https://YOUR-VERCEL-URL.vercel.app?tenant=nikki"
       target="_blank"
       style="display: inline-block; background: linear-gradient(135deg, #2D5F5D 0%, #1e4a48 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 19px; box-shadow: 0 4px 12px rgba(45, 95, 93, 0.3);">
      🚀 Launch Color Visualizer
    </a>
  </div>

  <p style="color: #6B7280; font-size: 13px; margin: 15px 0 0 0; text-align: center;">
    100% Free • No Login Required • Mobile Friendly
  </p>
</div>
```

### Step 3: Update Your URL
Replace `https://YOUR-VERCEL-URL.vercel.app?tenant=nikki` with your actual Vercel deployment URL.

---

## 💡 Alternative: Simple Launch Button

If you want something more minimal:

```html
<div style="text-align: center; margin: 30px auto; max-width: 500px;">
  <p style="font-size: 18px; color: #4B5563; margin-bottom: 20px;">
    <strong>See your space in a new color!</strong><br>
    Try our free paint visualizer with real SKU numbers.
  </p>
  <a href="https://YOUR-VERCEL-URL.vercel.app?tenant=nikki"
     target="_blank"
     style="display: inline-block; background: linear-gradient(135deg, #2D5F5D 0%, #1e4a48 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 20px; box-shadow: 0 4px 14px rgba(45, 95, 93, 0.4);">
    🎨 Try Color Visualizer
  </a>
</div>
```

---

## 🔄 Optional: Floating Button (Always Visible)

Add this to have a button that follows users as they scroll:

```html
<a href="https://YOUR-VERCEL-URL.vercel.app?tenant=nikki"
   target="_blank"
   style="position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, #2D5F5D 0%, #1e4a48 100%); color: white; padding: 16px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 6px 20px rgba(45, 95, 93, 0.5); z-index: 9999; display: flex; align-items: center; gap: 8px;">
  🎨 Color Visualizer
</a>
```

Note: Some GoDaddy plans may not support fixed positioning. Test this after adding.

---

## 📱 Why This Works Better Than iFrame

1. **No size restrictions** - App opens full-screen in new tab
2. **Better mobile experience** - Full control on smaller screens
3. **Faster loading** - No nested page loading issues
4. **Works on all GoDaddy plans** - Even basic plans support this
5. **Professional feel** - Opens like a dedicated tool

---

## ✅ After Adding

1. **Preview your site** to make sure the button works
2. **Test on mobile** to ensure it looks good on phones
3. **Click the button** to verify it opens the app correctly
4. Share the link with your customers!

---

## 🎨 Customization

You can customize the colors to match your brand:
- Change `#2D5F5D` (teal) to your brand color
- Change button text
- Adjust spacing and sizes
- Add your logo above the button

Need help? The colors and styling are all in standard CSS that GoDaddy supports!
