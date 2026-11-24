/* Guias: cuidar da Maíra e você, pai. Também define as fases e marca as fases dos guias originais. */
(function () {
  const A = (id, cat, e, t, r, p, o) => window.GUIAS.push(Object.assign({ id, cat, e, t, r, p, lista: !!(o && o.l) }, o || {}));
  const MS = 'Ministério da Saúde e SBP';

  /* ---------- CUIDAR DA MAÍRA ---------- */
  A('pos-parto-normal', 'maira', '🌸', 'Pós-parto normal: cuidados com a Maíra', 'O corpo dela está se recuperando.', [
    'Dor e inchaço no períneo são comuns. Compressa fria e banho de assento, se a equipe indicar, ajudam.',
    'Ajude a ir ao banheiro e a manter a higiene. Lavar com água e secar bem.',
    'Ofereça almofada em formato de rosca ou travesseiro para sentar.',
    'Cólicas no útero ao amamentar são normais nos primeiros dias.',
    'Siga as orientações da alta para remédios, repouso e retorno.',
  ], { fase: ['s1', 'm1'], a: ['Febre, sangramento intenso, dor forte que piora ou mau cheiro nos pontos: avise o médico.'], f: MS });

  A('pos-cesarea', 'maira', '🩹', 'Pós-cesárea: cuidados com a Maíra', 'É uma cirurgia grande. Ela precisa de ajuda extra.', [
    'Ajude a levantar devagar e a sentar. Ela deve evitar pegar peso, forçar a barriga ou dirigir nas primeiras semanas.',
    'Mantenha o curativo limpo e seco, conforme orientação do médico.',
    'Segurar um travesseiro contra a barriga ajuda ao tossir, rir ou se levantar.',
    'Ajude a posicionar o bebê para amamentar, em posições que não pressionem a cicatriz.',
    'Caminhadas curtas, com liberação médica, ajudam a evitar problemas.',
  ], { fase: ['s1', 'm1'], a: ['Febre, vermelhidão, secreção ou abertura da cicatriz, dor que piora, ou perna inchada e dolorida: procure atendimento.'], f: MS });

  A('loquios', 'maira', '🩸', 'Sangramento depois do parto (lóquios)', 'É normal, mas precisa de atenção.', [
    'Nas primeiras semanas, o sangramento é vermelho, depois rosado, e vai clareando até sumir em até 4 a 6 semanas.',
    'Use absorventes grandes e troque com frequência. Evite absorvente interno.',
    'Coágulos pequenos são comuns. Grandes, não.',
    'Aumento do sangramento ao fazer esforço pode ser sinal para descansar mais.',
    'Anote a quantidade de absorventes por hora, se parecer demais.',
  ], { fase: ['s1', 'm1'], a: ['Encharcar um absorvente em 1 hora, coágulos grandes, tontura, palpitação ou odor ruim: vá ao pronto-socorro.'], f: MS });

  A('sono-da-maira', 'maira', '😴', 'Proteger o sono da Maíra', 'Sono de mãe é remédio.', [
    'Proponha um bloco de 4 a 5 horas de sono contínuo por noite para ela, e outro para você.',
    'Assuma a troca e acalme o bebê, só traga para mamar.',
    'Se usar leite ordenhado ou fórmula na madrugada, combinem antes.',
    'Reduza visitas e compromissos à tarde para ela cochilar.',
    'Cuidado com sono extremo e pensamentos ruins. Se estiver muito mal, procure ajuda.',
  ], { fase: ['s1', 'm1', 'm2'], f: MS });

  A('comida-agua-mae', 'maira', '🥗', 'Alimentar e hidratar a Maíra', 'Quem amamenta tem fome e sede o tempo todo.', [
    'Deixe sempre uma garrafa de água e um lanche perto de onde ela amamenta.',
    'Prepare refeições simples e nutritivas, ou peça ajuda de parentes para trazer comida.',
    'Frutas, castanhas, iogurte e sanduíches rápidos são ótimos lanches.',
    'Não precisa de dieta restritiva. Pergunte se ela quer algo específico.',
    'Ela não deve pular refeições, mesmo com o bebê no colo.',
  ], { fase: ['s1', 'm1', 'm2'], f: MS });

  A('solidao-materna', 'maira', '🫶', 'Quando a Maíra se sente sozinha', 'Cuidar de um bebê pode ser muito isolado.', [
    'Pergunte como ela está, não só como o bebê está.',
    'Ouça sem tentar resolver ou minimizar. ‘Faz sentido você se sentir assim’.',
    'Incentive a sair de casa, com ou sem o bebê, para uma caminhada ou um café com uma amiga.',
    'Marque encontros com amigas ou outras mães.',
    'Observe sinais de tristeza que não passam e procure ajuda.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'SBP' });

  A('sexo-pos-parto', 'maira', '💑', 'Intimidade depois do parto', 'Sem pressa e com muita conversa.', [
    'O corpo precisa se recuperar. A liberação costuma vir na consulta de revisão, em geral a partir de 6 semanas.',
    'Cansaço, dor, mudanças hormonais e a amamentação diminuem o desejo, e isso é normal.',
    'Retome com calma: carinho, beijos, conversa e toque sem expectativa.',
    'Lubrificante pode ajudar, pois a mucosa fica mais seca na amamentação.',
    'Converse sobre o que cada um sente. Não force e não se ofenda.',
  ], { fase: ['m1', 'm2'], f: 'Boas práticas obstétricas' });

  A('contracepcao', 'maira', '🗓️', 'Contracepção depois do parto', 'Amamentar não é método garantido.', [
    'A ovulação pode voltar antes da primeira menstruação, e dá para engravidar mesmo amamentando.',
    'Converse com o obstetra sobre um método adequado para quem amamenta.',
    'Camisinha pode ser usada desde a retomada da vida sexual.',
    'Planejar o intervalo entre gestações é bom para a saúde da mãe e dos filhos.',
    'Decida junto com a Maíra, respeitando a vontade dela.',
  ], { fase: ['m1', 'm2'], f: 'Ministério da Saúde' });

  A('revisao-pos-parto', 'maira', '🩺', 'Consultas de revisão da Maíra', 'A saúde dela também precisa de acompanhamento.', [
    'Primeira consulta: nos primeiros 7 a 10 dias (ou antes, se houver problema), principalmente se teve cesárea ou intercorrências.',
    'Consulta de revisão: por volta de 6 semanas (42 dias).',
    'Leve ou se encarregue de anotar as dúvidas dela: sangramento, dor, humor, amamentação, contracepção.',
    'Pergunte sobre saúde emocional. Peça ao médico para olhar o humor também.',
    'Acompanhe, se ela quiser, e cuide do bebê durante a consulta se necessário.',
  ], { fase: ['s1', 'm1', 'm2'], f: MS });

  A('culpa-materna', 'maira', '💬', 'Frases que ajudam a Maíra (e as que machucam)', 'Mães sentem culpa por quase tudo.', [
    'Ajudam: ‘Você está indo muito bem’, ‘A Maya está linda e saudável’, ‘Eu cuido, você descansa’.',
    'Evite: ‘Meu primo fazia diferente’, ‘Você está exagerando’, ‘Eu faria assim’.',
    'Elogie coisas concretas: o jeito calmo, a paciência, o cuidado.',
    'Não compare com outras mães nem com o que ela era antes.',
    'Se ela chorar, abrace. Nem sempre há uma razão e não precisa ter.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'Boas práticas' });

  A('palpites-familia', 'maira', '🛡️', 'Palpites da família: ser o escudo', 'Todo mundo tem uma opinião sobre bebês.', [
    'Combinem com a Maíra o que vocês querem e o que não.',
    'Você se encarrega de dar o recado aos parentes com gentileza e firmeza.',
    'Agradeça a boa intenção, mas explique que vocês seguem o pediatra.',
    'Evite deixar a Maíra sozinha na discussão. Fale por vocês dois.',
    'Se algo for perigoso (mel, sono de bruços, sacudir), seja claro e firme.',
  ], { fase: ['pre', 's1', 'm1'], f: 'Boas práticas' });

  A('carga-mental', 'maira', '🧠', 'Carga mental: as tarefas invisíveis', 'Lembrar de tudo cansa mais que fazer.', [
    'Muitas vezes a mãe lembra de fraldas, vacinas, consultas e compras, sem ninguém perceber.',
    'Pergunte: ‘O que está na sua cabeça que eu posso assumir?’.',
    'Assuma tarefas inteiras (pensar, planejar, fazer), não só ‘ajudar quando pedem’.',
    'Use as abas Pedidos e Estoque para dividir e não esquecer.',
    'Revisem a divisão a cada algumas semanas, pois as necessidades mudam.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'Boas práticas' });

  A('corpo-pos-parto', 'maira', '🪞', 'O corpo da Maíra depois do parto', 'Seu comentário pesa.', [
    'O corpo muda: barriga, seios, cabelo, pele, peso. Tudo isso é normal e leva tempo.',
    'Evite comentários sobre peso ou aparência. Elogie com sinceridade o que ela fez.',
    'Mostre que a ama e que a acha bonita, do jeito que ela está.',
    'Incentive atividade física leve, apenas quando ela estiver liberada e quiser.',
    'Cuide da própria forma de falar sobre corpos na frente dela.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'Boas práticas' });

  /* ---------- VOCÊ, PAI ---------- */
  A('licenca-paternidade', 'pai', '🗓️', 'Licença-paternidade: seus direitos', 'Confira os prazos e use bem.', [
    'Em 2026 a licença-paternidade continua sendo de 5 dias corridos, a partir do nascimento.',
    'Empresas do Programa Empresa Cidadã podem estender por mais 15 dias. Pergunte ao RH.',
    'A Lei 15.371/2026 amplia a licença aos poucos: 10 dias em 2027, 15 em 2028 e 20 em 2029, e cria o salário-paternidade.',
    'Avise a empresa com antecedência e leve a certidão de nascimento ou a declaração do hospital.',
    'Confirme tudo com o RH ou o sindicato, pois as regras podem mudar.',
  ], { fase: ['pre', 's1'], f: 'Lei 15.371/2026 e Agência Senado' });

  A('usar-licenca', 'pai', '⏳', 'Como aproveitar bem a licença', 'Poucos dias, muita coisa a fazer.', [
    'Priorize: cuidar da Maíra, do bebê e da casa. Visitas só quando ela quiser.',
    'Resolva o essencial cedo: certidão, plano de saúde, consulta do pediatra e teste do pezinho.',
    'Assuma as noites em turnos, para ela descansar.',
    'Aprenda tudo com a prática: banho, troca, colo e rotina de sono.',
    'Antes do fim, combine como será a rotina quando você voltar ao trabalho.',
  ], { fase: ['s1'], f: 'Boas práticas' });

  A('pai-presente', 'pai', '💙', 'Ser um pai presente no dia a dia', 'Pequenos hábitos que fazem diferença.', [
    'Escolha uma tarefa fixa só sua: banho, troca da noite ou ritual de dormir.',
    'Quando estiver em casa, guarde o celular e fique com a Maya.',
    'Converse com ela durante tudo o que fizer.',
    'Aprenda a ler os sinais dela e confie no seu instinto.',
    'Não ‘ajude’ a Maíra: você é pai. Cuidar da Maya é responsabilidade sua também.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP' });

  A('conhecer-sinais', 'pai', '🔍', 'Aprender a ler a Maya', 'Cada bebê tem sua linguagem.', [
    'Fome: leva a mão à boca, vira a cabeça, faz sons. Choro vem depois.',
    'Sono: boceja, esfrega os olhos, desvia o olhar, fica irritada.',
    'Excesso de estímulo: vira o rosto, franze a testa, fica agitada ou chora.',
    'Gases ou desconforto: encolhe as pernas, fica vermelha, faz força.',
    'Anote o que funciona na aba Rotina. Com o tempo você enxerga os padrões.',
  ], { fase: ['s1', 'm1'], f: 'SBP' });

  A('cansaco-volante', 'pai', '🚗', 'Cansaço e direção', 'Sono ruim aumenta muito o risco de acidente.', [
    'Pai que dorme pouco tem reflexos mais lentos, como alguém que bebeu.',
    'Se estiver muito cansado, não dirija com a Maya. Peça carona ou use aplicativo.',
    'Pare e descanse se começar a bocejar, piscar muito ou perder a atenção.',
    'Dividam as noites para que você consiga dormir um bloco bom.',
    'Cochilos de 20 minutos ajudam bastante.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'Boas práticas' });

  A('trabalho-e-bebe', 'pai', '💼', 'Voltar ao trabalho com bebê em casa', 'Rotina nova para os dois.', [
    'Converse com a Maíra sobre como ficam as manhãs, as noites e os fins de semana.',
    'Mantenha um período só seu com a Maya todo dia, mesmo que curto.',
    'Combine limites de horário no trabalho, para não perder o jantar e o banho.',
    'Divida as noites de forma realista, pensando na sua jornada.',
    'Peça ajuda se estiver sobrecarregado e diga quando algo não está funcionando.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'Boas práticas' });

  A('casal-depois-bebe', 'pai', '❤️', 'Casal depois do bebê', 'O relacionamento vira outro, e dá para cuidar dele.', [
    'Conversem sobre como cada um está, sem acusar. ‘Eu me sinto…’ em vez de ‘Você nunca…’.',
    'Reserve pequenos momentos só dos dois: um café, uma caminhada, um filme juntos.',
    'Não deixe pequenas irritações crescerem. Fale cedo e com calma.',
    'Agradeça. Elogios sinceros fazem diferença no cansaço.',
    'Se o relacionamento estiver muito difícil, procure apoio de um psicólogo ou terapeuta de casal.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'Boas práticas' });

  A('tempo-para-voce', 'pai', '🏃', 'Cuidar de você também', 'Pai esgotado cuida pior.', [
    'Durma o máximo que puder e não vire a noite no celular.',
    'Reserve 20 a 30 minutos por dia para algo seu: caminhar, exercício ou um hobby.',
    'Coma bem, beba água e evite álcool em excesso, principalmente nas noites de plantão.',
    'Mantenha contato com amigos, mesmo que só por mensagem.',
    'Combine com a Maíra que cada um tem direito a um tempo sozinho.',
  ], { fase: ['s1', 'm1', 'm2', 'm4'], f: 'Boas práticas' });

  A('rede-apoio', 'pai', '🧑‍🤝‍🧑', 'Rede de apoio: pedir e aceitar ajuda', 'Criar um filho exige uma aldeia.', [
    'Liste quem pode ajudar: pais, irmãos, amigos, vizinhos.',
    'Peça coisas específicas: levar uma refeição, buscar um remédio, ficar uma hora com a Maya.',
    'Aceite ajuda de verdade e não se sinta fraco por isso.',
    'Conheça outros pais: grupos de pais e de gestantes ajudam a desabafar.',
    'Saiba onde procurar apoio profissional: UBS, CAPS, psicólogo.',
  ], { fase: ['pre', 's1', 'm1'], f: 'Boas práticas' });

  A('quando-discordam', 'pai', '⚖️', 'Quando vocês discordam sobre a Maya', 'Normal, e dá para resolver.', [
    'Respire e deixe a emoção passar antes de decidir qualquer coisa.',
    'Explique seu ponto e ouça o dela, sem interromper.',
    'Para dúvidas de saúde, ouçam o pediatra. Para o resto, busquem um meio-termo.',
    'Evite discutir na frente da Maya ou de visitas.',
    'Anote o que decidiram para não repetir a mesma briga.',
  ], { fase: ['m1', 'm2', 'm4'], f: 'Boas práticas' });

  A('sentir-se-de-fora', 'pai', '🚪', 'Sentir-se de fora', 'Muitos pais sentem isso, principalmente no começo.', [
    'Com amamentação e a ligação da mãe com o bebê, você pode se sentir sobrando.',
    'Isso é comum e não significa que você é menos importante.',
    'Encontre seu espaço: banho, troca, passeios, colo com pele a pele e ritual do sono.',
    'Converse com a Maíra sobre como se sente, sem cobrança.',
    'Seu vínculo vai crescendo com o convívio, e isso leva algum tempo.',
  ], { fase: ['s1', 'm1', 'm2'], f: 'SBP' });

  A('sinais-ajuda-pai', 'pai', '🧭', 'Sinais de que você precisa de ajuda', 'Pais também adoecem emocionalmente.', [
    'Tristeza, irritação ou raiva constante e sem motivo claro.',
    'Perda de interesse no que gostava, vontade de se afastar da família.',
    'Insônia mesmo quando há chance de dormir, ou cansaço extremo.',
    'Aumento no uso de álcool ou outras substâncias.',
    'Procure a UBS, um psicólogo ou o CAPS. Em crise, ligue 188 (CVV, 24 horas) ou 192.',
  ], { l: 1, fase: ['s1', 'm1', 'm2', 'm4'], f: 'Ministério da Saúde e CVV' });

  A('comparar-pais', 'pai', '🪧', 'Não compare a Maya com outros bebês', 'Cada bebê tem seu ritmo.', [
    'Redes sociais mostram só os bons momentos. Ninguém posta o choro das 3 da manhã.',
    'Idades de sentar, engatinhar e falar variam bastante. O pediatra acompanha o desenvolvimento.',
    'Parentes e amigos podem comparar. Você não precisa entrar no jogo.',
    'Compare a Maya só com ela mesma ao longo do tempo.',
    'Se algo preocupar, leve ao pediatra, não à internet.',
  ], { fase: ['m1', 'm2', 'm4', 'm7'], f: 'SBP' });

  A('registrar-memorias', 'pai', '📓', 'Registrar memórias', 'O tempo passa rápido.', [
    'Use a aba Diário para anotar primeiras vezes, gracinhas e frases.',
    'Tire fotos do dia a dia, não só das ocasiões especiais.',
    'Escreva uma carta para a Maya ler no futuro. Pode ser uma por mês.',
    'Guarde pequenos objetos: pulseira da maternidade, primeiros sapatinhos.',
    'Peça que a Maíra escreva também, e juntem tudo.',
  ], { fase: ['s1', 'm1', 'm2', 'm4', 'm7', 'm10'], f: 'Boas práticas' });

  /* ---------- FASES ---------- */
  window.FASES = [
    ['pre', '🤰 Antes do parto'], ['s1', '👶 1ª semana'], ['m1', '🌱 1º mês'], ['m2', '2 a 3 meses'],
    ['m4', '4 a 6 meses'], ['m7', '7 a 9 meses'], ['m10', '10 a 12 meses'],
  ];

  /* Fases dos 25 guias originais */
  const FA = {
    'sono-seguro': ['pre', 's1', 'm1', 'm2', 'm4'], 'troca-fralda': ['pre', 's1'], 'banho': ['s1', 'm1'], 'coto': ['s1'], 'segurar': ['pre', 's1'],
    'roupa': ['pre', 's1'], 'unhas': ['m1'], 'visitas': ['pre', 's1'], 'carro': ['pre', 's1'], 'amamentar-pai': ['pre', 's1'],
    'mamando-bem': ['s1'], 'arrotar': ['s1', 'm1'], 'mamadeira': ['s1', 'm1'], 'noites': ['s1', 'm1'], 'choro': ['s1', 'm1', 'm2'],
    'colica': ['m1', 'm2'], 'febre': ['s1', 'm1', 'm2', 'm4'], 'ictericia': ['s1'], 'primeiros-dias': ['pre', 's1'], 'sos-mae': ['s1', 'm1'],
    'ajudar-maira': ['pre', 's1', 'm1'], 'baby-blues': ['s1', 'm1', 'm2'], 'pai-saude': ['s1', 'm1', 'm2'], 'divisao': ['pre', 's1', 'm1'],
    'sos-bebe': ['pre', 's1', 'm1', 'm2', 'm4', 'm7', 'm10'],
  };
  window.GUIAS.forEach(g => { if (FA[g.id]) g.fase = FA[g.id]; });
})();
