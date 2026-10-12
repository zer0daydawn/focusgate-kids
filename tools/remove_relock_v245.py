#!/usr/bin/env python3
"""Remove temporary re-lock test control from FocusGate Kids v2.4.5."""
import json, pathlib, re, shutil, sys, zipfile
if len(sys.argv)!=2: raise SystemExit('Usage: python remove_relock_v245.py "C:\\path\\to\\FocusGate-Kids-v2.4.5"')
src=pathlib.Path(sys.argv[1]).resolve()
for name in ('manifest.json','options.html','options.js'):
    if not (src/name).is_file(): raise SystemExit('Missing '+name)
if json.loads((src/'manifest.json').read_text('utf-8-sig')).get('version')!='2.4.5': raise SystemExit('Expected v2.4.5')
h=(src/'options.html').read_text('utf-8-sig'); j=(src/'options.js').read_text('utf-8-sig')
widget=r'(?s)\s*<div id="fgRelockTestToolbar"[^>]*>\s*<button id="fgRelockNow"[^>]*>.*?</button>\s*<div id="fgRelockStatus"[^>]*>.*?</div>\s*</div>'
handler=r"(?s)\n// Explicit security-test control: re-lock dashboard, not the failed-attempt counter\.\s*document\.getElementById\('fgRelockNow'\)\?\.addEventListener\('click', async \(\) => \{.*?\n\}\);\s*"
h2,n1=re.subn(widget,'',h,count=1);j2,n2=re.subn(handler,'\n',j,count=1)
if n1!=1 or n2!=1: raise SystemExit(f'Expected one widget and handler; got {n1},{n2}. No changes made.')
dst=src.parent/'FocusGate-Kids-v2.4.5-final'
if dst.exists(): raise SystemExit('Output already exists: '+str(dst))
shutil.copytree(src,dst,ignore=shutil.ignore_patterns('.git','__pycache__'))
(dst/'options.html').write_text(h2,'utf-8');(dst/'options.js').write_text(j2,'utf-8')
out=dst.parent/'FocusGate-Kids-v2.4.5-final.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
    for p in dst.rglob('*'):
        if p.is_file(): z.write(p,p.relative_to(dst))
print('Created:',dst,'\nZIP:',out)
