"""Verify extracted evidence against the original DOCX without changing either."""
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile

root = Path(__file__).resolve().parent.parent
records = []
with ZipFile(root / 'content/sources/informe-final.docx') as doc:
    manifest = json.loads((root / 'content/evidence/manifest.json').read_text())
    for figure in manifest:
        for name, media in zip(figure['files'], figure['docxMedia'], strict=True):
            original = doc.read(media)
            for folder in ['content/evidence', 'public/evidence']:
                assert (root / folder / name).read_bytes() == original, f'{folder}/{name} differs from DOCX'
            records.append({'figure': figure['figure'], 'file': name, 'docxMedia': media,
                            'sha256': hashlib.sha256(original).hexdigest()})
(root / 'artifacts').mkdir(exist_ok=True)
(root / 'artifacts/evidence-check.json').write_text(json.dumps({'status': 'passed', 'files': records}, indent=2))
print(f'PASS: {len(records)} images match the original DOCX byte for byte.')
