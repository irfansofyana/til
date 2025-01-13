(function() {
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

    const searchTerm = getQueryVariable('query');

    if (searchTerm) {
        document.getElementById('search-input').setAttribute("value", searchTerm);

        const idx = lunr(function () {
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

        // Process search term to be more forgiving
        const processedTerm = searchTerm.split(' ').map(term => {
            // Add fuzzy matching and wildcards
            return `${term}~1 ${term}* *${term}*`;
        }).join(' ');

        const results = idx.search(processedTerm);
        displaySearchResults(results, window.store);
    }

    // Live search
    document.getElementById('search-input').addEventListener('keyup', function(e) {
        const searchTerm = e.target.value;
        
        if (searchTerm === '') {
            document.getElementById('search-results').innerHTML = '';
            return;
        }

        const idx = lunr(function () {
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

        // Process search term to be more forgiving
        const processedTerm = searchTerm.split(' ').map(term => {
            // Add fuzzy matching and wildcards
            return `${term}~1 ${term}* *${term}*`;
        }).join(' ');

        const results = idx.search(processedTerm);
        displaySearchResults(results, window.store);
    });
})();
