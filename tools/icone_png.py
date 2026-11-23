# Gera todos os ícones do app a partir de tools/icone-original.jpg (imagem 2048x2048).
# Uso, na raiz do repositório: python3 tools/icone_png.py
import glob, os
from PIL import Image, ImageDraw, ImageFilter
R = 'android/app/src/main/res'
src = Image.open('tools/icone-original.jpg').convert('RGB')
W = src.size[0]
BG = tuple(int(sum(src.getpixel(p)[i] for p in [(5, 5), (W - 5, 5), (5, W - 5), (W - 5, W - 5)]) / 4) for i in range(3))
hexbg = '#%02X%02X%02X' % BG
# máscara da figura: tudo que difere da cor de fundo
px = src.load(); mask = Image.new('L', src.size, 0); mp = mask.load()
for y in range(W):
    for x in range(W):
        r, g, b = px[x, y]
        d = abs(r - BG[0]) + abs(g - BG[1]) + abs(b - BG[2])
        mp[x, y] = 0 if d < 18 else 255 if d > 70 else int((d - 18) / 52 * 255)
fig = src.convert('RGBA'); fig.putalpha(mask)           # figura sobre transparente
def redondo(im):
    m = Image.new('L', im.size, 0); ImageDraw.Draw(m).ellipse([0, 0, *im.size], fill=255)
    o = im.convert('RGBA'); o.putalpha(m); return o
# ícones do navegador/PWA
for n in (192, 512, 1024): src.resize((n, n), Image.LANCZOS).save(f'www/icons/icon-{n}.png')
# silhueta branca para a notificação
bbox = mask.getbbox(); sil = Image.new('RGBA', src.size, (255, 255, 255, 0)); sil.putalpha(mask); sil = sil.crop(bbox)
dens = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}
for d, k in dens.items():
    n = int(48 * k)
    ic = src.resize((n, n), Image.LANCZOS)
    ic.save(f'{R}/mipmap-{d}/ic_launcher.png'); redondo(ic).save(f'{R}/mipmap-{d}/ic_launcher_round.png')
    f = int(108 * k); fg = fig.resize((f, f), Image.LANCZOS); fg.save(f'{R}/mipmap-{d}/ic_launcher_foreground.png')
    t = int(24 * k); s2 = int(t * 0.92)
    w = int(sil.width * s2 / max(sil.size)); h = int(sil.height * s2 / max(sil.size))
    st = Image.new('RGBA', (t, t), (0, 0, 0, 0)); sm = sil.resize((w, h), Image.LANCZOS); st.paste(sm, ((t - w) // 2, (t - h) // 2), sm)
    os.makedirs(f'{R}/drawable-{d}', exist_ok=True); st.save(f'{R}/drawable-{d}/ic_stat_icon.png')
# splash: fundo escuro e ícone redondo no centro
for p in glob.glob(f'{R}/drawable*/splash.png'):
    w, h = Image.open(p).size
    sp = Image.new('RGBA', (w, h), (15, 27, 36, 255)); n = int(min(w, h) * 0.28)
    ic = redondo(src.resize((n, n), Image.LANCZOS)); sp.paste(ic, ((w - n) // 2, (h - n) // 2), ic); sp.convert('RGB').save(p)
open(f'{R}/values/ic_launcher_background.xml', 'w').write(f'<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">{hexbg}</color>\n</resources>\n')
print('ok', hexbg)
