document.addEventListener('DOMContentLoaded', () => {
  // Function to set up button functionality
  function setupSeeMoreButton() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const moreContent = document.getElementById('moreContent');
    
    if (seeMoreBtn && moreContent) {
      // Initially hide the content
      moreContent.classList.add('hidden');
      
      // Remove any existing event listeners
      const newButton = seeMoreBtn.cloneNode(true);
      seeMoreBtn.parentNode.replaceChild(newButton, seeMoreBtn);
      
      newButton.addEventListener('click', () => {
        // Toggle the hidden class
        moreContent.classList.toggle('hidden');
        
        // Update button text
        newButton.textContent = moreContent.classList.contains('hidden') ? 'See More' : 'See Less';
        
        // If showing content, scroll it into view smoothly
        if (!moreContent.classList.contains('hidden')) {
          moreContent.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          // Reset scroll position of track list to top
          const trackList = moreContent.querySelector('.track-list');
          if (trackList) {
            trackList.scrollTop = 0;
          }
        }
      });
    }
  }

  // Set up track list scrolling
  function setupTrackListScrolling() {
    const trackList = document.querySelector('.track-list');
    if (trackList) {
      let isScrolling = false;
      
      // Remove any existing event listeners
      const newTrackList = trackList.cloneNode(true);
      trackList.parentNode.replaceChild(newTrackList, trackList);
      
      newTrackList.addEventListener('wheel', (e) => {
        if (!isScrolling) {
          isScrolling = true;
          
          if (
            (newTrackList.scrollTop === 0 && e.deltaY < 0) ||
            (newTrackList.scrollTop + newTrackList.clientHeight === newTrackList.scrollHeight && e.deltaY > 0)
          ) {
            e.preventDefault();
          }
          
          requestAnimationFrame(() => {
            isScrolling = false;
          });
        }
      });
    }
  }

  // Function to wait for iframes to load
  function waitForIframes(container) {
    const iframes = container.getElementsByTagName('iframe');
    const iframePromises = Array.from(iframes).map(iframe => {
      return new Promise((resolve) => {
        if (iframe.contentWindow.document.readyState === 'complete') {
          resolve();
        } else {
          iframe.addEventListener('load', resolve);
        }
      });
    });
    return Promise.all(iframePromises);
  }

  // Function to handle content loading
  function loadContent() {
    // Load content.html
    fetch('content.html')
      .then(response => response.text())
      .then(data => {
        const container = document.getElementById('contentContainer');
        container.innerHTML = data;
        return waitForIframes(container);
      })
      .then(() => {
        // Set up button after content and iframes are loaded
        setupSeeMoreButton();
        setupTrackListScrolling();
      })
      .catch(error => {
        console.error('Error loading the content:', error);
        const container = document.getElementById('contentContainer');
        if (container) {
          container.innerHTML = '<p>Error loading content. Please refresh the page.</p>';
        }
      });

    // Load content2.html
    fetch('content2.html')
      .then(response => response.text())
      .then(data => {
        const container = document.getElementById('contentContainer2');
        container.innerHTML = data;
        return waitForIframes(container);
      })
      .then(() => {
        // Set up button after content and iframes are loaded
        setupSeeMoreButton();
        setupTrackListScrolling();
      })
      .catch(error => {
        console.error('Error loading content2:', error);
        const container = document.getElementById('contentContainer2');
        if (container) {
          container.innerHTML = '<p>Error loading content. Please refresh the page.</p>';
        }
      });

         // Load contents.html
    fetch('contents.html')
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById('contentContainer3');
      container.innerHTML = data;
      return waitForIframes(container);
    })
    .then(() => {
      // Set up button after content and iframes are loaded
      setupSeeMoreButton();
      setupTrackListScrolling();
    })
    .catch(error => {
      console.error('Error loading contents:', error);
      const container = document.getElementById('contentContainer3');
      if (container) {
        container.innerHTML = '<p>Error loading content. Please refresh the page.</p>';
      }
    });
    
  }

  // Initial load
  loadContent();
});