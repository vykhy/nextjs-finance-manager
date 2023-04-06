interface IProject {
  id: number;
  user_id?: number;
  name: string;
  description: string | null;
}

export default IProject;
