/* Guias: segurança, desenvolvimento e brincadeiras. Fontes: SBP, Safe Kids, Ministério da Saúde, CDC. */
(function () {
  const A = (id, cat, e, t, r, p, o) => window.GUIAS.push(Object.assign({ id, cat, e, t, r, p, lista: !!(o && o.l) }, o || {}));
  const MS = 'Ministério da Saúde e SBP';

  /* ---------- SEGURANÇA ---------- */
  A('prevenir-quedas', 'seg', '🪜', 'Prevenir quedas', 'A maioria acontece em casa, em segundos.', [
    'Nunca deixe a Maya sozinha em trocador, cama, sofá ou colo de quem pode dormir, nem por um segundo.',
    'Na troca, mantenha sempre uma mão nela. Deixe tudo ao alcance antes de começar.',
    'Quando ela começar a rolar, não a deixe em lugar alto, mesmo que ainda nunca tenha rolado.',
    'Trave grades do berço na posição correta e baixe o colchão conforme ela cresce.',
    'Portões em escadas, tapetes antiderrapantes e proteção nas quinas quando ela engatinhar.',
  ], { fase: ['s1', 'm1', 'm2', 'm4'], f: 'SBP e Safe Kids' });

  A('banho-seguro', 'seg', '🛁', 'Banheira: nunca sozinha', 'Afogamento é silencioso e rápido.', [
    'Um bebê pode se afogar em poucos centímetros de água, em segundos e sem fazer barulho.',
    'Nunca saia do banheiro, nem para atender o celular ou a campainha. Leve o bebê junto.',
    'Prepare tudo antes: toalha, roupa, fralda, sabonete.',
    'Esvazie baldes e banheiras logo após o uso. Tampe vasos sanitários e mantenha a porta do banheiro fechada.',
    'Boia e cadeirinha de banho não são sinal de segurança.',
  ], { fase: ['s1', 'm1', 'm4', 'm7'], f: 'SBP' });

  A('casa-engatinhar', 'seg', '🏠', 'Casa segura para engatinhar', 'Faça a ‘inspeção’ à altura dela.', [
    'Ande engatinhando pela casa para ver o que ela vê e alcança.',
    'Tampe tomadas, proteja quinas, prenda fios e cabos.',
    'Coloque portões em escadas e proteção em portas de vidro.',
    'Tire plantas, objetos pequenos e produtos de limpeza do chão e do alcance.',
    'Fixe móveis altos na parede (estantes, cômodas, TV).',
  ], { l: 1, fase: ['m4', 'm7'], f: 'SBP e Safe Kids' });

  A('janelas-varandas', 'seg', '🪟', 'Janelas, varandas e telas', 'Telas de proteção são essenciais em apartamentos.', [
    'Instale tela de proteção em janelas e varandas, mesmo que você ache que ela não alcança.',
    'Mosquiteiro comum não segura o peso de uma criança. Use tela própria para proteção.',
    'Afaste sofás, camas e móveis que sirvam de degrau.',
    'Nunca deixe a Maya sozinha em locais com acesso à varanda.',
    'Mantenha janelas com trava ou limitadas.',
  ], { fase: ['m4', 'm7', 'm10'], f: 'SBP' });

  A('produtos-trancados', 'seg', '🔒', 'Remédios e produtos de limpeza', 'Guarde em alto e trancado.', [
    'Remédios, produtos de limpeza, cosméticos e álcool ficam em armário alto e com trava.',
    'Nunca guarde produtos em garrafas de refrigerante ou potes de alimento.',
    'Pilhas de botão e ímãs pequenos: perigosos se engolidos. Procure ajuda imediata.',
    'Cuidado com bolsas de visitas, que podem ter remédios ao alcance dela.',
    'Salve o Disque-Intoxicação (0800 722 6001) no celular.',
  ], { fase: ['m4', 'm7', 'm10'], f: 'SBP e Anvisa' });

  A('objetos-pequenos', 'seg', '🪙', 'Objetos pequenos e engasgo', 'Tudo vai para a boca depois dos 4 a 6 meses.', [
    'O que cabe num rolo de papel higiênico cabe na garganta. Se passar, não deixe com ela.',
    'Evite moedas, tampinhas, botões, balões de festa, pilhas e peças de brinquedos.',
    'Bolas de gude, bexigas estouradas e plásticos são riscos comuns.',
    'Cheque brinquedos com peças que soltam e verifique a faixa etária indicada.',
    'Aprenda as manobras de desengasgo.',
  ], { fase: ['m4', 'm7', 'm10'], f: 'SBP' });

  A('cordas-sufocacao', 'seg', '🧵', 'Cordas, cabos e sufocação', 'Fios no pescoço são um risco real.', [
    'Cordões de cortina, fios de carregador e fitas ficam longe do berço e do chão.',
    'Não ponha colares, cordões ou fitas no pescoço do bebê.',
    'Chupeta com prendedor deve ter fita curta e segura.',
    'Sacolas plásticas e embalagens devem ficar longe dela.',
    'No berço, nada solto: sem travesseiro, protetor ou mantas grandes.',
  ], { fase: ['s1', 'm1', 'm2', 'm4'], f: 'SBP' });

  A('cozinha-quente', 'seg', '☕', 'Cozinha e líquidos quentes', 'Queimaduras graves acontecem em segundos.', [
    'Nunca carregue a Maya enquanto toma café quente, cozinha ou lida com panelas.',
    'Use as bocas de trás do fogão e vire os cabos das panelas para dentro.',
    'Teste a água do banho com o cotovelo ou termômetro antes de colocá-la.',
    'Mantenha mamadeiras aquecidas e comida longe do alcance do bebê.',
    'Ferros de passar, secadores e aquecedores ficam em lugar alto, longe dela.',
  ], { fase: ['s1', 'm1', 'm4', 'm7'], f: 'SBP' });

  A('andador-nao', 'seg', '🚫', 'Andador: por que evitar', 'A SBP desaconselha. Causa muitos acidentes.', [
    'O andador permite que o bebê alcance perigos, em velocidade, antes que você reaja.',
    'Quedas em escadas e queimaduras são os acidentes mais comuns.',
    'Ele não ensina a andar e pode até atrasar o desenvolvimento motor.',
    'Prefira o chão, tapetes e brincadeiras livres, que ajudam muito mais.',
    'Se alguém ofereceu de presente, agradeça e explique o motivo.',
  ], { fase: ['m7', 'm10'], f: 'SBP' });

  A('sol-bebe', 'seg', '☀️', 'Sol e bebê', 'Proteção sem exagero.', [
    'Para menores de 6 meses, a SBP orienta evitar exposição direta ao sol e proteger com sombra, roupas e chapéu.',
    'Evite horários de sol forte (das 10h às 16h).',
    'Depois dos 6 meses, pode usar protetor solar infantil, conforme orientação do pediatra.',
    'Mantenha a Maya hidratada com leite materno mais vezes em dias quentes.',
    'Converse com o pediatra sobre vitamina D, em vez de ‘banho de sol’.',
  ], { fase: ['s1', 'm1', 'm2', 'm4', 'm7'], f: 'SBP' });

  A('carro-esquecido', 'seg', '🚗', 'Nunca deixe a criança no carro', 'Nem por um minuto. O carro esquenta rápido.', [
    'Mesmo com janela aberta, o carro parado esquenta e pode causar morte por calor em poucos minutos.',
    'Leve a Maya com você sempre, mesmo para ‘só um minuto’.',
    'Para não esquecer: deixe a bolsa ou o celular no banco de trás.',
    'Combine com a Maíra: sempre avisar quando o bebê é levado ou deixado.',
    'Se ver uma criança sozinha no carro, ligue 190 ou 193.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP e Safe Kids' });

  A('piscina-agua', 'seg', '🏊', 'Piscina, praia e outros riscos de afogamento', 'Supervisão ao alcance das mãos.', [
    'Um adulto atento, sem celular, a menos de um braço de distância.',
    'Nunca deixe a Maya sozinha em piscina, banheira, balde, tanque ou lago.',
    'Cerca e portão trancado em piscinas de casa.',
    'Boias, braçadeiras e coletes não substituem a vigilância.',
    'Aprenda a reanimação. Alguns minutos fazem diferença.',
  ], { fase: ['m4', 'm7', 'm10'], f: 'SBP e Sobrasa' });

  A('moveis-ancorar', 'seg', '🪑', 'Prender móveis e TVs', 'Móveis e TVs caem em crianças que sobem neles.', [
    'Fixe estantes, cômodas, guarda-roupas e TVs na parede com ancoragem própria.',
    'Evite colocar brinquedos ou itens interessantes em cima dos móveis.',
    'Mantenha gavetas fechadas com travas.',
    'Prefira móveis baixos e estáveis.',
    'Cuidado com mesas de vidro e quinas.',
  ], { fase: ['m7', 'm10'], f: 'Safe Kids' });

  A('cadeirinha-regras', 'seg', '🚘', 'Cadeirinha do carro: regras', 'A lei e a segurança andam juntas.', [
    'A lei exige dispositivo de retenção adequado à idade, peso e altura, até 10 anos ou 1,45 m.',
    'Bebê-conforto (de costas) para recém-nascidos. Troque só quando passar do limite de peso ou altura da cadeirinha.',
    'Manter de costas para o movimento pelo maior tempo possível é mais seguro.',
    'Alças sem folga, no ombro, e grampo na altura das axilas. Sem casacão grosso por baixo.',
    'Depois de qualquer batida, troque a cadeirinha.',
  ], { fase: ['pre', 's1', 'm4', 'm10'], f: 'Contran, Inmetro e SBP' });

  A('fumo-passivo', 'seg', '🚭', 'Fumaça perto do bebê', 'Nenhuma quantidade é segura.', [
    'Fumo passivo aumenta o risco de infecções, asma e morte súbita.',
    'Nada de cigarro, vape ou narguilé em casa ou no carro, mesmo com a criança ausente.',
    'Fumaça fica na roupa, no cabelo e nas mãos. Troque de roupa e lave as mãos antes de pegá-la.',
    'Peça a visitas que fumem fora de casa.',
    'Se quiser parar de fumar, o SUS oferece apoio gratuito. Procure a UBS.',
  ], { fase: ['pre', 's1', 'm1'], f: 'SBP e Ministério da Saúde' });

  A('plantas-casa', 'seg', '🪴', 'Plantas tóxicas', 'Algumas plantas comuns fazem mal.', [
    'Comigo-ninguém-pode, copo-de-leite, espada-de-são-jorge e outras podem causar irritação e intoxicação.',
    'Tire plantas do alcance da Maya, principalmente quando ela começar a engatinhar.',
    'Cuidado também com terra, adubo e vasos grandes que podem tombar.',
    'Se ela mastigar uma planta, tire da boca e ligue para o Disque-Intoxicação (0800 722 6001).',
    'Leve um pedaço da planta para identificação.',
  ], { fase: ['m7', 'm10'], f: 'SBP' });

  A('cuidadores-regras', 'seg', '👵', 'Passar as regras aos cuidadores', 'Avós, babás e tios precisam saber o essencial.', [
    'Converse com antecedência: sono de barriga para cima, nunca sacudir, nunca deixar sozinha.',
    'Passe a lista de telefones: pediatra, vocês dois, 192, Disque-Intoxicação.',
    'Explique alimentação (sem mel, sem açúcar), horários e sinais de alerta.',
    'Peça que sigam as regras de higiene: lavar as mãos antes de pegar.',
    'Aceite que o jeito deles pode ser diferente, desde que seguro.',
  ], { fase: ['s1', 'm1', 'm4'], f: 'SBP' });

  /* ---------- DESENVOLVIMENTO ---------- */
  A('visao-bebe', 'cresc', '👁️', 'O que a Maya enxerga', 'A visão se desenvolve nos primeiros meses.', [
    'Recém-nascidos enxergam melhor de perto, a uns 20 a 30 cm, a distância do colo para o rosto.',
    'Preferem contrastes altos (preto e branco) e rostos humanos.',
    'Por volta de 2 a 3 meses ela segue objetos e reconhece rostos conhecidos.',
    'As cores aparecem aos poucos. Aos 6 meses a visão é bem mais clara.',
    'Qualquer olho que não acompanha, pupila branca ou desvio persistente pede avaliação.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP' });

  A('audicao-bebe', 'cresc', '👂', 'Audição da Maya', 'Ela já ouve e reconhece sua voz.', [
    'Desde o útero, ela ouve a voz de vocês. Fale e cante bastante.',
    'Nos primeiros meses, reage com sustos, parada ou piscar a barulhos altos.',
    'Por volta de 3 a 4 meses vira a cabeça na direção dos sons.',
    'Se o teste da orelhinha deu alteração, faça o reteste dentro do prazo.',
    'Se ela não reage a sons ou voz, converse com o pediatra.',
  ], { fase: ['s1', 'm1', 'm2', 'm4'], f: 'SBP' });

  A('marcos-1-mes', 'cresc', '🌱', 'O que esperar no 1º mês', 'Tudo é novo e muito rápido.', [
    'Mamar, dormir e chorar são as principais atividades.',
    'Levanta a cabeça por instantes quando de bruços.',
    'Olha para rostos e segue objetos de perto.',
    'Reage a sons e à voz de vocês.',
    'Os movimentos são reflexos: segurar o dedo, procurar a mama.',
  ], { l: 1, fase: ['m1'], f: 'SBP e CDC' });

  A('marcos-2-meses', 'cresc', '😊', 'O que esperar aos 2 meses', 'O primeiro sorriso de verdade.', [
    'Sorriso social: sorri em resposta a você.',
    'Faz sons como ‘ah’ e ‘eh’ (vocalizações).',
    'Segue pessoas e objetos com o olhar, em arco.',
    'Segura a cabeça por mais tempo quando de bruços.',
    'Acalma-se com voz, colo e carinho.',
  ], { l: 1, fase: ['m2'], f: 'SBP e CDC' });

  A('marcos-3-meses', 'cresc', '🤲', 'O que esperar aos 3 meses', 'Mãos, risadas e controle da cabeça.', [
    'Sustenta bem a cabeça e levanta o peito de bruços.',
    'Abre as mãos, leva-as à boca e brinca com elas.',
    'Ri e responde a conversas com sons.',
    'Reconhece pais e olha em volta com curiosidade.',
    'Pode passar a dormir períodos mais longos à noite.',
  ], { l: 1, fase: ['m2'], f: 'SBP e CDC' });

  A('marcos-4-meses', 'cresc', '🎈', 'O que esperar aos 4 meses', 'Ela começa a alcançar o mundo.', [
    'Alcança e segura brinquedos, leva à boca.',
    'Ri alto e faz sons mais variados.',
    'Pode rolar da barriga para as costas.',
    'Mantém a cabeça firme quando sentada com apoio.',
    'Mostra interesse por espelhos e vozes.',
  ], { l: 1, fase: ['m4'], f: 'SBP e CDC' });

  A('marcos-6-meses', 'cresc', '🪑', 'O que esperar aos 6 meses', 'Hora de sentar e experimentar comida.', [
    'Rola nos dois sentidos e senta com apoio.',
    'Balbucia sons como ‘ba’, ‘da’ e ‘ma’.',
    'Reconhece o próprio nome e olha quando é chamada.',
    'Passa objetos de uma mão para a outra.',
    'Início da introdução alimentar, com sinais de prontidão.',
  ], { l: 1, fase: ['m4'], f: 'SBP e CDC' });

  A('marcos-7-9-meses', 'cresc', '🐛', 'O que esperar de 7 a 9 meses', 'Movimento, curiosidade e estranhamento.', [
    'Senta sozinha, se arrasta ou engatinha. Cada bebê escolhe o seu jeito.',
    'Brinca de esconde-esconde e bate palmas.',
    'Faz o movimento de pinça (polegar e indicador).',
    'Estranha pessoas desconhecidas e sente falta de vocês.',
    'Segue gestos e entende ‘não’ pelo tom de voz.',
  ], { l: 1, fase: ['m7'], f: 'SBP e CDC' });

  A('marcos-10-12-meses', 'cresc', '👣', 'O que esperar de 10 a 12 meses', 'Os primeiros passos estão chegando.', [
    'Fica em pé com apoio e dá passos segurando nos móveis.',
    'Pode dar os primeiros passos sozinha entre 9 e 17 meses.',
    'Fala as primeiras palavras como ‘mama’ e ‘papa’ com sentido.',
    'Dá tchau, faz gestos e imita sons.',
    'Entende pedidos simples como ‘me dá’.',
  ], { l: 1, fase: ['m10'], f: 'SBP e CDC' });

  A('sinais-alerta-desenvolvimento', 'cresc', '🚩', 'Sinais de alerta no desenvolvimento', 'Cada bebê tem seu ritmo, mas alguns sinais merecem atenção.', [
    'Não sorri para as pessoas por volta dos 3 meses.',
    'Não segue objetos com os olhos ou não reage a sons.',
    'Mantém as mãos sempre fechadas ou o corpo muito mole ou muito duro.',
    'Não senta com apoio aos 6 a 9 meses, não balbucia, não responde ao nome por volta de 9 a 12 meses.',
    'Perda de habilidades que já tinha.',
    'Leve suas dúvidas à consulta. O pediatra avalia e encaminha se precisar.',
  ], { l: 1, fase: ['m2', 'm4', 'm7', 'm10'], a: ['Quanto mais cedo qualquer atraso for identificado, melhor o apoio.'], f: 'SBP e CDC' });

  A('tummy-time', 'cresc', '🐢', 'Tempo de bruços (tummy time)', 'Treino para pescoço, ombros e costas.', [
    'Com ela acordada e supervisionada, coloque-a de bruços numa superfície firme, por poucos minutos, várias vezes ao dia.',
    'Comece desde as primeiras semanas, por 1 a 2 minutos, e vá aumentando.',
    'Deite no chão ao lado, no seu peito, converse e mostre brinquedos.',
    'Se ela chorar muito, pare, tente outra posição e volte depois.',
    'Nunca deixe dormir de bruços. Para dormir, sempre de barriga para cima.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'Academia Americana de Pediatria e SBP' });

  A('curva-crescimento', 'cresc', '📏', 'Peso, altura e a curva de crescimento', 'O que importa é o caminho, não um dia só.', [
    'O pediatra mede peso, comprimento e perímetro da cabeça e marca na curva da caderneta.',
    'O que se avalia é se ela segue um ritmo constante, não um número isolado.',
    'Bebês perdem até 10% do peso na primeira semana e recuperam em cerca de 2 semanas.',
    'Cada bebê cresce no seu ritmo. Não compare com outros.',
    'Pergunte ao pediatra se ela está dentro da curva esperada.',
  ], { fase: ['s1', 'm1', 'm2', 'm4'], f: 'Ministério da Saúde e OMS' });

  A('dentes-escovar', 'cresc', '🪥', 'Cuidar dos dentes', 'Desde o primeiro dentinho.', [
    'Antes dos dentes, limpe a gengiva com gaze ou fralda de pano úmida.',
    'Quando o primeiro dente nascer, comece a escovar com escova pequena e macia, duas vezes ao dia.',
    'Use uma quantidade mínima de pasta com flúor, do tamanho de um grão de arroz, conforme orientação.',
    'Evite açúcar e nunca deixe dormir mamando mamadeira com leite adoçado.',
    'Leve ao dentista até o primeiro ano.',
  ], { fase: ['m7', 'm10'], f: 'SBP e Associação Brasileira de Odontopediatria' });

  A('estimular-fala', 'cresc', '🗣️', 'Estimular a fala', 'Conversar é a base.', [
    'Converse o tempo todo, narrando o que você faz: ‘agora vamos trocar a fralda’.',
    'Olhe nos olhos, fale devagar e com expressão.',
    'Repita os sons que ela faz e responda ao balbucio como numa conversa.',
    'Nomeie objetos, pessoas e animais. Leia e cante.',
    'Sem telas: bebês aprendem a falar com pessoas, não com vídeos.',
  ], { fase: ['m1', 'm2', 'm4', 'm7', 'm10'], f: 'SBP' });

  A('vinculo-bebe', 'cresc', '💞', 'Construir o vínculo com a Maya', 'Vínculo é um hábito de todo dia.', [
    'Responda ao choro com calma e carinho. Isso gera segurança.',
    'Olhe nos olhos nas trocas e nas mamadas. Fale com ela.',
    'Faça o pele a pele e o colo sempre que possível.',
    'Assuma tarefas fixas: banho, troca, ritual do sono.',
    'Não precisa se sentir culpado se o vínculo não vem de imediato. Ele cresce com o convívio.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP' });

  A('estranhamento', 'cresc', '😳', 'Estranhamento e ansiedade de separação', 'Mostra que o vínculo está forte.', [
    'Por volta dos 7 a 9 meses, ela pode chorar com desconhecidos e quando vocês saem de vista.',
    'É sinal de desenvolvimento emocional saudável, não de mimo.',
    'Evite sumir sem avisar. Despeça-se com calma e volte quando prometeu.',
    'Apresente novas pessoas aos poucos, com você por perto.',
    'Brinque de esconde-esconde: ensina que quem some volta.',
  ], { fase: ['m7', 'm10'], f: 'SBP' });

  /* ---------- BRINCAR ---------- */
  A('brincar-rn', 'brincar', '🎶', 'Brincar com o recém-nascido', 'Para ela, você é o melhor brinquedo.', [
    'Aproxime o rosto a uns 25 cm, olhe nos olhos, sorria e faça caretas.',
    'Converse e cante. Ela reconhece sua voz.',
    'Faça movimentos lentos com o rosto, para ela seguir.',
    'Respeite os sinais: desviar o olhar, bocejar ou ficar irritada quer dizer ‘chega’.',
    'Sessões curtas, só quando ela estiver calma e acordada.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  A('brincar-0-3', 'brincar', '🖤', 'Brincadeiras de 0 a 3 meses', 'Contraste, voz e toque.', [
    'Cartões preto e branco a 25 a 30 cm do rosto dela.',
    'Chocalho suave que ela possa seguir com os olhos e ouvidos.',
    'Massagem leve e canções de ninar.',
    'Tempo de bruços, com supervisão.',
    'Passeios curtos para ver, ouvir e sentir cheiros novos.',
  ], { fase: ['m1', 'm2'], f: 'SBP' });

  A('brincar-4-6', 'brincar', '🪞', 'Brincadeiras de 4 a 6 meses', 'Ela agarra, olha, leva à boca.', [
    'Brinquedos de pegar, de texturas e sons, seguros para a boca.',
    'Espelho inquebrável: ela adora olhar para o próprio rosto.',
    'Brincar de ‘achou!’ com um paninho no rosto.',
    'Balance suavemente e converse. Cante músicas com gestos.',
    'Brincar no chão com tapetes e almofadas.',
  ], { fase: ['m4'], f: 'SBP' });

  A('brincar-7-9', 'brincar', '🧩', 'Brincadeiras de 7 a 9 meses', 'Esconder, empilhar e bater.', [
    'Esconda um brinquedo sob um pano e deixe-a procurar.',
    'Empilhar copinhos e bater panelas com colher de pau.',
    'Rolar bolas macias uma para a outra.',
    'Música com palmas, tchau e batidinhas.',
    'Deixe engatinhar em espaço livre e seguro.',
  ], { fase: ['m7'], f: 'SBP' });

  A('brincar-10-12', 'brincar', '📚', 'Brincadeiras de 10 a 12 meses', 'Encaixar, imitar e andar.', [
    'Brinquedos de encaixe, formas e blocos grandes.',
    'Livros de pano e papelão com imagens grandes.',
    'Imite o que ela faz e deixe que ela imite você.',
    'Empurre um brinquedo estável para ela se apoiar ao andar.',
    'Brinque de telefone, de comidinha, de esconder.',
  ], { fase: ['m10'], f: 'SBP' });

  A('ler-bebe', 'brincar', '📖', 'Ler para a Maya', 'Começa desde os primeiros dias.', [
    'Leia em voz alta, mesmo sem ela entender. A voz e o ritmo importam.',
    'Escolha livros de imagens grandes, cores fortes e poucas palavras.',
    'Deixe-a pegar, morder e folhear livros de pano ou papelão.',
    'Faça uma rotina: um livrinho antes de dormir.',
    'Imite sons de bichos e mude de voz, ela adora.',
  ], { fase: ['m1', 'm2', 'm4', 'm7', 'm10'], f: 'SBP' });

  A('cantar-musica', 'brincar', '🎵', 'Cantar e música', 'Sua voz acalma como nenhuma outra.', [
    'Cante qualquer coisa, desafinado também vale. Ela ama a sua voz.',
    'Canções de ninar e cantigas ajudam a acalmar e dormir.',
    'Dance devagar com ela no colo, com movimentos suaves.',
    'Mostre instrumentos simples como chocalhos e pandeiros.',
    'Volume baixo. Nada de música alta perto dos ouvidinhos.',
  ], { fase: ['s1', 'm1', 'm2', 'm4'], f: 'SBP' });

  A('massagem-bebe', 'brincar', '💆', 'Massagem no bebê', 'Calma e vínculo, com cuidado.', [
    'Escolha um momento calmo, depois do banho, e um local aquecido, sem pressa.',
    'Use as mãos limpas e quentes. Se quiser, um óleo vegetal sem perfume, depois de testar numa área pequena.',
    'Movimentos suaves, nunca forçados. Converse e olhe nos olhos.',
    'Pare se ela chorar ou se incomodar. Não massageie logo após mamar.',
    'Evite massagens fortes em articulações e na barriga cheia.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'SBP' });

  A('brinquedos-seguros', 'brincar', '🧸', 'Escolher brinquedos seguros', 'Menos é mais.', [
    'Procure o selo do Inmetro e respeite a faixa etária.',
    'Sem peças pequenas, tinta que solta, pilhas expostas ou cordões longos.',
    'Para a boca: material atóxico e fácil de lavar.',
    'Poucos brinquedos e variados. Troque de tempos em tempos.',
    'Cuidado com brinquedos de segunda mão, que podem estar quebrados.',
  ], { l: 1, fase: ['m2', 'm4', 'm7'], f: 'Inmetro e SBP' });

  A('telas-zero', 'brincar', '📵', 'Telas e bebês', 'Até 2 anos, o ideal é nenhuma tela.', [
    'A SBP recomenda evitar telas para menores de 2 anos, mesmo que passivamente (TV ligada ao fundo).',
    'Bebês aprendem com pessoas, voz e toque, não com vídeo.',
    'Videochamada com a família, breve e com um adulto junto, é aceitável.',
    'Evite usar celular para acalmar ou na hora da refeição.',
    'Dê o exemplo: guarde o celular quando estiver com ela.',
  ], { fase: ['m2', 'm4', 'm7', 'm10'], f: 'SBP (Manual #MenosTelas #MaisSaúde)' });

  A('brincar-pai', 'brincar', '🦸', 'Brincadeiras de pai', 'Seu jeito de brincar é único e importante.', [
    'Cavalinho suave nos joelhos e balanço no colo, sempre com apoio da cabeça nos pequenos.',
    'Aviãozinho curtinho, sem jogar para o alto e sem sacudir.',
    'Vozes e caras engraçadas para ela rir.',
    'Esconde-esconde com as mãos ou com um paninho.',
    'Passeio no sling ou no carrinho para explorar o mundo juntos.',
  ], { fase: ['m2', 'm4', 'm7', 'm10'], a: ['Nunca jogue, balance muito forte ou sacuda um bebê. A cabeça e o pescoço dela são frágeis.'], f: 'SBP' });

  A('chao-livre', 'brincar', '🧶', 'Brincar no chão', 'O melhor espaço para ela se desenvolver.', [
    'Use um tapete ou colchonete firme e limpo, longe de móveis e quinas.',
    'Deixe os brinquedos ao alcance e alguns um pouco mais longe, para ela alcançar.',
    'Deite ao lado dela e brinque junto.',
    'Evite deixar por longos períodos em cadeirinhas, cercadinhos ou bebê-conforto fora do carro.',
    'Movimento livre ajuda a rolar, sentar, engatinhar e andar.',
  ], { fase: ['m2', 'm4', 'm7'], f: 'SBP' });
})();
