export type ProcessStep = {
  title: string;
  text: string;
};

/** Etapas da experiência — edite os textos livremente. */
export const PROCESS: ProcessStep[] = [
  { title: 'Ideia', text: 'Você apresenta a ideia, as referências e o local do corpo.' },
  { title: 'Design', text: 'O desenho é desenvolvido de forma exclusiva para a sua pele.' },
  { title: 'Tattoo', text: 'A sessão acontece no estúdio, com tempo, técnica e precisão.' },
  { title: 'Resultado', text: 'Uma peça única — e o cuidado certo na cicatrização.' },
];
