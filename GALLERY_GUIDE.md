# Gallery Feature Configuration Guide

## Overview

The Gallery feature allows you to create curated collections of blog posts based on specific tags. This is perfect for creating themed pages like "Reading Notes", "Travel Experiences", or any other categorized content collections.

## Configuration

### 1. Basic Setup

The Gallery feature is configured in `src/config.ts` within the `siteConfig.gallery` section:

```typescript
gallery: {
    collections: [
        {
            name: "Reading Notes",
            description: "Collection of reading reviews and notes",
            tags: ["reading", "books", "review"],
            displayMode: "table",
        },
        {
            name: "Travel Experiences", 
            description: "Travel blogs and experiences",
            tags: ["travel", "journey", "experience"],
            displayMode: "grid",
        },
    ],
},
```

### 2. Collection Properties

Each collection object supports the following properties:

- **name**: Display name for the collection (required)
- **description**: Optional description shown in the collection info panel
- **tags**: Array of tags to filter posts by (required)
- **displayMode**: Either "table" or "grid" view (optional, defaults to "grid")

### 3. Display Modes

#### Table Mode
- Shows posts in a structured table format
- Displays cover image, title, date, and tags
- Best for reading lists and detailed overviews
- Good for collections where metadata is important

#### Grid Mode  
- Shows posts in a card-based grid layout
- More visual with larger images
- Better for photo-heavy content like travel blogs
- Responsive design adapts to screen size

## Usage Examples

### Reading Collection
```typescript
{
    name: "Book Reviews",
    description: "In-depth reviews of books I've read",
    tags: ["reading", "books", "review", "literature"],
    displayMode: "table",
}
```

### Travel Collection
```typescript
{
    name: "Adventures",
    description: "Travel experiences and photography",
    tags: ["travel", "photography", "adventure"],
    displayMode: "grid", 
}
```

### Tech Articles
```typescript
{
    name: "Tech Deep Dives",
    description: "Technical articles and tutorials",
    tags: ["programming", "tutorial", "tech"],
    displayMode: "table",
}
```

## Adding Content

### 1. Tag Your Posts
Make sure your blog posts include the appropriate tags in their frontmatter:

```yaml
---
title: "My Tokyo Adventure"
tags: ["travel", "journey", "experience", "Japan"]
category: "Travel"
---
```

### 2. Include Cover Images
For best visual results, especially in grid mode, include cover images:

```yaml
---
title: "Book Review: 1984"
image: "/covers/1984-cover.jpg"
tags: ["reading", "books", "review"]
---
```

### 3. Write Descriptions
Add compelling descriptions that will show in both table and grid views:

```yaml
---
title: "The Great Gatsby Review"
description: "An in-depth analysis of Fitzgerald's masterpiece"
tags: ["reading", "books", "review", "classic"]
---
```

## Navigation

The Gallery link is automatically added to your navigation bar between Archive and Projects. The position can be modified in `src/config.ts`:

```typescript
export const navBarConfig: NavBarConfig = {
    links: [
        LinkPreset.Home,
        LinkPreset.Archive,
        LinkPreset.Gallery,  // <- Gallery position
        LinkPreset.Projects,
        LinkPreset.About,
    ],
};
```

## Customization

### Styling
The Gallery component uses CSS variables for theming and will automatically adapt to your site's color scheme. Custom styles can be added to `src/components/GalleryPanel.svelte`.

### Translations
Gallery text is internationalized. To add support for new languages, update:
- `src/i18n/i18nKey.ts` 
- `src/i18n/languages/[language].ts`

### Filtering Logic
Posts are matched against collection tags using case-insensitive comparison. A post appears in a collection if it has ANY of the collection's tags.

## Tips

1. **Consistent Tagging**: Use consistent tag naming across your posts
2. **Descriptive Collections**: Give collections clear names and descriptions
3. **Appropriate Display Mode**: Use table mode for text-heavy collections, grid mode for visual content
4. **Cover Images**: Include engaging cover images for better visual appeal
5. **Tag Overlap**: Posts can appear in multiple collections if they share tags

## Troubleshooting

### No Posts Appearing
- Check that your posts have matching tags
- Verify tags are spelled correctly (case-insensitive)
- Ensure posts are not drafts (`draft: false`)

### Styling Issues
- Check CSS variables are properly defined
- Verify Tailwind classes are available
- Test in different browsers and screen sizes

This Gallery feature provides a powerful way to organize and showcase your content in meaningful collections for your readers.
