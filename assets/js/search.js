(function() {
    let searchIndex;
    let debounceTimeout;

    function initializeIndex() {
        if (!searchIndex) {
            searchIndex = lunr(function () {
                this.ref('id');
                this.field('title', { boost: 10 });
                this.field('content', { boost: 5 });
                this.field('tags', { boost: 3 });

                // Enable fuzzy matching by default
                this.pipeline.remove(lunr.stemmer);
                this.searchPipeline.remove(lunr.stemmer);

                for (const key in window.store) {
                    this.add({
                        id: key,
                        title: window.store[key].title,
                        content: window.store[key].content,
                        tags: window.store[key].tags
                    });
                }
            });
        }
        return searchIndex;
    }

    function displaySearchResults(results, store) {
        const searchResults = document.getElementById('search-results');
        if (results.length) {
            let resultList = '';
            for (const n in results) {
                const item = store[results[n].ref];
                resultList += '<div class="post-preview">';
                resultList += '<h2><a href="' + item.url + '">' + item.title + '</a></h2>';
                resultList += '<div class="post-meta">';
                resultList += '<time>' + item.date + '</time>';
                if (item.tags) {
                    resultList += '<div class="tags">';
                    item.tags.split(', ').forEach(tag => {
                        resultList += '<a href="/tags#' + tag.toLowerCase() + '" class="tag">' + tag + '</a>';
                    });
                    resultList += '</div>';
                }
                resultList += '</div>';
                resultList += '</div>';
            }
            searchResults.innerHTML = resultList;
        } else {
            searchResults.innerHTML = '<p>No results found.</p>';
        }
    }

    function getQueryVariable(variable) {
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        for (const i in vars) {
            const pair = vars[i].split('=');
            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    function performSearch(searchTerm) {
        if (searchTerm === '') {
            document.getElementById('search-results').innerHTML = '';
            return;
        }

        const idx = initializeIndex();

        // Process search term with more efficient matching
        let processedTerm = searchTerm;
        if (searchTerm.length > 2) {
            processedTerm = searchTerm.split(' ')
                .map(term => term.length > 2 ? `${term}~1` : term)
                .join(' ');
        }

        const results = idx.search(processedTerm);
        displaySearchResults(results, window.store);
    }

    // Handle URL query parameter search
    const searchTerm = getQueryVariable('query');
    if (searchTerm) {
        document.getElementById('search-input').setAttribute("value", searchTerm);
        performSearch(searchTerm);
    }

    // Live search with debouncing
    document.getElementById('search-input').addEventListener('input', function(e) {
        const searchTerm = e.target.value;
        
        // Clear any pending debounce
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set a new debounce timeout
        debounceTimeout = setTimeout(() => {
            performSearch(searchTerm);
        }, 250); // Wait 250ms after user stops typing
    });
})();
