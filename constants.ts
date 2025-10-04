import type { Module } from './types';

export const COURSE_MODULES: Module[] = [
  {
    id: 'm1',
    title: {
      pt: 'Módulo 1: Fundamentos da Liderança',
      en: 'Module 1: Foundations of Leadership',
      es: 'Módulo 1: Fundamentos del Liderazgo',
    },
    lessons: [
      {
        id: 'm1l1',
        title: {
          pt: 'Aula 1: O que é um Líder?',
          en: 'Lesson 1: What is a Leader?',
          es: 'Lección 1: ¿Qué es un Líder?',
        },
        summary: {
          pt: `<h1>Bem-vindo à sua Jornada do Líder!</h1><p>Nesta primeira aula, exploraremos a essência da liderança. Um líder não é apenas alguém com um título; é alguém que inspira, motiva e guia uma equipe em direção a um objetivo comum. Veremos as diferenças entre chefiar e liderar.</p><ul><li>Inspiração vs. Comando</li><li>Visão e Comunicação</li><li>Construindo Confiança</li></ul>`,
          en: `<h1>Welcome to Your Leader's Journey!</h1><p>In this first lesson, we will explore the essence of leadership. A leader is not just someone with a title; it is someone who inspires, motivates, and guides a team towards a common goal. We will see the differences between managing and leading.</p><ul><li>Inspiration vs. Command</li><li>Vision and Communication</li><li>Building Trust</li></ul>`,
          es: `<h1>¡Bienvenido a tu Viaje del Líder!</h1><p>En esta primera lección, exploraremos la esencia del liderazgo. Un líder no es solo alguien con un título; es alguien que inspira, motiva y guía a un equipo hacia un objetivo común. Veremos las diferencias entre ser jefe y ser líder.</p><ul><li>Inspiración vs. Mando</li><li>Visión y Comunicación</li><li>Construyendo Confianza</li></ul>`,
        },
        podcastUrl: 'https://example.com/podcast1.mp3',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        studyGuide: {
          shortAnswerQuestions: [
            { id: 'm1l1_sa1', question: { pt: 'Qual a principal diferença entre um chefe e um líder?', en: 'What is the main difference between a boss and a leader?', es: '¿Cuál es la principal diferencia entre un jefe y un líder?' }, answer: { pt: 'Um chefe comanda, um líder guia e inspira.', en: 'A boss commands, a leader guides and inspires.', es: 'Un jefe manda, un líder guía e inspira.' } },
          ],
          dissertationQuestions: [
            { id: 'm1l1_diss1', question: { pt: 'Descreva uma experiência em que você foi inspirado por um líder. O que ele ou ela fez?', en: 'Describe an experience where you were inspired by a leader. What did he or she do?', es: 'Describe una experiencia en la que fuiste inspirado por un líder. ¿Qué hizo él o ella?' } },
          ],
          glossary: [
            { id: 'm1l1_gl1', term: { pt: 'Inteligência Emocional', en: 'Emotional Intelligence', es: 'Inteligencia Emocional' }, definition: { pt: 'A capacidade de entender e gerenciar suas próprias emoções e as dos outros.', en: 'The ability to understand and manage your own emotions and those of others.', es: 'La capacidad de entender y gestionar tus propias emociones y las de los demás.' } },
          ],
          quiz: [
            { id: 'm1l1_q1', question: { pt: 'Qual destas é uma característica chave de um líder?', en: 'Which of these is a key characteristic of a leader?', es: '¿Cuál de estas es una característica clave de un líder?' }, options: { pt: ['Microgerenciamento', 'Comunicação Clara', 'Autoritarismo'], en: ['Micromanagement', 'Clear Communication', 'Authoritarianism'], es: ['Microgestión', 'Comunicación Clara', 'Autoritarismo'] }, correctAnswerIndex: 1 },
            { id: 'm1l1_q2', question: { pt: 'Liderança é baseada em:', en: 'Leadership is based on:', es: 'El liderazgo se basa en:' }, options: { pt: ['Hierarquia', 'Influência', 'Controle'], en: ['Hierarchy', 'Influence', 'Control'], es: ['Jerarquía', 'Influencia', 'Control'] }, correctAnswerIndex: 1 },
             { id: 'm1l1_q3', question: { pt: 'Um bom líder deve focar em:', en: 'A good leader should focus on:', es: 'Un buen líder debe enfocarse en:' }, options: { pt: ['Apenas resultados', 'O processo e as pessoas', 'Apenas nas tarefas'], en: ['Only results', 'The process and the people', 'Only tasks'], es: ['Solo resultados', 'El proceso y las personas', 'Solo las tareas'] }, correctAnswerIndex: 1 },
            { id: 'm1l1_q4', question: { pt: 'O que um líder eficaz constrói em sua equipe?', en: 'What does an effective leader build in their team?', es: '¿Qué construye un líder eficaz en su equipo?' }, options: { pt: ['Medo', 'Competição', 'Confiança'], en: ['Fear', 'Competition', 'Trust'], es: ['Miedo', 'Competición', 'Confianza'] }, correctAnswerIndex: 2 },
            { id: 'm1l1_q5', question: { pt: 'Qual o papel da visão na liderança?', en: 'What is the role of vision in leadership?', es: '¿Cuál es el papel de la visión en el liderazgo?' }, options: { pt: ['É irrelevante', 'Guia a direção da equipe', 'Serve para controlar'], en: ['It is irrelevant', 'It guides the team’s direction', 'It is for control'], es: ['Es irrelevante', 'Guía la dirección del equipo', 'Sirve para controlar'] }, correctAnswerIndex: 1 },
          ]
        }
      }
    ]
  },
  {
    id: 'm2',
    title: {
      pt: 'Módulo 2: Comunicação Eficaz',
      en: 'Module 2: Effective Communication',
      es: 'Módulo 2: Comunicación Efectiva',
    },
    lessons: [
      {
        id: 'm2l1',
        title: {
          pt: 'Aula 1: Escuta Ativa',
          en: 'Lesson 1: Active Listening',
          es: 'Lección 1: Escucha Activa',
        },
        summary: {
          pt: `<h1>Aprenda a ouvir de verdade.</h1><p>A comunicação não é apenas sobre falar. A escuta ativa é uma das ferramentas mais poderosas de um líder. Nesta aula, você aprenderá técnicas para ouvir com atenção, entender as necessidades da sua equipe e responder de forma empática.</p>`,
          en: `<h1>Learn to truly listen.</h1><p>Communication is not just about talking. Active listening is one of a leader's most powerful tools. In this lesson, you will learn techniques to listen attentively, understand your team's needs, and respond empathetically.</p>`,
          es: `<h1>Aprende a escuchar de verdad.</h1><p>La comunicación no es solo hablar. La escucha activa es una de las herramientas más poderosas de un líder. En esta lección, aprenderás técnicas para escuchar con atención, entender las necesidades de tu equipo y responder de forma empática.</p>`,
        },
        podcastUrl: 'https://example.com/podcast2.mp3',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        studyGuide: {
          shortAnswerQuestions: [
            { id: 'm2l1_sa1', question: { pt: 'O que é escuta ativa?', en: 'What is active listening?', es: '¿Qué es la escucha activa?' }, answer: { pt: 'É o ato de ouvir e responder de uma forma que melhora a compreensão mútua.', en: 'It is the act of listening and responding in a way that improves mutual understanding.', es: 'Es el acto de escuchar y responder de una manera que mejora la comprensión mutua.' } },
          ],
          dissertationQuestions: [
            { id: 'm2l1_diss1', question: { pt: 'Como você pode praticar a escuta ativa em sua próxima reunião de equipe?', en: 'How can you practice active listening in your next team meeting?', es: '¿Cómo puedes practicar la escucha activa en tu próxima reunión de equipo?' } },
          ],
          glossary: [
            { id: 'm2l1_gl1', term: { pt: 'Empatia', en: 'Empathy', es: 'Empatía' }, definition: { pt: 'A capacidade de se colocar no lugar de outra pessoa.', en: 'The ability to place yourself in someone else\'s shoes.', es: 'La capacidad de ponerse en el lugar de otra persona.' } },
          ],
          quiz: [
             { id: 'm2l1_q1', question: { pt: 'Qual é um componente da escuta ativa?', en: 'What is a component of active listening?', es: '¿Cuál es un componente de la escucha activa?' }, options: { pt: ['Interromper para dar sua opinião', 'Fazer perguntas para esclarecer', 'Julgar o que está sendo dito'], en: ['Interrupting to give your opinion', 'Asking questions to clarify', 'Judging what is being said'], es: ['Interrumpir para dar tu opinión', 'Hacer preguntas para aclarar', 'Juzgar lo que se dice'] }, correctAnswerIndex: 1 },
             { id: 'm2l1_q2', question: { pt: 'Parafrasear o que alguém disse mostra que você está...', en: 'Paraphrasing what someone said shows that you are...', es: 'Parafrasear lo que alguien dijo demuestra que estás...' }, options: { pt: ['...desatento.', '...tentando entender.', '...corrigindo a pessoa.'], en: ['...inattentive.', '...trying to understand.', '...correcting the person.'], es: ['...desatento.', '...intentando entender.', '...corrigiendo a la persona.'] }, correctAnswerIndex: 1 },
             { id: 'm2l1_q3', question: { pt: 'Feedback construtivo deve ser:', en: 'Constructive feedback should be:', es: 'La retroalimentación constructiva debe ser:' }, options: { pt: ['Vago e geral', 'Específico e acionável', 'Público e crítico'], en: ['Vague and general', 'Specific and actionable', 'Public and critical'], es: ['Vago y general', 'Específico y procesable', 'Público y crítico'] }, correctAnswerIndex: 1 },
             { id: 'm2l1_q4', question: { pt: 'A linguagem corporal é uma forma de comunicação...', en: 'Body language is a form of communication...', es: 'El lenguaje corporal es una forma de comunicación...' }, options: { pt: ['...verbal.', '...não-verbal.', '...escrita.'], en: ['...verbal.', '...non-verbal.', '...written.'], es: ['...verbal.', '...no verbal.', '...escrita.'] }, correctAnswerIndex: 1 },
             { id: 'm2l1_q5', question: { pt: 'A comunicação eficaz em uma equipe leva a:', en: 'Effective communication in a team leads to:', es: 'La comunicación efectiva en un equipo conduce a:' }, options: { pt: ['Mais conflitos', 'Menos produtividade', 'Maior alinhamento'], en: ['More conflicts', 'Less productivity', 'Greater alignment'], es: ['Más conflictos', 'Menos productividad', 'Mayor alineación'] }, correctAnswerIndex: 2 },
          ]
        }
      }
    ]
  },
  {
    id: 'm3',
    title: {
      pt: 'Módulo 3: Inteligência Emocional',
      en: 'Module 3: Emotional Intelligence',
      es: 'Módulo 3: Inteligencia Emocional',
    },
    lessons: [
      {
        id: 'm3l1',
        title: {
          pt: 'Aula 1: O Poder da Empatia',
          en: 'Lesson 1: The Power of Empathy',
          es: 'Lección 1: El Poder de la Empatía',
        },
        summary: {
          pt: `<h1>Compreendendo e Conectando-se com sua Equipe.</h1><p>Inteligência emocional é a pedra angular da liderança moderna. Começa com a empatia - a capacidade de compreender e partilhar os sentimentos dos outros. Líderes empáticos criam segurança psicológica, fomentam a confiança e constroem equipes mais resilientes e inovadoras.</p><ul><li>Reconhecer emoções em si e nos outros.</li><li>Praticar a escuta empática.</li><li>Responder com compaixão e apoio.</li></ul>`,
          en: `<h1>Understanding and Connecting with Your Team.</h1><p>Emotional intelligence is the cornerstone of modern leadership. It begins with empathy—the ability to understand and share the feelings of another. Empathetic leaders create psychological safety, foster trust, and build more resilient and innovative teams.</p><ul><li>Recognizing emotions in oneself and others.</li><li>Practicing empathetic listening.</li><li>Responding with compassion and support.</li></ul>`,
          es: `<h1>Comprender y Conectar con tu Equipo.</h1><p>La inteligencia emocional es la piedra angular del liderazgo moderno. Comienza con la empatía: la capacidad de comprender y compartir los sentimientos de los demás. Los líderes empáticos crean seguridad psicológica, fomentan la confianza y construyen equipos más resilientes e innovadores.</p><ul><li>Reconocer las emociones en uno mismo y en los demás.</li><li>Practicar la escucha empática.</li><li>Responder con compasión y apoyo.</li></ul>`,
        },
        podcastUrl: 'https://example.com/podcast3.mp3',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        studyGuide: {
          shortAnswerQuestions: [
            { id: 'm3l1_sa1', question: { pt: 'Por que a empatia é crucial para um líder?', en: 'Why is empathy crucial for a leader?', es: '¿Por qué es crucial la empatía para un líder?' }, answer: { pt: 'Porque permite ao líder conectar-se com sua equipe, entender suas necessidades e motivações, e criar um ambiente de confiança e segurança.', en: 'Because it allows the leader to connect with their team, understand their needs and motivations, and create an environment of trust and safety.', es: 'Porque permite al líder conectar con su equipo, entender sus necesidades y motivaciones, y crear un ambiente de confianza y seguridad.' } },
          ],
          dissertationQuestions: [
            { id: 'm3l1_diss1', question: { pt: 'Pense em uma situação em que um pouco mais de empatia poderia ter mudado o resultado de uma interação profissional. Descreva o que você faria de diferente.', en: 'Think of a situation where a little more empathy could have changed the outcome of a professional interaction. Describe what you would do differently.', es: 'Piensa en una situación en la que un poco más de empatía podría haber cambiado el resultado de una interacción profesional. Describe qué harías de manera diferente.' } },
          ],
          glossary: [
            { id: 'm3l1_gl1', term: { pt: 'Segurança Psicológica', en: 'Psychological Safety', es: 'Seguridad Psicológica' }, definition: { pt: 'A crença compartilhada pelos membros de uma equipe de que o ambiente é seguro para assumir riscos interpessoais.', en: 'A shared belief held by members of a team that the team is safe for interpersonal risk-taking.', es: 'Una creencia compartida por los miembros de un equipo de que el ambiente es seguro para tomar riesgos interpersonales.' } },
             { id: 'm3l1_gl2', term: { pt: 'Autoconsciência', en: 'Self-awareness', es: 'Autoconciencia' }, definition: { pt: 'A capacidade de reconhecer e compreender suas próprias emoções, pontos fortes, fraquezas e motivadores.', en: 'The ability to recognize and understand your own moods, emotions, and drives, as well as their effect on others.', es: 'La capacidad de reconocer y comprender tus propios estados de ánimo, emociones e impulsos, así como su efecto en los demás.' } },
          ],
          quiz: [
            { id: 'm3l1_q1', question: { pt: 'Qual é o primeiro passo da inteligência emocional?', en: 'What is the first step of emotional intelligence?', es: '¿Cuál es el primer paso de la inteligencia emocional?' }, options: { pt: ['Gerenciar os outros', 'Autoconsciência', 'Motivação'], en: ['Managing others', 'Self-awareness', 'Motivation'], es: ['Gestionar a los demás', 'Autoconciencia', 'Motivación'] }, correctAnswerIndex: 1 },
            { id: 'm3l1_q2', question: { pt: 'Um líder empático provavelmente...', en: 'An empathetic leader is likely to...', es: 'Un líder empático probablemente...' }, options: { pt: ['...ignora os sentimentos da equipe.', '...considera a perspectiva da equipe nas decisões.', '...foca apenas em métricas.'], en: ['...ignore the team’s feelings.', '...consider the team’s perspective in decisions.', '...focus only on metrics.'], es: ['...ignora los sentimientos del equipo.', '...considera la perspectiva del equipo en las decisiones.', '...se centra solo en las métricas.'] }, correctAnswerIndex: 1 },
             { id: 'm3l1_q3', question: { pt: 'Segurança psicológica em uma equipe resulta em:', en: 'Psychological safety in a team results in:', es: 'La seguridad psicológica en un equipo resulta en:' }, options: { pt: ['Menos erros reportados', 'Maior inovação e colaboração', 'Maior competição interna'], en: ['Fewer reported mistakes', 'Higher innovation and collaboration', 'Increased internal competition'], es: ['Menos errores reportados', 'Mayor innovación y colaboración', 'Mayor competencia interna'] }, correctAnswerIndex: 1 },
          ]
        }
      }
    ]
  }
];