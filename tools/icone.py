# Gera os ícones do app (coração + estrela sobre fundo azul-petróleo). Uso: python3 tools/icone.py www/icons
from PIL import Image, ImageDraw
import math, sys
def coracao(d, cx, cy, s, cor):
    pts = []
    for i in range(360):
        t = math.radians(i)
        x = 16 * math.sin(t) ** 3
        y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
        pts.append((cx + x * s, cy - y * s))
    d.polygon(pts, fill=cor)
def brilho(d, cx, cy, r, cor):
    pts = []
    for i in range(8):
        a = math.radians(i * 45 - 90); rr = r if i % 2 == 0 else r * 0.28
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    d.polygon(pts, fill=cor)
def icone(n):
    S = n * 4
    im = Image.new('RGBA', (S, S)); d = ImageDraw.Draw(im)
    for y in range(S):
        k = y / S
        d.line([(0, y), (S, y)], fill=(int(47 - 20 * k), int(127 - 58 * k), int(143 - 45 * k), 255))
    b = (255, 255, 255, 255)
    coracao(d, S * 0.47, S * 0.56, S * 0.0125, b)
    brilho(d, S * 0.75, S * 0.27, S * 0.12, b)
    return im.resize((n, n), Image.LANCZOS)
out = sys.argv[1]
for n in (192, 512, 1024): icone(n).save(f'{out}/icon-{n}.png')
