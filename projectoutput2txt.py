import os

js_extensions = ('.js', '.jsx', '.ts', '.tsx')

with open('projectoutput2txt.txt', 'w', encoding='utf-8') as f:
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(js_extensions):
                filepath = os.path.join(root, file)
                f.write(f'\n#### {filepath} begin\n')
                with open(filepath, encoding='utf-8') as g:
                    f.write(g.read())
                f.write(f'\n#### {filepath} end\n\n\n')
