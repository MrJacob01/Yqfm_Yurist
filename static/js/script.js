document.addEventListener('DOMContentLoaded', function() {
    // Add new replacement pair
    document.getElementById('add-replacement').addEventListener('click', function() {
        const container = document.getElementById('replacements-container');
        const newPair = document.createElement('div');
        newPair.className = 'replacement-pair mb-2 row g-2';
        newPair.innerHTML = `
            <div class="col-md-5">
                <input type="text" class="form-control" name="old_word" placeholder="Word to replace" required>
            </div>
            <div class="col-md-5">
                <input type="text" class="form-control" name="new_word" placeholder="Replacement word" required>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-danger remove-pair">Remove</button>
            </div>
        `;
        container.appendChild(newPair);
        
        // Add event listener to new remove button
        newPair.querySelector('.remove-pair').addEventListener('click', function() {
            container.removeChild(newPair);
        });
    });
    
    // Remove replacement pair
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('remove-pair')) {
            e.target.closest('.replacement-pair').remove();
        }
    });
    
    // Form submission - gather all replacements
    document.querySelector('form').addEventListener('submit', function(e) {
        const pairs = document.querySelectorAll('.replacement-pair');
        const replacementsData = document.getElementById('replacements-data');
        const replacements = [];
        
        pairs.forEach(pair => {
            const oldWord = pair.querySelector('input[name="old_word"]').value;
            const newWord = pair.querySelector('input[name="new_word"]').value;
            
            if (oldWord && newWord) {
                replacements.push(`${oldWord}|||${newWord}`);
            }
        });
        
        replacementsData.value = replacements.join(';;');
        
        if (replacements.length === 0) {
            e.preventDefault();
            alert('Please add at least one replacement pair');
        }
    });
});