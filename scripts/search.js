// Modal-based search implementation
class SiteSearch {
  constructor() {
    this.searchIndex = null;
    this.searchInput = null;
    this.searchResults = null;
    this.searchModal = null;
    this.searchBackdrop = null;
    this.searchTrigger = null;
    this.searchClose = null;
    this.init();
  }

  async init() {
    // Load search index
    try {
      const response = await fetch('/search-index.json');
      this.searchIndex = await response.json();
    } catch (error) {
      console.error('Failed to load search index:', error);
    }

    // Set up DOM elements
    this.searchModal = document.getElementById('search-modal');
    this.searchBackdrop = document.getElementById('search-backdrop');
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    this.searchTrigger = document.getElementById('search-trigger');
    this.searchClose = document.getElementById('search-close');

    // Set up event listeners
    if (this.searchTrigger) {
      this.searchTrigger.addEventListener('click', () => this.openModal());
    }

    if (this.searchClose) {
      this.searchClose.addEventListener('click', () => this.closeModal());
    }

    if (this.searchBackdrop) {
      this.searchBackdrop.addEventListener('click', () => this.closeModal());
    }

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.openModal();
      }
      
      // Escape to close
      if (e.key === 'Escape' && this.isModalOpen()) {
        this.closeModal();
      }
    });
  }

  openModal() {
    if (this.searchModal) {
      this.searchModal.classList.remove('hidden');
      // Focus the input after a small delay to ensure the modal is visible
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.focus();
        }
      }, 50);
    }
  }

  closeModal() {
    if (this.searchModal) {
      this.searchModal.classList.add('hidden');
      this.clearSearch();
    }
  }

  isModalOpen() {
    return this.searchModal && !this.searchModal.classList.contains('hidden');
  }

  handleSearch(query) {
    if (!query || query.length < 2) {
      this.clearResults();
      return;
    }

    const results = this.search(query);
    this.displayResults(results);
  }

  search(query) {
    if (!this.searchIndex) return [];

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    return this.searchIndex
      .map(item => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const contentLower = item.content.toLowerCase();

        searchTerms.forEach(term => {
          // Title matches are worth more
          if (titleLower.includes(term)) {
            score += 10;
            // Exact title match bonus
            if (titleLower === term) {
              score += 20;
            }
          }
          
          // Content matches
          if (contentLower.includes(term)) {
            score += 1;
            // Count occurrences (up to 5)
            const matches = (contentLower.match(new RegExp(term, 'g')) || []).length;
            score += Math.min(matches - 1, 5);
          }
        });

        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Limit to top 10 results
  }

  displayResults(results) {
    if (!this.searchResults) return;

    if (results.length === 0) {
      this.searchResults.innerHTML = '<div class="p-8 text-center text-gray-500">No results found</div>';
      return;
    }

    const html = results.map((result, index) => `
      <a href="${result.url}" class="block p-4 hover:bg-gray-50 border-b border-gray-100 focus:bg-gray-50 focus:outline-none" tabindex="${index + 1}">
        <div class="font-semibold text-gray-900">${this.highlightText(result.title, this.searchInput.value)}</div>
        <div class="text-sm text-gray-600 mt-1">${this.highlightText(result.description, this.searchInput.value)}</div>
      </a>
    `).join('');

    this.searchResults.innerHTML = html;

    // Add keyboard navigation
    const links = this.searchResults.querySelectorAll('a');
    links.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && index < links.length - 1) {
          e.preventDefault();
          links[index + 1].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (index > 0) {
            links[index - 1].focus();
          } else {
            this.searchInput.focus();
          }
        }
      });
    });

    // Allow arrow down from search input to first result
    if (this.searchInput && links.length > 0) {
      const existingHandler = this.searchInput.getAttribute('data-arrow-handler');
      if (!existingHandler) {
        this.searchInput.setAttribute('data-arrow-handler', 'true');
        this.searchInput.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowDown' && links.length > 0) {
            e.preventDefault();
            links[0].focus();
          }
        });
      }
    }
  }

  highlightText(text, query) {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    let highlightedText = text;

    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
    });

    return highlightedText;
  }

  clearResults() {
    if (this.searchResults) {
      this.searchResults.innerHTML = '';
    }
  }

  clearSearch() {
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.clearResults();
  }
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SiteSearch();
});