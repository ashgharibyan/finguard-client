export type Id = string | number;

export type Task = {
  id: Id;
  content: string;
  columnId: Id;
};

export type Column = {
  id: Id;
  title: string;
};
