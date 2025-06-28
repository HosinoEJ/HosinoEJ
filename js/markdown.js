document.querySelectorAll('#markdown-source').forEach((source, idx) => {
            const outputs = document.querySelectorAll('#markdown-output');
            if (outputs[idx]) {
                outputs[idx].innerHTML = marked.parse(source.innerText || source.textContent);
            }
        });