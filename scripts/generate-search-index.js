import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read all HTML files from the _site directory
const siteDir = path.join(__dirname, '../_site');
const searchIndex = [];

function extractTextFromHTML(html) {
  // Remove script and style tags and their content
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Remove HTML tags
  html = html.replace(/<[^>]+>/g, ' ');
  
  // Decode HTML entities
  html = html.replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Clean up whitespace
  return html.replace(/\s+/g, ' ').trim();
}

function extractTitle(html) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  return titleMatch ? titleMatch[1].trim() : '';
}

function extractDescription(html) {
  // Try to get the first paragraph of content
  const contentMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (contentMatch) {
    const text = extractTextFromHTML(contentMatch[1]);
    // Get first 160 characters
    return text.substring(0, 160) + (text.length > 160 ? '...' : '');
  }
  return '';
}

function walkDirectory(dir, baseDir = dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other build directories
      if (!['node_modules', '_site', '.git', '.cache'].includes(file)) {
        walkDirectory(filePath, baseDir);
      }
    } else if (file.endsWith('.html') && file !== 'index.html') {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(baseDir, filePath);
      const url = '/' + relativePath.replace(/\\/g, '/').replace('.html', '');
      
      const title = extractTitle(content);
      const text = extractTextFromHTML(content);
      const description = extractDescription(content);
      
      // Skip empty pages
      if (title && text.length > 50) {
        searchIndex.push({
          url,
          title,
          description,
          content: text.substring(0, 5000) // Limit content size
        });
      }
    }
  });
}

// Also process index.html files in subdirectories
function processIndexFiles(dir, baseDir = dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '_site', '.git', '.cache'].includes(file)) {
        processIndexFiles(filePath, baseDir);
      }
    } else if (file === 'index.html' && dir !== baseDir) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const relativePath = path.relative(baseDir, dir);
      const url = '/' + relativePath.replace(/\\/g, '/') + '/';
      
      const title = extractTitle(content);
      const text = extractTextFromHTML(content);
      const description = extractDescription(content);
      
      if (title && text.length > 50) {
        searchIndex.push({
          url,
          title,
          description,
          content: text.substring(0, 5000)
        });
      }
    }
  });
}

console.log('Generating search index...');

if (fs.existsSync(siteDir)) {
  walkDirectory(siteDir);
  processIndexFiles(siteDir);
  
  // Write the search index
  const indexPath = path.join(siteDir, 'search-index.json');
  fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`Search index generated with ${searchIndex.length} entries`);
} else {
  console.error('_site directory not found. Make sure to build the site first.');
}